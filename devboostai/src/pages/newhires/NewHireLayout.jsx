// src/pages/newhires/NewHireLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserIcon, BellIcon } from '@heroicons/react/24/outline';

function NewHireLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with gradient background */}
      <header className="bg-gradient-to-r from-teal-500 to-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold leading-tight">
                Welcome, Alex!
              </h1>
              <p className="mt-1 text-blue-100">
                Your personalized onboarding journey starts here.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200">
                <BellIcon className="h-5 w-5 text-white" />
              </button>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress indicator */}
          <div className="mt-6 bg-white/10 rounded-full h-2.5">
            <div 
              className="bg-white h-2.5 rounded-full" 
              style={{ width: '15%' }}
              aria-label="15% complete"
            ></div>
          </div>
          <div className="flex justify-between mt-1 text-xs text-blue-100">
            <span>Month 1</span>
            <span>15% complete</span>
          </div>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}

export default NewHireLayout;
