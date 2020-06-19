const mongoose = require("mongoose");
const connection = require("../helpers/connection")

const User = new mongoose.Schema({
  first_name: String,
  last_name: String,
  email: String,
  hash: String,
  salt: String,
  verified: Boolean,
  verifyuuid:String,
  token:String,
});

module.exports = connection.model("User", User)