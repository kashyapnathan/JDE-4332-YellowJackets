const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // Declare cors only once
const dotenv = require("dotenv");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const corsOptions = {
  origin: "http://localhost:3000", // Replace with your frontend's URL if hosted elsewhere
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOptions)); // Apply CORS options
app.options("*", cors(corsOptions)); // Handle preflight requests

// Connect to MongoDB
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Import routes
const courseRoutes = require("./routes/courseRoutes");

// Use routes
app.use("/api/courses", courseRoutes);

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
