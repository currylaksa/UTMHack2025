// src/data/mockDashboardData.js

// Import images
import JY1 from '../images/JY1.png';
import JY2 from '../images/JY2.jpg';
import QY1 from '../images/QY1.png';
import QY2 from '../images/QY2.jpg';

// Mock team members data
export const mockTeamMembers = [
  { id: 'tm1', name: 'Sarah Chen', role: 'Software Engineer I', startDate: '2025-03-15', currentMonthInJourney: 2, progressPercent: 45, productivity: 'Needs Support', avatar: JY1, tasks: { completed: 12, total: 25 }, 
    recentInteractions: "Attended frontend code review session; Asked questions about API integration patterns; Participated in team standup and shared blocker on auth implementation", 
    onboardingProgress: 45,
    triggers: ["API documentation confusion", "Build system errors"] },
  { id: 'tm2', name: 'James Wilson', role: 'Software Engineer II', startDate: '2025-02-01', currentMonthInJourney: 3, progressPercent: 75, productivity: 'Exceeding', avatar: QY1, tasks: { completed: 30, total: 35 }, 
    recentInteractions: "Submitted first PR with excellent code quality; Led knowledge sharing session on React hooks; Helped Sarah troubleshoot API connection issue", 
    onboardingProgress: 75,
    triggers: ["Positive feedback from senior engineers"] },
  { id: 'tm3', name: 'Priya Patel', role: 'Software Engineer I', startDate: '2025-04-01', currentMonthInJourney: 1, progressPercent: 85, productivity: 'On Track', avatar: JY2, tasks: { completed: 8, total: 10 }, 
    recentInteractions: "Completed initial setup training with zero issues; Finished security protocols training ahead of schedule; Requested additional learning resources on database design", 
    onboardingProgress: 25,
    triggers: ["Fast progress through initial modules"] },
  { id: 'tm4', name: 'Michael Brown', role: 'Senior Software Engineer', startDate: '2024-12-01', currentMonthInJourney: 5, progressPercent: 60, productivity: 'On Track', avatar: QY2, tasks: { completed: 42, total: 50 }, 
    recentInteractions: "Led knowledge sharing session on system architecture; Submitted architectural proposal for new microservice; Mentoring James on advanced deployment strategies", 
    onboardingProgress: 90,
    triggers: ["Contribution to architectural decisions"] },
];

// Enhanced mock data for team analytics with trending indicators
export const mockTeamAnalytics = {
  // Historical data (last 6 months)
  historicalProgress: [
    { month: 'Nov', avgProgressPercent: 62, industryAvg: 55, trend: 'stable' },
    { month: 'Dec', avgProgressPercent: 64, industryAvg: 56, trend: 'up' },
    { month: 'Jan', avgProgressPercent: 58, industryAvg: 57, trend: 'down' },
    { month: 'Feb', avgProgressPercent: 66, industryAvg: 58, trend: 'up' },
    { month: 'Mar', avgProgressPercent: 65, industryAvg: 59, trend: 'stable' },
    { month: 'Apr', avgProgressPercent: 68, industryAvg: 60, trend: 'up' }
  ],
  // Benchmarks against industry
  benchmarks: {
    onboardingCompletionTime: { 
      team: 21, // days
      industry: 30, // days
      diffPercent: -30, // negative means better/faster than industry
      ranking: "Top 15%" // ranking information
    },
    taskCompletionRate: {
      team: 82, // percent
      industry: 75, // percent
      diffPercent: 9.3, // positive means better than industry
      ranking: "Top 20%" // ranking information
    },
    employeeSatisfaction: {
      team: 4.2, // out of 5
      industry: 3.8, // out of 5
      diffPercent: 10.5, // positive means better than industry
      ranking: "Top 25%" // ranking information
    },
    timeToProductive: {
      team: 45, // days
      industry: 60, // days
      diffPercent: -25 // negative means better/faster than industry
    }
  },
  // Progress distribution by role
  progressByRole: {
    'Software Engineer I': { avgProgress: 65, count: 2 },
    'Software Engineer II': { avgProgress: 75, count: 1 },
    'Senior Software Engineer': { avgProgress: 60, count: 1 }
  },
  // Prediction data
  predictions: {
    retentionRisk: { low: 3, medium: 1, high: 0 },
    timeToFullProductivity: { 
      'Sarah Chen': 90, // days
      'James Wilson': 60, // days
      'Priya Patel': 75, // days
      'Michael Brown': 45 // days
    }
  }
};

// Mock AI insights data
export const mockAiInsights = [
  {
    id: 'ai1',
    title: 'Support Needed',
    text: 'Sarah Chen may need additional support with technical environment setup. Consider scheduling a pairing session.',
    type: 'warning',
    priority: 'high',
    relatedMember: 'tm1',
    createdAt: '2025-04-15T10:30:00'
  },
  {
    id: 'ai2',
    title: 'Exceeding Expectations',
    text: 'James Wilson is progressing quickly through onboarding milestones and may be ready for more challenging tasks.',
    type: 'info',
    priority: 'medium',
    relatedMember: 'tm2',
    createdAt: '2025-04-14T15:45:00'
  },
  {
    id: 'ai3',
    title: 'Team Recommendation',
    text: 'Schedule a team sync next week to address common questions about the deployment process.',
    type: 'recommendation',
    priority: 'medium',
    relatedMember: null,
    createdAt: '2025-04-13T09:15:00'
  },
];