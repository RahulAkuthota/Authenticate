const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get(
  "/admin-data",
  authMiddleware,
  roleMiddleware("admin"),
  (req, res) => {
    res.json({ msg: "Welcome Admin 🚀" });
  }
);

module.exports = router;