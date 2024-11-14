// backend/models/studentModel.js
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
  name: String,
  gtid: String,
  email: String,
  preferredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
})

module.exports = mongoose.model('Student', studentSchema)
