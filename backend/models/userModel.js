// backend/models/userModel.js
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: { type: String, enum: ['admin', 'student'], default: 'student' }
})

module.exports = mongoose.model('User', userSchema)
