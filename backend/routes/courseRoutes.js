// backend/routes/courseRoutes.js
const express = require('express')
const router = express.Router()
const courseController = require('../controllers/courseController')

router.get('/plans/:planId/courses', courseController.getCoursesByPlan)
router.get('/:courseId', courseController.getCourse)
router.post('/plans/:planId/courses', courseController.addCourse)
router.put('/:courseId', courseController.updateCourse)
router.delete('/:courseId', courseController.deleteCourse)

module.exports = router
