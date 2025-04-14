// src/App.jsx
import { Routes, Route } from 'react-router-dom';

// Components
import Navbar from './components/Navbar';

// Pages & Layouts
import LandingPage from './pages/LandingPage'; // Now in pages
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
          <Route path="/newhire" element={<NewHireLayout />}> {/* Parent Route */}
            <Route index element={<TimelineView />} /> {/* Default nested route (shows at /newhire) */}
            <Route path="first-month" element={<FirstMonthView />} /> {/* Shows at /newhire/first-month */}
            {/* Add more nested routes for new hires if needed */}
          </Route>

          {/* Manager Dashboard Route */}
          <Route path="/manager" element={<ManagerDashboard />} />

          {/* 404 Not Found Route */}
          <Route path="*" element={<div className="p-8 text-center"><h1 className="text-xl font-bold">404 - Page Not Found</h1></div>} />
        </Routes>
      </main>
      {/* Optional Footer */}
    </div>
  );
}

export default App;
