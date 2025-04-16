// src/pages/newhires/TimelineView.jsx
import React, { useState } from 'react';
// Import useNavigate
import { useNavigate } from 'react-router-dom';
import { CheckCircleIcon, ChatBubbleLeftRightIcon, DocumentTextIcon, VideoCameraIcon, ArrowRightCircleIcon } from '@heroicons/react/24/outline';

// --- Mock Data (Keep as is) ---
const timelineStages = [
  { month: 1, title: "1st month", description: "Recruitment, Selection & Pre-boarding & goal setting", color: "bg-blue-100", textColor: "text-blue-800", ringColor: "ring-blue-300" },
  { month: 2, title: "2nd month", description: "Training, confirm mentor, and goal setting", color: "bg-yellow-100", textColor: "text-yellow-800", ringColor: "ring-yellow-300" },
  { month: "3 & 4", title: "3rd & 4th month", description: "Training, HR Care & Connect Conversations with Culture Check and goal setting", color: "bg-orange-100", textColor: "text-orange-800", ringColor: "ring-orange-300" },
  { month: "5, 6, & 7", title: "Months 5, 6, & 7", description: "Continued training and 5 month check in with HR and Supervisor and goal setting", color: "bg-indigo-100", textColor: "text-indigo-800", ringColor: "ring-indigo-300" },
  { month: "8, 9, 10", title: "Months 8, 9, 10", description: "Stay interview, skill review and impact discussion with supervisor and department lead because employee should now be productive", color: "bg-amber-100", textColor: "text-amber-800", ringColor: "ring-amber-300" },
  { month: 12, title: "12th month", description: "Transition into retention, employee satisfaction, and professional development pathway planning", color: "bg-teal-100", textColor: "text-teal-800", ringColor: "ring-teal-300" }
];

const getMockDetailsForMonth = (monthIdentifier) => {
  // ... (keep existing mock data logic) ...
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
       aiTip: "Focus on getting your accounts and environment set up this month. Click the '1st month' button above to see detailed setup steps and meet the team!" // Updated AI tip
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
   // Add more cases for other months...
   return { tasks: [], resources: [], aiTip: "Explore the tasks and resources for this period." }; // Default
};

const getMonthNumber = (monthIdentifier) => {
  if (typeof monthIdentifier === 'number') return monthIdentifier;
  // Make robust for strings like "3 & 4" or "5, 6, & 7"
  return parseInt(monthIdentifier.toString().match(/\d+/)?.[0] || '0', 10);
}
// --- End Mock Data ---

function TimelineView() {
  // Assume current progress is month 1 for demo purposes
  const currentProgressMonth = 1; 
  const [selectedMonthIdentifier, setSelectedMonthIdentifier] = useState(timelineStages[0].month); // Default to first stage
  
  // Get the navigate function
  const navigate = useNavigate();

  const selectedStage = timelineStages.find(s => s.month === selectedMonthIdentifier);
  const { tasks, resources, aiTip } = getMockDetailsForMonth(selectedMonthIdentifier);

  // Function to get resource icon (Keep as is)
  const getResourceIcon = (type) => {
    // ... (keep existing icon logic) ...
     switch (type) {
       case 'document': return <DocumentTextIcon className="w-5 h-5 mr-2 text-blue-500 flex-shrink-0" />;
       case 'video': return <VideoCameraIcon className="w-5 h-5 mr-2 text-purple-500 flex-shrink-0" />;
       default: return <DocumentTextIcon className="w-5 h-5 mr-2 text-gray-500 flex-shrink-0" />;
     }
  };

  // --- CLICK HANDLER for timeline stage buttons ---
  const handleStageClick = (stage) => {
      // Check if the clicked stage is the first month
      if (stage.month === 1) { 
          // Navigate to the First Month Experience view
          navigate('/newhire/firstmonth'); 
      } else {
          // For other months, just select the stage to show details below
          setSelectedMonthIdentifier(stage.month);
          // Optional: Add visual feedback or disable navigation for locked months
          console.log("Details for this month are shown below. Navigation only active for Month 1.");
      }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-xl font-semibold mb-6 text-gray-800">Your 12-Month Onboarding Journey</h2>

      {/* Timeline Visualization */}
      <div className="relative px-4 mb-12">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2"></div>

        {/* Stages */}
        <div className="relative flex justify-between">
          {timelineStages.map((stage, index) => {
            const monthNum = getMonthNumber(stage.month);
            const isCompleted = monthNum < currentProgressMonth;
            const isCurrent = monthNum === currentProgressMonth; // Strict check for the single current month
            const isSelected = stage.month === selectedMonthIdentifier;
            const isFirstMonth = stage.month === 1; // Check if it's the first month stage
            const isLocked = monthNum > currentProgressMonth; // Determine if future months are "locked"

            return (
              <div key={stage.month} className="relative flex flex-col items-center z-10">
                {/* Top Description */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-32 text-center text-xs text-gray-500 leading-tight">
                   {/* Simplified description logic if needed */}
                   {index % 2 === 0 ? stage.description.split('&')[0].split(',')[0] : ''}
                </div>

                {/* Stage Circle/Node */}
                <button
                  // Updated onClick handler
                  onClick={() => handleStageClick(stage)}
                  // Disable button visually and functionally for locked months (optional)
                  disabled={isLocked && !isFirstMonth} // Example: disable future months except the first
                  className={`
                    relative ${stage.color} ${stage.textColor}
                    rounded-full h-16 w-16 md:h-20 md:w-20 flex flex-col items-center justify-center
                    font-semibold text-xs md:text-sm border-2 transition-all duration-200 group
                    ${isSelected && !isFirstMonth ? `ring-4 ${stage.ringColor} border-blue-600 scale-110` : 'border-transparent'}
                    ${isFirstMonth ? 'hover:scale-105 hover:ring-4 hover:ring-blue-300 cursor-pointer border-blue-500' : ''} // Style for clickable first month
                    ${isCompleted ? 'opacity-70' : ''}
                    ${isLocked && !isFirstMonth ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'} // Style for locked months
                  `}
                  aria-label={isFirstMonth ? `View details for ${stage.title}` : `Select ${stage.title}`}
                >
                  {isCompleted && <CheckCircleIcon className="w-4 h-4 absolute -top-1 -right-1 text-green-600 bg-white rounded-full" />}
                  {isFirstMonth && ( // Add indicator icon for the clickable month
                       <ArrowRightCircleIcon className="w-5 h-5 absolute -bottom-1 -right-1 text-blue-600 bg-white rounded-full opacity-80 group-hover:opacity-100 transition-opacity" />
                  )}
                  <span>{stage.title}</span>
                   {isCurrent && <span className="text-[10px] leading-none">(Current)</span>}
                </button>

                 {/* Bottom Description */}
                 <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-32 text-center text-xs text-gray-500 leading-tight">
                     {/* Simplified description logic if needed */}
                     {index % 2 !== 0 ? stage.description.split('&')[0].split(',')[0] : ''}
                 </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Stage Details (Only show if NOT the first month, as first month navigates away) */}
      {/* Or always show, but update AI tip */}
      {selectedStage && (
        <div className="mt-12 p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">
            Focus for: {selectedStage.title}
          </h3>
          <p className="text-sm text-gray-600 mb-6">{selectedStage.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tasks */}
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Key Tasks</h4>
              {tasks.length > 0 ? (
                <ul className="space-y-2">
                  {tasks.map(task => (
                    <li key={task.id} className="flex items-center text-sm">
                      <input
                        type="checkbox"
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                        checked={task.completed}
                        readOnly
                      />
                      <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
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
            <div>
              <h4 className="font-medium mb-3 text-gray-700">Helpful Resources</h4>
               {resources.length > 0 ? (
                 <ul className="space-y-2">
                   {resources.map(resource => (
                     <li key={resource.id} className="flex items-center text-sm text-gray-800 hover:text-blue-600">
                       {getResourceIcon(resource.type)}
                       <a href="#" className="hover:underline">{resource.title}</a>
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
            <div className="mt-6 p-4 bg-blue-50 border border-blue-100 rounded-lg flex items-start">
              <ChatBubbleLeftRightIcon className="w-6 h-6 text-blue-600 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">DevBoost AI Suggestion</p>
                <p className="text-sm text-blue-700 mt-1">{aiTip}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default TimelineView;
