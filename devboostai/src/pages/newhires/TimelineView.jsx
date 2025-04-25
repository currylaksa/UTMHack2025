import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  const getResourceIcon = (type) => {
    switch (type) {
      case 'document': return <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />;
      case 'video': return <VideoCameraIcon className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0" />;
      default: return <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />;
    }
  };

  const handleStageClick = (stage) => {
    // Animate the stage first
    setAnimatingStage(stage.month);
    
    // Delay action to allow animation to be visible
    setTimeout(() => {
      setAnimatingStage(null);
      
      if (stage.month === 1) {
        navigate('/newhire/firstmonth'); 
      } else {
        // Trigger transition effect
        setSelectedMonthIdentifier(stage.month);
      }
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
    
    setAiConversation(prev => [...prev, newUserMessage]);
    setAiIsThinking(true);
    setUserQuestion('');
    
    // Simulate AI response based on context
    setTimeout(() => {
      let aiResponse;
      
      if (userQuestion.toLowerCase().includes('setup') || userQuestion.toLowerCase().includes('environment')) {
        aiResponse = {
          type: 'ai',
          message: `For ${selectedStage.knowledgeDomain} setup, I recommend starting with the "${resources[0]?.title || 'Dev Environment Setup Guide'}". Would you like me to guide you through the process step by step?`,
          timestamp: new Date().toLocaleTimeString()
        };
      } else if (userQuestion.toLowerCase().includes('team') || userQuestion.toLowerCase().includes('help')) {
        const expertName = relevantTeamMembers[0]?.name || 'Sarah Chen';
        aiResponse = {
          type: 'ai',
          message: `For questions about ${selectedStage.knowledgeDomain}, ${expertName} would be your best contact. I've highlighted their information in the "Team Experts" section. Would you like me to facilitate an introduction?`,
          timestamp: new Date().toLocaleTimeString()
        };
      } else {
        aiResponse = {
          type: 'ai',
          message: `During ${selectedStage.title}, you should focus on ${selectedStage.knowledgeDomain}. I've curated the most relevant resources and tasks for this stage in your journey.`,
          timestamp: new Date().toLocaleTimeString()
        };
      }
      
      // Add AI response to conversation
      setAiConversation(prev => [...prev, aiResponse]);
      setAiIsThinking(false);
      
      // Simulate AI learning from interaction
      setAiLearnProgress(prev => Math.min(prev + 5, 100));
    }, 1500);
  };

  return (
    <div className="space-y-8">
      {/* Header Card */}
      <div className={`bg-gradient-to-br from-white via-white to-blue-50 p-6 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden transition-all duration-700 ${animateHeader ? 'transform-none opacity-100' : 'transform translate-y-4 opacity-0'}`}>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-70 blur-xl"></div>
        <div className="absolute -bottom-24 -left-16 w-64 h-64 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full opacity-70 blur-xl"></div>
        
        {/* Small decorative elements */}
        <div className="absolute top-10 right-10 w-8 h-8 bg-yellow-300 rounded-full opacity-20"></div>
        <div className="absolute bottom-16 left-32 w-6 h-6 bg-pink-300 rounded-full opacity-20"></div>
        <div className="absolute top-24 left-12 w-4 h-4 bg-purple-300 rounded-full opacity-30"></div>
        
        <div className="relative">
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl shadow-md mr-4">
              <SparklesIcon className="h-6 w-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Your 12-Month Onboarding Journey</h2>
          </div>
          <p className="text-gray-600 mb-6 ml-16">Track your progress and discover what's ahead in your personalized onboarding path.</p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl shadow-sm border border-blue-200">
              <div className="flex items-center mb-2">
                <div className="bg-blue-600 p-1.5 rounded-lg">
                  <CalendarIcon className="h-4 w-4 text-white" />
                </div>
                <div className="ml-2 text-sm text-blue-700 font-medium">Current Month</div>
              </div>
              <div className="ml-9 text-xl font-bold text-blue-800">Month 1</div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl shadow-sm border border-green-200">
              <div className="flex items-center mb-2">
                <div className="bg-green-600 p-1.5 rounded-lg">
                  <CheckCircleIcon className="h-4 w-4 text-white" />
                </div>
                <div className="ml-2 text-sm text-green-700 font-medium">Tasks Completed</div>
              </div>
              <div className="ml-9 text-xl font-bold text-green-800">33%</div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl shadow-sm border border-purple-200">
              <div className="flex items-center mb-2">
                <div className="bg-purple-600 p-1.5 rounded-lg">
                  <UserGroupIcon className="h-4 w-4 text-white" />
                </div>
                <div className="ml-2 text-sm text-purple-700 font-medium">Next Milestone</div>
              </div>
              <div className="ml-9 text-xl font-bold text-purple-800">Team Intro</div>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-4 rounded-xl shadow-sm border border-amber-200">
              <div className="flex items-center mb-2">
                <div className="bg-amber-600 p-1.5 rounded-lg">
                  <DocumentTextIcon className="h-4 w-4 text-white" />
                </div>
                <div className="ml-2 text-sm text-amber-700 font-medium">Resources</div>
              </div>
              <div className="ml-9 text-xl font-bold text-amber-800">2 New</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Visualization - Desktop View (hidden on mobile) */}
      <div className="bg-gradient-to-br from-white to-indigo-50 p-8 rounded-xl shadow-lg border border-indigo-100 hidden md:block">
        <div className="flex items-center mb-12">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <CalendarIcon className="h-6 w-6 text-indigo-600" />
          </div>
          <h3 className="ml-3 text-xl font-bold text-gray-800">Journey Timeline</h3>
        </div>
        
        {/* Redesigned timeline with clearer labels and spacing */}
        <div className="relative px-4 py-16">
          {/* Connecting Line with gradient - now thinner for better aesthetics */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-500 to-amber-500 transform -translate-y-1/2 z-0 rounded-full shadow-sm"></div>

          {/* Stages */}
          <div className="relative flex justify-between z-10">
            {timelineStages.map((stage, index) => {
              const monthNum = getMonthNumber(stage.month);
              const isCompleted = monthNum < currentProgressMonth;
              const isCurrent = monthNum === currentProgressMonth;
              const isSelected = stage.month === selectedMonthIdentifier;
              const isFirstMonth = stage.month === 1;
              const isLocked = monthNum > currentProgressMonth;
              const isAnimating = animatingStage === stage.month;

              return (
                <div key={stage.month} className="relative flex flex-col items-center">
                  {/* Knowledge domain label - now positioned better */}
                  <div className={`absolute -top-20 left-1/2 transform -translate-x-1/2 
                    text-xs px-3 py-1 rounded-full ${stage.domainColor} text-white font-medium
                    whitespace-nowrap transition-all duration-300
                    ${(isSelected || isCurrent) ? 'opacity-100' : 'opacity-70'}`}
                  >
                    {stage.knowledgeDomain}
                  </div>
                  
                  {/* Month label - increased top margin to prevent overlap */}
                  <div className={`absolute -top-10 left-1/2 transform -translate-x-1/2
                    text-sm font-medium px-3 py-1 bg-white rounded-full shadow-sm border border-gray-100
                    ${stage.textColor} transition-all duration-300 whitespace-nowrap`}
                  >
                    {stage.title}
                  </div>

                  {/* Stage Circle/Node - now cleaner design */}
                  <button
                    onClick={() => handleStageClick(stage)}
                    disabled={isLocked && !isFirstMonth}
                    className={`
                      relative ${stage.color} ${stage.textColor}
                      rounded-xl h-20 w-20 flex flex-col items-center justify-center
                      font-semibold text-sm border-2 transform transition-all duration-300
                      shadow-md hover:shadow-lg
                      ${isSelected ? `ring-4 ${stage.ringColor} ${stage.borderColor} scale-110 z-30` : `${stage.borderColor}`}
                      ${isFirstMonth ? 'hover:scale-110 hover:ring-4 hover:ring-blue-300 cursor-pointer' : ''}
                      ${isCompleted ? 'bg-opacity-90' : ''}
                      ${isLocked && !isFirstMonth ? 'opacity-60 cursor-not-allowed filter grayscale-[30%]' : 'hover:scale-110'}
                      ${isAnimating ? 'animate-pulse scale-125' : ''}
                      ${isCurrent ? `border-2 ${stage.borderColor}` : ''}
                      overflow-hidden
                    `}
                    style={{ 
                      boxShadow: isSelected ? `0 10px 15px -3px rgba(0, 0, 0, 0.15), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 0 0 2px ${stage.borderColor}` : '' 
                    }}
                    aria-label={isFirstMonth ? `View details for ${stage.title}` : `Select ${stage.title}`}
                  >
                    {/* NEW: Lock icon for locked months */}
                    {isLocked && !isFirstMonth && (
                      <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-[1px] flex items-center justify-center z-30">
                        <div className="bg-gray-200/80 p-1.5 rounded-full">
                          <LockClosedIcon className="w-5 h-5 text-gray-600" />
                        </div>
                      </div>
                    )}
                    
                    {/* Circular progress indicator */}
                    {stage.progress > 0 && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-20 h-20 absolute" viewBox="0 0 100 100">
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="46" 
                            fill="none" 
                            stroke="rgba(255,255,255,0.3)" 
                            strokeWidth="8" 
                          />
                          <circle 
                            cx="50" 
                            cy="50" 
                            r="46" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeOpacity="0.6"
                            strokeWidth="8" 
                            strokeLinecap="round"
                            strokeDasharray="289.03"
                            strokeDashoffset={289.03 - (289.03 * stage.progress / 100)}
                            transform="rotate(-90 50 50)"
                          />
                        </svg>
                      </div>
                    )}

                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg z-10">
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    
                    {isFirstMonth && isCurrent && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1 shadow-lg animate-pulse z-10">
                        <ArrowRightCircleIcon className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className="flex flex-col items-center z-10">
                      <div className={`${stage.iconBg} p-2 rounded-full mb-1 text-white shadow-sm flex items-center justify-center`}>
                        {stage.icon}
                      </div>
                      <span className="font-bold text-base">{typeof stage.month === 'number' ? stage.month : stage.month.split(' ')[0]}</span>
                      {stage.progress > 0 && (
                        <span className="text-xs font-medium">{stage.progress}%</span>
                      )}
                    </div>
                  </button>

                  {/* Month information displayed below - REMOVING THIS REDUNDANT SECTION */}
                  {/* <div className="absolute top-full pt-3 left-1/2 transform -translate-x-1/2 text-center">
                    <span className="text-xs inline-block px-2 py-1 bg-white rounded-lg shadow-sm text-gray-600 whitespace-nowrap">
                      {typeof stage.month === 'string' && stage.month.includes('&') ? 
                        stage.month.replace('&', '-') : 
                        `Month ${stage.month}`}
                    </span>
                  </div> */}
                </div>
              );
            })}
          </div>
        </div>

        {/* Journey Progress Indicator */}
        <div className="mt-20 flex items-center justify-center">
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-indigo-100 flex items-center text-sm">
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse mr-2"></div>
            <span className="text-gray-700">
              <span className="font-medium">Current progress:</span> Month {currentProgressMonth} of 12
            </span>
          </div>
        </div>
      </div>

      {/* Timeline Visualization - Mobile View (shown only on mobile) */}
      <div className="bg-gradient-to-br from-white to-indigo-50 p-5 rounded-xl shadow-lg border border-indigo-100 md:hidden">
        <div className="flex items-center mb-6">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <CalendarIcon className="h-5 w-5 text-indigo-600" />
          </div>
          <h3 className="ml-3 text-lg font-bold text-gray-800">Journey Timeline</h3>
        </div>
        
        <div className="relative pl-6">
          {/* Vertical connecting gradient line for mobile */}
          <div className="absolute top-2 bottom-0 left-6 w-2.5 bg-gradient-to-b from-blue-400 via-purple-400 to-amber-400 rounded-full z-0"></div>

          {/* Stages as a vertical list */}
          <div className="space-y-10 relative z-10">
            {timelineStages.map((stage, index) => {
              const monthNum = getMonthNumber(stage.month);
              const isCompleted = monthNum < currentProgressMonth;
              const isCurrent = monthNum === currentProgressMonth;
              const isSelected = stage.month === selectedMonthIdentifier;
              const isFirstMonth = stage.month === 1;
              const isLocked = monthNum > currentProgressMonth;
              const isAnimating = animatingStage === stage.month;
              
              // For mobile view transitions
              const activeStateClasses = `transform transition-all duration-300 ${isSelected ? 'scale-105' : ''}`;

              return (
                <div key={stage.month} className="flex items-start">
                  <button
                    onClick={() => handleStageClick(stage)}
                    disabled={isLocked && !isFirstMonth}
                    className={`
                      ${stage.color} ${stage.textColor}
                      rounded-xl h-14 w-14 flex-shrink-0 flex flex-col items-center justify-center
                      font-semibold text-xs border-2 transition-all duration-300
                      shadow-md mr-4 z-20 relative
                      ${isSelected ? `ring-4 ${stage.ringColor} ${stage.borderColor}` : `${stage.borderColor}`}
                      ${isFirstMonth ? 'hover:ring-4 hover:ring-blue-300' : ''}
                      ${isLocked && !isFirstMonth ? 'opacity-50 cursor-not-allowed' : ''}
                      ${isAnimating ? 'animate-pulse' : ''}
                      ${isCurrent ? `border-2 ${stage.borderColor}` : ''}
                    `}
                    aria-label={isFirstMonth ? `View details for ${stage.title}` : `Select ${stage.title}`}
                  >
                    {/* Lock icon for locked months */}
                    {isLocked && !isFirstMonth && (
                      <div className="absolute inset-0 bg-gray-50/50 backdrop-blur-[1px] flex items-center justify-center z-30">
                        <div className="bg-gray-200/80 p-1 rounded-full">
                          <LockClosedIcon className="w-4 h-4 text-gray-600" />
                        </div>
                      </div>
                    )}
                    
                    {isCompleted && (
                      <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-0.5 shadow-md">
                        <CheckCircleIcon className="w-3 h-3 text-white" />
                      </div>
                    )}
                    {isFirstMonth && isCurrent && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-0.5 shadow-md animate-pulse">
                        <ArrowRightCircleIcon className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`${stage.iconBg} p-1.5 rounded-full mb-1 text-white shadow-sm`}>
                      {stage.icon}
                    </div>
                    <span className="text-xs font-medium">{stage.month}</span>
                  </button>

                  {/* Stage details - enhanced with better visual styling */}
                  <div className={`flex-1 pt-1 ${activeStateClasses}`}>
                    <div className="flex justify-between items-center">
                      <h4 className={`font-medium text-sm flex items-center ${stage.textColor}`}>
                        {stage.title}
                        {isCurrent && (
                          <span className="ml-2 text-xs font-medium px-2 py-0.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-sm">
                            Current
                          </span>
                        )}
                      </h4>
                      {isFirstMonth && (
                        <button 
                          onClick={() => navigate('/newhire/firstmonth')} 
                          className="text-xs text-blue-600 hover:text-blue-800"
                          aria-label="View details"
                        >
                          View
                        </button>
                      )}
                    </div>
                    
                    <p className={`text-xs text-gray-600 mt-1.5 ${isSelected ? 'line-clamp-none' : 'line-clamp-2'}`}>
                      {stage.description}
                    </p>
                    
                    {/* Knowledge domain badge */}
                    <div className="mt-2">
                      <span className={`inline-block text-xs px-2 py-0.5 rounded-full ${stage.domainColor} text-white`}>
                        {stage.knowledgeDomain}
                      </span>
                    </div>
                    
                    {isSelected && (
                      <div className="mt-3 bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-gray-200 shadow-sm transition-all duration-300">
                        <p className="text-xs font-medium text-gray-700">
                          {index === 0 ? "Click 'View' to see detailed information" : "More information will be available as you progress."}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Journey Progress Indicator */}
        <div className="mt-8 flex items-center justify-center">
          <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-indigo-100 flex items-center text-sm">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse mr-2"></div>
            <span className="text-gray-700 text-xs">
              <span className="font-medium">Current progress:</span> Month {currentProgressMonth} of 12
            </span>
          </div>
        </div>
      </div>

      {/* Selected Stage Details - NEW CONTEXT SWITCHING PANEL */}
      {selectedStage && (
        <div className={`bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border border-blue-100 transition-all duration-300 ${contextTransition ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex items-center mb-6">
            <div className={`${selectedStage.iconBg} p-3 rounded-xl text-white shadow-md mr-4`}>
              {selectedStage.icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-gray-800 flex items-center">
                Focus for: {selectedStage.title}
                <span className={`ml-3 ${selectedStage.domainColor} text-white text-xs px-2 py-1 rounded-full`}>
                  {selectedStage.knowledgeDomain}
                </span>
              </h3>
              <p className="text-gray-600 mt-1">{selectedStage.description}</p>
            </div>
          </div>

          {/* Context-Switching Tabs */}
          <div className="flex border-b border-gray-200 mb-6">
            <button 
              className={`px-6 py-3 font-medium text-sm -mb-px ${activeTab === 'overview' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm -mb-px ${activeTab === 'resources' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm -mb-px ${activeTab === 'experts' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('experts')}
            >
              Team Experts
            </button>
            <button 
              className={`px-6 py-3 font-medium text-sm -mb-px ${activeTab === 'ai' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
              onClick={() => setActiveTab('ai')}
            >
              AI Assistant
            </button>
          </div>

          {/* Tab Content with AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
              >
                {/* Tasks */}
                <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-5 rounded-xl border border-blue-100 shadow-md">
                  <h4 className="font-semibold mb-5 text-gray-800 flex items-center">
                    <div className="bg-blue-600 p-1.5 rounded-lg mr-2">
                      <CheckCircleIcon className="w-4 h-4 text-white" />
                    </div>
                    Key Tasks
                  </h4>
                  {tasks.length > 0 ? (
                    <ul className="space-y-4">
                      {tasks.map(task => (
                        <li key={task.id} className="flex items-center text-sm bg-white p-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                          <input
                            type="checkbox"
                            className="mr-3 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                            checked={task.completed}
                            readOnly
                          />
                          <span className={`${task.completed ? 'line-through text-gray-500' : 'text-gray-800'} transition-all duration-200`}>
                            {task.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No specific tasks listed for this period yet.</p>
                  )}
                </div>

                {/* AI Tip Section */}
                {aiTip && (
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl shadow-md p-5">
                    <h4 className="font-semibold mb-5 text-gray-800 flex items-center">
                      <div className="bg-indigo-600 p-1.5 rounded-lg mr-2">
                        <LightBulbIcon className="w-4 h-4 text-white" />
                      </div>
                      AI Suggestions
                    </h4>
                    <div className="flex">
                      <div className="bg-white p-2 rounded-lg shadow-sm mr-4 flex-shrink-0">
                        <ChatBubbleLeftRightIcon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-700">{aiTip}</p>
                        
                        {selectedStage.month === 1 && (
                          <button 
                            onClick={() => navigate('/newhire/firstmonth')}
                            className="mt-4 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
                          >
                            First Month Details
                            <ArrowRightCircleIcon className="ml-1.5 w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Resources Tab */}
            {activeTab === 'resources' && (
              <motion.div 
                key="resources"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="bg-white p-4 rounded-lg mb-6 border border-gray-100 shadow-sm">
                  <h4 className="flex items-center text-md font-medium text-gray-700 mb-3">
                    <BookOpenIcon className="w-5 h-5 mr-2 text-blue-600" />
                    Resources filtered for {selectedStage.knowledgeDomain}
                  </h4>
                  <p className="text-sm text-gray-500">
                    Curated materials to help you master the skills needed during this phase of your onboarding.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {resources.length > 0 ? (
                    resources.map(resource => (
                      <motion.div 
                        key={resource.id} 
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
                      >
                        <div className="flex items-start">
                          <div className={`p-3 rounded-lg ${resource.type === 'document' ? 'bg-blue-100' : 'bg-purple-100'} mr-4 flex-shrink-0`}>
                            {getResourceIcon(resource.type)}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800 mb-1">{resource.title}</h5>
                            <p className="text-xs text-gray-500 mb-3">
                              {resource.type === 'document' ? 'Documentation • 5 min read' : 'Video • 10 min watch'}
                            </p>
                            <div className="flex items-center">
                              <div className="flex-1">
                                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '0%' }}></div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Not started</p>
                              </div>
                              <button className="ml-3 px-3 py-1 bg-blue-600 text-white text-xs rounded-lg">Start</button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <DocumentTextIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No resources available for this period yet.</p>
                    </div>
                  )}
                </div>

                {/* Additional recommended resources */}
                <div className="mt-8 bg-blue-50 rounded-lg p-4 border border-blue-100">
                  <h5 className="text-sm font-medium text-blue-700 mb-3 flex items-center">
                    <SparklesIcon className="w-4 h-4 mr-2" />
                    AI-Recommended Additional Resources
                  </h5>
                  <div className="text-xs text-gray-600 bg-white p-3 rounded-lg">
                    <p>Based on your progress and interests, our AI suggests these additional resources:</p>
                    <ul className="mt-2 space-y-2">
                      <li className="flex items-center">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                        <span>Advanced {selectedStage.knowledgeDomain} techniques</span>
                      </li>
                      <li className="flex items-center">
                        <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                        <span>Real-world case studies from senior engineers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Team Experts Tab */}
            {activeTab === 'experts' && (
              <motion.div 
                key="experts"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="mt-4"
              >
                <div className="bg-white p-4 rounded-lg mb-6 border border-gray-100 shadow-sm">
                  <h4 className="flex items-center text-md font-medium text-gray-700 mb-2">
                    <UserGroupIcon className="w-5 h-5 mr-2 text-purple-600" />
                    {relevantTeamMembers.length > 0 ? 
                      `Team members with expertise in ${selectedStage.knowledgeDomain}` : 
                      'Team Experts'
                    }
                  </h4>
                  <p className="text-sm text-gray-500">
                    These team members can help you with questions specific to this area.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {relevantTeamMembers.length > 0 ? (
                    relevantTeamMembers.map(member => (
                      <motion.div 
                        key={member.id}
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all"
                      >
                        <div className="flex">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 text-white flex items-center justify-center font-bold text-lg mr-4">
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <h5 className="font-medium text-gray-800">{member.name}</h5>
                            <p className="text-xs text-gray-500 mb-2">{member.role}</p>
                            <div>
                              {member.expertise.map((exp, i) => (
                                <span 
                                  key={i} 
                                  className={`inline-block text-xs mr-2 mb-2 px-2 py-1 rounded-full ${
                                    exp === selectedStage.knowledgeDomain ? 
                                    'bg-blue-100 text-blue-700 border border-blue-200' : 
                                    'bg-gray-100 text-gray-600'
                                  }`}
                                >
                                  {exp}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button className="px-3 py-1.5 bg-indigo-100 text-indigo-700 text-xs rounded-lg mr-2">
                            Message
                          </button>
                          <button className="px-3 py-1.5 bg-blue-600 text-white text-xs rounded-lg">
                            Schedule Meeting
                          </button>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-2 text-center py-12">
                      <UserGroupIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
                      <p className="text-gray-500">No specific experts assigned for this period yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* AI Assistant Tab */}
            {activeTab === 'ai' && (
              <motion.div 
                key="ai"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4"
              >
                {/* AI Chat Interface */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 text-white">
                    <h4 className="text-base font-semibold flex items-center">
                      <SparklesIcon className="w-5 h-5 mr-2" />
                      DevBoost AI Assistant
                    </h4>
                    <p className="text-xs text-blue-100 mt-0.5">
                      Context-aware for {selectedStage.title} • {selectedStage.knowledgeDomain}
                    </p>
                  </div>
                  
                  {/* Chat Messages */}
                  <div className="h-60 overflow-y-auto p-3 flex flex-col space-y-3">
                    {aiConversation.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`
                            max-w-[80%] p-2 rounded-lg 
                            ${msg.type === 'user' 
                              ? 'bg-blue-50 text-gray-800 rounded-br-none' 
                              : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-bl-none'
                            }
                          `}
                        >
                          <p className="text-xs">{msg.message}</p>
                          <p className="text-[10px] opacity-70 text-right mt-1">{msg.timestamp}</p>
                        </div>
                      </div>
                    ))}
                    
                    {/* AI Thinking Indicator */}
                    {aiIsThinking && (
                      <div className="flex justify-start">
                        <div className="bg-gray-100 p-2 rounded-lg flex items-center">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                          </div>
                          <span className="ml-2 text-xs text-gray-500">DevBoost AI is thinking...</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Chat Input */}
                  <form 
                    onSubmit={handleSendQuestion}
                    className="border-t border-gray-200 p-3 flex"
                  >
                    <input
                      type="text"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      placeholder={`Ask about ${selectedStage.knowledgeDomain}...`}
                      className="flex-grow rounded-l-lg border-gray-300 text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-3 py-2 rounded-r-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                    >
                      Send
                    </button>
                  </form>
                </div>
                
                {/* AI Learning Visualization */}
                <div className="bg-gradient-to-br from-gray-50 to-purple-50 rounded-xl border border-purple-100 p-5 shadow-md">
                  <h4 className="font-semibold mb-5 text-gray-800 flex items-center">
                    <div className="bg-purple-600 p-1.5 rounded-lg mr-2">
                      <AcademicCapIcon className="w-4 h-4 text-white" />
                    </div>
                    How DevBoost AI Learns From You
                  </h4>
                  
                  {/* AI Learning Progress */}
                  <div className="bg-white rounded-lg p-4 border border-gray-100 mb-4">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-gray-700">AI Learning Progress</span>
                      <span className="text-blue-600 font-medium">{aiLearnProgress}%</span>
                    </div>
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${aiLearnProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      The more you interact, the better the AI understands your needs
                    </p>
                  </div>
                  
                  {/* Knowledge Areas */}
                  <div className="space-y-3">
                    <h5 className="text-sm font-medium text-gray-700">AI Knowledge Areas</h5>
                    
                    {/* Company-Specific Knowledge */}
                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <BriefcaseIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Company-Specific</p>
                            <div className="flex items-center">
                              <div className="w-20 h-1.5 bg-gray-100 rounded-full mr-2">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: '60%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500">60%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Technical Knowledge */}
                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
                            <CodeBracketIcon className="w-4 h-4 text-indigo-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Technical</p>
                            <div className="flex items-center">
                              <div className="w-20 h-1.5 bg-gray-100 rounded-full mr-2">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: '85%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500">85%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Personal Preferences */}
                    <div className="bg-white p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <CogIcon className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-800">Your Preferences</p>
                            <div className="flex items-center">
                              <div className="w-20 h-1.5 bg-gray-100 rounded-full mr-2">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: '35%' }}></div>
                              </div>
                              <span className="text-xs text-gray-500">35%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default TimelineView;
