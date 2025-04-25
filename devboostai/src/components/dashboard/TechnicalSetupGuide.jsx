import React from 'react';
import { WrenchScrewdriverIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

const TechnicalSetupGuide = ({ tasks, onTaskToggle }) => {
  // Calculate completion status
  const completedTasksCount = tasks.filter(task => task.completed).length;
  const progressPercentage = Math.round((completedTasksCount / tasks.length) * 100);

  return (
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
            Completed: {completedTasksCount} of {tasks.length} tasks
          </div>
          <div className="text-xs text-gray-400">
            Estimated total time: 2h 50m
          </div>
        </div>
        
        <ul className="space-y-3">
          {tasks.map(task => (
            <li 
              key={task.id} 
              className={`
                flex items-center p-3 rounded-lg border border-gray-100
                ${task.completed ? 'bg-green-50' : 'bg-white hover:bg-gray-50'}
                transition-colors duration-200
              `}
            >
              <button
                onClick={() => onTaskToggle(task.id)}
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
  );
};

export default TechnicalSetupGuide;