"use strict";

const requestNPM = require("request");
const parseXML = require("xml2js").parseString;
const moment = require("moment");

const sources = {
    ABCNewsInternational: "http://feeds.abcnews.com/abcnews/internationalheadlines",
    ABCNews: "http://feeds.abcnews.com/abcnews/usheadlines",
    IGN: "http://feeds.ign.com/ign/all",
    CNN: "http://rss.cnn.com/rss/cnn_latest.rss",
    // Wired: "http://www.wired.com/feed/",
    source500PXUpcoming: "https://500px.com/upcoming.rss",
    BGBigPicture: "http://www.bostonglobe.com/rss/bigpicture",
    NPR: "http://www.npr.org/rss/rss.php?id=1001",
    NYTimes: "http://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml",
    // NYTimesInternational: "http://rss.nytimes.com/services/xml/rss/nyt/InternationalHome.xml",
    TechCrunch: "http://feeds.feedburner.com/TechCrunch/"
};

const sourcesArray = ["ABCNewsInternational", "ABCNews", "IGN", "CNN",
"source500PXUpcoming", "BGBigPicture", "NPR", "NYTimes", "TechCrunch"];

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
    } else {
        return {noPubDate: true};
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
    }  else {
        // toReturn.publishedUnix = recentArticleTime;
        return {noPubDate: true};
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
    } else {
        // toReturn.publishedUnix = recentArticleTime;
        return {noPubDate: true};
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
    } else {
        return {noPubDate: true};
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
    if (!nytObject.pubDate || !nytObject.pubDate.length) return {noPubDate: true};
    if (nytObject.description) toReturn.description = nytObject.description;
    if (nytObject["media:content"] && nytObject["media:content"].length) {
        toReturn.image = nytObject["media:content"][0]["$"].url;
    } else {
        toReturn.image = "/statics/nyTimesDefault.png";
    }
    return toReturn;
};

const clean500PXUpcoming = (upcoming500px) => {
    let imageRegex = /<img.*?src=([^">]*).*?>/;
    let toReturn = {};
    toReturn.source = "source500PXUpcoming";
    toReturn.icon = "/statics/500pxicon.png";
    if (upcoming500px.title) toReturn.title = upcoming500px.title;
    if (upcoming500px.description) toReturn.image = imageRegex.exec(upcoming500px.description)[0];
    if (toReturn.image) toReturn.image = toReturn.image.split("\"")[1];
    if (!toReturn.image) return {noImage: true};
    if (upcoming500px.link) toReturn.link = upcoming500px.link;
    if (upcoming500px.pubDate) toReturn.published = upcoming500px.pubDate[0];
    if (upcoming500px.pubDate) toReturn.publishedUnix = convertToUnix(upcoming500px.pubDate[0].split(",")[1]);
    toReturn.photoSource = true;
    return toReturn;
};

const cleanTechCrunch = (techCrunchObject) => {
    let toReturn = {};
    toReturn.source = "TechCrunch";
    toReturn.icon = "/statics/techCrunch.jpg";
    if (techCrunchObject.title && techCrunchObject.title.length > 0) toReturn.title = techCrunchObject.title[0];
    if (techCrunchObject.link && techCrunchObject.link.length > 0) toReturn.link = techCrunchObject.link[0];
    if (techCrunchObject.pubDate && techCrunchObject.pubDate.length > 0) toReturn.published = techCrunchObject.pubDate[0];
    if (techCrunchObject.pubDate && techCrunchObject.pubDate.length > 0) toReturn.publishedUnixt = convertToUnix(techCrunchObject.pubDate[0]);
    if (!techCrunchObject.pubDate || !techCrunchObject.pubDate.length) return {noPubDate: true};
    // if (techCrunchObject.description && techCrunchObject.description.length > 0) toReturn.description = techCrunchObject.description[0];
    if (techCrunchObject["media:content"] && techCrunchObject["media:content"].length > 0 ) {
        for (let i = 0; i < techCrunchObject["media:content"].length; i++) {
            if (techCrunchObject["media:content"][i]["$"] && techCrunchObject["media:content"][i]["$"].medium === "image") {
                if (techCrunchObject["media:content"][i]["$"].url) {
                    toReturn.image = techCrunchObject["media:content"][i]["$"].url;
                    break;
                }
            }
        }
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
    if (!abcObject.pubDate) return {noPubDate: true};
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

const cleanXML = (source, parsedXML) => {
    let cleanUp;
    if (source === "CNN") cleanUp = cleanCNNObject;
    if (source === "TechCrunch") cleanUp = cleanTechCrunch;
    if (source === "Wired") return parsedXML;
    if (source === "IGN") cleanUp = cleanIGNObject;
    if (source === "source500PXUpcoming") cleanUp = clean500PXUpcoming;
    if (source === "BGBigPicture") cleanUp = cleanBigPictureObject;
    if (source === "Slate") cleanUp = cleanSlate;
    if (source === "NPR") cleanUp = cleanNPRObject;
    if (source === "NYTimes") cleanUp = cleanNYTimesObject;
    if (source === "NYTimesInternational") cleanUp = cleanNYTimesObject;
    if (source === "ABCNewsInternational") cleanUp = cleanABCNewsObject;
    if (source === "ABCNews") cleanUp = cleanABCNewsObject;
    if (parsedXML.rss.channel.length) {
        //not using map because need to filter out articles without a pubDate
        let toReturn = [];
        for (let i = 0; i < parsedXML.rss.channel[0].item.length; i++) {
            let clean = cleanUp(parsedXML.rss.channel[0].item[i]);
            if (!clean.noPubDate && !clean.noImage) toReturn.push(clean);
        }
        return toReturn;
        // return  parsedXML.rss.channel[0].item.map(item => {
        //     return cleanUp(item);
        // });
    }
};

const verifyXML = (source, parsedXML) => {
    if (parsedXML.rss.channel.length) return cleanXML(source, parsedXML);
};

const createFetchSourcePromise = function (source) {
    return new Promise((resolve, reject) => {
        retrievePastHours(source, (error, clean) => {
            if (error) return reject(error);
            return resolve({content: clean, source});
        });
    });
};

const formatArrayToObject = function (arrayOfContent) {
    let toReturn = {};
    arrayOfContent.forEach(contentObject => toReturn[contentObject.source] = contentObject.content);
    return toReturn;
};

export const retrievePastHours = (source, callback) => {
    requestNPM(sources[source], (error, response, body) => {
        if (error) return callback(error);
        parseXML(body, (error, parsedXML) => {
            let clean;
            try {
                verifyXML(source, parsedXML);
            } catch (error) {
                console.log("Error: ", error);
                return callback(error);
            }
            if (parsedXML) clean = verifyXML(source, parsedXML);
            callback(error, clean);
        });
    });
};

export const retrieveAllSources = (callback) => {
    let queuedPromises = [];
    sourcesArray.forEach(source => queuedPromises.push(createFetchSourcePromise(source)));
    Promise.all(queuedPromises)
        .then(results => {
            if (results.length > 0) callback(null, formatArrayToObject(results));
        })
        .catch(error => callback(error));
};