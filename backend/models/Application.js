const mongoose = require("mongoose");

const appSchema = new mongoose.Schema({
  name: String,
  clientId: String,
  clientSecret: String,
});

module.exports = mongoose.model("Application", appSchema);