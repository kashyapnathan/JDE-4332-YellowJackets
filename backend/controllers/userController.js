// backend/controllers/userController.js
const User = require('../models/userModel')

exports.getAllUsers = async (req, res) => {
  const users = await User.find()
  res.json(users)
}

exports.getUser = async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.json(user)
}

exports.createUser = async (req, res) => {
  const user = new User(req.body)
  await user.save()
  res.json(user)
}

exports.updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
    new: true
  })
  res.json(user)
}

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.userId)
  res.json({ message: 'User deleted' })
}
