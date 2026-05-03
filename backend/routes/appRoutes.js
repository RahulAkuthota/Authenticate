const express = require("express");
const router = express.Router();
const { createApp } = require("../controllers/appController");
const devAuth = require("../middleware/devAuth");


router.post("/create", devAuth, createApp);
module.exports = router;