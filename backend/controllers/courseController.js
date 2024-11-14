// backend/controllers/courseController.js
const Course = require('../models/courseModel')

exports.getCoursesByPlan = async (req, res) => {
  const courses = await Course.find({ plan: req.params.planId })
  res.json(courses)
}

exports.getCourse = async (req, res) => {
  const course = await Course.findById(req.params.courseId)
  res.json(course)
}

exports.addCourse = async (req, res) => {
  const course = new Course({ ...req.body, plan: req.params.planId })
  await course.save()
  res.json(course)
}

exports.updateCourse = async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true
  })
  res.json(course)
}

exports.deleteCourse = async (req, res) => {
  await Course.findByIdAndDelete(req.params.courseId)
  res.json({ message: 'Course deleted' })
}
