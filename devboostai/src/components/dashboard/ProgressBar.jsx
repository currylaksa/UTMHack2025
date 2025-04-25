// src/components/dashboard/ProgressBar.jsx
import React from 'react';

/**
 * ProgressBar component for displaying progress visually
 */
const ProgressBar = ({ percent, color = 'blue', height = 'h-2.5' }) => {
  const colorClasses = {
    gray: 'bg-gray-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    teal: 'bg-teal-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500'
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
      <div
        className={`${height} rounded-full ${colorClasses[color] || colorClasses.blue}`}
        style={{ width: `${percent}%`, transition: 'width 1s ease-in-out' }}
      />
    </div>
  );
};

export default ProgressBar;