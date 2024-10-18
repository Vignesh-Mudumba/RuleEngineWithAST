// Import required dependencies
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');  // Import the MongoDB connection from config/db.js

// Initialize dotenv to use environment variables
dotenv.config();

// Create an Express app
const app = express();

// Middleware
app.use(cors());  // Enable CORS for cross-origin requests
app.use(bodyParser.json());  // Parse JSON request bodies

// Connect to MongoDB
connectDB();

// Define a test route
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

//Rule Engine API Routes (Add your routes here in the future)
const ruleRoutes = require('./routes/ruleRoutes');
app.use('/api/rules', ruleRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
