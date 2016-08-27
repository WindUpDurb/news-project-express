"use strict";

const express = require("express");
const router = express.Router();

const RSSFeeds = require("../models/RSSFeeds");

router.get("/newsPastHours/", (request, response) => {
   RSSFeeds.retrievePastHours((error, data) => {
       if (error || data.status === "ERROR") return response.status(400).send(error || data.statusInfo);
       response.send(data);
   });
});

module.exports = router;