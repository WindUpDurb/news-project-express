"use strict";

const express = require("express");
const router = express.Router();

const RSSFeeds = require("../models/RSSFeeds");

router.get("/newsPastHours/:source", (request, response) => {
   RSSFeeds.retrievePastHours(request.params.source, (error, data) => {
       console.log("Data: ", data);
       if (error || data.status === "ERROR") return response.status(400).send(error || data.statusInfo);
       response.send(data);
   });
});

router.get("/retrieveAllSources", (request, response) => {
    RSSFeeds.retrieveAllSources((error, data) => {
        console.log("Error: ", error);
        console.log("Data: ", data);
        if (error || data.status === "ERROR") return response.status(400).send(error || data.statusInfo);
        response.send(data);
    });
});



module.exports = router;