"use strict";

const requestNPM = require("request");
const parseXML = require("xml2js").parseString;


const cleanCNNObject = (cnnObject) => {
    let descriptionRegex = new RegExp("^(.*?)[.?!]\s");
    console.log("To clean right here \n: ", cnnObject);
    console.log("media group: ", cnnObject["media:group"][0]["media:content"][0])
    let toReturn = {};
    if (cnnObject.title.length) toReturn.title = cnnObject.title[0];
    if (cnnObject.description.length) toReturn.description = descriptionRegex.exec(cnnObject.description[0]);
    if (cnnObject.link.length) toReturn.link = cnnObject.link[0];
    if (cnnObject.pubDate.length) toReturn.published = cnnObject.pubDate[0];
    if (cnnObject["media:group"].length && cnnObject["media:group"][0]["media:content"].length) {
        toReturn.image = cnnObject["media:group"][0]["media:content"][0]["$"].url;
    }
    console.log("To return: ", toReturn);
};

const cleanCNN = (XML) => {
    //will return an array of objects
    cleanCNNObject(XML.rss.channel[0].item[0]);
    //if (XML.rss.channel.length) return XML.rss.channel[0].item;
    return XML.rss.channel[0].item[0];
};

const cleanXML = (source, XML) => {
        if (source === "CNN") return cleanCNN(XML);
};

export const retrievePastHours = (hours, callback) => {
    requestNPM("http://rss.cnn.com/rss/cnn_topstories.rss", (error, response, body) => {
        if (error) return callback(error);
        parseXML(body, (error, parsedXML) => {
            let clean = cleanXML("CNN", parsedXML);
            console.log("Clean \n \n", clean)
            callback(error, clean);
        });
    });
};