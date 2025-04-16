// src/pages/newhires/NewHireLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import { UserIcon, BellIcon, LightBulbIcon, SparklesIcon } from '@heroicons/react/24/outline';

function NewHireLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Header with vibrant gradient background */}
      <header className="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center">
                <div className="mr-3 bg-white/20 p-2 rounded-full">
                  <SparklesIcon className="h-6 w-6 text-yellow-200" />
                </div>
                <h1 className="text-3xl font-bold leading-tight text-white">
                  Welcome, Alex!
                </h1>
              </div>
              <p className="mt-2 text-blue-100 ml-11">
                Your personalized onboarding journey starts here.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 relative">
                <BellIcon className="h-5 w-5 text-white" />
                <span className="absolute -top-1 -right-1 bg-red-500 h-4 w-4 rounded-full flex items-center justify-center text-xs font-bold">2</span>
              </button>
              <div className="flex items-center">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-300 to-indigo-400 flex items-center justify-center border-2 border-white/70 shadow-md">
                  <UserIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Progress indicator with animation */}
          <div className="mt-8 bg-white/20 rounded-full h-3 p-0.5 shadow-inner">
            <div 
              className="bg-gradient-to-r from-teal-300 to-green-300 h-2 rounded-full transition-all duration-1000 ease-out shadow-sm"
              style={{ width: '15%' }}
              aria-label="15% complete"
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm font-medium">
            <span className="text-white flex items-center">
              <LightBulbIcon className="h-4 w-4 mr-1" />
              Month 1
            </span>
            <span className="bg-white/30 px-3 py-0.5 rounded-full text-white text-xs">
              15% complete
            </span>
          </div>
        </div>

        {/* Decorative wave element */}
        <div className="h-6 w-full overflow-hidden">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="h-12 w-full">
            <path 
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              opacity=".25" 
              className="fill-white"
            ></path>
            <path 
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              opacity=".5" 
              className="fill-white"
            ></path>
            <path 
              d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
              className="fill-white"
            ></path>
          </svg>
        </div>
      </header>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Floating help button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default NewHireLayout;
