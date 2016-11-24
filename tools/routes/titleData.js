"use strict";

const express = require("express");
const router = express.Router();

const RSSFeeds = require("../models/RSSFeeds");

router.get("/testAnalysis", (request, response) => {
    RSSFeeds.retrieveAllSources(true, (error, data) => {
        if (error || data.status === "ERROR") return response.status(400).send(error || data.statusInfo);
        console.log("length: ", data.length);
        response.send(data);
    });
});

module.exports = router;