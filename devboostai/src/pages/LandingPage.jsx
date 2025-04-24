// src/pages/LandingPage.jsx
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Animation variants for reuse
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.5, delay: custom * 0.1 } 
  })
};

// Metric card component for DRY code
const MetricCard = ({ percentage, color, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`bg-white rounded-xl shadow-md p-6 border-t-4 border-${color}`}>
    <div className={`text-4xl font-bold text-${color} mb-2`}>{percentage}%</div>
    <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </motion.div>
);

// User selection panel card component
const UserCard = ({ to, iconBgColor, title, description, buttonText, icon }) => (
  <motion.div 
    whileHover={{ scale: 1.03 }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 flex-1 max-w-md">
    <div className={`bg-${iconBgColor} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-3">{title}</h3>
    <p className="mb-6 opacity-80">{description}</p>
    <Link to={to} className={`inline-block bg-${iconBgColor} hover:bg-${iconBgColor.replace('500', '600')} text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg`}>
      {buttonText}
    </Link>
  </motion.div>
);

function LandingPage() {
  // Memoize the metrics data to prevent unnecessary re-creations
  const metrics = useMemo(() => [
    {
      percentage: 30,
      color: "blue-600",
      title: "Faster Productivity",
      description: "Engineers reach full productivity in record time with AI-guided onboarding"
    },
    {
      percentage: 25,
      color: "teal-500",
      title: "Less Manager Overhead",
      description: "Free up leadership time with automated guidance and progress tracking"
    },
    {
      percentage: 40,
      color: "indigo-400",
      title: "Improved Satisfaction",
      description: "Higher team satisfaction and engagement through personalized support"
    }
  ], []);

  // Memoize the user cards data
  const userCards = useMemo(() => [
    {
      to: "/newhire",
      iconBgColor: "blue-500",
      title: "New Engineers",
      description: "Navigate your onboarding journey with personalized AI guidance and resources",
      buttonText: "Access New Hire View",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    },
    {
      to: "/manager",
      iconBgColor: "teal-500",
      title: "Engineering Managers",
      description: "Monitor team progress, receive AI insights, and optimize the onboarding process",
      buttonText: "Access Manager Dashboard",
      icon: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ], []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Main content area */}
      <main className="flex-grow flex flex-col">
        {/* Hero Section - Optimized for 5-10 second demo */}
        <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-16 px-4 flex-grow flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto w-full relative overflow-hidden">
          {/* Background pattern for visual interest */}
          <div className="absolute inset-0 opacity-10">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
                  <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
          
          <div className="md:w-1/2 text-left mb-8 md:mb-0 md:pr-8 z-10">
            <motion.h1 
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            >
              DevBoost AI: Accelerating Engineer Onboarding with AI
            </motion.h1>
            <motion.p 
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="text-lg md:text-xl mb-6"
            >
              30% faster productivity, 25% less manager overhead
            </motion.p>

            {/* NEW: Testimonial quote from engineer */}
            <motion.div
              custom={1.5}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="mb-6 bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-400 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">JD</span>
                </div>
                <div>
                  <p className="italic text-sm text-white/90">"DevBoost AI cut my onboarding time in half and made me productive weeks earlier than expected."</p>
                  <p className="text-xs text-white/70 mt-1">- John Doe, Software Engineer</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/newhire" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-50 transition-all duration-300 text-center group">
                New Hire View
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">→</span>
              </Link>
              <Link to="/manager" className="bg-teal-400 hover:bg-teal-500 text-white font-semibold py-3 px-8 rounded-lg shadow-md transition-all duration-300 text-center group">
                Manager View
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">→</span>
              </Link>
            </motion.div>
          </div>
          
          {/* Animated illustration */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="md:w-1/2 relative z-10"
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
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${month === 1 ? 'bg-white text-blue-600 shadow-lg' : 'border-2 border-white/50'}`}>
                          {month}
                        </div>
                        <span className="text-xs">Month {month}</span>
                        {month === 1 && (
                          <motion.span 
                            animate={{ scale: [1, 1.05, 1] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="text-xs font-bold mt-1 bg-white/20 px-2 py-1 rounded-full"
                          >
                            You are here
                          </motion.span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {/* AI Assistant */}
                  <motion.div 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-white text-gray-800 p-4 rounded-lg shadow-lg max-w-xs mx-auto relative"
                  >
                    <div className="absolute -top-3 -left-3 w-8 h-8 bg-indigo-500 rounded-full flex items-center justify-center shadow-md">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <motion.div
                      animate={{ 
                        opacity: [0, 1],
                        transition: { delay: 1, duration: 0.5 }
                      }}
                    >
                      <p className="text-sm">Welcome! I'll guide you through your onboarding journey.</p>
                      <div className="flex mt-2">
                        <button className="text-xs text-blue-600 mr-2">Ask a question</button>
                        <button className="text-xs text-gray-500">Next steps →</button>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* Key Metrics Section */}
        <section className="py-16 px-4 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center text-gray-800 mb-12"
            >
              Accelerate Your Engineering Team
            </motion.h2>
            
            {/* NEW: Productivity Curve Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-16 bg-white rounded-xl shadow-lg p-6 border border-gray-200"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4">Engineer Productivity Over Time</h3>
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="md:w-2/3 h-64 relative">
                  {/* Coordinate system */}
                  <div className="absolute left-0 bottom-0 w-full h-full flex flex-col justify-between">
                    <div className="w-full border-b border-gray-200 h-0 relative">
                      <span className="absolute -top-6 -left-2 text-xs text-gray-500">100%</span>
                    </div>
                    <div className="w-full border-b border-gray-200 h-0 relative">
                      <span className="absolute -top-6 -left-2 text-xs text-gray-500">75%</span>
                    </div>
                    <div className="w-full border-b border-gray-200 h-0 relative">
                      <span className="absolute -top-6 -left-2 text-xs text-gray-500">50%</span>
                    </div>
                    <div className="w-full border-b border-gray-200 h-0 relative">
                      <span className="absolute -top-6 -left-2 text-xs text-gray-500">25%</span>
                    </div>
                    <div className="w-full border-b border-gray-200 h-0 relative">
                      <span className="absolute -top-6 -left-2 text-xs text-gray-500">0%</span>
                    </div>
                  </div>
                  
                  {/* X-axis labels */}
                  <div className="absolute left-0 bottom-0 w-full flex justify-between px-6 pb-4">
                    <span className="text-xs text-gray-500">Week 1</span>
                    <span className="text-xs text-gray-500">Week 4</span>
                    <span className="text-xs text-gray-500">Week 8</span>
                    <span className="text-xs text-gray-500">Week 12</span>
                  </div>
                  
                  {/* Traditional curve */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-full"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path 
                        d="M0,100 Q25,85 50,70 T100,45" 
                        fill="none" 
                        stroke="#9CA3AF" 
                        strokeWidth="3"
                        strokeDasharray="0 1"
                        strokeDashoffset="0"
                        style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: "dash 2s linear forwards" }}
                      />
                      <text x="70" y="55" fill="#6B7280" fontSize="3.5" textAnchor="middle" fontWeight="500">
                        Traditional Onboarding
                      </text>
                    </svg>
                  </motion.div>

                  {/* DevBoost AI curve */}
                  <motion.div 
                    className="absolute bottom-0 left-0 w-full h-full"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 1 }}
                  >
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <path 
                        d="M0,100 Q15,65 40,40 T100,20" 
                        fill="none" 
                        stroke="#3B82F6" 
                        strokeWidth="4"
                        style={{ strokeDasharray: 1000, strokeDashoffset: 1000, animation: "dash 2s linear forwards" }}
                      />
                      <text x="70" y="30" fill="#2563EB" fontSize="4" fontWeight="bold" textAnchor="middle">
                        With DevBoost AI
                      </text>

                      {/* Acceleration indicator - repositioned and improved */}
                      <motion.g
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 2, duration: 0.5 }}
                      >
                        {/* Green arrow */}
                        <path 
                          d="M30,70 L50,40" 
                          fill="none" 
                          stroke="#10B981" 
                          strokeWidth="2"
                          markerEnd="url(#arrowhead)"
                        />
                        
                        {/* Arrowhead definition */}
                        <defs>
                          <marker
                            id="arrowhead"
                            markerWidth="10"
                            markerHeight="7"
                            refX="9"
                            refY="3.5"
                            orient="auto"
                          >
                            <polygon points="0 0, 10 3.5, 0 7" fill="#10B981" />
                          </marker>
                        </defs>
                        
                        {/* Text label with background for better visibility */}
                        <rect 
                          x="35" 
                          y="35" 
                          width="30" 
                          height="10" 
                          rx="5" 
                          fill="#E5FAF0" 
                          stroke="#10B981"
                          strokeWidth="0.5"
                        />
                        <text 
                          x="50" 
                          y="42" 
                          fill="#059669" 
                          fontSize="4" 
                          fontWeight="bold" 
                          textAnchor="middle"
                        >
                          30% Faster
                        </text>
                      </motion.g>
                    </svg>
                  </motion.div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-bold text-blue-800 text-lg mb-2">How DevBoost AI Accelerates</h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Personalized learning paths based on role</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>24/7 AI assistance for instant answers</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Automated task tracking & progress monitoring</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-blue-500 mr-1.5 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Reduced manager involvement in routine tasks</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {metrics.map((metric, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <MetricCard {...metric} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ENHANCED: Visual Comparison Section */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold text-center text-gray-800 mb-12"
            >
              Traditional vs. DevBoost AI-Powered Onboarding
            </motion.h2>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Traditional Onboarding Path */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex-1 bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <div className="bg-gray-200 p-5">
                  <h3 className="text-xl font-bold text-gray-700 flex items-center">
                    <svg className="w-6 h-6 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Traditional Onboarding
                  </h3>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-gray-500">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Lengthy Setup Process</h4>
                      <p className="text-sm text-gray-600">Manual documentation and setup that takes weeks</p>
                    </div>
                  </div>

                  <div className="w-0.5 h-8 bg-gray-200 ml-6"></div>

                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-gray-500">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Heavy Manager Involvement</h4>
                      <p className="text-sm text-gray-600">Managers spend 5+ hours/week per new hire</p>
                    </div>
                  </div>

                  <div className="w-0.5 h-8 bg-gray-200 ml-6"></div>

                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-gray-500">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Information Overload</h4>
                      <p className="text-sm text-gray-600">Same generic content for all new hires</p>
                    </div>
                  </div>

                  <div className="w-0.5 h-8 bg-gray-200 ml-6"></div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-xl font-bold text-gray-500">4</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Productive After 3+ Months</h4>
                      <p className="text-sm text-gray-600">Slow ramp-up with minimal tracking</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* VS Divider */}
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex items-center justify-center py-4 lg:py-0"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  VS
                </div>
              </motion.div>

              {/* AI-Powered Onboarding Path */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex-1 bg-white rounded-xl shadow-md border border-blue-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-5 text-white">
                  <h3 className="text-xl font-bold flex items-center">
                    <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    DevBoost AI Onboarding
                  </h3>
                </div>

                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Automated Setup Guidance</h4>
                      <p className="text-sm text-gray-600">Interactive AI walkthrough reduces setup time by 50%</p>
                    </div>
                  </div>

                  <div className="w-0.5 h-8 bg-blue-100 ml-6"></div>

                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">75% Less Manager Time</h4>
                      <p className="text-sm text-gray-600">AI handles routine questions and provides guidance</p>
                    </div>
                  </div>

                  <div className="w-0.5 h-8 bg-blue-100 ml-6"></div>

                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Personalized Content</h4>
                      <p className="text-sm text-gray-600">Tailored resources based on role and experience</p>
                    </div>
                  </div>

                  <div className="w-0.5 h-8 bg-blue-100 ml-6"></div>

                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 text-blue-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">Productive in 6-8 Weeks</h4>
                      <p className="text-sm text-gray-600">Accelerated timeline with measurable progress</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="mt-12 text-center"
            >
              <Link 
                to="/manager" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                See the Difference in Action
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* User Selection Panel - Expanded */}
        <section className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-16 px-4">
          <div className="max-w-7xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl font-bold mb-8"
            >
              Get Started with DevBoost AI
            </motion.h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              {userCards.map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <UserCard {...card} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
