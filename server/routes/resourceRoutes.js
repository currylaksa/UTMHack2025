const express = require('express');
const router = express.Router();

// Get all resources
router.get('/', (req, res) => {
  // This would normally fetch from a database
  res.json({
    success: true,
    data: [
      { id: 1, title: 'Company Handbook', type: 'document', url: '/documents/handbook.pdf', department: 'All' },
      { id: 2, title: 'Development Environment Setup Guide', type: 'document', url: '/documents/dev-setup.pdf', department: 'Engineering' },
      { id: 3, title: 'Product Overview Video', type: 'video', url: '/videos/product-overview.mp4', department: 'All' },
      { id: 4, title: 'Team Contact List', type: 'contact', url: '/contacts/team', department: 'All' }
    ]
  });
});

// Get resources by department
router.get('/department/:department', (req, res) => {
  const department = req.params.department;
  // This would normally filter from a database
  res.json({
    success: true,
    data: [
      { id: 2, title: 'Development Environment Setup Guide', type: 'document', url: '/documents/dev-setup.pdf', department },
      { id: 5, title: `${department} Team Processes`, type: 'document', url: `/documents/${department.toLowerCase()}-processes.pdf`, department }
    ]
  });
});

// Get resources by role
router.get('/role/:role', (req, res) => {
  const role = req.params.role;
  // This would normally filter from a database
  res.json({
    success: true,
    data: [
      { id: 6, title: `${role} Onboarding Guide`, type: 'document', url: `/documents/roles/${role.toLowerCase()}-guide.pdf`, role },
      { id: 7, title: `${role} Training Videos`, type: 'video', url: `/videos/roles/${role.toLowerCase()}-training`, role }
    ]
  });
});

// Create a new resource
router.post('/', (req, res) => {
  // This would normally save to a database
  res.status(201).json({
    success: true,
    data: {
      id: 8,
      ...req.body,
      createdAt: new Date().toISOString()
    }
  });
});

// Update a resource
router.put('/:id', (req, res) => {
  // This would normally update in a database
  res.json({
    success: true,
    data: {
      id: req.params.id,
      ...req.body,
      updatedAt: new Date().toISOString()
    }
  });
});

// Delete a resource
router.delete('/:id', (req, res) => {
  // This would normally delete from a database
  res.json({
    success: true,
    message: `Resource ${req.params.id} deleted`
  });
});

module.exports = router;