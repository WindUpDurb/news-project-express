"use strict";

const requestNPM = require("request");
const parseXML = require("xml2js").parseString;
const moment = require("moment");

let recentArticleTime = moment.now();

const sources = {
    ABCNewsInternational: "http://feeds.abcnews.com/abcnews/internationalheadlines",
    IGN: "http://feeds.ign.com/ign/all",
    CNN: "http://rss.cnn.com/rss/cnn_latest.rss",
    Wired: "http://www.wired.com/feed/",
    source500PX: "https://500px.com/fresh.rss",
    BGBigPicture: "http://www.bostonglobe.com/rss/bigpicture",
    Slate: "http://feeds.slate.com/slate",
    NPR: "http://www.npr.org/rss/rss.php?id=1001",
    NYTimes: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    NYTimesInternational: "http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml"
};

const convertToUnix = (date) => {
  return moment(date, "DD-MMM-YYYY HH-mm-ss ZZ").unix();
};

const cleanCNNObject = (cnnObject) => {
    let descriptionRegex = /^(.*?)[.<?!]/;
    let description;
    if (descriptionRegex.exec(cnnObject.description[0]).length) {
        let clean = descriptionRegex.exec(cnnObject.description[0])[0];
        description = clean.replace(/[\\]/g, "");
    }
    let toReturn = {};
    toReturn.source = "CNN";
    toReturn.icon = "/statics/cnnIcon.png";
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
    if (cnnObject["media:group"] && cnnObject["media:group"].length && cnnObject["media:group"][0]["media:content"].length) {
        toReturn.image = cnnObject["media:group"][0]["media:content"][1]["$"].url;
    } else {
        toReturn.image = "/statics/cnnDefault.png";
    }
    return toReturn;
};

const cleanNPRObject = (NPRObject) => {
    let toReturn = {};
    let imageRegex = /<img.*?src=([^">]*\/([^">]*?).png).*?>/;
    toReturn.source = "NPR";
    if (NPRObject.title.length) toReturn.title = NPRObject.title[0];
    if (NPRObject.description.length) toReturn.description = NPRObject.description[0];
    if (NPRObject.link.length) toReturn.link = NPRObject.link[0];
    if (NPRObject.pubDate.length) {
        toReturn.published = NPRObject.pubDate[0];
        toReturn.publishedUnix = convertToUnix(NPRObject.pubDate[0]);
        recentArticleTime = toReturn.publishedUnix;
    }  else {
        toReturn.publishedUnix = recentArticleTime;
    }
    // if (NPRObject["content:encoded"] && imageRegex.exec(NPRObject["content:encoded"][0]).length) {
    //     console.log("NPR OBject \n", NPRObject)
    //     toReturn.image = imageRegex.exec(NPRObject["content:encoded"][0])[2].replace(/["']/g, "");
    // }
    toReturn.image = "/statics/npr-logo.jpg";
    toReturn.icon = "/statics/nprIcon.png";
    return toReturn;
};

const cleanBigPictureObject = (BPObject) => {
    let firstSentenceRegex = /^(.*?)[.<?!]/;
    let imageRegex = /<img.*?src=([^">]*\/([^">]*?).jpg).*?>/;
    let toReturn = {};
    toReturn.source = "BigPicture";
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
    toReturn.photoSource = true;
    return toReturn;
};

const cleanIGNObject = (ignObject) => {
    let toReturn = {};
    toReturn.icon = "/statics/ignIcon.png";
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
    toReturn.image = "/statics/ignImage.png";
    return toReturn;
};

const cleanNYTimesObject = (nytObject) => {
    let toReturn = {};
    toReturn.source = "NYTimes";
    toReturn.icon = "/statics/nyTimesIcon.png";
    if (nytObject.title.length) toReturn.title = nytObject.title[0];
    if (nytObject.link.length) toReturn.link = nytObject.link[0];
    if (nytObject.pubDate.length) toReturn.published = nytObject.pubDate[0];
    if (nytObject.pubDate.length) toReturn.publishedUnix = convertToUnix(nytObject.pubDate);
    if (nytObject.descriptioin) toReturn.description = nytObject.description;
    if (nytObject["media:content"] && nytObject["media:content"].length) {
        toReturn.image = nytObject["media:content"][0]["$"].url;
    } else {
        toReturn.image = "/statics/nyTimesDefault.png";
    }
    return toReturn;
};

const cleanABCNewsObject = (abcObject) => {
    let toReturn = {};
    toReturn.source = "ABCNewsInternational";
    toReturn.icon = "/statics/abcNewsIcon.png";
    if (abcObject.title) toReturn.title = abcObject.title;
    if (abcObject.link) toReturn.link = abcObject.link;
    if (abcObject.pubDate) toReturn.published = abcObject.pubDate;
    if (abcObject.pubDate) toReturn.publishedUnix = convertToUnix(abcObject.pubDate[0]);
    if (abcObject.description.length) toReturn.description = abcObject.description[0];
    if (abcObject["media:thumbnail"].length) {
        toReturn.image = abcObject["media:thumbnail"][0]["$"].url;
    } else {
        toReturn.image = "/statics/abcDefault.jpg";
    }
    return toReturn;
};

const cleanSlate = (parsedXML) => {
    return parsedXML;
};

const clean500PX = (parsedXML) => {
    return parsedXML;
};

const cleanXML = (source, parsedXML) => {
    let cleanUp;
    if (source === "CNN") cleanUp = cleanCNNObject;
    if (source === "IGN") cleanUp = cleanIGNObject;
    if (source === "source500PX") cleanUp = clean500PX;
    if (source === "BGBigPicture") cleanUp = cleanBigPictureObject;
    if (source === "Slate") cleanUp = cleanSlate;
    if (source === "NPR") cleanUp = cleanNPRObject;
    if (source === "NYTimes") cleanUp = cleanNYTimesObject;
    if (source === "NYTimesInternational") cleanUp = cleanNYTimesObject;
    if (source === "ABCNewsInternational") cleanUp = cleanABCNewsObject;
    if (parsedXML.rss.channel.length) return  parsedXML.rss.channel[0].item.map(item => {
        return cleanUp(item);
    });
};

const verifyXML = (source, parsedXML) => {
    if (parsedXML.rss.channel.length) return cleanXML(source, parsedXML);
};

export const retrievePastHours = (source, callback) => {
    requestNPM(sources[source], (error, response, body) => {
        if (error) return callback(error);
        parseXML(body, (error, parsedXML) => {
            let clean;
            if (parsedXML) clean = verifyXML(source, parsedXML);
            callback(error, clean);
        });
    });
};