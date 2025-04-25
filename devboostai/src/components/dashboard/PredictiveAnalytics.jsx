// src/components/dashboard/PredictiveAnalytics.jsx
import React from 'react';
import { SparklesIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Badge from './Badge';
import Avatar from './Avatar';

/**
 * Component for displaying AI-powered predictions and analytics
 */
const PredictiveAnalytics = ({ predictions, teamMembers }) => {
  // Calculate average time to productivity
  const avgTime = Object.values(predictions.timeToFullProductivity).reduce((sum, time) => sum + time, 0) / 
                Object.values(predictions.timeToFullProductivity).length;
                
  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl shadow-md border border-purple-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-purple-700 flex items-center">
          <SparklesIcon className="w-4 h-4 mr-1.5 text-purple-500" />
          AI Predictions
        </h3>
        <Badge label="Powered by AI" color="purple" size="sm" />
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {/* Retention Risk */}
        <div className="bg-white/80 rounded-lg p-3 shadow-sm border border-purple-100">
          <div className="text-sm font-medium text-gray-800 mb-2">Retention Risk Levels</div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <div className="flex flex-col items-center">
                <div className="text-xs font-medium text-green-700 mb-1">Low</div>
                <div className="h-12 w-8 bg-gradient-to-t from-green-500 to-green-300 rounded-t-sm flex items-center justify-center text-white font-medium">
                  {predictions.retentionRisk.low}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs font-medium text-yellow-700 mb-1">Medium</div>
                <div className="h-12 w-8 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-t-sm flex items-center justify-center text-white font-medium">
                  {predictions.retentionRisk.medium}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-xs font-medium text-red-700 mb-1">High</div>
                <div className="h-12 w-8 bg-gradient-to-t from-red-500 to-red-300 rounded-t-sm flex items-center justify-center text-white font-medium">
                  {predictions.retentionRisk.high}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {predictions.retentionRisk.high > 0 ? 
                <span className="text-red-600 font-medium">Action needed</span> : 
                <span className="text-green-600 font-medium">Looking good</span>
              }
            </div>
          </div>
        </div>
        
        {/* Time to Productivity */}
        <div className="bg-white/80 rounded-lg p-3 shadow-sm border border-purple-100">
          <div className="text-sm font-medium text-gray-800 mb-2">Predicted Time to Full Productivity</div>
          <div className="space-y-2">
            {Object.entries(predictions.timeToFullProductivity).map(([name, days], idx) => {
              // Find matching team member
              const member = teamMembers.find(m => m.name === name);
              const isAboveAverage = days > avgTime;
              
              return (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Avatar src={member?.avatar} alt={name} size="sm" />
                    <span className="ml-2 text-xs font-medium text-gray-700">{name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className={`text-xs font-bold ${isAboveAverage ? 'text-yellow-600' : 'text-green-600'}`}>
                      {days} days
                    </span>
                    {isAboveAverage && 
                      <ExclamationTriangleIcon className="w-3.5 h-3.5 ml-1 text-yellow-500" />
                    }
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-500 flex items-center justify-between">
            <span>Team average:</span>
            <span className="font-medium">{Math.round(avgTime)} days</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;