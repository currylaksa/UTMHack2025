// Team member data for new hire onboarding
export const teamMembers = [
  { 
    id: 1, 
    name: 'Alice Manager', 
    role: 'Engineering Manager', 
    bio: 'Leads the team and oversees all technical projects.',
    contactInfo: 'alice@devboost.com',
    meetingAvailability: 'Mondays & Thursdays'
  },
  { 
    id: 2, 
    name: 'Bob Buddy', 
    role: 'Senior Engineer (Your Buddy)', 
    bio: 'Your primary go-to person for questions and guidance.',
    contactInfo: 'bob@devboost.com',
    meetingAvailability: 'Daily 2-4pm'
  },
  { 
    id: 3, 
    name: 'Charlie Teammate', 
    role: 'Software Engineer', 
    bio: 'Works on frontend development and UI components.',
    contactInfo: 'charlie@devboost.com',
    meetingAvailability: 'Tuesdays & Fridays'
  },
];

// Team connection suggestions based on learning focus
export const teamConnections = [
  {
    skill: 'Development Environment',
    recommendedContact: 'Bob Buddy',
    reason: 'Expert in development environment setup and tooling',
    urgency: 'high'
  },
  {
    skill: 'Company Codebase',
    recommendedContact: 'Charlie Teammate',
    reason: 'Knowledge of frontend architecture and components',
    urgency: 'medium'
  },
  {
    skill: 'Testing Framework',
    recommendedContact: 'Alice Manager',
    reason: 'Defined testing strategy and best practices',
    urgency: 'low'
  }
];