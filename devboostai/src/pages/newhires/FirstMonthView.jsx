import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// Import components
import EmotionMonitor from '../../components/EmotionMonitor';
import LearningPathSection from '../../components/dashboard/LearningPathSection';
import TechnicalSetupGuide from '../../components/dashboard/TechnicalSetupGuide';
import TeamMembersSection from '../../components/dashboard/TeamMembersSection';
import ResourcesSection from '../../components/dashboard/ResourcesSection';
import QuickTips from '../../components/dashboard/QuickTips';
import UpcomingEvents from '../../components/dashboard/UpcomingEvents';

// Import data
import { teamMembers, teamConnections } from '../../data/newhires/teamData';
import { setupTasks, resources, firstMonthTips } from '../../data/newhires/setupData';
import { learningPath, environmentSetup } from '../../data/newhires/learningData';

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

// Upcoming events data
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

function FirstMonthView() {
  const [activeTeamMember, setActiveTeamMember] = useState(teamMembers[0].id);
  const [activeTasks, setActiveTasks] = useState(setupTasks);
  const [activeTab, setActiveTab] = useState('learning');
  const [activeSkill, setActiveSkill] = useState(null);
  const [activeCodebaseRepo, setActiveCodebaseRepo] = useState(codebaseContext.repositories[0].name);
  const [expandedFile, setExpandedFile] = useState(null);
  const [activeTeamSuggestion, setActiveTeamSuggestion] = useState(null);
  const [highlightedResources, setHighlightedResources] = useState([]);

  // Toggle task completion status
  const toggleTaskStatus = (taskId) => {
    setActiveTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? {...task, completed: !task.completed} : task
      )
    );
  };

  // Handle resource highlighting from AI assistant
  const handleResourceHighlight = (resourceIds) => {
    setHighlightedResources(resourceIds);
  };

  // Handle team member selection from AI assistant
  const handleTeamMemberSelect = (memberName) => {
    const member = teamMembers.find(m => m.name === memberName);
    if (member) {
      setActiveTeamMember(member.id);
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
          {/* Learning Path Section */}
          <LearningPathSection 
            learningPath={learningPath}
            teamConnections={teamConnections}
            activeSkill={activeSkill}
            setActiveSkill={setActiveSkill}
          />
          
          {/* AI Assistant */}
          <EmotionMonitor 
            onResourceHighlight={handleResourceHighlight}
            onTeamMemberSelect={handleTeamMemberSelect}
          />
          
          {/* Technical Setup Guide */}
          <TechnicalSetupGuide 
            tasks={activeTasks} 
            onTaskToggle={toggleTaskStatus}
          />
          
          {/* Quick Tips */}
          <QuickTips tips={firstMonthTips} />
        </div>
        
        {/* Right Column - Supporting Content */}
        <div className="space-y-6">
          {/* Team Members Section */}
          <TeamMembersSection 
            teamMembers={teamMembers}
            activeTeamMember={activeTeamMember}
            onTeamMemberSelect={setActiveTeamMember}
          />
          
          {/* Resources Section */}
          <ResourcesSection 
            resources={resources}
            highlightedResources={highlightedResources}
          />
          
          {/* Upcoming Events */}
          <UpcomingEvents events={upcomingEvents} />
        </div>
      </div>
    </div>
  );
}

export default FirstMonthView;