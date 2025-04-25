// Setup tasks for new hire onboarding
export const setupTasks = [
  { id: 's1', title: 'Access HR Portal', completed: true, link: '#', estimatedTime: '10 mins' },
  { id: 's2', title: 'Install IDE (VS Code)', completed: true, link: '#', estimatedTime: '30 mins' },
  { id: 's3', title: 'Configure Git & SSH Keys', completed: false, link: '#', estimatedTime: '45 mins' },
  { id: 's4', title: 'Set up Local Database', completed: false, link: '#', estimatedTime: '60 mins' },
  { id: 's5', title: 'Run Project Locally', completed: false, link: '#', estimatedTime: '25 mins' },
];

// Resources for new hire learning
export const resources = [
  { 
    id: 'fmr1', 
    title: 'Project Architecture Overview', 
    type: 'document', 
    description: 'Complete overview of system architecture and components',
    lastUpdated: '2 weeks ago',
    relevanceScore: 95,
    category: 'technical',
    viewCount: 342,
    estimatedReadTime: '25 mins',
    aiRecommended: true
  },
  { 
    id: 'fmr2', 
    title: 'Coding Standards', 
    type: 'document',
    description: 'Our team\'s coding guidelines and best practices',
    lastUpdated: '1 month ago',
    relevanceScore: 82,
    category: 'technical',
    viewCount: 156,
    estimatedReadTime: '15 mins',
    aiRecommended: true
  },
  { 
    id: 'fmr3', 
    title: 'Intro to Team Workflow', 
    type: 'video',
    description: 'Video walkthrough of our development process',
    duration: '12:34',
    lastUpdated: '3 weeks ago',
    relevanceScore: 88,
    category: 'process',
    viewCount: 203,
    aiRecommended: true
  },
  {
    id: 'fmr4',
    title: 'API Documentation',
    type: 'document',
    description: 'Complete reference for all backend APIs',
    lastUpdated: '1 week ago',
    relevanceScore: 90,
    category: 'technical',
    viewCount: 178,
    estimatedReadTime: '40 mins',
    aiRecommended: true
  },
  {
    id: 'fmr5',
    title: 'Frontend Component Library',
    type: 'document',
    description: 'Documentation for our React component system',
    lastUpdated: '3 days ago',
    relevanceScore: 85,
    category: 'technical',
    viewCount: 123,
    estimatedReadTime: '30 mins',
    aiRecommended: false
  },
  {
    id: 'fmr6',
    title: 'Git Workflow Tutorial',
    type: 'video',
    description: 'Step-by-step guide to our Git branching strategy',
    duration: '8:15',
    lastUpdated: '1 month ago',
    relevanceScore: 75,
    category: 'process',
    viewCount: 98,
    aiRecommended: false
  },
  {
    id: 'fmr7',
    title: 'Company Onboarding Handbook',
    type: 'document',
    description: 'Official guide to your first weeks at the company',
    lastUpdated: '2 months ago',
    relevanceScore: 65,
    category: 'company',
    viewCount: 427,
    estimatedReadTime: '45 mins',
    aiRecommended: false
  }
];

// Quick Tips for the First Month
export const firstMonthTips = [
  "Don't hesitate to ask questions - everyone expects you to be learning",
  "Schedule brief 1:1 meetings with each team member to get to know them",
  "Keep notes as you learn new systems and processes",
  "Focus on understanding the codebase structure before making changes"
];