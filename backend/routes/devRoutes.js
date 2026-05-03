const express = require("express");
const router = express.Router();

const {
  devSignup,
  devLogin,
} = require("../controllers/devController");

router.post("/signup", devSignup);
router.post("/login", devLogin);

module.exports = router;