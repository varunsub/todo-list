const mongoose = require("mongoose");
const connection = require("../helpers/connection")

const Event = new mongoose.Schema({
  userId:String,
  taskName:String,
  deadlineDate: String,
  deadlineHour: Number,
  deadlineMinute: Number,
  notification1: Map,
  notification2: Map,
  completed: Boolean,
  deadlineTime: String,
});

module.exports = connection.model("Event", Event)