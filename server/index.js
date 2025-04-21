// Express server for DevBoostAI
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'DevBoostAI API is running!' });
});

// API Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/onboarding', require('./routes/onboardingRoutes'));
app.use('/api/resources', require('./routes/resourceRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    error: err.message || 'Server Error'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});