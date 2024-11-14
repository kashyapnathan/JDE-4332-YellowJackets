// backend/models/semesterModel.js
const mongoose = require('mongoose')

const semesterSchema = new mongoose.Schema({
  name: String,
  startDate: Date,
  endDate: Date
})

module.exports = mongoose.model('Semester', semesterSchema)
