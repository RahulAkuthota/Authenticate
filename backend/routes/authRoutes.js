const express = require("express");
const router = express.Router();
const validateClient = require("../middleware/validateClient");
const {
    signup,
    login,
    getMe,
    refreshToken, // ✅ ADD THIS
  } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// routes
router.post("/signup", validateClient, signup);
router.post("/login", validateClient, login);
router.post("/refresh", refreshToken);
router.get("/me", authMiddleware, getMe);

module.exports = router;