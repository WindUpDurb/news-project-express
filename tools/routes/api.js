"use strict";

const express = require("express");
const router = express.Router();

router.use("/news", require("./news"));
router.use("/images", require("./images"));
router.use("/titleData", require("./titleData"));

module.exports = router;