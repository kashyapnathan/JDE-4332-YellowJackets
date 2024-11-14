// backend/routes/planRoutes.js
const express = require('express')
const router = express.Router()
const planController = require('../controllers/planController')

router.get('/semesters/:semesterId/plans', planController.getPlansBySemester)
router.get('/:planId', planController.getPlan)
router.post('/semesters/:semesterId/plans', planController.createPlan)
router.put('/:planId', planController.updatePlan)
router.delete('/:planId', planController.deletePlan)

module.exports = router
