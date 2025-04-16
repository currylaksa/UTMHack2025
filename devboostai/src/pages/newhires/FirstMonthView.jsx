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
  BookOpenIcon
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
    lastUpdated: '2 weeks ago'
  },
  { 
    id: 'fmr2', 
    title: 'Coding Standards', 
    type: 'document',
    description: 'Our team\'s coding guidelines and best practices',
    lastUpdated: '1 month ago'
  },
  { 
    id: 'fmr3', 
    title: 'Intro to Team Workflow', 
    type: 'video',
    description: 'Video walkthrough of our development process',
    duration: '12:34',
    lastUpdated: '3 weeks ago'
  },
  {
    id: 'fmr4',
    title: 'API Documentation',
    type: 'document',
    description: 'Complete reference for all backend APIs',
    lastUpdated: '1 week ago'
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

const chatMessages = [
  {
    id: 'm1',
    sender: 'ai',
    message: "Welcome to the team! I'm DevBoost AI, your onboarding assistant. How can I help you get started?",
    timestamp: '9:32 AM'
  },
  {
    id: 'm2',
    sender: 'user',
    message: 'Hi! Where can I find the guide to set up my development environment?',
    timestamp: '9:33 AM'
  },
  {
    id: 'm3',
    sender: 'ai',
    message: 'Great question! You can find the detailed guide in the "Resources Panel" on this page, or check the "Technical Setup Guide" section right here. I can also walk you through it step-by-step if you like.',
    timestamp: '9:33 AM'
  }
];

// Quick Tips for the First Month
const firstMonthTips = [
  "Don't hesitate to ask questions - everyone expects you to be learning",
  "Schedule brief 1:1 meetings with each team member to get to know them",
  "Keep notes as you learn new systems and processes",
  "Focus on understanding the codebase structure before making changes"
];

function FirstMonthView() {
  const [activeTeamMember, setActiveTeamMember] = useState(teamMembers[0].id);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState(chatMessages);
  const [showResourceDetail, setShowResourceDetail] = useState(null);
  const [activeTasks, setActiveTasks] = useState(setupTasks);

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
    
    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        id: `m${messages.length + 2}`,
        sender: 'ai',
        message: 'I can help with that! Check out the resources section for guides or let me know if you have specific questions about the setup process.',
        timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
      };
      setMessages(prev => [...prev, aiResponse]);
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
          
          {/* Resource Panel */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 text-white">
              <h2 className="text-lg font-semibold flex items-center">
                <BookOpenIcon className="w-6 h-6 mr-2" />
                Key Resources
              </h2>
              <p className="text-sm text-orange-100 mt-1">Essential documentation to help you get started</p>
            </div>
            
            <div className="p-4">
              {showResourceDetail ? (
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-gray-800 flex items-center">
                      {getResourceIcon(showResourceDetail.type)}
                      <span className="ml-2">{showResourceDetail.title}</span>
                    </h3>
                    <button 
                      onClick={() => setShowResourceDetail(null)}
                      className="text-xs text-gray-500 hover:text-gray-700"
                    >
                      Back to list
                    </button>
                  </div>
                  
                  <p className="text-sm text-gray-700 mb-3">{showResourceDetail.description}</p>
                  
                  <div className="text-xs text-gray-500 flex justify-between">
                    <span>Last updated: {showResourceDetail.lastUpdated}</span>
                    {showResourceDetail.duration && <span>Duration: {showResourceDetail.duration}</span>}
                  </div>
                  
                  <button className="mt-3 w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    {showResourceDetail.type === 'video' ? 'Watch Video' : 'View Document'}
                  </button>
                </div>
              ) : (
                <ul className="divide-y divide-gray-100">
                  {resources.map(resource => (
                    <li key={resource.id} className="py-2">
                      <button 
                        onClick={() => setShowResourceDetail(resource)}
                        className="w-full text-left flex items-start p-2 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <div className="mr-3 mt-0.5">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex-grow">
                          <p className="text-sm font-medium text-gray-800">{resource.title}</p>
                          <p className="text-xs text-gray-500 truncate">{resource.description}</p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
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
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
                          Important
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mt-1 flex items-center">
                      <CalendarIcon className="w-3 h-3 mr-1" />
                      {event.date} • {event.time}
                    </div>
                  </li>
                ))}
              </ul>
              
              <button className="mt-3 w-full py-2 bg-teal-100 text-teal-700 rounded-md text-sm font-medium hover:bg-teal-200 transition-colors flex items-center justify-center">
                <CalendarIcon className="w-4 h-4 mr-2" />
                View Full Calendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FirstMonthView;
