"use strict";

const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/news", require("./news"));
router.use("/images", require("./images"));

module.exports = router;