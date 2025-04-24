// src/App.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { useEffect } from 'react';
import { EmotionProvider } from './services/EmotionContext';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages & Layouts
import LandingPage from './pages/LandingPage';
import NewHireLayout from './pages/newhires/NewHireLayout';
import TimelineView from './pages/newhires/TimelineView';
import FirstMonthView from './pages/newhires/FirstMonthView';
import ManagerDashboard from './pages/manager/ManagerDashboard';

// Error Fallback Component
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div className="max-w-md w-full space-y-8 text-center">
      <div className="rounded-xl bg-white p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
        <pre className="text-sm text-red-600 bg-red-50 p-4 rounded-lg mb-4 overflow-auto">
          {error.message}
        </pre>
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Try again
        </button>
      </div>
    </div>
  </div>
);

function App() {
  useEffect(() => {
    // Handle message port closure
    const handleError = (error) => {
      if (error?.message?.includes('message port closed')) {
        console.warn('Message port closed:', error);
        // Attempt to reconnect or handle gracefully
        return;
      }
      console.error('Application error:', error);
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleError);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleError);
    };
  }, []);

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <EmotionProvider>
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
          <Footer />
        </div>
      </EmotionProvider>
    </ErrorBoundary>
  );
}

export default App;
