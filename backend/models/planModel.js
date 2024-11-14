// backend/models/planModel.js
const mongoose = require('mongoose')

const planSchema = new mongoose.Schema({
  name: String,
  semester: { type: mongoose.Schema.Types.ObjectId, ref: 'Semester' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Plan', planSchema)
