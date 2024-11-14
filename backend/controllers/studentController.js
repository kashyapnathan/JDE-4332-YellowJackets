// backend/controllers/studentController.js
const Student = require('../models/studentModel')

exports.getAllStudents = async (req, res) => {
  const students = await Student.find()
  res.json(students)
}

exports.getStudent = async (req, res) => {
  const student = await Student.findById(req.params.studentId)
  res.json(student)
}

exports.addStudent = async (req, res) => {
  const student = new Student(req.body)
  await student.save()
  res.json(student)
}

exports.updateStudent = async (req, res) => {
  const student = await Student.findByIdAndUpdate(
    req.params.studentId,
    req.body,
    { new: true }
  )
  res.json(student)
}

exports.deleteStudent = async (req, res) => {
  await Student.findByIdAndDelete(req.params.studentId)
  res.json({ message: 'Student deleted' })
}
