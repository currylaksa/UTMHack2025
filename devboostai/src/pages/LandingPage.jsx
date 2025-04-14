// src/pages/LandingPage.jsx
import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation

function LandingPage() {
  // Based on descriptions in DevBoostAI_CompleteGuide.docx [cite: 14]
  // and DevBoostAI_FrontEndSystem.docx [cite: 73]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Optional: Add a Navbar component here if needed */}
      {/* <Navbar /> */}

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-teal-500 text-white py-20 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome to DevBoost AI
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-3xl mx-auto">
            Transforming the software engineer onboarding experience with personalized AI guidance throughout the critical first year.[cite: 27]
          </p>
          {/* Placeholder for Animated Demo */}
          <div className="bg-white/20 h-48 w-full max-w-2xl mx-auto rounded-lg flex items-center justify-center mb-8 shadow-lg">
            <p className="text-gray-200">[Animated Demonstration Placeholder]</p>
          </div>
          <div className="space-x-4">
             {/* Use Link for internal navigation later */}
            <button className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition duration-300">
              I'm a New Hire
            </button>
            <button className="bg-teal-400 hover:bg-teal-300 text-white font-semibold py-2 px-6 rounded-full shadow transition duration-300">
              I'm a Manager
            </button>
             {/* Example using Link if you have routes set up:
             <Link to="/timeline" className="bg-white text-blue-700 font-semibold py-2 px-6 rounded-full shadow hover:bg-gray-100 transition duration-300">
               I'm a New Hire
             </Link>
             <Link to="/dashboard" className="bg-teal-400 hover:bg-teal-300 text-white font-semibold py-2 px-6 rounded-full shadow transition duration-300">
               I'm a Manager
             </Link>
             */}
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Key Features
          </h2>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-200">
              {/* Placeholder Icon */}
              <div className="text-blue-500 mb-3 inline-block">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Personalized Learning Paths</h3>
              <p className="text-gray-600">AI-driven journeys tailored to your role and progress.</p>
            </div>
            {/* Feature 2 */}
             <div className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-200">
               <div className="text-teal-500 mb-3 inline-block">
                 <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
               </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">24/7 AI Support</h3>
              <p className="text-gray-600">Instant answers to common questions, anytime.</p>
            </div>
             {/* Feature 3 */}
             <div className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-200">
               <div className="text-indigo-500 mb-3 inline-block">
                 <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
               </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Progress Tracking</h3>
              <p className="text-gray-600">Automated tracking of milestones and tasks.</p>
            </div>
            {/* Feature 4 */}
            <div className="text-center p-6 bg-white rounded-lg shadow-md border border-gray-200">
              <div className="text-pink-500 mb-3 inline-block">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-700">Manager Insights</h3>
              <p className="text-gray-600">Predictive insights to better support your team.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section (Simulated) */}
        <section className="bg-gray-100 py-16 px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">"DevBoost AI made my first few months seamless. The AI knew exactly what I needed before I even asked!"</p>
              <p className="font-semibold text-gray-800">- Simulated Engineer</p>
            </div>
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow">
              <p className="text-gray-600 mb-4">"The manager dashboard gives me actionable insights to support my new hires effectively. It's a game-changer."</p>
              <p className="font-semibold text-gray-800">- Simulated Manager</p>
            </div>
          </div>
        </section>
      </main>

      {/* Optional: Add a Footer component here */}
      {/* <Footer /> */}
       <footer className="bg-gray-800 text-white text-center p-4">
        © 2025 DevBoost AI - UTM Hackathon
      </footer>
    </div>
  );
}

export default LandingPage;
