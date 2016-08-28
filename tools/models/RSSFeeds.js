"use strict";

const requestNPM = require("request");
const parseXML = require("xml2js").parseString;
const moment = require("moment");

let recentArticleTime = moment.now();

const sources = {
    IGN: "http://feeds.ign.com/ign/all",
    CNN: "http://rss.cnn.com/rss/cnn_latest.rss",
    Wired: "http://www.wired.com/feed/",
    source500PX: "https://500px.com/fresh.rss",
    BGBigPicture: "http://www.bostonglobe.com/rss/bigpicture"
};

const convertToUnix = (date) => {
  return moment(date, "DD-MMM-YYYY HH-mm-ss ZZ").unix();
};

const cleanCNNObject = (cnnObject) => {
    let descriptionRegex = /^(.*?)[.<?!]/;
    let description;
    if (descriptionRegex.exec(cnnObject.description[0]).length) {
        let clean = descriptionRegex.exec(cnnObject.description[0])[0];
       //description = clean.replace(/[\\]/g, "");
    }
    let toReturn = {};
    toReturn.source = "CNN";
    if (cnnObject.title.length) toReturn.title = cnnObject.title[0];
    if (cnnObject.description.length) toReturn.description = description;
    if (cnnObject.link.length) toReturn.link = cnnObject.link[0];
    if (cnnObject.pubDate.length) {
        toReturn.published = cnnObject.pubDate[0];
        toReturn.publishedUnix = convertToUnix(cnnObject.pubDate[0]);
        recentArticleTime = toReturn.publishedUnix;
    } else {
        toReturn.publishedUnix = recentArticleTime;
    }
    if (cnnObject["media:group"].length && cnnObject["media:group"][0]["media:content"].length) {
        toReturn.image = cnnObject["media:group"][0]["media:content"][1]["$"].url;
    }
    return toReturn;
};

const cleanBigPictureObject = (BPObject) => {
    let firstSentenceRegex = /^(.*?)[.<?!]/;
    let imageRegex = /<img.*?src=([^">]*\/([^">]*?).jpg).*?>/;
    let toReturn = {};
    if (BPObject.description.length && firstSentenceRegex.exec(BPObject.description[0]).length) {
        toReturn.description = firstSentenceRegex.exec(BPObject.description[0])[0];
    }
    if (BPObject.description.length && imageRegex.exec(BPObject.description[0]).length) {
        toReturn.image = imageRegex.exec(BPObject.description[0])[1];
    }
    if (BPObject.title.length) toReturn.title = BPObject.title[0];
    if (BPObject.link.length) toReturn.link = BPObject.link[0];
    if (BPObject.pubDate.length) {
        toReturn.published = BPObject.pubDate[0];
        toReturn.publishedUnix = convertToUnix(BPObject.pubDate[0]);
        recentArticleTime = toReturn.publishedUnix;
    } else {
        toReturn.publishedUnix = recentArticleTime;
    }
    return toReturn;
};

const cleanIGNObject = (ignObject) => {
    let toReturn = {};
    if (ignObject.title) toReturn.title = ignObject.title;
    if (ignObject.description) toReturn.description = ignObject.description;
    if (ignObject.pubDate) {
        toReturn.published = ignObject.pubDate;
        toReturn.publishedUnix = convertToUnix(ignObject.pubDate);
        recentArticleTime = toReturn.publishedUnix;
    } else {
        toReturn.publishedUnix = recentArticleTime;
    }
    if (ignObject.link) toReturn.link = ignObject.link;
    toReturn.source = "IGN";
    toReturn.image = "IGNDefault";
    return toReturn;
};

const cleanCNN = (parsedXML) => {
    //will return an array of objects
    if (parsedXML.rss.channel.length) return parsedXML.rss.channel[0].item.map(item => {
        return cleanCNNObject(item);
    });
};

const cleanIGN = (parsedXML) => {
    if (parsedXML.rss.channel.length) return parsedXML.rss.channel[0].item.map(item => {
        return cleanIGNObject(item);
    });
};

const cleanBigPicture = (parsedXML) => {
    console.log("Parsed XML: ", parsedXML);
    if (parsedXML.rss.channel.length) return parsedXML.rss.channel[0].item.map(item => {
        return cleanBigPictureObject(item);
    });
};


const clean500PX = (parsedXML) => {
    console.log("Parsed XML: ", parsedXML);
    return parsedXML;
};

const cleanXML = (source, parsedXML) => {
    if (source === "CNN") return cleanCNN(parsedXML);
    if (source === "IGN") return cleanIGN(parsedXML);
    if (source === "source500PX") return clean500PX(parsedXML);
    if (source === "BGBigPicture") return cleanBigPicture(parsedXML);
};

export const retrievePastHours = (source, callback) => {
    requestNPM(sources[source], (error, response, body) => {
        if (error) return callback(error);
        parseXML(body, (error, parsedXML) => {
            let clean = cleanXML(source, parsedXML);
            callback(error, clean);
        });
    });
};