"use strict";


const express = require("express");
const router = express.Router();

const FlickrAPI = require("../models/FlickrAPI");

router.get("/", (request, response) => {
   FlickrAPI.USNationalArchivesFlickr((error, data) => {
      response.send();
   });
});

module.exports = router;