const Application = require("../models/Application");

module.exports = async (req, res, next) => {
  try {
    const { clientId } = req.body;

    if (!clientId) {
      return res.status(400).json({ msg: "clientId required" });
    }

    const app = await Application.findOne({ clientId });

    if (!app) {
      return res.status(403).json({ msg: "Invalid clientId" });
    }

    req.app = app; // attach app info
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};