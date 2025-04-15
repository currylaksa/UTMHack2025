// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // For smooth animations

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Main content area */}
      <main className="flex-grow flex flex-col">
        {/* Hero Section - Optimized for 5-10 second demo */}
        <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 px-4 flex-grow flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full">
          <div className="md:w-1/2 text-left mb-8 md:mb-0 md:pr-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            >
              DevBoost AI: Accelerating Engineer Onboarding with AI
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl mb-6"
            >
              30% faster productivity, 25% less manager overhead
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/new-hire" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-50 transition duration-300 text-center">
                New Hire View
              </Link>
              <Link to="/manager" className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition duration-300 text-center">
                Manager View
              </Link>
            </motion.div>
          </div>
          
          {/* Animated illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 relative"
          >
            <div className="relative bg-white/10 backdrop-blur-sm rounded-xl p-6 shadow-xl border border-white/20 overflow-hidden h-80">
              {/* Simplified onboarding journey visualization */}
              <div className="absolute inset-0 opacity-20">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                  <path fill="#FFFFFF" d="M40,-65.5C53.2,-60.5,66.3,-52.6,72.9,-40.9C79.5,-29.2,79.7,-14.6,77.3,-1.4C74.9,11.9,70,23.7,63.4,34.6C56.8,45.5,48.4,55.4,37.8,62.1C27.1,68.8,13.6,72.3,-0.2,72.6C-14,73,-28,70.3,-39.9,63.6C-51.9,56.9,-61.7,46.2,-67.7,33.8C-73.7,21.3,-75.8,7.1,-74.6,-7C-73.4,-21,-69,-35,-60.5,-44.7C-52.1,-54.5,-39.5,-60,-27.5,-64.8C-15.5,-69.6,-3.9,-73.7,7.6,-76.1C19.1,-78.6,26.8,-70.4,40,-65.5Z" transform="translate(100 100)" />
                </svg>
              </div>
              
              {/* Timeline visualization */}
              <div className="relative z-10 flex items-center justify-center h-full">
                <div className="w-full">
                  <div className="flex justify-between mb-8">
                    {[1, 2, 3, 4].map((month) => (
                      <div key={month} className={`flex flex-col items-center ${month === 1 ? 'text-white' : 'text-white/70'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${month === 1 ? 'bg-white text-blue-600' : 'border-2 border-white/50'}`}>
                          {month}
                        </div>
                        <span className="text-xs">Month {month}</span>
                        {month === 1 && (
                          <span className="text-xs font-bold mt-1 bg-white/20 px-2 py-1 rounded-full">You are here</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* AI Assistant */}
                  <div className="bg-white text-gray-800 p-4 rounded-lg shadow-lg max-w-xs mx-auto relative">
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-sm">Welcome! I'll guide you through your onboarding journey.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Key Metrics Section */}
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">
              Accelerate Your Engineering Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Metric 1 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-600"
              >
                <div className="text-4xl font-bold text-blue-600 mb-2">30%</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Faster Productivity</h3>
                <p className="text-gray-600">Engineers reach full productivity in record time with AI-guided onboarding</p>
              </motion.div>
              
              {/* Metric 2 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-500"
              >
                <div className="text-4xl font-bold text-teal-500 mb-2">25%</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Less Manager Overhead</h3>
                <p className="text-gray-600">Free up leadership time with automated guidance and progress tracking</p>
              </motion.div>
              
              {/* Metric 3 */}
              <motion.div 
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-md p-6 border-t-4 border-indigo-400"
              >
                <div className="text-4xl font-bold text-indigo-400 mb-2">40%</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Improved Satisfaction</h3>
                <p className="text-gray-600">Higher team satisfaction and engagement through personalized support</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* User Selection Panel - Expanded */}
        <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-12 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">Get Started with DevBoost AI</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 flex-1 max-w-md"
              >
                <div className="bg-blue-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">New Engineers</h3>
                <p className="mb-6 opacity-80">Navigate your onboarding journey with personalized AI guidance and resources</p>
                <Link to="/new-hire" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                  Access New Hire View
                </Link>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 flex-1 max-w-md"
              >
                <div className="bg-teal-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-3">Engineering Managers</h3>
                <p className="mb-6 opacity-80">Monitor team progress, receive AI insights, and optimize the onboarding process</p>
                <Link to="/manager" className="inline-block bg-teal-500 hover:bg-teal-600 text-white font-medium py-2 px-6 rounded-lg transition duration-300">
                  Access Manager Dashboard
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white text-center py-6">
        <p className="text-sm opacity-80">© 2025 DevBoost AI - UTM Hackathon Project</p>
      </footer>
    </div>
  );
}

export default LandingPage;
