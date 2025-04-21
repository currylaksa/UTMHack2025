const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
  // This would normally fetch from a database
  res.json({
    success: true,
    data: [
      { id: 1, name: 'John Doe', role: 'Developer', status: 'Active', onboardingProgress: 75 },
      { id: 2, name: 'Jane Smith', role: 'Designer', status: 'Active', onboardingProgress: 50 },
      { id: 3, name: 'Mike Johnson', role: 'Product Manager', status: 'Pending', onboardingProgress: 25 }
    ]
  });
});

// Get user by ID
router.get('/:id', (req, res) => {
  // This would normally fetch from a database
  res.json({
    success: true,
    data: {
      id: req.params.id,
      name: 'John Doe',
      email: 'john.doe@devboost.ai',
      role: 'Developer',
      department: 'Engineering',
      manager: 'Sarah Wilson',
      startDate: '2025-03-15',
      onboardingProgress: 75
    }
  });
});

// Create new user
router.post('/', (req, res) => {
  // This would normally save to a database
  res.status(201).json({
    success: true,
    data: {
      id: 4,
      ...req.body
    }
  });
});

// Update user
router.put('/:id', (req, res) => {
  // This would normally update in a database
  res.json({
    success: true,
    data: {
      id: req.params.id,
      ...req.body
    }
  });
});

// Delete user
router.delete('/:id', (req, res) => {
  // This would normally delete from a database
  res.json({
    success: true,
    message: `User ${req.params.id} deleted`
  });
});

module.exports = router;