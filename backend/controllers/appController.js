const Application = require("../models/Application");
const crypto = require("crypto");

exports.createApp = async (req, res) => {
  try {
    const { name } = req.body;

    const clientId = crypto.randomBytes(16).toString("hex");
    const clientSecret = crypto.randomBytes(32).toString("hex");

    const app = await Application.create({
      name,
      clientId,
      clientSecret,
    });

    res.json(app);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};