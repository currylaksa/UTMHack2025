import React from 'react';
import { LightBulbIcon } from '@heroicons/react/24/outline';

const QuickTips = ({ tips }) => {
  return (
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
          {tips.map((tip, index) => (
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
  );
};

export default QuickTips;