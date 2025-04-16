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
      to: "/new-hire",
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
            <motion.div 
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/new-hire" className="bg-white text-blue-600 font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-blue-50 transition-all duration-300 text-center group">
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

      <footer className="bg-gray-800 text-white text-center py-6">
        <p className="text-sm opacity-80">© 2025 DevBoost AI - UTM Hackathon Project</p>
      </footer>
    </div>
  );
}

export default LandingPage;
