// src/components/dashboard/DashboardHeader.jsx
import React from 'react';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

/**
 * Header component for dashboard pages
 */
const DashboardHeader = ({ title, subtitle, actions }) => (
  <header className="mb-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 shadow-lg p-6 text-white">
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight flex items-center">
          <RocketLaunchIcon className="h-8 w-8 mr-3 text-yellow-300" />
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm md:text-md text-blue-100">{subtitle}</p>
        )}
      </div>
      {actions && actions.length > 0 && (
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              onClick={action.onClick}
              className={`inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium transition-all duration-200 ${
                action.variant === 'primary'
                  ? 'border-transparent text-indigo-700 bg-white hover:bg-blue-50 focus:ring-offset-indigo-600'
                  : 'border-blue-300 text-white bg-blue-700 bg-opacity-30 hover:bg-opacity-50 focus:ring-offset-blue-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  </header>
);

export default DashboardHeader;