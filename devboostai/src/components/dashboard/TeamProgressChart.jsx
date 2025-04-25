// src/components/dashboard/TeamProgressChart.jsx
import React from 'react';

/**
 * Chart component for displaying team progress trends
 */
const TeamProgressChart = ({ historicalData }) => {
  // In a production app, we would use a charting library like Chart.js, Recharts or Nivo
  // For this prototype, we'll create a simplified visualization
  const maxValue = Math.max(
    ...historicalData.map(item => Math.max(item.avgProgressPercent, item.industryAvg))
  );
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 overflow-hidden">
      <h3 className="text-sm font-semibold text-gray-700 mb-4">Team Progress Trends</h3>
      
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between text-xs text-gray-500 px-1">
          <div>Progress %</div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-indigo-500 rounded-sm mr-1"></div>
              <span>Your Team</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-gray-300 rounded-sm mr-1"></div>
              <span>Industry Avg</span>
            </div>
          </div>
        </div>
        
        <div className="relative h-44">
          {/* Chart grid lines */}
          <div className="absolute inset-0 border-t border-l border-gray-200 grid grid-rows-4 gap-0 h-full">
            {[0, 1, 2, 3].map(i => (
              <div key={i} className="border-b border-gray-100 relative">
                <span className="absolute -left-6 top-1/2 transform -translate-y-1/2 text-xs text-gray-400">
                  {Math.round(maxValue - (i * (maxValue / 4)))}%
                </span>
              </div>
            ))}
          </div>
          
          {/* Chart bars */}
          <div className="absolute inset-0 pt-2 pb-1 flex items-end">
            <div className="w-full h-full flex justify-between items-end">
              {historicalData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full space-y-1 px-1">
                  {/* Team bar */}
                  <div 
                    className="w-4 bg-gradient-to-t from-indigo-500 to-indigo-400 rounded-t-sm relative group"
                    style={{ height: `${(item.avgProgressPercent / maxValue) * 100}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 transform -translate-x-1/2 bg-indigo-800 text-white text-xs py-1 px-2 rounded-md transition-opacity">
                      {item.avgProgressPercent}%
                    </div>
                  </div>
                  
                  {/* Industry bar */}
                  <div 
                    className="w-4 bg-gradient-to-t from-gray-400 to-gray-300 rounded-t-sm relative group"
                    style={{ height: `${(item.industryAvg / maxValue) * 100}%` }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-700 text-white text-xs py-1 px-2 rounded-md transition-opacity">
                      {item.industryAvg}%
                    </div>
                  </div>
                  
                  {/* Month label */}
                  <div className="text-xs text-gray-500 mt-1">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-xs text-gray-600">
        <div className="flex items-center justify-between">
          <span>6-Month Progress:</span>
          <span className="font-semibold">
            {(() => {
              const startValue = historicalData[0].avgProgressPercent;
              const endValue = historicalData[historicalData.length - 1].avgProgressPercent;
              const change = endValue - startValue;
              const changePercent = Math.round((change / startValue) * 100);
              return (
                <span className={`${changePercent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {changePercent >= 0 ? '+' : ''}{changePercent}%
                  <span className="text-gray-400 ml-1">from {startValue}% to {endValue}%</span>
                </span>
              );
            })()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TeamProgressChart;