"use strict";

const requestNPM = require("request");
const Flickr = require("flickrapi");
const flickrOptions = {
    api_key: process.env.FLICKR_API_KEY,
    secret: process.env.FLICKR_SECRET
};


export const USNationalArchivesFlickr = (callback) => {
    Flickr.tokenOnly(flickrOptions, (error, flickr) => {
        let args = {
            api_key: process.env.FLICKR_API_KEY,
            url: "https://www.flickr.com/explore"
        };
        flickr.urls.lookupGallery(args, (error, response) => {
            console.log("Error: ", error);
            console.log("Response: ", response);
            callback();
        });
    });
};
