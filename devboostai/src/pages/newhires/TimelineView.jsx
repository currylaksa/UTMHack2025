import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmotion } from '../../services/EmotionContext';
import { 
  CheckCircleIcon, 
  ChatBubbleLeftRightIcon, 
  DocumentTextIcon, 
  VideoCameraIcon, 
  ArrowRightCircleIcon,
  LightBulbIcon,
  UserGroupIcon,
  CalendarIcon,
  AcademicCapIcon,
  SparklesIcon,
  StarIcon,
  FireIcon,
  RocketLaunchIcon,
  LockClosedIcon // Added lock icon import
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpenIcon, 
  ChartBarIcon, 
  CogIcon,
  CodeBracketIcon,
  BriefcaseIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

// --- Enhanced Colorful Data with fixed progress values ---
const timelineStages = [
  { 
    month: 1, 
    title: "1st month", 
    description: "Recruitment, Selection & Pre-boarding & goal setting", 
    color: "bg-gradient-to-br from-blue-100 to-blue-200", 
    textColor: "text-blue-800", 
    ringColor: "ring-blue-300",
    borderColor: "border-blue-400",
    icon: <RocketLaunchIcon className="h-5 w-5" />,
    iconBg: "bg-blue-600",
    progress: 35,
    knowledgeDomain: "Environment Setup",
    domainColor: "bg-blue-400"
  },
  { 
    month: 2, 
    title: "2nd month", 
    description: "Training, confirm mentor, and goal setting", 
    color: "bg-gradient-to-br from-purple-100 to-purple-200", 
    textColor: "text-purple-800", 
    ringColor: "ring-purple-300",
    borderColor: "border-purple-400", 
    icon: <UserGroupIcon className="h-5 w-5" />,
    iconBg: "bg-purple-600",
    progress: 0, // Changed from 20% to 0% as it's locked until 1st month is 100%
    knowledgeDomain: "Team Integration",
    domainColor: "bg-purple-400"
  },
  { 
    month: "3 & 4", 
    title: "3rd & 4th month", 
    description: "Training, HR Care & Connect Conversations with Culture Check and goal setting", 
    color: "bg-gradient-to-br from-indigo-100 to-indigo-200", 
    textColor: "text-indigo-800", 
    ringColor: "ring-indigo-300",
    borderColor: "border-indigo-400",
    icon: <CalendarIcon className="h-5 w-5" />,
    iconBg: "bg-indigo-600",
    progress: 10,
    knowledgeDomain: "HR Processes",
    domainColor: "bg-indigo-400"
  },
  { 
    month: "5, 6, & 7", 
    title: "Months 5, 6, & 7", 
    description: "Continued training and 5 month check in with HR and Supervisor and goal setting", 
    color: "bg-gradient-to-br from-teal-100 to-teal-200", 
    textColor: "text-teal-800", 
    ringColor: "ring-teal-300",
    borderColor: "border-teal-400",
    icon: <DocumentTextIcon className="h-5 w-5" />,
    iconBg: "bg-teal-600",
    progress: 5,
    knowledgeDomain: "Technical Skills",
    domainColor: "bg-teal-400"
  },
  { 
    month: "8, 9, 10", 
    title: "Months 8, 9, 10", 
    description: "Stay interview, skill review and impact discussion with supervisor and department lead because employee should now be productive", 
    color: "bg-gradient-to-br from-pink-100 to-pink-200", 
    textColor: "text-pink-800", 
    ringColor: "ring-pink-300",
    borderColor: "border-pink-400",
    icon: <StarIcon className="h-5 w-5" />,
    iconBg: "bg-pink-600",
    progress: 0,
    knowledgeDomain: "Impact Assessment",
    domainColor: "bg-pink-400"
  },
  { 
    month: 12, 
    title: "12th month", 
    description: "Transition into retention, employee satisfaction, and professional development pathway planning", 
    color: "bg-gradient-to-br from-amber-100 to-amber-200", 
    textColor: "text-amber-800", 
    ringColor: "ring-amber-300",
    borderColor: "border-amber-400",
    icon: <FireIcon className="h-5 w-5" />,
    iconBg: "bg-amber-600",
    progress: 0,
    knowledgeDomain: "Career Planning",
    domainColor: "bg-amber-400"
  }
];

const expertTeamMembers = [
  { 
    id: 'tm1', 
    name: 'Sarah Chen', 
    role: 'Senior Developer',
    avatar: null,
    expertise: ['Environment Setup', 'Technical Skills'],
    domains: [1, 5, 6, 7]
  },
  { 
    id: 'tm2', 
    name: 'James Wilson', 
    role: 'HR Specialist',
    avatar: null,
    expertise: ['HR Processes', 'Team Integration'],
    domains: [2, 3, 4]
  },
  { 
    id: 'tm3', 
    name: 'Michael Rodriguez', 
    role: 'Team Lead', 
    avatar: null,
    expertise: ['Career Planning', 'Team Integration'],
    domains: [2, 12]
  },
  { 
    id: 'tm4', 
    name: 'Lisa Taylor', 
    role: 'Product Manager', 
    avatar: null,
    expertise: ['Impact Assessment'],
    domains: [8, 9, 10]
  }
];

const getMockDetailsForMonth = (monthIdentifier) => {
  if (monthIdentifier === 1) {
    return {
      tasks: [
        { id: 't1', title: 'Complete HR paperwork', completed: true },
        { id: 't2', title: 'Set up development environment', completed: false },
        { id: 't3', title: 'Attend team introduction meeting', completed: false },
      ],
      resources: [
        { id: 'r1', title: 'Company Handbook', type: 'document' },
        { id: 'r2', title: 'Dev Environment Setup Guide', type: 'document' },
        { id: 'r3', title: 'Company Introduction Video', type: 'video' },
      ],
      aiTip: "Focus on getting your accounts and environment set up this month. Click the '1st month' button above to see detailed setup steps and meet the team!"
    };
  }
  if (monthIdentifier === 2) {
    return {
      tasks: [
        { id: 't4', title: 'Complete initial compliance training', completed: false },
        { id: 't5', title: 'Schedule first 1:1 with mentor', completed: false },
        { id: 't6', title: 'Define initial goals with manager', completed: false },
      ],
      resources: [
        { id: 'r3', title: 'Compliance Training Module', type: 'video' },
        { id: 'r4', title: 'Goal Setting Framework', type: 'document' },
      ],
      aiTip: "Connect with your assigned mentor and start discussing your initial goals with your manager."
    };
  }
  return { tasks: [], resources: [], aiTip: "Explore the tasks and resources for this period." };
};

const getMonthNumber = (monthIdentifier) => {
  if (typeof monthIdentifier === 'number') return monthIdentifier;
  return parseInt(monthIdentifier.toString().match(/\d+/)?.[0] || '0', 10);
};

function TimelineView() {
  const currentProgressMonth = 1;
  const [selectedMonthIdentifier, setSelectedMonthIdentifier] = useState(timelineStages[0].month);
  const [animatingStage, setAnimatingStage] = useState(null);
  const [animateHeader, setAnimateHeader] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // New state for context panel tabs
  const [aiIsThinking, setAiIsThinking] = useState(false); // For AI thinking animation
  const [aiConversation, setAiConversation] = useState([
    { type: 'ai', message: 'How can I help with your onboarding journey?', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [userQuestion, setUserQuestion] = useState('');
  const [aiLearnProgress, setAiLearnProgress] = useState(25); // AI learning progress percentage
  const [contextTransition, setContextTransition] = useState(false); // For smooth transitions
  
  // Add emotion context
  const { currentEmotion, emotionIntensity, processUserInput, getContentAdaptation } = useEmotion();
  
  const navigate = useNavigate();

  const selectedStage = timelineStages.find(s => s.month === selectedMonthIdentifier);
  const { tasks, resources, aiTip } = getMockDetailsForMonth(selectedMonthIdentifier);
  
  // Get relevant team members who have expertise in the selected month's domain
  const relevantTeamMembers = expertTeamMembers.filter(member => 
    member.expertise.includes(selectedStage.knowledgeDomain) || 
    member.domains.includes(getMonthNumber(selectedMonthIdentifier))
  );

  // Trigger header animation on component mount
  useEffect(() => {
    setAnimateHeader(true);
  }, []);
  
  // Trigger context panel transition effect when selected month changes
  useEffect(() => {
    if (selectedMonthIdentifier) {
      setContextTransition(true);
      setTimeout(() => {
        setContextTransition(false);
      }, 300);
    }
  }, [selectedMonthIdentifier]);

  // Process user input through emotion detection when questions are asked
  useEffect(() => {
    const lastUserMessage = aiConversation.find(msg => msg.type === 'user');
    if (lastUserMessage) {
      // Process the message through emotion detection
      processUserInput(lastUserMessage.message);
    }
  }, [aiConversation, processUserInput]);
  
  // Adapt content based on detected emotion
  const contentAdaptation = getContentAdaptation();
  
  // Get color classes based on current emotion to enhance UI
  const getEmotionStyleClasses = () => {
    switch(currentEmotion) {
      case 'frustrated':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-800',
          buttonBg: 'bg-red-100 hover:bg-red-200',
          buttonText: 'text-red-700'
        };
      case 'confused':
        return {
          bg: 'bg-purple-50',
          border: 'border-purple-200',
          text: 'text-purple-800',
          buttonBg: 'bg-purple-100 hover:bg-purple-200',
          buttonText: 'text-purple-700'
        };
      case 'excited':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          text: 'text-green-800',
          buttonBg: 'bg-green-100 hover:bg-green-200',
          buttonText: 'text-green-700'
        };
      case 'bored':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-800',
          buttonBg: 'bg-yellow-100 hover:bg-yellow-200',
          buttonText: 'text-yellow-700'
        };
      case 'anxious':
        return {
          bg: 'bg-amber-50',
          border: 'border-amber-200',
          text: 'text-amber-800',
          buttonBg: 'bg-amber-100 hover:bg-amber-200',
          buttonText: 'text-amber-700'
        };
      case 'interested':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-800',
          buttonBg: 'bg-blue-100 hover:bg-blue-200',
          buttonText: 'text-blue-700'
        };
      default: // neutral
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-800',
          buttonBg: 'bg-gray-100 hover:bg-gray-200',
          buttonText: 'text-gray-700'
        };
    }
  };

  const getResourceIcon = (type) => {
    switch (type) {
      case 'document':
        return <DocumentTextIcon className="h-5 w-5 text-blue-600" />;
      case 'video':
        return <VideoCameraIcon className="h-5 w-5 text-red-600" />;
      case 'chat':
        return <ChatBubbleLeftRightIcon className="h-5 w-5 text-green-600" />;
      default:
        return <DocumentTextIcon className="h-5 w-5 text-gray-600" />;
    }
  };

  const handleStageClick = (stage) => {
    // Animate the stage first
    setAnimatingStage(stage.month);
    
    // Delay action to allow animation to be visible
    setTimeout(() => {
      setSelectedMonthIdentifier(stage.month);
      setAnimatingStage(null);
    }, 300);
  };
  
  // Handle AI assistant interaction
  const handleSendQuestion = (e) => {
    e.preventDefault();
    if (!userQuestion.trim()) return;
    
    // Add user question to conversation
    const newUserMessage = {
      type: 'user',
      message: userQuestion,
      timestamp: new Date().toLocaleTimeString()
    };
    
    setAiConversation([...aiConversation, newUserMessage]);
    setUserQuestion('');
    setAiIsThinking(true);
    
    // Process user input through emotion detection
    processUserInput(userQuestion);
    
    // Simulate AI thinking and response
    setTimeout(() => {
      setAiIsThinking(false);
      
      let aiResponse;
      // Generate contextual response based on user question and current emotion
      if (userQuestion.toLowerCase().includes('difficult') || userQuestion.toLowerCase().includes('hard') || userQuestion.toLowerCase().includes('confused')) {
        aiResponse = {
          type: 'ai',
          message: `I notice you might be feeling a bit ${currentEmotion}. Let me break this down more simply. ${getContentAdaptationResponse()}`,
          timestamp: new Date().toLocaleTimeString()
        };
      } else if (userQuestion.toLowerCase().includes('excited') || userQuestion.toLowerCase().includes('interesting')) {
        aiResponse = {
          type: 'ai',
          message: `I can see you're enthusiastic about this! ${getContentAdaptationResponse()}`,
          timestamp: new Date().toLocaleTimeString()
        };
      } else {
        aiResponse = {
          type: 'ai',
          message: getContextualResponse(userQuestion),
          timestamp: new Date().toLocaleTimeString()
        };
      }
      
      setAiConversation(prev => [...prev, aiResponse]);
      
      // Increase AI learning progress
      setAiLearnProgress(prev => Math.min(prev + Math.random() * 10, 100));
    }, 1500);
  };
  
  // Get adaptive response based on emotional state
  const getContentAdaptationResponse = () => {
    // Use the adaptation suggestions based on current emotion
    const adaptation = getContentAdaptation();
    return adaptation.suggestions[Math.floor(Math.random() * adaptation.suggestions.length)];
  };
  
  // Get contextual response based on user question
  const getContextualResponse = (question) => {
    const keywords = {
      timeline: "Your onboarding journey is divided into multiple phases over your first year. We're currently focusing on month 1 to help you get set up properly.",
      mentor: "Your mentor will be assigned in month 2. You'll have regular 1:1 sessions to help guide your learning and integration.",
      setup: "For development environment setup, check out the 'Dev Environment Setup Guide' in your resources tab. I can walk you through it step by step.",
      training: "We have various training modules available. In month 1, focus on the company introduction and basic environment setup. More technical training comes in month 2.",
      team: "You'll meet your team members gradually. There's a team introduction meeting scheduled - you can find it in your tasks section for month 1.",
      goals: "Goal setting happens throughout your journey. Initial goals will be set with your manager in month 2 after you've gotten familiar with the basics."
    };
    
    // Find matching keywords
    for (const [key, response] of Object.entries(keywords)) {
      if (question.toLowerCase().includes(key)) {
        return response;
      }
    }
    
    // Default response
    return "I'm here to help with any questions about your onboarding journey. Feel free to ask about your timeline, tasks, resources, team members, or anything else you're curious about.";
  };
  
  // Determine content pacing based on emotional state
  const getContentPacing = () => {
    const adaptation = getContentAdaptation();
    return adaptation.pacing;
  };
  
  const emotionStyles = getEmotionStyleClasses();

  return (
    <div className="space-y-8">
      {/* Timeline header with emotion-adaptive styling */}
      <div className={`rounded-xl shadow-md overflow-hidden border ${emotionStyles.border} transition-all duration-300 ${
        animateHeader ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}>
        <div className={`px-6 py-5 ${emotionStyles.bg}`}>
          <h1 className={`text-xl sm:text-2xl font-bold ${emotionStyles.text}`}>Your Onboarding Journey</h1>
          <p className="text-gray-600 mt-2">
            Track your progress through the onboarding process with personalized guidance
          </p>
          
          {contentAdaptation.pacing === 'slower' && (
            <div className="mt-3 px-3 py-2 bg-blue-50 rounded-lg border border-blue-100 flex items-start">
              <LightBulbIcon className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-700">
                <span className="font-medium">Tip:</span> We're breaking this down into smaller pieces to make it easier to follow. Take your time exploring each section.
              </p>
            </div>
          )}
          
          {contentAdaptation.pacing === 'faster' && (
            <div className="mt-3 px-3 py-2 bg-indigo-50 rounded-lg border border-indigo-100 flex items-start">
              <SparklesIcon className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-indigo-700">
                <span className="font-medium">Challenge:</span> Ready to move faster? You can jump ahead to explore upcoming months or dive deeper into advanced topics.
              </p>
            </div>
          )}
        </div>
        
        {/* Timeline Stages Visualization */}
        <div className="h-1 w-full bg-gray-200">
          <div className="h-full bg-blue-500" style={{ width: `${15}%` }}></div>
        </div>
        
        <div className="w-full overflow-x-auto whitespace-nowrap px-6 pt-4 pb-2 bg-white">
          <div className="inline-flex items-center min-w-max">
            {timelineStages.map((stage, i) => {
              const isSelected = selectedMonthIdentifier === stage.month;
              const isCompleted = currentProgressMonth > getMonthNumber(stage.month);
              const isLocked = getMonthNumber(stage.month) > currentProgressMonth + 1;
              const canClick = !isLocked;
              
              return (
                <div key={i} className="px-1.5 first:pl-0 last:pr-0">
                  <button
                    className={`group relative rounded-full py-3 px-5 ${stage.color} border ${stage.borderColor} ${
                      isLocked ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-md'
                    } ${
                      isSelected ? `${stage.ringColor} ring-2 ring-offset-2 shadow-md` : ''
                    } ${
                      animatingStage === stage.month ? 'animate-pulse' : ''
                    } transition-all focus:outline-none min-w-[150px]`}
                    onClick={() => canClick && handleStageClick(stage)}
                    disabled={isLocked}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`rounded-full p-2 ${stage.iconBg} text-white`}>
                        {stage.icon}
                      </div>
                      <div className="text-left">
                        <p className={`font-bold text-sm ${stage.textColor}`}>{stage.title}</p>
                        
                        <div className="flex items-center mt-1">
                          {isLocked ? (
                            <LockClosedIcon className="h-4 w-4 text-gray-500 mr-1" />
                          ) : (
                            <>
                              {isCompleted ? (
                                <CheckCircleIcon className="h-4 w-4 text-green-500 mr-1" />
                              ) : (
                                <div className="h-3 w-3 rounded-full bg-white border border-gray-300 mr-1"></div>
                              )}
                            </>
                          )}
                          <div className="text-xs text-gray-600">
                            {stage.progress > 0 ? `${stage.progress}% complete` : isLocked ? 'Locked' : 'Not started'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Content Panels - Adaptive to emotion */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-opacity duration-300 ${contextTransition ? 'opacity-0' : 'opacity-100'}`}>
        {/* Left Panel - Month details - Adapted based on emotion */}
        <div className={`md:col-span-2 rounded-xl shadow-md border ${emotionStyles.border} overflow-hidden`}>
          <div className={`px-6 py-4 ${selectedStage.color} border-b ${selectedStage.borderColor}`}>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <div className={`rounded-full p-2 ${selectedStage.iconBg} text-white mr-3`}>
                  {selectedStage.icon}
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${selectedStage.textColor}`}>{selectedStage.title}</h2>
                  <p className="text-gray-700 text-sm mt-1">{selectedStage.description}</p>
                </div>
              </div>
              <div className="hidden md:block">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedStage.domainColor} text-white`}>
                  {selectedStage.knowledgeDomain}
                </span>
              </div>
            </div>
          </div>
          
          {/* Tab Navigation - simplified for focus if confused/frustrated */}
          <div className="px-6 pt-4 bg-white">
            <div className="flex space-x-1 border-b border-gray-200">
              <button
                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === 'overview' 
                    ? `border-b-2 ${selectedStage.textColor} border-blue-500` 
                    : 'text-gray-500 hover:text-gray-700'
                } transition-colors focus:outline-none`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              
              <button
                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === 'tasks' 
                    ? `border-b-2 ${selectedStage.textColor} border-blue-500` 
                    : 'text-gray-500 hover:text-gray-700'
                } transition-colors focus:outline-none`}
                onClick={() => setActiveTab('tasks')}
              >
                Tasks
              </button>
              
              <button
                className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                  activeTab === 'resources' 
                    ? `border-b-2 ${selectedStage.textColor} border-blue-500` 
                    : 'text-gray-500 hover:text-gray-700'
                } transition-colors focus:outline-none`}
                onClick={() => setActiveTab('resources')}
              >
                Resources
              </button>
              
              {/* Only show team tab if not in a confused or frustrated state */}
              {currentEmotion !== 'confused' && currentEmotion !== 'frustrated' && (
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-t-lg ${
                    activeTab === 'team' 
                      ? `border-b-2 ${selectedStage.textColor} border-blue-500` 
                      : 'text-gray-500 hover:text-gray-700'
                  } transition-colors focus:outline-none`}
                  onClick={() => setActiveTab('team')}
                >
                  Team
                </button>
              )}
            </div>
          </div>
          
          {/* Tab Content Areas - Modified based on emotion */}
          <div className="p-6 bg-white">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg ${emotionStyles.bg} border ${emotionStyles.border}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-0.5">
                      <LightBulbIcon className="h-5 w-5 text-yellow-500" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">{aiTip}</p>
                    </div>
                  </div>
                </div>
                
                {/* Simplified view for confused/frustrated users */}
                {(currentEmotion === 'confused' || currentEmotion === 'frustrated') ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700">
                      This is a simplified overview of what you'll focus on during this month:
                    </p>
                    <ul className="space-y-2">
                      {tasks.map((task, i) => (
                        <li key={i} className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-xs font-medium text-blue-700">{i+1}</span>
                            </div>
                          </div>
                          <span className="ml-2 text-sm text-gray-700">{task.title}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 mt-4">
                      <p className="text-sm text-blue-700">
                        <span className="font-medium">Need help?</span> Take each step one at a time. 
                        Feel free to ask questions about any specific task, and I'll provide more detailed instructions.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* More comprehensive view for other emotional states */
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Month {getMonthNumber(selectedMonthIdentifier)} Focus Areas</h3>
                    <p className="text-sm text-gray-700 mb-4">
                      During {selectedStage.title}, you'll focus on {selectedStage.knowledgeDomain} with these key activities:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="rounded-lg border border-blue-200 p-4 bg-blue-50">
                        <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                          <CheckCircleIcon className="h-5 w-5 mr-2 text-blue-600" />
                          Key Objectives
                        </h4>
                        <ul className="space-y-2">
                          {tasks.map((task, i) => (
                            <li key={i} className="flex items-start">
                              <div className="flex-shrink-0 mt-0.5 mr-2">
                                {task.completed ? (
                                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                                ) : (
                                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                                )}
                              </div>
                              <span className="text-sm text-gray-700">{task.title}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="rounded-lg border border-purple-200 p-4 bg-purple-50">
                        <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                          <AcademicCapIcon className="h-5 w-5 mr-2 text-purple-600" />
                          Skills Development
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                            <span className="text-sm text-gray-700">Technical environment basics</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                            <span className="text-sm text-gray-700">Company tools and processes</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                            <span className="text-sm text-gray-700">HR systems and compliance</span>
                          </li>
                          <li className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-purple-400 mr-2"></div>
                            <span className="text-sm text-gray-700">Team communication norms</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    
                    {/* Show more detailed content for excited/interested users */}
                    {(currentEmotion === 'excited' || currentEmotion === 'interested') && (
                      <div className="mt-4 rounded-lg border border-green-200 p-4 bg-green-50">
                        <h4 className="font-medium text-green-800 mb-2 flex items-center">
                          <SparklesIcon className="h-5 w-5 mr-2 text-green-600" />
                          Advanced Opportunities
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          Since you're progressing well, here are some additional opportunities to accelerate your learning:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <ArrowRightCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Shadow a senior team member on a real project task</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRightCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Explore the advanced technical documentation ahead of schedule</span>
                          </li>
                          <li className="flex items-start">
                            <ArrowRightCircleIcon className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Join an upcoming technical workshop (optional)</span>
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    {/* Show reassurance for anxious users */}
                    {currentEmotion === 'anxious' && (
                      <div className="mt-4 rounded-lg border border-amber-200 p-4 bg-amber-50">
                        <h4 className="font-medium text-amber-800 mb-2 flex items-center">
                          <LightBulbIcon className="h-5 w-5 mr-2 text-amber-600" />
                          Success Tips
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          Many new team members feel the same way at this stage. Here are some reassuring facts:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Over 90% of new hires have questions during this phase - it's completely normal</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Your mentor and team are here to help - you don't need to figure everything out alone</span>
                          </li>
                          <li className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">You can break each task into smaller steps - no need to tackle everything at once</span>
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    {/* Show more engaging content for bored users */}
                    {currentEmotion === 'bored' && (
                      <div className="mt-4 rounded-lg border border-yellow-200 p-4 bg-yellow-50">
                        <h4 className="font-medium text-yellow-800 mb-2 flex items-center">
                          <SparklesIcon className="h-5 w-5 mr-2 text-yellow-600" />
                          Challenge Yourself
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          Looking for something more engaging? Try these challenges:
                        </p>
                        <ul className="space-y-2">
                          <li className="flex items-start">
                            <StarIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Set up your development environment with advanced configurations</span>
                          </li>
                          <li className="flex items-start">
                            <StarIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Volunteer to contribute to a real codebase task with supervision</span>
                          </li>
                          <li className="flex items-start">
                            <StarIcon className="h-5 w-5 text-yellow-500 mr-2 flex-shrink-0" />
                            <span className="text-sm text-gray-700">Create a small side project using the company's tech stack</span>
                          </li>
                        </ul>
                        <div className="mt-2">
                          <button className="text-sm font-medium text-yellow-700 hover:text-yellow-800 flex items-center">
                            Skip to more advanced content
                            <ArrowRightCircleIcon className="h-4 w-4 ml-1" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-4 flex justify-end">
                  <button
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${emotionStyles.buttonBg} ${emotionStyles.buttonText}`}
                    onClick={() => navigate('/newhire/firstmonth')}
                  >
                    View detailed month plan
                    <ArrowRightCircleIcon className="ml-1 h-4 w-4 inline" />
                  </button>
                </div>
              </div>
            )}
            
            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div>
                {/* Simplify tasks for confused/frustrated users */}
                {(currentEmotion === 'confused' || currentEmotion === 'frustrated') ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 mb-4">
                      Here are your key tasks for this month, broken down into simple steps:
                    </p>
                    
                    {tasks.map((task, i) => (
                      <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mt-0.5 mr-3">
                            {task.completed ? (
                              <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                                <CheckCircleIcon className="h-4 w-4 text-green-600" />
                              </div>
                            ) : (
                              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                                <span className="text-sm font-medium text-blue-700">{i+1}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">{task.title}</h4>
                            <p className="text-xs text-gray-500 mt-1">Focus on this step before moving to the next one</p>
                            
                            {/* Add simplified instructions for each task */}
                            <div className="mt-2 pl-2 border-l-2 border-blue-200">
                              {task.id === 't1' && (
                                <p className="text-xs text-gray-600">
                                  Visit the HR portal link in your welcome email and follow the step-by-step form.
                                </p>
                              )}
                              {task.id === 't2' && (
                                <p className="text-xs text-gray-600">
                                  Follow the "Dev Environment Setup Guide" in your resources. Take your time with each step.
                                </p>
                              )}
                              {task.id === 't3' && (
                                <p className="text-xs text-gray-600">
                                  Check your calendar for the scheduled meeting. No preparation needed.
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  /* Normal tasks view for other emotional states */
                  <div className="space-y-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-gray-900">Tasks for {selectedStage.title}</h3>
                      <span className="text-sm text-gray-500">
                        {tasks.filter(t => t.completed).length}/{tasks.length} completed
                      </span>
                    </div>
                    
                    {/* Task list */}
                    <div className="space-y-3">
                      {tasks.map((task, i) => (
                        <div key={i} className={`border rounded-lg p-4 ${
                          task.completed ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        } transition-colors cursor-pointer group`}>
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {task.completed ? (
                                <CheckCircleIcon className="h-5 w-5 text-green-500" />
                              ) : (
                                <div className="w-5 h-5 rounded-full border-2 border-gray-300 group-hover:border-blue-500"></div>
                              )}
                            </div>
                            <div className="ml-3">
                              <div className={`text-sm font-medium ${task.completed ? 'text-green-800' : 'text-gray-900'}`}>
                                {task.title}
                              </div>
                              
                              {/* Show task actions for excited/interested users */}
                              {(currentEmotion === 'excited' || currentEmotion === 'interested') && !task.completed && (
                                <div className="mt-2">
                                  <button className="text-xs font-medium text-blue-600 hover:text-blue-800">
                                    Start task now →
                                  </button>
                                </div>
                              )}
                            </div>
                            {/* Show status badge */}
                            <div className="ml-auto">
                              {task.completed ? (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  Completed
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  To Do
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Additional content for bored users */}
                    {currentEmotion === 'bored' && (
                      <div className="mt-4 border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                        <h4 className="font-medium text-yellow-800 mb-2">Optional Challenges</h4>
                        <div className="space-y-3">
                          <div className="border border-yellow-300 rounded-lg p-3 bg-white">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-0.5">
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  Install additional development tools and extensions
                                </div>
                                <div className="mt-1">
                                  <button className="text-xs font-medium text-yellow-600 hover:text-yellow-800">
                                    View recommendations →
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="border border-yellow-300 rounded-lg p-3 bg-white">
                            <div className="flex items-start">
                              <div className="flex-shrink-0 mt-0.5">
                                <StarIcon className="h-5 w-5 text-yellow-500" />
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">
                                  Set up version control for a sample project
                                </div>
                                <div className="mt-1">
                                  <button className="text-xs font-medium text-yellow-600 hover:text-yellow-800">
                                    Start challenge →
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <div>
                {/* Simplified resources for confused/frustrated users */}
                {(currentEmotion === 'confused' || currentEmotion === 'frustrated') ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-700 mb-4">
                      Here are the most important resources for you right now:
                    </p>
                    
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-blue-50 px-4 py-2 border-b border-blue-100">
                        <h4 className="font-medium text-blue-800 text-sm">Essential Resources</h4>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {resources.slice(0, 2).map((resource, i) => (
                          <div key={i} className="p-4 hover:bg-blue-50 transition-colors">
                            <div className="flex items-center">
                              <div className="flex-shrink-0">
                                {getResourceIcon(resource.type)}
                              </div>
                              <div className="ml-3">
                                <h5 className="text-sm font-medium text-gray-900">{resource.title}</h5>
                                <p className="text-xs text-gray-500 mt-1">
                                  {resource.type === 'document' ? 'Documentation' : 'Video Tutorial'}
                                </p>
                              </div>
                              <div className="ml-auto">
                                <button className="inline-flex items-center px-2.5 py-1.5 border border-blue-300 text-xs font-medium rounded text-blue-700 bg-blue-50 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                  View
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-start">
                        <LightBulbIcon className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <p className="text-sm text-blue-700">
                          Focus on these resources one at a time. Start with the "Dev Environment Setup Guide" if you're setting up your workspace.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Full resources view for other emotional states */
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium text-gray-900">Resources for {selectedStage.title}</h3>
                      <div>
                        <select className="text-sm border-gray-300 rounded-md shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                          <option>All Resources</option>
                          <option>Documents</option>
                          <option>Videos</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {resources.map((resource, i) => (
                        <div 
                          key={i} 
                          className={`border rounded-lg p-4 ${
                            resource.type === 'document' ? 'bg-blue-50 border-blue-200' : 
                            resource.type === 'video' ? 'bg-red-50 border-red-200' : 
                            'bg-green-50 border-green-200'
                          } hover:shadow-md transition-all`}
                        >
                          <div className="flex items-start">
                            <div className="flex-shrink-0 mt-0.5">
                              {getResourceIcon(resource.type)}
                            </div>
                            <div className="ml-3">
                              <h4 className="text-sm font-medium text-gray-900">{resource.title}</h4>
                              
                              <div className="mt-1 flex items-center text-xs text-gray-500">
                                <span className="capitalize">
                                  {resource.type}
                                </span>
                                <span className="mx-1">•</span>
                                <span>
                                  {resource.type === 'document' ? '~10 min read' : '~15 min watch'}
                                </span>
                              </div>
                              
                              {/* Extra content for different emotional states */}
                              {currentEmotion === 'excited' && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-600">
                                    This resource covers advanced concepts you might find interesting.
                                  </p>
                                </div>
                              )}
                              
                              {currentEmotion === 'anxious' && (
                                <div className="mt-2">
                                  <p className="text-xs text-gray-600">
                                    Many team members found this resource helpful for getting started.
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="ml-auto">
                              <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                {resource.type === 'document' ? 'Read' : resource.type === 'video' ? 'Watch' : 'Access'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            
            {/* Team Tab */}
            {activeTab === 'team' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  Team Members for {selectedStage.knowledgeDomain}
                </h3>
                
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {relevantTeamMembers.map((member, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-all">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {member.avatar ? (
                            <img 
                              src={member.avatar} 
                              alt={member.name} 
                              className="h-10 w-10 rounded-full object-cover" 
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                              <span className="text-blue-800 font-medium">
                                {member.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          )}
                        </div>
                        <div className="ml-3">
                          <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                          <p className="text-xs text-gray-500">{member.role}</p>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className="flex flex-wrap gap-1">
                          {member.expertise.map((skill, j) => (
                            <span 
                              key={j}
                              className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-gray-200 flex justify-between items-center">
                        <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                          View Profile
                        </button>
                        <button className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors font-medium">
                          Message
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Panel - AI Assist - Modified based on emotional state */}
        <div className="col-span-1">
          <div className={`rounded-xl shadow-md overflow-hidden border ${emotionStyles.border}`}>
            <div className={`px-4 py-3 ${emotionStyles.bg} border-b ${emotionStyles.border}`}>
              <div className="flex items-center justify-between">
                <h3 className={`text-base font-medium ${emotionStyles.text}`}>AI Assistant</h3>
                <div className="flex space-x-1">
                  <div className="flex items-center text-xs text-gray-500">
                    <span className="inline-block h-2 w-2 rounded-full bg-green-400 mr-1"></span>
                    <span>Online</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-4 h-[400px] flex flex-col">
              <div className="flex-1 overflow-y-auto mb-4 space-y-3">
                {aiConversation.map((message, i) => (
                  <div 
                    key={i} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`rounded-lg px-3 py-2 max-w-[80%] ${
                        message.type === 'user' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p className="text-right text-xs text-gray-500 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                
                {aiIsThinking && (
                  <div className="flex justify-start">
                    <div className="rounded-lg px-3 py-2 bg-gray-100 text-gray-800">
                      <div className="flex space-x-1">
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                        <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSendQuestion} className="relative">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder={`Ask about ${selectedStage.title} activities...`}
                  className="w-full border-gray-300 rounded-full pl-4 pr-10 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-sm"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
                >
                  <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
              
              {contentAdaptation.pacing === 'slower' && (
                <div className="mt-2 bg-blue-50 border border-blue-100 rounded-lg p-2">
                  <p className="text-xs text-blue-700">
                    <span className="font-medium">Tip:</span> You can ask simple, specific questions about any task or resource.
                  </p>
                </div>
              )}
            </div>
            
            <div className={`px-4 py-3 ${emotionStyles.bg} border-t ${emotionStyles.border}`}>
              <div className="flex items-center justify-between">
                <div className="text-xs text-gray-600">
                  <span className="font-medium">AI Learning:</span> {Math.round(aiLearnProgress)}%
                </div>
                <div>
                  <button className="text-xs text-blue-600 hover:text-blue-800">Help Improve</button>
                </div>
              </div>
              <div className="mt-1 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500 rounded-full" 
                  style={{ width: `${aiLearnProgress}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimelineView;
