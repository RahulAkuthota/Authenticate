const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema({
  email: String,
  password: String,
});

module.exports = mongoose.model("Developer", developerSchema);