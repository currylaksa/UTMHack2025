// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar'; // <-- Import Navbar
import LandingPage from './pages/LandingPage';
import TimelinePage from './pages/TimelinePage'; // <-- Import TimelinePage
import ManagerDashboard from './pages/ManagerDashboard'; // <-- Import ManagerDashboard
// Import FirstMonthPage if you create it

function App() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Added flex layout */}
      <Navbar /> {/* <-- Render Navbar here, outside Routes */}
      <main className="flex-grow"> {/* Added main wrapper */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/timeline" element={<TimelinePage />} /> {/* <-- Add Timeline route */}
          {/* <Route path="/first-month" element={<FirstMonthPage />} /> */}
          <Route path="/dashboard" element={<ManagerDashboard />} /> {/* <-- Add Dashboard route */}
          {/* Add a 404 Not Found route */}
          <Route path="*" element={<div className="p-8 text-center"><h1 className="text-xl font-bold">404 - Page Not Found</h1></div>} />
        </Routes>
      </main>
      {/* You might still want a separate Footer component below main */}
    </div>
  );
}

export default App;
