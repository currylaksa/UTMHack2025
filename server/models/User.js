const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email'
    ]
  },
  role: {
    type: String,
    required: [true, 'Please provide a role'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Please provide a department'],
    trim: true
  },
  manager: {
    type: String,
    trim: true
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date']
  },
  status: {
    type: String,
    enum: ['Active', 'Pending', 'Inactive'],
    default: 'Pending'
  },
  onboardingProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);