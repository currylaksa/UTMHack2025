const mongoose = require('mongoose');

const OnboardingTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  deadline: {
    type: Date
  },
  category: {
    type: String,
    enum: ['Pre-boarding', 'First day', 'First week', 'First month'],
    required: [true, 'Please specify a category']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please specify a user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('OnboardingTask', OnboardingTaskSchema);