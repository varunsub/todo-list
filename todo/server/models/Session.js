const mongoose = require("mongoose");
const connection = require("../helpers/connection")

const Session = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  hash: String,
  salt: String,
  verified: Boolean
});

module.exports = connection.model("Session", Session)