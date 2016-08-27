"use strict";

const express = require("express");
const router = express.Router();

const RSSFeeds = require("../models/RSSFeeds");

router.get("/newsPastHours/:hours", (request, response) => {
   RSSFeeds.retrievePastHours(request.params.hours, (error, data) => {
       if (error || data.status === "ERROR") return response.status(400).send(error || data.statusInfo);
       console.log("Data sending: ", data)
       response.send(data);
   });
});

module.exports = router;