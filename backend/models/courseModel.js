const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Course Name
  instructor: { type: String, required: true }, // Instructor Name
  section: { type: String, required: true }, // Section Identifier
  days: { type: [String], required: true }, // Array of days (e.g., ["Mon", "Wed"])
  startTime: { type: String, required: true }, // Start time as a string (e.g., "10:00")
  endTime: { type: String, required: true }, // End time as a string (e.g., "11:30")
});

module.exports = mongoose.model('Course', courseSchema);
