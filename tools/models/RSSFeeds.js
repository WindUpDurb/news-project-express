"use strict";

const requestNPM = require("request");
const parseXML = require("xml2js").parseString;


const cleanCNNObject = (cnnObject) => {
    let descriptionRegex = /^(.*?)[.?!]/;
    let description;
    if (descriptionRegex.exec(cnnObject.description[0]).length) {
        let clean = descriptionRegex.exec(cnnObject.description[0])[0];
        description = clean.replace(/[\\]/g, "");
    }
    let toReturn = {};
    toReturn.source = "CNN";
    if (cnnObject.title.length) toReturn.title = cnnObject.title[0];
    if (cnnObject.description.length) toReturn.description = description;
    if (cnnObject.link.length) toReturn.link = cnnObject.link[0];
    if (cnnObject.pubDate.length) toReturn.published = cnnObject.pubDate[0];
    if (cnnObject["media:group"].length && cnnObject["media:group"][0]["media:content"].length) {
        toReturn.image = cnnObject["media:group"][0]["media:content"][1]["$"].url;
    }
    return toReturn;
};

const cleanCNN = (XML) => {
    //will return an array of objects

    if (XML.rss.channel.length) return XML.rss.channel[0].item.map(item => {
        return cleanCNNObject(item);
    });
    //return cleanCNNObject(XML.rss.channel[0].item[0]);
};

const cleanXML = (source, XML) => {
        if (source === "CNN") return cleanCNN(XML);
};

export const retrievePastHours = (callback) => {
    requestNPM("http://rss.cnn.com/rss/cnn_topstories.rss", (error, response, body) => {
        if (error) return callback(error);
        parseXML(body, (error, parsedXML) => {
            let clean = cleanXML("CNN", parsedXML);
            callback(error, clean);
        });
    });
};