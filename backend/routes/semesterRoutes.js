// backend/routes/semesterRoutes.js
const express = require('express')
const router = express.Router()
const semesterController = require('../controllers/semesterController')

router.get('/', semesterController.getAllSemesters)
router.get('/:semesterId', semesterController.getSemester)
router.post('/', semesterController.createSemester)
router.delete('/:semesterId', semesterController.deleteSemester)

module.exports = router
