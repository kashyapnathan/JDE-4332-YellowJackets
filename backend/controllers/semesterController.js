// backend/controllers/semesterController.js
const Semester = require('../models/semesterModel')

exports.getAllSemesters = async (req, res) => {
  const semesters = await Semester.find()
  res.json(semesters)
}

exports.getSemester = async (req, res) => {
  const semester = await Semester.findById(req.params.semesterId)
  res.json(semester)
}

exports.createSemester = async (req, res) => {
  const semester = new Semester(req.body)
  await semester.save()
  res.json(semester)
}

exports.deleteSemester = async (req, res) => {
  await Semester.findByIdAndDelete(req.params.semesterId)
  res.json({ message: 'Semester deleted' })
}
