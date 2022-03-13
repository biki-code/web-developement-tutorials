const mongoose = require("mongoose");

const ReminderSchema = new mongoose.Schema({
  name: String,
  timestamp: Date,
  id: Number,
});

module.exports = mongoose.model("Reminder", ReminderSchema);
