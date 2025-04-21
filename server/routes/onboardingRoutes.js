const express = require('express');
const router = express.Router();

// Get onboarding timeline for a user
router.get('/timeline/:userId', (req, res) => {
  // This would normally fetch from a database
  res.json({
    success: true,
    data: {
      userId: req.params.userId,
      timeline: [
        {
          id: 1,
          title: 'Pre-boarding',
          startDate: '2025-03-01',
          endDate: '2025-03-14',
          status: 'completed',
          tasks: [
            { id: 101, title: 'Complete paperwork', completed: true },
            { id: 102, title: 'Setup company email', completed: true },
            { id: 103, title: 'Schedule orientation', completed: true }
          ]
        },
        {
          id: 2,
          title: 'First day',
          startDate: '2025-03-15',
          endDate: '2025-03-15',
          status: 'completed',
          tasks: [
            { id: 201, title: 'Meet the team', completed: true },
            { id: 202, title: 'Setup workstation', completed: true },
            { id: 203, title: 'Complete IT security training', completed: true }
          ]
        },
        {
          id: 3,
          title: 'First week',
          startDate: '2025-03-16',
          endDate: '2025-03-21',
          status: 'in-progress',
          tasks: [
            { id: 301, title: 'Department overview', completed: true },
            { id: 302, title: 'Project introduction', completed: true },
            { id: 303, title: 'Training sessions', completed: false }
          ]
        },
        {
          id: 4,
          title: 'First month',
          startDate: '2025-03-22',
          endDate: '2025-04-14',
          status: 'pending',
          tasks: [
            { id: 401, title: 'Complete initial project', completed: false },
            { id: 402, title: 'Performance check-in', completed: false },
            { id: 403, title: 'Set long-term goals', completed: false }
          ]
        }
      ]
    }
  });
});

// Get first month experience data for a user
router.get('/first-month/:userId', (req, res) => {
  res.json({
    success: true,
    data: {
      userId: req.params.userId,
      monthlyGoals: [
        { id: 1, title: 'Complete basic training', status: 'completed', description: 'Finish all required courses on DevBoost platform' },
        { id: 2, title: 'Set up development environment', status: 'completed', description: 'Install and configure all necessary tools' },
        { id: 3, title: 'Contribute to first project', status: 'in-progress', description: 'Make first code contribution to team project' },
        { id: 4, title: 'Complete feedback session', status: 'pending', description: 'Meet with manager to discuss progress and areas for improvement' }
      ],
      resources: [
        { id: 1, title: 'Company Handbook', type: 'document', url: '/documents/handbook.pdf' },
        { id: 2, title: 'Training Videos', type: 'video', url: '/videos/training' },
        { id: 3, title: 'Team Contact List', type: 'contact', url: '/contacts/team' },
        { id: 4, title: 'Development Wiki', type: 'website', url: 'https://wiki.devboost.ai' }
      ],
      upcomingMeetings: [
        { id: 1, title: 'Weekly Team Standup', date: '2025-04-01T09:00:00', recurring: true },
        { id: 2, title: 'Project Planning', date: '2025-04-03T13:00:00', recurring: false },
        { id: 3, title: '1:1 with Manager', date: '2025-04-07T14:00:00', recurring: false },
        { id: 4, title: 'Monthly Department Meeting', date: '2025-04-15T10:00:00', recurring: true }
      ]
    }
  });
});

// Update onboarding task status
router.patch('/tasks/:taskId', (req, res) => {
  // This would normally update in a database
  res.json({
    success: true,
    data: {
      id: req.params.taskId,
      title: 'Training sessions',
      completed: req.body.completed || false,
      updatedAt: new Date().toISOString()
    }
  });
});

// Get manager's dashboard data
router.get('/manager/:managerId', (req, res) => {
  res.json({
    success: true,
    data: {
      managerId: req.params.managerId,
      teamOnboarding: [
        { 
          userId: 1, 
          name: 'John Doe', 
          startDate: '2025-03-15', 
          progress: 75,
          status: 'on-track',
          nextTask: 'Complete training sessions'
        },
        { 
          userId: 2, 
          name: 'Jane Smith', 
          startDate: '2025-03-01', 
          progress: 50,
          status: 'behind',
          nextTask: 'Project introduction'
        },
        { 
          userId: 3, 
          name: 'Mike Johnson', 
          startDate: '2025-04-01', 
          progress: 25,
          status: 'on-track',
          nextTask: 'Meet the team'
        }
      ],
      upcomingMilestones: [
        { userId: 1, name: 'John Doe', milestone: '30-day review', dueDate: '2025-04-14' },
        { userId: 2, name: 'Jane Smith', milestone: '60-day review', dueDate: '2025-04-30' }
      ]
    }
  });
});

module.exports = router;