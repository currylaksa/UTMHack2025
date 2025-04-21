const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a resource title'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['document', 'video', 'website', 'contact', 'other'],
    required: [true, 'Please specify a resource type']
  },
  url: {
    type: String,
    required: [true, 'Please provide a URL or path']
  },
  department: {
    type: String,
    trim: true
  },
  role: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resource', ResourceSchema);