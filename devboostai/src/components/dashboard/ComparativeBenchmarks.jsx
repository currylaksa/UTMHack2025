// src/components/dashboard/ComparativeBenchmarks.jsx
import React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import Badge from './Badge';

/**
 * Component for comparing team benchmarks against industry standards
 */
const ComparativeBenchmarks = ({ benchmarkData }) => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-indigo-700">Onboarding Benchmarks</h3>
        <Badge 
          label="Industry Comparison" 
          color="indigo" 
          size="sm" 
        />
      </div>
      
      <div className="space-y-4">
        {Object.entries(benchmarkData).map(([key, data]) => {
          // Format the key for display
          const formattedKey = key
            .replace(/([A-Z])/g, ' $1') // Add spaces before capital letters
            .replace(/^./, str => str.toUpperCase()); // Capitalize first letter
            
          // Determine if positive values are good (improves readability)
          const isNegativeBetter = key === 'onboardingCompletionTime' || key === 'timeToProductive';
          
          // Determine color based on comparison with industry
          const isPositive = isNegativeBetter ? data.diffPercent < 0 : data.diffPercent > 0;
          const textColorClass = isPositive ? 'text-green-600' : 'text-red-600';
          
          return (
            <div key={key} className="bg-white/80 rounded-lg p-3 shadow-sm border border-blue-100">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium text-gray-800">{formattedKey}</div>
                <div className={`text-sm font-bold ${textColorClass} flex items-center`}>
                  {isPositive ? 
                    <ArrowTrendingUpIcon className="w-3.5 h-3.5 mr-1" /> : 
                    <ArrowTrendingUpIcon className="w-3.5 h-3.5 mr-1 transform rotate-180" />
                  }
                  {Math.abs(data.diffPercent).toFixed(1)}% {isPositive ? 'better' : 'worse'}
                </div>
              </div>
              
              <div className="mt-2 relative pt-1">
                <div className="flex items-center justify-between mb-1">
                  <div className="text-xs text-indigo-700">Your team: <span className="font-bold">{data.team}</span></div>
                  <div className="text-xs text-gray-600">Industry: <span className="font-medium">{data.industry}</span></div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-indigo-500 to-purple-500"
                    style={{ width: `${(data.team / Math.max(data.team, data.industry)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ComparativeBenchmarks;