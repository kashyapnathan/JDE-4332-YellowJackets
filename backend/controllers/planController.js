// backend/controllers/planController.js
const Plan = require('../models/planModel')

exports.getPlansBySemester = async (req, res) => {
  const plans = await Plan.find({ semester: req.params.semesterId })
  res.json(plans)
}

exports.getPlan = async (req, res) => {
  const plan = await Plan.findById(req.params.planId)
  res.json(plan)
}

exports.createPlan = async (req, res) => {
  const plan = new Plan({ ...req.body, semester: req.params.semesterId })
  await plan.save()
  res.json(plan)
}

exports.updatePlan = async (req, res) => {
  const plan = await Plan.findByIdAndUpdate(req.params.planId, req.body, {
    new: true
  })
  res.json(plan)
}

exports.deletePlan = async (req, res) => {
  await Plan.findByIdAndDelete(req.params.planId)
  res.json({ message: 'Plan deleted' })
}
