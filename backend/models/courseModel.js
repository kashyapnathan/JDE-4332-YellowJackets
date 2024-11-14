// backend/models/courseModel.js
const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
  code: String,
  name: String,
  instructor: {
    name: String,
    email: String
  },
  timeSlot: {
    day: String,
    startTime: String,
    endTime: String
  },
  location: String,
  capacity: Number,
  plan: { type: mongoose.Schema.Types.ObjectId, ref: 'Plan' }
})

module.exports = mongoose.model('Course', courseSchema)
