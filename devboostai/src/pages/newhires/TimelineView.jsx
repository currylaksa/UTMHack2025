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
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

// --- Enhanced Colorful Data ---
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
    iconBg: "bg-blue-600"
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
    iconBg: "bg-purple-600"
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
    iconBg: "bg-indigo-600"
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
    iconBg: "bg-teal-600"
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
    iconBg: "bg-pink-600"
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
    iconBg: "bg-amber-600"
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
  const navigate = useNavigate();

  const selectedStage = timelineStages.find(s => s.month === selectedMonthIdentifier);
  const { tasks, resources, aiTip } = getMockDetailsForMonth(selectedMonthIdentifier);

  // Trigger header animation on component mount
  useEffect(() => {
    setAnimateHeader(true);
  }, []);

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
        setSelectedMonthIdentifier(stage.month);
      }
    }, 300);
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
      <div className="bg-gradient-to-br from-white to-indigo-50 p-6 rounded-xl shadow-lg border border-indigo-100 hidden md:block">
        <h3 className="text-xl font-bold mb-8 text-gray-800 flex items-center">
          <CalendarIcon className="h-6 w-6 mr-2 text-indigo-600" />
          Journey Timeline
        </h3>
        
        <div className="relative px-6 py-12">
          {/* Connecting Line with gradient */}
          <div className="absolute top-1/2 left-0 right-0 h-2 bg-gradient-to-r from-blue-400 via-purple-400 to-amber-400 transform -translate-y-1/2 z-0 rounded-full shadow-inner"></div>

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
                <div key={stage.month} className="relative flex flex-col items-center z-20">
                  {/* Stage Circle/Node */}
                  <button
                    onClick={() => handleStageClick(stage)}
                    disabled={isLocked && !isFirstMonth}
                    className={`
                      relative ${stage.color} ${stage.textColor}
                      rounded-xl h-20 w-20 flex flex-col items-center justify-center
                      font-semibold text-xs border-2 transform transition-all duration-300
                      shadow-md hover:shadow-lg
                      ${isSelected ? `ring-4 ${stage.ringColor} ${stage.borderColor} scale-110 z-30` : `${stage.borderColor}`}
                      ${isFirstMonth ? 'hover:scale-110 hover:ring-4 hover:ring-blue-300 cursor-pointer' : ''}
                      ${isCompleted ? 'opacity-80' : ''}
                      ${isLocked && !isFirstMonth ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}
                      ${isAnimating ? 'animate-pulse scale-125' : ''}
                      ${isCurrent ? `border-2 ${stage.borderColor}` : ''}
                    `}
                    style={{ 
                      boxShadow: isSelected ? `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 2px ${stage.borderColor}` : '' 
                    }}
                    aria-label={isFirstMonth ? `View details for ${stage.title}` : `Select ${stage.title}`}
                  >
                    {isCompleted && (
                      <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg">
                        <CheckCircleIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    {isFirstMonth && (
                      <div className="absolute -bottom-2 -right-2 bg-blue-600 rounded-full p-1 shadow-lg animate-pulse">
                        <ArrowRightCircleIcon className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div className="flex flex-col items-center">
                      <div className={`${stage.iconBg} p-2 rounded-full mb-2 text-white shadow-sm`}>
                        {stage.icon}
                      </div>
                      <span className="font-medium">{stage.month}</span>
                    </div>
                    {isCurrent && (
                      <span className="absolute -bottom-6 text-xs font-medium px-3 py-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-sm">Current</span>
                    )}
                  </button>

                  {/* Bottom Description - enhanced with animation */}
                  <div className={`
                    absolute top-full left-1/2 transform -translate-x-1/2 mt-10 w-48 text-center 
                    text-xs bg-white p-3 rounded-lg shadow-lg border border-gray-100
                    transition-all duration-300
                    ${(isSelected || isCurrent) ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
                  `}>
                    <p className="font-medium text-gray-800 mb-1">{stage.title}</p>
                    <p className="text-gray-600">{stage.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Visualization - Mobile View (shown only on mobile) */}
      <div className="bg-gradient-to-br from-white to-indigo-50 p-5 rounded-xl shadow-lg border border-indigo-100 md:hidden">
        <h3 className="text-lg font-bold mb-6 text-gray-800 flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2 text-indigo-600" />
          Journey Timeline
        </h3>
        
        <div className="relative pl-2">
          {/* Vertical connecting gradient line for mobile */}
          <div className="absolute top-0 bottom-0 left-6 w-2 bg-gradient-to-b from-blue-400 via-purple-400 to-amber-400 rounded-full z-0"></div>

          {/* Stages as a vertical list */}
          <div className="space-y-8 relative z-10">
            {timelineStages.map((stage) => {
              const monthNum = getMonthNumber(stage.month);
              const isCompleted = monthNum < currentProgressMonth;
              const isCurrent = monthNum === currentProgressMonth;
              const isSelected = stage.month === selectedMonthIdentifier;
              const isFirstMonth = stage.month === 1;
              const isLocked = monthNum > currentProgressMonth;
              const isAnimating = animatingStage === stage.month;

              return (
                <div key={stage.month} className="flex items-start pl-6">
                  {/* Stage Circle/Node */}
                  <button
                    onClick={() => handleStageClick(stage)}
                    disabled={isLocked && !isFirstMonth}
                    className={`
                      relative ${stage.color} ${stage.textColor}
                      rounded-xl h-14 w-14 flex-shrink-0 flex flex-col items-center justify-center
                      font-semibold text-xs border-2 transition-all duration-300
                      shadow-md mr-4 z-20
                      ${isSelected ? `ring-4 ${stage.ringColor} ${stage.borderColor} scale-110 z-30` : `${stage.borderColor}`}
                      ${isFirstMonth ? 'hover:scale-105 hover:ring-4 hover:ring-blue-300 cursor-pointer' : ''}
                      ${isCompleted ? 'opacity-80' : ''}
                      ${isLocked && !isFirstMonth ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                      ${isAnimating ? 'animate-pulse scale-110' : ''}
                      ${isCurrent ? `border-2 ${stage.borderColor}` : ''}
                    `}
                    aria-label={isFirstMonth ? `View details for ${stage.title}` : `Select ${stage.title}`}
                  >
                    {isCompleted && (
                      <div className="absolute -top-1.5 -right-1.5 bg-green-500 rounded-full p-0.5 shadow-md">
                        <CheckCircleIcon className="w-3 h-3 text-white" />
                      </div>
                    )}
                    <div className={`${stage.iconBg} p-1.5 rounded-full mb-1 text-white shadow-sm`}>
                      {stage.icon}
                    </div>
                    <span className="text-xs font-medium">{stage.month}</span>
                  </button>

                  {/* Stage details */}
                  <div className={`flex-1 pt-1 ${isSelected ? 'opacity-100' : 'opacity-80'}`}>
                    <h4 className="font-medium text-sm flex items-center">
                      {stage.title}
                      {isCurrent && (
                        <span className="ml-2 text-xs font-medium px-2 py-0.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-sm">Current</span>
                      )}
                    </h4>
                    <p className="text-xs text-gray-600 mt-1">{stage.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Selected Stage Details */}
      {selectedStage && (
        <div className="bg-gradient-to-br from-white to-blue-50 p-6 rounded-xl shadow-lg border border-blue-100">
          <div className="flex items-center mb-6">
            <div className={`${selectedStage.iconBg} p-3 rounded-xl text-white shadow-md mr-4`}>
              {selectedStage.icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">
                Focus for: {selectedStage.title}
              </h3>
              <p className="text-gray-600 mt-1">{selectedStage.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
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

            {/* Resources */}
            <div className="bg-gradient-to-br from-gray-50 to-indigo-50 p-5 rounded-xl border border-indigo-100 shadow-md">
              <h4 className="font-semibold mb-5 text-gray-800 flex items-center">
                <div className="bg-indigo-600 p-1.5 rounded-lg mr-2">
                  <DocumentTextIcon className="w-4 h-4 text-white" />
                </div>
                Helpful Resources
              </h4>
              {resources.length > 0 ? (
                <ul className="space-y-4">
                  {resources.map(resource => (
                    <li key={resource.id} className="bg-white p-3 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md">
                      <a href="#" className="flex items-center text-sm text-gray-800 hover:text-indigo-600 transition-colors duration-200">
                        {getResourceIcon(resource.type)}
                        <span className="hover:underline">{resource.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500 italic">No specific resources listed for this period yet.</p>
              )}
            </div>
          </div>

          {/* AI Tip Section */}
          {aiTip && (
            <div className="mt-8 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl flex items-start shadow-md">
              <div className="bg-white p-2 rounded-lg shadow-sm mr-4 flex-shrink-0">
                <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-blue-800">DevBoost AI Suggestion</p>
                <p className="text-sm text-blue-700 mt-2">{aiTip}</p>
                
                {selectedStage.month === 1 && (
                  <button 
                    onClick={() => navigate('/newhire/firstmonth')}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
                  >
                    Go to First Month Experience
                    <ArrowRightCircleIcon className="ml-2 w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TimelineView;
