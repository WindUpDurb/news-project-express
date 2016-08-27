"use strict";

const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/news", require("./news"));

module.exports = router;