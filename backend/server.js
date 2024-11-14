// backend/server.js
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err))

// Import routes
const userRoutes = require('./routes/userRoutes')
const semesterRoutes = require('./routes/semesterRoutes')
const planRoutes = require('./routes/planRoutes')
const courseRoutes = require('./routes/courseRoutes')
const studentRoutes = require('./routes/studentRoutes')

// Use routes
app.use('/api/users', userRoutes)
app.use('/api/semesters', semesterRoutes)
app.use('/api/plans', planRoutes)
app.use('/api/courses', courseRoutes)
app.use('/api/students', studentRoutes)

// Start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
