// src/components/dashboard/StatCard.jsx
import React from 'react';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

/**
 * Statistical card component for displaying metrics
 */
const StatCard = ({ icon: Icon, title, value, subtext, color, trend, linkText, linkHref, onClick }) => {
  // Define gradient backgrounds based on colors
  const gradientBgs = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100',
    green: 'bg-gradient-to-br from-green-50 to-green-100',
    yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
    red: 'bg-gradient-to-br from-red-50 to-red-100',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100',
    teal: 'bg-gradient-to-br from-teal-50 to-teal-100',
    indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    pink: 'bg-gradient-to-br from-pink-50 to-pink-100',
    gray: 'bg-gradient-to-br from-gray-50 to-gray-100'
  };

  const iconBgs = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
    purple: 'bg-purple-100',
    teal: 'bg-teal-100',
    indigo: 'bg-indigo-100',
    pink: 'bg-pink-100',
    gray: 'bg-gray-100'
  };

  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    teal: 'text-teal-600',
    indigo: 'text-indigo-600',
    pink: 'text-pink-600',
    gray: 'text-gray-600'
  };

  // Use a default color if the provided one is invalid
  const colorToUse = color && gradientBgs[color] ? color : 'gray';

  return (
    <div className={`overflow-hidden shadow-md rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg ${gradientBgs[colorToUse]}`}>
      <div className="p-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-full ${iconBgs[colorToUse]}`}>
            <Icon className={`h-5 w-5 ${iconColors[colorToUse]}`} aria-hidden="true" />
          </div>
          <div className="ml-4 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-600 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-xl font-bold text-gray-900">{value}</div>
                {trend !== undefined && trend !== null && (
                  <span className={`ml-2 flex items-center text-xs font-medium ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {trend > 0 ? '+' : ''}{trend}
                  </span>
                )}
              </dd>
              {subtext && (
                <div className="mt-1 text-xs text-gray-500 truncate">
                  {subtext}
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
      {linkText && (
        <div className="bg-white bg-opacity-60 px-4 py-2.5 border-t border-gray-100">
          <div className="text-sm">
            <a
              href={linkHref || "#"}
              className={`font-medium ${iconColors[colorToUse]} hover:text-blue-800 transition-colors duration-200 inline-flex items-center`}
              onClick={onClick}
            >
              {linkText}
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatCard;