// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages & Layouts
import LandingPage from './pages/LandingPage';
import NewHireLayout from './pages/newhires/NewHireLayout';
import TimelineView from './pages/newhires/TimelineView';
import FirstMonthView from './pages/newhires/FirstMonthView';
import ManagerDashboard from './pages/manager/ManagerDashboard';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          {/* Landing Page Route */}
          <Route path="/" element={<LandingPage />} />

          {/* New Hire Nested Routes */}
          <Route path="/newhire" element={<NewHireLayout />}>
            {/* Redirect from base /newhire to /newhire/timeline */}
            <Route index element={<Navigate to="/newhire/timeline" replace />} />
            
            {/* Fixed route paths to match the Navbar links */}
            <Route path="timeline" element={<TimelineView />} />
            <Route path="firstmonth" element={<FirstMonthView />} />
          </Route>

          {/* Ensure old links still work with redirects */}
          <Route path="/newhire/first-month" element={<Navigate to="/newhire/firstmonth" replace />} />

          {/* Manager Dashboard Route */}
          <Route path="/manager" element={<ManagerDashboard />} />

          {/* 404 Not Found Route */}
          <Route 
            path="*" 
            element={
              <div className="p-8 text-center">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
                <a 
                  href="/" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
                >
                  Return to Home
                </a>
              </div>
            } 
          />
        </Routes>
      </main>
      {/* Footer can be added here if needed */}
    </div>
  );
}

export default App;
