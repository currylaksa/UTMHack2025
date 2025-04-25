import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeftIcon, 
  UserGroupIcon, 
  WrenchScrewdriverIcon, 
  DocumentCheckIcon, 
  ChatBubbleLeftEllipsisIcon,
  DocumentTextIcon,
  VideoCameraIcon,
  CheckCircleIcon,
  PaperAirplaneIcon,
  CalendarIcon,
  LightBulbIcon,
  BookOpenIcon,
  // New icons for enhanced features
  CodeBracketIcon,
  AcademicCapIcon,
  ClockIcon,
  BoltIcon,
  SparklesIcon,
  ChevronDoubleRightIcon,
  CursorArrowRaysIcon,
  CpuChipIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';
import { CheckCircleIcon as CheckCircleSolidIcon } from '@heroicons/react/24/solid';

// Mock Data
const teamMembers = [
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

const setupTasks = [
  { id: 's1', title: 'Access HR Portal', completed: true, link: '#', estimatedTime: '10 mins' },
  { id: 's2', title: 'Install IDE (VS Code)', completed: true, link: '#', estimatedTime: '30 mins' },
  { id: 's3', title: 'Configure Git & SSH Keys', completed: false, link: '#', estimatedTime: '45 mins' },
  { id: 's4', title: 'Set up Local Database', completed: false, link: '#', estimatedTime: '60 mins' },
  { id: 's5', title: 'Run Project Locally', completed: false, link: '#', estimatedTime: '25 mins' },
];

const resources = [
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

const upcomingEvents = [
  {
    id: 'e1',
    title: 'Team Standup',
    date: 'Tomorrow',
    time: '10:00 AM',
    type: 'regular'
  },
  {
    id: 'e2',
    title: 'First Month Check-in',
    date: 'April 25, 2025',
    time: '2:00 PM',
    type: 'important'
  },
  {
    id: 'e3',
    title: 'Company All-Hands',
    date: 'April 18, 2025',
    time: '3:30 PM',
    type: 'regular'
  }
];

// NEW: Add predefined chat scenarios with intelligent responses
const preDefined = {
  docker: {
    response: "I see you need help with Docker setup! I found these resources for you:\n\n1. The Docker Desktop installation guide in the Resources panel (95% match to your needs)\n2. A 8-minute video walkthrough by Bob who set up the same environment\n3. Common Docker troubleshooting steps\n\nWould you like me to walk you through the installation steps? Or connect you with Bob who's an expert on our Docker setup?",
    suggestedResources: ['fmr1', 'fmr6'],
    suggestedConnection: 'Bob Buddy'
  },
  codebase: {
    response: "Great question about our codebase structure! The frontend uses React with a component-based architecture. Here's what will help you get oriented:\n\n1. I've highlighted the 'Project Architecture Overview' in your Resources panel\n2. Check the 'Frontend Component Library' doc for our UI components\n3. The main application flow starts in App.jsx\n\nCharlie from your team is the frontend expert - would you like me to schedule a 15-min walkthrough with them?",
    suggestedResources: ['fmr1', 'fmr5'],
    suggestedConnection: 'Charlie Teammate'
  },
  apiDocs: {
    response: "You're looking for our API documentation - perfect timing! I've prioritized these resources for you:\n\n1. Complete API Documentation (just updated last week)\n2. A guide to authentication and endpoints\n\nAlso, I noticed you're working on frontend integration. There's a template for API calls in src/services/api.js that shows the correct pattern to use.",
    suggestedResources: ['fmr4', 'fmr1'],
    suggestedConnection: null
  },
  workflow: {
    response: "Understanding our team's workflow is crucial! I've highlighted these resources for you:\n\n1. 'Intro to Team Workflow' video that explains our process\n2. Git workflow tutorial showing our branching strategy\n\nAlso, Alice scheduled the team's workflow overview meeting for April 25th - I've marked it as important in your calendar.",
    suggestedResources: ['fmr3', 'fmr6'],
    suggestedConnection: 'Alice Manager'
  }
};

const chatMessages = [
  {
    id: 'm1',
    sender: 'ai',
    message: "Welcome to the team! I'm DevBoost AI, your onboarding assistant. How can I help you get started?",
    timestamp: '9:32 AM'
  }
];

// Quick Tips for the First Month
const firstMonthTips = [
  "Don't hesitate to ask questions - everyone expects you to be learning",
  "Schedule brief 1:1 meetings with each team member to get to know them",
  "Keep notes as you learn new systems and processes",
  "Focus on understanding the codebase structure before making changes"
];

// NEW: Personalized learning path data
const learningPath = {
  core: [
    { 
      id: 'skill1', 
      name: 'Development Environment', 
      progress: 60, 
      dependencies: [], 
      estimatedTimeTraditional: '12 hours',
      estimatedTimeWithAI: '4 hours',
      icon: 'desktop-computer', 
      status: 'in-progress',
      type: 'technical'
    },
    { 
      id: 'skill2', 
      name: 'Company Codebase', 
      progress: 20, 
      dependencies: ['skill1'], 
      estimatedTimeTraditional: '30 hours',
      estimatedTimeWithAI: '12 hours',
      icon: 'code', 
      status: 'in-progress',
      type: 'technical'
    },
    { 
      id: 'skill3', 
      name: 'Team Workflow', 
      progress: 35, 
      dependencies: [], 
      estimatedTimeTraditional: '10 hours',
      estimatedTimeWithAI: '5 hours',
      icon: 'user-group', 
      status: 'in-progress',
      type: 'process'
    },
    { 
      id: 'skill4', 
      name: 'CI/CD Pipeline', 
      progress: 0, 
      dependencies: ['skill2'], 
      estimatedTimeTraditional: '15 hours',
      estimatedTimeWithAI: '6 hours',
      icon: 'refresh', 
      status: 'locked',
      type: 'technical'
    },
    { 
      id: 'skill5', 
      name: 'Testing Framework', 
      progress: 0, 
      dependencies: ['skill2'], 
      estimatedTimeTraditional: '18 hours',
      estimatedTimeWithAI: '8 hours',
      icon: 'clipboard-check', 
      status: 'locked',
      type: 'technical'
    }
  ],
  optional: [
    { 
      id: 'skill6', 
      name: 'Advanced Git Workflows', 
      progress: 0, 
      dependencies: ['skill2', 'skill3'], 
      estimatedTimeTraditional: '8 hours',
      estimatedTimeWithAI: '3 hours',
      icon: 'code-branch', 
      status: 'optional',
      type: 'technical'
    },
    { 
      id: 'skill7', 
      name: 'Product Domain Knowledge', 
      progress: 15, 
      dependencies: [], 
      estimatedTimeTraditional: '25 hours',
      estimatedTimeWithAI: '15 hours',
      icon: 'puzzle-piece', 
      status: 'in-progress',
      type: 'business'
    }
  ]
};

// NEW: Environment dependency data
const environmentSetup = {
  detected: {
    os: 'Windows 11',
    nodeVersion: 'v18.17.1',
    gitVersion: '2.42.0',
    editor: 'VS Code',
    browser: 'Chrome',
    terminal: 'Windows Terminal',
  },
  requiredTools: [
    { 
      name: 'Node.js', 
      version: '>=16.0.0', 
      status: 'installed', 
      installed: 'v18.17.1'
    },
    { 
      name: 'npm', 
      version: '>=8.0.0', 
      status: 'installed', 
      installed: 'v9.6.7'
    },
    { 
      name: 'Git', 
      version: '>=2.30.0', 
      status: 'installed', 
      installed: '2.42.0'
    },
    { 
      name: 'Docker', 
      version: '>=20.10.0', 
      status: 'missing', 
      installed: null
    },
    { 
      name: 'MongoDB', 
      version: '>=5.0.0', 
      status: 'outdated', 
      installed: '4.4.6'
    }
  ],
  recommendations: [
    {
      tool: 'Docker Desktop',
      reason: 'Required for local development environment',
      installCommand: 'choco install docker-desktop',
      priority: 'high'
    },
    {
      tool: 'MongoDB',
      reason: 'Update to v5.0+ for compatibility with latest features',
      installCommand: 'choco install mongodb --version=5.0.19',
      priority: 'medium'
    }
  ],
  timeSavings: {
    traditional: '8 hours',
    withDevBoostAI: '2.5 hours',
    savingsPercentage: 69
  }
};

// NEW: Codebase context data
const codebaseContext = {
  repositories: [
    {
      name: 'frontend-app',
      description: 'Main React frontend application',
      structure: [
        { path: 'src/components', description: 'Reusable UI components' },
        { path: 'src/pages', description: 'Application views/pages' },
        { path: 'src/services', description: 'API and service integrations' },
        { path: 'src/utils', description: 'Helper functions and utilities' }
      ]
    },
    {
      name: 'backend-api',
      description: 'Express API server',
      structure: [
        { path: 'controllers', description: 'Request handlers' },
        { path: 'models', description: 'Data models and schemas' },
        { path: 'routes', description: 'API endpoint definitions' },
        { path: 'services', description: 'Business logic' }
      ]
    }
  ],
  keyFiles: [
    {
      path: 'frontend-app/src/services/api.js',
      description: 'Core API client for backend integration',
      complexity: 'medium'
    },
    {
      path: 'backend-api/models/User.js',
      description: 'User data model and authentication',
      complexity: 'high'
    },
    {
      path: 'frontend-app/src/App.jsx',
      description: 'Main application routing and initialization',
      complexity: 'low'
    }
  ],
  recentChanges: [
    {
      path: 'frontend-app/src/components/Dashboard',
      summary: 'New dashboard metrics components',
      date: '2 days ago',
      author: 'Alice Manager'
    },
    {
      path: 'backend-api/controllers/analytics.js',
      summary: 'Extended API for analytics data',
      date: '3 days ago',
      author: 'Bob Buddy'
    }
  ]
};

// NEW: Team connection suggestions based on learning focus
const teamConnections = [
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

function FirstMonthView() {
  const [activeTeamMember, setActiveTeamMember] = useState(teamMembers[0].id);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [showResourceDetail, setShowResourceDetail] = useState(null);
  const [activeTasks, setActiveTasks] = useState(setupTasks);
  const [activeTab, setActiveTab] = useState('learning');
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeCodebaseRepo, setActiveCodebaseRepo] = useState(codebaseContext.repositories[0].name);
  const [expandedFile, setExpandedFile] = useState(null);
  const [resourceView, setResourceView] = useState('priority'); // priority, category, recent
  const [activeTeamSuggestion, setActiveTeamSuggestion] = useState(null);

  // Get skill icon based on name
  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'desktop-computer': return <CpuChipIcon className="w-5 h-5" />;
      case 'code': return <CodeBracketIcon className="w-5 h-5" />;
      case 'user-group': return <UserGroupIcon className="w-5 h-5" />;
      case 'refresh': return <ArrowLeftIcon className="w-5 h-5 rotate-90" />;
      case 'clipboard-check': return <DocumentCheckIcon className="w-5 h-5" />;
      case 'code-branch': return <CodeBracketIcon className="w-5 h-5" />;
      case 'puzzle-piece': return <BookOpenIcon className="w-5 h-5" />;
      default: return <AcademicCapIcon className="w-5 h-5" />;
    }
  };
  
  // Helper function to calculate time savings for a skill
  const calculateTimeSavings = (traditional, withAI) => {
    const traditionalHours = parseInt(traditional.split(' ')[0]);
    const aiHours = parseInt(withAI.split(' ')[0]);
    const savingsPercent = Math.round(((traditionalHours - aiHours) / traditionalHours) * 100);
    return {
      hours: traditionalHours - aiHours,
      percent: savingsPercent
    };
  };

  // Handle chat input submission
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    // Add user message
    const newUserMessage = {
      id: `m${messages.length + 1}`,
      sender: 'user',
      message: chatInput,
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    };
    
    setMessages([...messages, newUserMessage]);
    setChatInput('');
    
    // Check if message matches any of our pre-defined scenarios
    const lowerCaseInput = chatInput.toLowerCase();
    
    setTimeout(() => {
      let aiResponse;
      let highlightResources = [];
      let suggestedTeamMember = null;
      
      // Check which pre-defined scenario the message matches
      if (lowerCaseInput.includes('docker') || lowerCaseInput.includes('container') || lowerCaseInput.includes('environment setup')) {
        aiResponse = preDefined.docker.response;
        highlightResources = preDefined.docker.suggestedResources;
        suggestedTeamMember = preDefined.docker.suggestedConnection;
      } 
      else if (lowerCaseInput.includes('codebase') || lowerCaseInput.includes('architecture') || lowerCaseInput.includes('code structure')) {
        aiResponse = preDefined.codebase.response;
        highlightResources = preDefined.codebase.suggestedResources;
        suggestedTeamMember = preDefined.codebase.suggestedConnection;
      }
      else if (lowerCaseInput.includes('api') || lowerCaseInput.includes('documentation') || lowerCaseInput.includes('backend')) {
        aiResponse = preDefined.apiDocs.response;
        highlightResources = preDefined.apiDocs.suggestedResources;
        suggestedTeamMember = preDefined.apiDocs.suggestedConnection;
      }
      else if (lowerCaseInput.includes('workflow') || lowerCaseInput.includes('process') || lowerCaseInput.includes('git')) {
        aiResponse = preDefined.workflow.response;
        highlightResources = preDefined.workflow.suggestedResources;
        suggestedTeamMember = preDefined.workflow.suggestedConnection;
      }
      else if (lowerCaseInput.includes('where can i find the guide') || lowerCaseInput.includes('development environment')) {
        aiResponse = 'Great question! You can find the detailed guide in the "Resources Panel" on this page, or check the "Technical Setup Guide" section right here. I can also walk you through it step-by-step if you like.';
      }
      else {
        // Default response for other messages
        aiResponse = 'I can help with that! Check out the resources section for guides or let me know if you have specific questions about the setup process.';
      }
      
      // Send AI response
      const responseMessage = {
        id: `m${messages.length + 2}`,
        sender: 'ai',
        message: aiResponse,
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      
      setMessages(prev => [...prev, responseMessage]);
      
      // If we have resources to highlight, update the UI to show them
      if (highlightResources.length > 0) {
        setResourceView('priority');
        
        // Could add animation or highlighting to draw attention to the resources panel
        // For a real implementation, we would update the resources list to prioritize these resources
      }
      
      // If we have a team member to suggest, update the UI
      if (suggestedTeamMember) {
        const memberIndex = teamMembers.findIndex(member => member.name === suggestedTeamMember);
        if (memberIndex !== -1) {
          setActiveTeamMember(teamMembers[memberIndex].id); 
        }
      }
    }, 1000);
  };

  // Toggle task completion status
  const toggleTaskStatus = (taskId) => {
    setActiveTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? {...task, completed: !task.completed} : task
      )
    );
  };

  // Get resource icon based on type
  const getResourceIcon = (type) => {
    switch (type) {
      case 'document': 
        return <DocumentTextIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />;
      case 'video': 
        return <VideoCameraIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />;
      default: 
        return <DocumentTextIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />;
    }
  };
  
  // Parse relative time strings for sorting resources by recency
  const parseTimeAgo = (timeString) => {
    const number = parseInt(timeString.split(' ')[0]);
    if (timeString.includes('day')) {
      return number * 24 * 60 * 60 * 1000;
    } else if (timeString.includes('week')) {
      return number * 7 * 24 * 60 * 60 * 1000;
    } else if (timeString.includes('month')) {
      return number * 30 * 24 * 60 * 60 * 1000;
    } else if (timeString.includes('hour')) {
      return number * 60 * 60 * 1000;
    } else if (timeString.includes('minute')) {
      return number * 60 * 1000;
    } else {
      return 0;
    }
  };

  // Calculate setup progress percentage
  const completedTasksCount = activeTasks.filter(task => task.completed).length;
  const progressPercentage = Math.round((completedTasksCount / activeTasks.length) * 100);

  return (
    <div className="space-y-6">
      {/* Header with Back Button and Progress Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center mb-4 md:mb-0">
          <Link
            to="/newhire/timeline"
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors duration-150 mr-4"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1.5" />
            Back to Timeline
          </Link>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">Your First Month Journey</h1>
        </div>
        
        <div className="flex flex-col md:flex-row md:items-center">
          <div className="flex items-center text-sm text-gray-500 mr-6">
            <span className="font-medium">Setup Progress:</span>
            <div className="ml-2 w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <span className="ml-2 font-medium">{progressPercentage}%</span>
          </div>
          
          <button className="mt-3 md:mt-0 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm">
            Schedule Intro Call
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Primary Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* NEW: Personalized Learning Path with visual skill tree */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-4 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <AcademicCapIcon className="w-6 h-6 mr-2" />
                Personalized Learning Path
              </h2>
              <p className="text-sm text-purple-100 mt-1">Skill tree customized for your role and team</p>
            </div>
            
            {/* Feature tabs navigation */}
            <div className="border-b border-gray-200 bg-gray-50">
              <nav className="flex -mb-px overflow-x-auto" aria-label="Features">
                <button 
                  onClick={() => setActiveTab('learning')}
                  className={`py-3 px-4 inline-flex items-center text-sm font-medium whitespace-nowrap 
                    ${activeTab === 'learning' 
                      ? 'border-b-2 border-indigo-500 text-indigo-600' 
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <AcademicCapIcon className={`w-5 h-5 mr-2 ${activeTab === 'learning' ? 'text-indigo-500' : 'text-gray-400'}`} />
                  Learning Path
                </button>
                <button 
                  onClick={() => setActiveTab('environment')}
                  className={`py-3 px-4 inline-flex items-center text-sm font-medium whitespace-nowrap 
                    ${activeTab === 'environment' 
                      ? 'border-b-2 border-indigo-500 text-indigo-600' 
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <CpuChipIcon className={`w-5 h-5 mr-2 ${activeTab === 'environment' ? 'text-indigo-500' : 'text-gray-400'}`} />
                  Environment Setup
                </button>
                <button 
                  onClick={() => setActiveTab('codebase')}
                  className={`py-3 px-4 inline-flex items-center text-sm font-medium whitespace-nowrap 
                    ${activeTab === 'codebase' 
                      ? 'border-b-2 border-indigo-500 text-indigo-600' 
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <CodeBracketIcon className={`w-5 h-5 mr-2 ${activeTab === 'codebase' ? 'text-indigo-500' : 'text-gray-400'}`} />
                  Codebase Navigator
                </button>
              </nav>
            </div>

            {/* Tab content areas */}
            <div className="p-5">
              {/* Learning Path Tab */}
              {activeTab === 'learning' && (
                <div>
                  {/* Time Savings Summary */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-4 mb-6 border border-indigo-100">
                    <h3 className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      AI-Enhanced Learning Time Savings
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="text-center">
                        <div className="text-xs text-gray-500">Traditional</div>
                        <div className="text-lg font-bold text-gray-800">118 hrs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">With DevBoost AI</div>
                        <div className="text-lg font-bold text-green-600">53 hrs</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-gray-500">You Save</div>
                        <div className="text-lg font-bold text-indigo-600">65 hrs</div>
                        <div className="text-xs font-medium text-indigo-500">(-55%)</div>
                      </div>
                    </div>
                  </div>

                  {/* Skill Tree Visualization */}
                  <h3 className="font-medium text-gray-700 mb-3">Required Skills</h3>
                  <div className="space-y-3 mb-6">
                    {learningPath.core.map((skill) => {
                      const isLocked = skill.status === 'locked';
                      const timeSavings = calculateTimeSavings(
                        skill.estimatedTimeTraditional, 
                        skill.estimatedTimeWithAI
                      );
                      
                      return (
                        <div 
                          key={skill.id}
                          onClick={() => !isLocked && setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                          className={`
                            relative border rounded-lg p-4 cursor-pointer transition-all 
                            ${isLocked 
                              ? 'bg-gray-50 border-gray-200' 
                              : activeSkill === skill.id
                                ? 'bg-indigo-50 border-indigo-300 shadow-md' 
                                : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30'
                            }
                          `}
                        >
                          {isLocked && (
                            <div className="absolute inset-0 bg-white/80 rounded-lg backdrop-blur-[1px] flex items-center justify-center z-10">
                              <div className="flex items-center text-gray-500 font-medium">
                                <LockClosedIcon className="w-5 h-5 mr-2 text-gray-400" />
                                <span>Complete prerequisites first</span>
                              </div>
                            </div>
                          )}
                          
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg mr-3 ${skill.type === 'technical' ? 'bg-blue-100' : 'bg-emerald-100'}`}>
                              {getSkillIcon(skill.icon)}
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium text-gray-800">{skill.name}</h4>
                              <div className="flex items-center mt-1">
                                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                                  <div 
                                    className={`h-full rounded-full ${skill.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'}`}
                                    style={{ width: `${skill.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">{skill.progress}% complete</span>
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <div className="text-sm font-medium text-blue-600 flex items-center">
                                <SparklesIcon className="w-4 h-4 mr-1" />
                                <span>Save {timeSavings.hours}h</span>
                              </div>
                              <div className="text-xs text-gray-500">-{timeSavings.percent}% time</div>
                            </div>
                          </div>

                          {/* Expanded skill details */}
                          {activeSkill === skill.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium text-gray-700 mb-2">Estimated Completion Time</h5>
                                  <div className="flex items-center">
                                    <div className="mr-4">
                                      <div className="text-xs text-gray-500">Traditional</div>
                                      <div className="font-medium">{skill.estimatedTimeTraditional}</div>
                                    </div>
                                    <ChevronDoubleRightIcon className="w-4 h-4 text-indigo-400" />
                                    <div className="ml-4">
                                      <div className="text-xs text-gray-500">With AI</div>
                                      <div className="font-medium text-green-600">{skill.estimatedTimeWithAI}</div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-700 mb-2">Team Connections</h5>
                                  {teamConnections.find(conn => conn.skill === skill.name) ? (
                                    <div className="flex items-center">
                                      <div className="h-6 w-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center mr-2">
                                        {teamConnections.find(conn => conn.skill === skill.name)?.recommendedContact.charAt(0)}
                                      </div>
                                      <div className="text-sm">
                                        {teamConnections.find(conn => conn.skill === skill.name)?.recommendedContact}
                                      </div>
                                    </div>
                                  ) : (
                                    <div className="text-gray-500">No specific connection</div>
                                  )}
                                </div>
                              </div>

                              <div className="mt-3">
                                <button className="mt-2 px-3 py-1.5 bg-indigo-600 text-xs text-white rounded-md hover:bg-indigo-700 transition-colors">
                                  Start Learning Path
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Optional Skills Section */}
                  <h3 className="font-medium text-gray-700 mb-3">Optional Skills</h3>
                  <div className="space-y-3">
                    {learningPath.optional.map((skill) => {
                      const timeSavings = calculateTimeSavings(
                        skill.estimatedTimeTraditional, 
                        skill.estimatedTimeWithAI
                      );
                      
                      return (
                        <div 
                          key={skill.id}
                          onClick={() => setActiveSkill(activeSkill === skill.id ? null : skill.id)}
                          className={`
                            border rounded-lg p-4 cursor-pointer transition-all
                            ${activeSkill === skill.id
                              ? 'bg-indigo-50 border-indigo-300 shadow-md' 
                              : 'bg-white border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30'
                            }
                          `}
                        >
                          <div className="flex items-center">
                            <div className={`p-2 rounded-lg mr-3 ${skill.type === 'technical' ? 'bg-blue-100' : skill.type === 'process' ? 'bg-emerald-100' : 'bg-amber-100'}`}>
                              {getSkillIcon(skill.icon)}
                            </div>
                            <div className="flex-grow">
                              <div className="flex items-center">
                                <h4 className="font-medium text-gray-800">{skill.name}</h4>
                                <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-600">
                                  Optional
                                </span>
                              </div>
                              <div className="flex items-center mt-1">
                                <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden mr-2">
                                  <div 
                                    className={`h-full rounded-full ${skill.status === 'in-progress' ? 'bg-blue-500' : 'bg-gray-300'}`}
                                    style={{ width: `${skill.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-xs text-gray-500">{skill.progress}% complete</span>
                              </div>
                            </div>
                            <div className="ml-4 text-right">
                              <div className="text-sm font-medium text-blue-600 flex items-center">
                                <SparklesIcon className="w-4 h-4 mr-1" />
                                <span>Save {timeSavings.hours}h</span>
                              </div>
                              <div className="text-xs text-gray-500">-{timeSavings.percent}% time</div>
                            </div>
                          </div>

                          {/* Expanded skill details */}
                          {activeSkill === skill.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200 text-sm">
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h5 className="font-medium text-gray-700 mb-2">Estimated Completion Time</h5>
                                  <div className="flex items-center">
                                    <div className="mr-4">
                                      <div className="text-xs text-gray-500">Traditional</div>
                                      <div className="font-medium">{skill.estimatedTimeTraditional}</div>
                                    </div>
                                    <ChevronDoubleRightIcon className="w-4 h-4 text-indigo-400" />
                                    <div className="ml-4">
                                      <div className="text-xs text-gray-500">With AI</div>
                                      <div className="font-medium text-green-600">{skill.estimatedTimeWithAI}</div>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <h5 className="font-medium text-gray-700 mb-2">Benefits</h5>
                                  <div className="text-gray-600">
                                    {skill.type === 'technical' ? 
                                      'Enhances your technical capabilities' : 
                                      skill.type === 'business' ? 
                                        'Improves understanding of the business domain' : 
                                        'Helps you work more effectively with your team'}
                                  </div>
                                </div>
                              </div>
                              
                              <button className="mt-3 px-3 py-1.5 bg-indigo-100 text-xs text-indigo-700 rounded-md hover:bg-indigo-200 transition-colors">
                                Add to Your Learning Path
                              </button>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Environment Setup Tab */}
              {activeTab === 'environment' && (
                <div>
                  {/* Environment Detection Summary */}
                  <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-4 mb-6 border border-green-100">
                    <h3 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                      <CursorArrowRaysIcon className="h-4 w-4 mr-1" />
                      Intelligent Environment Detection
                    </h3>
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">OS</span>
                        <span className="text-sm font-medium">{environmentSetup.detected.os}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Node</span>
                        <span className="text-sm font-medium">{environmentSetup.detected.nodeVersion}</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500">Git</span>
                        <span className="text-sm font-medium">{environmentSetup.detected.gitVersion}</span>
                      </div>
                    </div>
                    <div className="text-xs flex items-center text-gray-600">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>DevBoost AI has detected your environment automatically</span>
                    </div>
                    <div className="text-xs flex items-center mt-1 text-gray-600">
                      <BoltIcon className="w-4 h-4 mr-1 text-amber-500" />
                      <span>Estimated time savings: {environmentSetup.timeSavings.savingsPercentage}% ({environmentSetup.timeSavings.withDevBoostAI} vs {environmentSetup.timeSavings.traditional})</span>
                    </div>
                  </div>

                  {/* Required Tools Check */}
                  <h3 className="font-medium text-gray-700 mb-3">Development Environment Status</h3>
                  <div className="space-y-3 mb-6">
                    {environmentSetup.requiredTools.map(tool => (
                      <div 
                        key={tool.name} 
                        className={`
                          border rounded-lg p-3 ${
                          tool.status === 'installed' 
                          ? 'bg-green-50 border-green-200' 
                          : tool.status === 'missing' 
                            ? 'bg-red-50 border-red-200'
                            : 'bg-amber-50 border-amber-200'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div className="flex-grow">
                            <h4 className="font-medium text-gray-800">{tool.name}</h4>
                            <div className="text-xs text-gray-600 mt-1">
                              Required version: {tool.version}
                            </div>
                          </div>
                          
                          <div className="ml-4">
                            {tool.status === 'installed' ? (
                              <div className="flex items-center text-green-600 text-sm font-medium">
                                <CheckCircleSolidIcon className="w-5 h-5 mr-1" />
                                <span>Installed ({tool.installed})</span>
                              </div>
                            ) : tool.status === 'missing' ? (
                              <div className="flex items-center text-red-600 text-sm font-medium">
                                <span>Missing</span>
                              </div>
                            ) : (
                              <div className="flex items-center text-amber-600 text-sm font-medium">
                                <span>Outdated ({tool.installed})</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Recommendations for missing or outdated tools */}
                        {(tool.status === 'missing' || tool.status === 'outdated') && (
                          <div className="mt-3 border-t border-gray-200 pt-3">
                            <div className="flex items-start">
                              <div className="bg-amber-100 p-1 rounded-md">
                                <LightBulbIcon className="w-4 h-4 text-amber-700" />
                              </div>
                              <div className="ml-2">
                                <p className="text-xs text-gray-700 mb-2">
                                  {environmentSetup.recommendations.find(r => r.tool.includes(tool.name))?.reason}
                                </p>
                                <div className="p-2 bg-gray-100 rounded-md font-mono text-xs text-gray-800 overflow-auto whitespace-nowrap">
                                  {environmentSetup.recommendations.find(r => r.tool.includes(tool.name))?.installCommand}
                                </div>
                                <button className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors">
                                  Run Auto-Installer
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center">
                      <WrenchScrewdriverIcon className="w-4 h-4 mr-2" />
                      Run Environment Setup Wizard
                    </button>
                    
                    <div className="text-xs text-gray-500">
                      Last scan: Today at 9:45 AM
                    </div>
                  </div>
                </div>
              )}

              {/* Codebase Navigator Tab */}
              {activeTab === 'codebase' && (
                <div>
                  {/* Repository selector */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-gray-700 block mb-2">Select Repository</label>
                    <div className="flex space-x-2">
                      {codebaseContext.repositories.map(repo => (
                        <button 
                          key={repo.name}
                          onClick={() => setActiveCodebaseRepo(repo.name)}
                          className={`
                            px-3 py-2 rounded-lg text-sm font-medium
                            ${activeCodebaseRepo === repo.name
                              ? 'bg-blue-100 text-blue-700 border border-blue-200'
                              : 'bg-gray-100 text-gray-600 border border-gray-200 hover:bg-gray-200'}
                          `}
                        >
                          {repo.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Repository structure */}
                  <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-6">
                    <h3 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <CodeBracketIcon className="w-4 h-4 mr-1" />
                      Repository Structure
                    </h3>

                    <div className="space-y-2">
                      {codebaseContext.repositories
                        .find(repo => repo.name === activeCodebaseRepo)
                        ?.structure.map(folder => (
                          <div key={folder.path} className="border border-gray-200 rounded-lg bg-white p-3">
                            <h4 className="text-sm font-medium text-blue-600 mb-1">{folder.path}</h4>
                            <p className="text-xs text-gray-600">{folder.description}</p>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Key files */}
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Key Files to Understand</h3>
                  <div className="space-y-2 mb-6">
                    {codebaseContext.keyFiles
                      .filter(file => file.path.startsWith(activeCodebaseRepo))
                      .map(file => (
                        <button 
                          key={file.path}
                          onClick={() => setExpandedFile(expandedFile === file.path ? null : file.path)}
                          className="w-full border border-gray-200 rounded-lg bg-white p-3 text-left hover:bg-blue-50 hover:border-blue-200 transition-colors"
                        >
                          <div className="flex justify-between items-center">
                            <h4 className="text-sm font-medium text-gray-800">{file.path.split('/').slice(-1)[0]}</h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              file.complexity === 'high' 
                                ? 'bg-red-100 text-red-700' 
                                : file.complexity === 'medium'
                                  ? 'bg-amber-100 text-amber-700'
                                  : 'bg-green-100 text-green-700'
                            }`}>
                              {file.complexity} complexity
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1">{file.path}</p>
                          <p className="text-xs text-gray-600 mt-1">{file.description}</p>
                        </button>
                    ))}
                  </div>

                  {/* Recent changes */}
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Changes</h3>
                  <div className="space-y-2">
                    {codebaseContext.recentChanges
                      .filter(change => change.path.startsWith(activeCodebaseRepo))
                      .map((change, idx) => (
                        <div key={idx} className="border border-gray-200 rounded-lg bg-white p-3">
                          <h4 className="text-sm font-medium text-gray-800">{change.path.split('/').slice(-1)[0]}</h4>
                          <p className="text-xs text-gray-600 mt-1">{change.summary}</p>
                          <div className="flex justify-between mt-2">
                            <span className="text-xs text-gray-500">{change.date}</span>
                            <span className="text-xs text-gray-600">{change.author}</span>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* AI Assistant Chat Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex items-center justify-between">
              <div className="flex items-center">
                <ChatBubbleLeftEllipsisIcon className="w-6 h-6 mr-2" />
                <h2 className="text-lg font-semibold">DevBoost AI Assistant</h2>
              </div>
              <div className="text-xs bg-white/20 px-2 py-1 rounded-full">
                Available 24/7
              </div>
            </div>
            
            <div className="flex flex-col h-80">
              {/* Chat Messages Area */}
              <div className="flex-grow overflow-y-auto p-4 space-y-4">
                {messages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`
                        max-w-[80%] p-3 rounded-lg shadow-sm 
                        ${msg.sender === 'user' 
                          ? 'bg-blue-50 text-gray-800 rounded-br-none' 
                          : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-bl-none'
                        }
                      `}
                    >
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs opacity-70 text-right mt-1">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Chat Input Area */}
              <form 
                onSubmit={handleSendMessage}
                className="border-t border-gray-200 p-3 bg-gray-50 flex"
              >
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask anything about your onboarding..."
                  className="flex-grow rounded-l-lg border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  style={{ paddingLeft: '16px', paddingRight: '12px', boxSizing: 'border-box' }}
                />
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm flex items-center"
                >
                  <PaperAirplaneIcon className="w-4 h-4 mr-1" />
                  Send
                </button>
              </form>
            </div>
          </div>
          
          {/* Technical Setup Guide */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-600 to-teal-600 p-4 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <WrenchScrewdriverIcon className="w-6 h-6 mr-2" />
                Technical Setup Guide
              </h2>
              <p className="text-sm text-green-100 mt-1">Complete these tasks to set up your development environment</p>
            </div>
            
            <div className="p-5">
              <div className="mb-4 flex justify-between items-center">
                <div className="text-sm font-medium text-gray-500">
                  Completed: {completedTasksCount} of {activeTasks.length} tasks
                </div>
                <div className="text-xs text-gray-400">
                  Estimated total time: 2h 50m
                </div>
              </div>
              
              <ul className="space-y-3">
                {activeTasks.map(task => (
                  <li 
                    key={task.id} 
                    className={`
                      flex items-center p-3 rounded-lg border border-gray-100
                      ${task.completed ? 'bg-green-50' : 'bg-white hover:bg-gray-50'}
                      transition-colors duration-200
                    `}
                  >
                    <button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`
                        w-5 h-5 mr-3 rounded flex-shrink-0 flex items-center justify-center
                        ${task.completed 
                          ? 'bg-green-500 text-white' 
                          : 'border border-gray-300 hover:border-blue-500'}
                      `}
                    >
                      {task.completed && <CheckCircleIcon className="w-4 h-4" />}
                    </button>
                    
                    <div className="flex-grow">
                      <div className={`text-sm font-medium ${task.completed ? 'text-green-800' : 'text-gray-800'}`}>
                        {task.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        Estimated time: {task.estimatedTime}
                      </div>
                    </div>
                    
                    <a 
                      href={task.link} 
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-md hover:bg-blue-200 transition-colors ml-2"
                    >
                      Guide
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Quick Tips Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-4 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <LightBulbIcon className="w-6 h-6 mr-2" />
                Quick Tips for Success
              </h2>
              <p className="text-sm text-amber-100 mt-1">Advice from others who've been in your shoes</p>
            </div>
            
            <div className="p-5">
              <ul className="space-y-3">
                {firstMonthTips.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <div className="bg-amber-100 text-amber-800 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <p className="text-gray-700">{tip}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Right Column - Secondary Content */}
        <div className="space-y-6">
          {/* Team Introduction */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <UserGroupIcon className="w-6 h-6 mr-2" />
                Meet Your Team
              </h2>
              <p className="text-sm text-indigo-100 mt-1">Your key contacts during onboarding</p>
            </div>
            
            <div className="p-4">
              {/* Member Selection Tabs */}
              <div className="flex space-x-2 mb-4 overflow-x-auto pb-1">
                {teamMembers.map(member => (
                  <button
                    key={member.id}
                    onClick={() => setActiveTeamMember(member.id)}
                    className={`
                      px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
                      ${activeTeamMember === member.id 
                        ? 'bg-indigo-100 text-indigo-800' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                      transition-colors duration-200
                    `}
                  >
                    {member.name.split(' ')[0]}
                  </button>
                ))}
              </div>
              
              {/* Active Member Details */}
              {teamMembers.map(member => (
                activeTeamMember === member.id && (
                  <div key={member.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-3">
                      {/* Profile Image/Avatar */}
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-xl font-bold mr-4">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-gray-800">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3">{member.bio}</p>
                    
                    <div className="text-sm bg-white rounded-lg p-3 border border-gray-200 space-y-2">
                      <div className="flex">
                        <span className="text-gray-500 w-24">Contact:</span>
                        <span className="text-blue-600">{member.contactInfo}</span>
                      </div>
                      <div className="flex">
                        <span className="text-gray-500 w-24">Available:</span>
                        <span>{member.meetingAvailability}</span>
                      </div>
                    </div>
                    
                    <button className="mt-3 w-full py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200 transition-colors">
                      Schedule 1:1 Meeting
                    </button>
                  </div>
                )
              ))}
            </div>
          </div>
          
          {/* ENHANCED: Resource Panel with ML-based priority ranking */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <BookOpenIcon className="w-6 h-6 mr-2" />
                Knowledge Acceleration
              </h2>
              <p className="text-sm text-orange-100 mt-1">Personalized resources to accelerate your onboarding</p>
            </div>
            
            {/* Resource View Selector */}
            <div className="border-b border-gray-200 bg-gray-50">
              <nav className="flex -mb-px overflow-x-auto" aria-label="Resource Views">
                <button 
                  onClick={() => setResourceView('priority')}
                  className={`py-3 px-4 inline-flex items-center text-sm font-medium whitespace-nowrap 
                    ${resourceView === 'priority' 
                      ? 'border-b-2 border-orange-500 text-orange-600' 
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <SparklesIcon className={`w-5 h-5 mr-2 ${resourceView === 'priority' ? 'text-orange-500' : 'text-gray-400'}`} />
                  ML Prioritized
                </button>
                <button 
                  onClick={() => setResourceView('category')}
                  className={`py-3 px-4 inline-flex items-center text-sm font-medium whitespace-nowrap 
                    ${resourceView === 'category' 
                      ? 'border-b-2 border-orange-500 text-orange-600' 
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <BookOpenIcon className={`w-5 h-5 mr-2 ${resourceView === 'category' ? 'text-orange-500' : 'text-gray-400'}`} />
                  By Category
                </button>
                <button 
                  onClick={() => setResourceView('recent')}
                  className={`py-3 px-4 inline-flex items-center text-sm font-medium whitespace-nowrap 
                    ${resourceView === 'recent' 
                      ? 'border-b-2 border-orange-500 text-orange-600' 
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                >
                  <ClockIcon className={`w-5 h-5 mr-2 ${resourceView === 'recent' ? 'text-orange-500' : 'text-gray-400'}`} />
                  Recently Updated
                </button>
              </nav>
            </div>
            
            <div className="p-4">
              {showResourceDetail ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-800 flex items-center">
                      {getResourceIcon(showResourceDetail.type)}
                      <span className="ml-2">{showResourceDetail.title}</span>
                      {showResourceDetail.aiRecommended && (
                        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 flex items-center">
                          <SparklesIcon className="w-3 h-3 mr-1" />
                          AI Recommended
                        </span>
                      )}
                    </h3>
                    <button 
                      onClick={() => setShowResourceDetail(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Back to list
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{showResourceDetail.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      Category: {showResourceDetail.category}
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {showResourceDetail.viewCount} views
                    </span>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {showResourceDetail.type === 'video' ? `Duration: ${showResourceDetail.duration}` : `Est. read time: ${showResourceDetail.estimatedReadTime}`}
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500 mb-3">
                    Last updated: {showResourceDetail.lastUpdated}
                  </div>
                  
                  <button className="mt-1 w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    {showResourceDetail.type === 'video' ? 'Watch Video' : 'View Document'}
                  </button>
                </div>
              ) : (
                <>
                  {/* Priority View */}
                  {resourceView === 'priority' && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <p className="text-sm text-gray-600">Showing resources prioritized specifically for your current learning focus</p>
                        <div className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-md flex items-center">
                          <SparklesIcon className="w-4 h-4 mr-1" />
                          ML-ranked
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {resources
                          .sort((a, b) => b.relevanceScore - a.relevanceScore)
                          .map(resource => (
                          <li key={resource.id} className="border border-gray-100 rounded-lg hover:border-orange-200 hover:bg-orange-50/10 transition-colors">
                            <button 
                              onClick={() => setShowResourceDetail(resource)}
                              className="w-full text-left p-3"
                            >
                              <div className="flex items-start">
                                <div className="mr-3 mt-0.5">
                                  {getResourceIcon(resource.type)}
                                </div>
                                <div className="flex-grow">
                                  <div className="flex justify-between items-center">
                                    <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                                    <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                                      <span className="text-xs font-medium text-gray-700">{resource.relevanceScore}% Match</span>
                                    </div>
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
                                  <div className="flex items-center mt-2 text-xs text-gray-500">
                                    <span className="mr-3">{resource.type === 'video' ? `${resource.duration}` : `${resource.estimatedReadTime} read`}</span>
                                    <span>{resource.lastUpdated}</span>
                                    {resource.aiRecommended && (
                                      <span className="ml-auto text-blue-600 flex items-center">
                                        <SparklesIcon className="w-3 h-3 mr-1" />
                                        AI Suggested
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Category View */}
                  {resourceView === 'category' && (
                    <div>
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <button className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">All</button>
                          <button className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Technical</button>
                          <button className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Process</button>
                          <button className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Company</button>
                        </div>
                      </div>
                      
                      <ul className="space-y-3">
                        {Object.entries(resources.reduce((acc, resource) => {
                          const category = resource.category;
                          if (!acc[category]) acc[category] = [];
                          acc[category].push(resource);
                          return acc;
                        }, {})).map(([category, categoryResources]) => (
                          <li key={category} className="mb-4">
                            <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">{category}</h3>
                            <ul className="space-y-2">
                              {categoryResources.map(resource => (
                                <li key={resource.id} className="border border-gray-100 rounded-lg hover:border-orange-200 hover:bg-orange-50/10 transition-colors">
                                  <button 
                                    onClick={() => setShowResourceDetail(resource)}
                                    className="w-full text-left p-3"
                                  >
                                    <div className="flex items-start">
                                      <div className="mr-3 mt-0.5">
                                        {getResourceIcon(resource.type)}
                                      </div>
                                      <div className="flex-grow">
                                        <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                                        <p className="text-xs text-gray-600 mt-1 line-clamp-1">{resource.description}</p>
                                      </div>
                                    </div>
                                  </button>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Recent View */}
                  {resourceView === 'recent' && (
                    <ul className="space-y-3">
                      {resources
                        .sort((a, b) => {
                          const dateA = new Date(a.lastUpdated.endsWith('ago') 
                            ? Date.now() - parseTimeAgo(a.lastUpdated) 
                            : a.lastUpdated);
                          const dateB = new Date(b.lastUpdated.endsWith('ago') 
                            ? Date.now() - parseTimeAgo(b.lastUpdated) 
                            : b.lastUpdated);
                          return dateB - dateA;
                        })
                        .map(resource => (
                        <li key={resource.id} className="border border-gray-100 rounded-lg hover:border-orange-200 hover:bg-orange-50/10 transition-colors">
                          <button 
                            onClick={() => setShowResourceDetail(resource)}
                            className="w-full text-left p-3"
                          >
                            <div className="flex items-start">
                              <div className="mr-3 mt-0.5">
                                {getResourceIcon(resource.type)}
                              </div>
                              <div className="flex-grow">
                                <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
                                <div className="text-xs text-gray-500 mt-2">
                                  Updated: {resource.lastUpdated}
                                </div>
                              </div>
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </div>
          </div>
          
          {/* NEW: Team connection suggestions based on learning focus */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-violet-500 p-4 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <UserGroupIcon className="w-6 h-6 mr-2" />
                Connection Suggestions
              </h2>
              <p className="text-sm text-blue-100 mt-1">People who can help with your current learning focus</p>
            </div>
            
            <div className="p-4">
              <div className="mb-4">
                <p className="text-sm text-gray-600">These teammates have expertise in areas you're currently learning</p>
              </div>
              
              <div className="space-y-3">
                {teamConnections.map((connection, index) => (
                  <div 
                    key={index}
                    onClick={() => setActiveTeamSuggestion(activeTeamSuggestion === index ? null : index)}
                    className={`
                      border rounded-lg p-3 cursor-pointer transition-all
                      ${activeTeamSuggestion === index
                        ? 'bg-blue-50 border-blue-300 shadow-sm' 
                        : 'bg-white border-gray-200 hover:border-blue-200 hover:bg-blue-50/30'}
                    `}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-violet-500 text-white flex items-center justify-center text-lg font-bold mr-3">
                          {connection.recommendedContact.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{connection.recommendedContact}</h4>
                          <p className="text-xs text-gray-500">For help with: {connection.skill}</p>
                        </div>
                      </div>
                      
                      <div className={`
                        px-2 py-1 rounded-full text-xs font-medium
                        ${connection.urgency === 'high' 
                          ? 'bg-red-100 text-red-700' 
                          : connection.urgency === 'medium'
                            ? 'bg-amber-100 text-amber-700'
                            : 'bg-blue-100 text-blue-700'}
                      `}>
                        {connection.urgency === 'high' ? 'Reach out soon' : connection.urgency === 'medium' ? 'Connect this week' : 'When convenient'}
                      </div>
                    </div>
                    
                    {activeTeamSuggestion === index && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-sm text-gray-700 mb-3">{connection.reason}</p>
                        <div className="flex space-x-2">
                          <button className="flex-1 px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors">
                            Schedule 1:1
                          </button>
                          <button className="flex-1 px-3 py-1.5 bg-blue-100 text-blue-700 text-xs rounded-md hover:bg-blue-200 transition-colors">
                            Chat via Slack
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Upcoming Events */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <CalendarIcon className="w-6 h-6 mr-2" />
                Upcoming Events
              </h2>
            </div>
            
            <div className="p-4">
              <ul className="space-y-2">
                {upcomingEvents.map(event => (
                  <li 
                    key={event.id} 
                    className={`
                      p-3 rounded-lg border
                      ${event.type === 'important' 
                        ? 'border-blue-200 bg-blue-50' 
                        : 'border-gray-100 bg-white'}
                    `}
                  >
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-800 text-sm">{event.title}</span>
                      {event.type === 'important' && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                        <span className="text-xs font-medium">Important</span>
                      </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{event.date} at {event.time}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstMonthView;