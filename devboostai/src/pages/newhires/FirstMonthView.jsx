// src/pages/newhires/FirstMonthView.jsx
import React from 'react';
import { UserGroupIcon, WrenchScrewdriverIcon, DocumentCheckIcon, ChatBubbleLeftEllipsisIcon } from '@heroicons/react/24/outline'; // Example icons

// Mock Data / Placeholders
const teamMembers = [
  { id: 1, name: 'Alice Manager', role: 'Engineering Manager', avatar: '/path/to/alice.jpg' },
  { id: 2, name: 'Bob Buddy', role: 'Senior Engineer (Your Buddy)', avatar: '/path/to/bob.jpg' },
  { id: 3, name: 'Charlie Teammate', role: 'Software Engineer', avatar: '/path/to/charlie.jpg' },
];

const setupTasks = [
  { id: 's1', title: 'Access HR Portal', completed: true },
  { id: 's2', title: 'Install IDE (VS Code)', completed: true },
  { id: 's3', title: 'Configure Git & SSH Keys', completed: false },
  { id: 's4', title: 'Set up Local Database', completed: false },
  { id: 's5', title: 'Run Project Locally', completed: false },
];

const resources = [
    { id: 'fmr1', title: 'Project Architecture Overview', type: 'document' },
    { id: 'fmr2', title: 'Coding Standards', type: 'document' },
    { id: 'fmr3', title: 'Intro to Team Workflow (Video)', type: 'video' },
];


function FirstMonthView() {
  // Function to get resource icon (example) - reuse if needed or import from shared utils
  const getResourceIcon = (type) => {
    // ... (same icon logic as in TimelineView or import)
    return type === 'video' ? '🎬' : '📄';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Left Column (or Top on Mobile) */}
      <div className="lg:col-span-2 space-y-6">
        {/* AI Assistant Chat */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <ChatBubbleLeftEllipsisIcon className="w-6 h-6 mr-2 text-blue-600" />
            AI Assistant
          </h2>
          <div className="border rounded p-4 h-72 flex flex-col bg-gray-50">
             {/* Simulated Chat Interface */}
             <div className="flex-grow overflow-y-auto space-y-3 text-sm mb-3 pr-2">
                <div className="p-2 rounded bg-blue-100 text-blue-900 max-w-[80%]">
                    Welcome to the team! I'm DevBoost AI, your onboarding assistant. How can I help you get started?
                </div>
                <div className="flex justify-end">
                    <div className="p-2 rounded bg-gray-200 text-gray-900 max-w-[80%]">
                        Hi! Where can I find the guide to set up my development environment?
                    </div>
                </div>
                 <div className="p-2 rounded bg-blue-100 text-blue-900 max-w-[80%]">
                    Great question! You can find the detailed guide in the "Resources Panel" on this page, or check the "Technical Setup Guide" section right here. I can also walk you through it step-by-step if you like.
                </div>
             </div>
             <div className="flex border-t pt-3">
                <input type="text" placeholder="Ask me anything..." className="flex-grow border rounded-l px-3 py-1.5 text-sm focus:ring-blue-500 focus:border-blue-500" />
                <button className="bg-blue-600 text-white px-4 py-1.5 rounded-r text-sm font-medium hover:bg-blue-700">Send</button>
             </div>
          </div>
        </div>

        {/* Technical Setup Guide */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <WrenchScrewdriverIcon className="w-6 h-6 mr-2 text-green-600" />
            Technical Setup Guide
          </h2>
          <ul className="space-y-2">
            {setupTasks.map(task => (
              <li key={task.id} className="flex items-center text-sm">
                <input
                  type="checkbox"
                  className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={task.completed}
                  readOnly // Add state logic later if interactivity is needed
                />
                <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>
                  {task.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Column (or Bottom on Mobile) */}
      <div className="space-y-6">
        {/* Team Introduction */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <UserGroupIcon className="w-6 h-6 mr-2 text-indigo-600" />
            Meet Your Team
          </h2>
          <div className="space-y-3">
            {teamMembers.map(member => (
              <div key={member.id} className="flex items-center space-x-3">
                <img src={member.avatar} alt={member.name} className="w-10 h-10 rounded-full bg-gray-300 object-cover" /> {/* Placeholder image */}
                <div>
                  <p className="text-sm font-medium text-gray-900">{member.name}</p>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resources Panel */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <DocumentCheckIcon className="w-6 h-6 mr-2 text-orange-600" />
            Key Resources
          </h2>
           <ul className="space-y-2">
             {resources.map(resource => (
               <li key={resource.id} className="flex items-center text-sm text-gray-800 hover:text-blue-600">
                 <span className="mr-2">{getResourceIcon(resource.type)}</span>
                 <a href="#" className="hover:underline">{resource.title}</a>
               </li>
             ))}
           </ul>
        </div>
      </div>

    </div>
  );
}

export default FirstMonthView;
