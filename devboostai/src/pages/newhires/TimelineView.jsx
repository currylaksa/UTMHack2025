import React, { useState } from 'react';
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
  AcademicCapIcon
} from '@heroicons/react/24/outline';

// --- Mock Data ---
const timelineStages = [
  { 
    month: 1, 
    title: "1st month", 
    description: "Recruitment, Selection & Pre-boarding & goal setting", 
    color: "bg-blue-100", 
    textColor: "text-blue-800", 
    ringColor: "ring-blue-300",
    icon: <AcademicCapIcon className="h-5 w-5" />
  },
  { 
    month: 2, 
    title: "2nd month", 
    description: "Training, confirm mentor, and goal setting", 
    color: "bg-yellow-100", 
    textColor: "text-yellow-800", 
    ringColor: "ring-yellow-300",
    icon: <UserGroupIcon className="h-5 w-5" />
  },
  { 
    month: "3 & 4", 
    title: "3rd & 4th month", 
    description: "Training, HR Care & Connect Conversations with Culture Check and goal setting", 
    color: "bg-orange-100", 
    textColor: "text-orange-800", 
    ringColor: "ring-orange-300",
    icon: <CalendarIcon className="h-5 w-5" />
  },
  { 
    month: "5, 6, & 7", 
    title: "Months 5, 6, & 7", 
    description: "Continued training and 5 month check in with HR and Supervisor and goal setting", 
    color: "bg-indigo-100", 
    textColor: "text-indigo-800", 
    ringColor: "ring-indigo-300",
    icon: <DocumentTextIcon className="h-5 w-5" />
  },
  { 
    month: "8, 9, 10", 
    title: "Months 8, 9, 10", 
    description: "Stay interview, skill review and impact discussion with supervisor and department lead because employee should now be productive", 
    color: "bg-amber-100", 
    textColor: "text-amber-800", 
    ringColor: "ring-amber-300",
    icon: <LightBulbIcon className="h-5 w-5" />
  },
  { 
    month: 12, 
    title: "12th month", 
    description: "Transition into retention, employee satisfaction, and professional development pathway planning", 
    color: "bg-teal-100", 
    textColor: "text-teal-800", 
    ringColor: "ring-teal-300",
    icon: <UserGroupIcon className="h-5 w-5" />
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
      ],
      aiTip: "Focus on getting your accounts and environment set up this month. Click the '1st month' button above to see detailed setup steps and meet the team!"
    };
  }
  if (monthIdentifier ===.3) {
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
  const navigate = useNavigate();

  const selectedStage = timelineStages.find(s => s.month === selectedMonthIdentifier);
  const { tasks, resources, aiTip } = getMockDetailsForMonth(selectedMonthIdentifier);

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
    <div className="space-y-6">
      {/* Header Card */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 -mt-12 -mr-12 bg-blue-50 rounded-full opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10 bg-teal-50 rounded-full opacity-70"></div>
        <div className="relative">
          <h2 className="text-xl md:text-2xl font-bold mb-2 text-gray-800">Your 12-Month Onboarding Journey</h2>
          <p className="text-sm text-gray-600 mb-4">Track your progress and discover what's ahead in your personalized onboarding path.</p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="text-xs md:text-sm text-gray-500">Current Month</div>
              <div className="text-lg md:text-xl font-semibold text-blue-700">Month 1</div>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="text-xs md:text-sm text-gray-500">Tasks Completed</div>
              <div className="text-lg md:text-xl font-semibold text-green-700">33%</div>
            </div>
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="text-xs md:text-sm text-gray-500">Next Milestone</div>
              <div className="text-lg md:text-xl font-semibold text-purple-700">Team Intro</div>
            </div>
            <div className="bg-amber-50 p-3 rounded-lg">
              <div className="text-xs md:text-sm text-gray-500">Resources</div>
              <div className="text-lg md:text-xl font-semibold text-amber-700">2 New</div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Visualization - Desktop View (hidden on mobile) */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200 hidden md:block">
        <h3 className="text-lg font-semibold mb-6 text-gray-800">Journey Timeline</h3>
        
        <div className="relative px-6 py-8">
          {/* Connecting Line - positioned below the nodes with greater spacing */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-300 via-indigo-300 to-teal-300 transform -translate-y-1/2 z-0"></div>

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
                      rounded-full h-16 w-16 flex flex-col items-center justify-center
                      font-semibold text-xs border transform transition-all duration-300
                      shadow-md hover:shadow-lg
                      ${isSelected ? `ring-4 ${stage.ringColor} border-blue-600 scale-110 z-30` : 'border-transparent'}
                      ${isFirstMonth ? 'hover:scale-105 hover:ring-4 hover:ring-blue-300 cursor-pointer border-blue-500' : ''}
                      ${isCompleted ? 'opacity-70' : ''}
                      ${isLocked && !isFirstMonth ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                      ${isAnimating ? 'animate-pulse scale-125' : ''}
                      ${isCurrent ? 'border-2 border-blue-500' : ''}
                    `}
                    aria-label={isFirstMonth ? `View details for ${stage.title}` : `Select ${stage.title}`}
                  >
                    {isCompleted && (
                      <CheckCircleIcon className="w-5 h-5 absolute -top-1 -right-1 text-green-600 bg-white rounded-full shadow-sm" />
                    )}
                    {isFirstMonth && (
                      <ArrowRightCircleIcon className="w-5 h-5 absolute -bottom-1 -right-1 text-blue-600 bg-white rounded-full opacity-80 group-hover:opacity-100 transition-opacity shadow-sm" />
                    )}
                    <div className="flex flex-col items-center">
                      {stage.icon}
                      <span className="mt-1">{stage.title}</span>
                    </div>
                    {isCurrent && (
                      <span className="absolute -bottom-6 text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Current</span>
                    )}
                  </button>

                  {/* Bottom Description - only show on hover and for current/selected */}
                  <div className={`
                    absolute top-full left-1/2 transform -translate-x-1/2 mt-8 w-40 text-center 
                    text-xs bg-white p-2 rounded-md shadow-md border border-gray-100
                    transition-opacity duration-200
                    ${(isSelected || isCurrent) ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                  `}>
                    {stage.description}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Visualization - Mobile View (shown only on mobile) */}
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200 md:hidden">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Journey Timeline</h3>
        
        <div className="relative">
          {/* Vertical connecting line for mobile */}
          <div className="absolute top-0 bottom-0 left-6 w-1 bg-gradient-to-b from-blue-300 via-indigo-300 to-teal-300 z-0"></div>

          {/* Stages as a vertical list */}
          <div className="space-y-6 relative z-10">
            {timelineStages.map((stage) => {
              const monthNum = getMonthNumber(stage.month);
              const isCompleted = monthNum < currentProgressMonth;
              const isCurrent = monthNum === currentProgressMonth;
              const isSelected = stage.month === selectedMonthIdentifier;
              const isFirstMonth = stage.month === 1;
              const isLocked = monthNum > currentProgressMonth;
              const isAnimating = animatingStage === stage.month;

              return (
                <div key={stage.month} className="flex items-start pl-4">
                  {/* Stage Circle/Node */}
                  <button
                    onClick={() => handleStageClick(stage)}
                    disabled={isLocked && !isFirstMonth}
                    className={`
                      relative ${stage.color} ${stage.textColor}
                      rounded-full h-12 w-12 flex-shrink-0 flex items-center justify-center
                      font-semibold text-xs border transition-all duration-300
                      shadow-md mr-3 z-20
                      ${isSelected ? `ring-4 ${stage.ringColor} border-blue-600 scale-110 z-30` : 'border-transparent'}
                      ${isFirstMonth ? 'hover:scale-105 hover:ring-4 hover:ring-blue-300 cursor-pointer border-blue-500' : ''}
                      ${isCompleted ? 'opacity-70' : ''}
                      ${isLocked && !isFirstMonth ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'}
                      ${isAnimating ? 'animate-pulse scale-110' : ''}
                      ${isCurrent ? 'border-2 border-blue-500' : ''}
                    `}
                    aria-label={isFirstMonth ? `View details for ${stage.title}` : `Select ${stage.title}`}
                  >
                    {isCompleted && (
                      <CheckCircleIcon className="w-4 h-4 absolute -top-1 -right-1 text-green-600 bg-white rounded-full shadow-sm" />
                    )}
                    {stage.icon}
                  </button>

                  {/* Stage details */}
                  <div className={`flex-1 pl-1 ${isSelected ? 'opacity-100' : 'opacity-80'}`}>
                    <h4 className="font-medium text-sm flex items-center">
                      {stage.title}
                      {isCurrent && (
                        <span className="ml-2 text-xs font-medium px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">Current</span>
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
        <div className="bg-white p-4 md:p-6 rounded-xl shadow-md border border-gray-200">
          <div className="flex items-center mb-4">
            <div className={`p-2 rounded-full ${selectedStage.color} mr-3`}>
              {selectedStage.icon}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Focus for: {selectedStage.title}
              </h3>
              <p className="text-sm text-gray-600">{selectedStage.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 mt-6">
            {/* Tasks */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h4 className="font-medium mb-4 text-gray-700 flex items-center">
                <CheckCircleIcon className="w-5 h-5 mr-2 text-blue-600" />
                Key Tasks
              </h4>
              {tasks.length > 0 ? (
                <ul className="space-y-3">
                  {tasks.map(task => (
                    <li key={task.id} className="flex items-center text-sm bg-white p-3 rounded-md shadow-sm">
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
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h4 className="font-medium mb-4 text-gray-700 flex items-center">
                <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-600" />
                Helpful Resources
              </h4>
              {resources.length > 0 ? (
                <ul className="space-y-3">
                  {resources.map(resource => (
                    <li key={resource.id} className="bg-white p-3 rounded-md shadow-sm">
                      <a href="#" className="flex items-center text-sm text-gray-800 hover:text-blue-600 transition-colors duration-200">
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
            <div className="mt-6 p-4 md:p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-lg flex items-start">
              <div className="bg-white p-2 rounded-full shadow-sm mr-3 md:mr-4 flex-shrink-0">
                <ChatBubbleLeftRightIcon className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm md:text-md font-semibold text-blue-800">DevBoost AI Suggestion</p>
                <p className="text-xs md:text-sm text-blue-700 mt-2">{aiTip}</p>
                
                {selectedStage.month === 1 && (
                  <button 
                    onClick={() => navigate('/newhire/firstmonth')}
                    className="mt-4 px-3 py-1.5 md:px-4 md:py-2 bg-blue-600 text-white rounded-md text-xs md:text-sm font-medium shadow-sm hover:bg-blue-700 transition-colors duration-200 inline-flex items-center"
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
