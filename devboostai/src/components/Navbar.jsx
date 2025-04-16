// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

function Navbar() {
  const [userType, setUserType] = useState(null);
  const [currentViewTitle, setCurrentViewTitle] = useState('Home');
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Update view title and user type based on current route
  useEffect(() => {
    const path = location.pathname;
    
    // Set current view title and user type
    if (path === '/') {
      setCurrentViewTitle('Home');
      setUserType(null);
    } else if (path.startsWith('/newhire')) { // Use startsWith for nested routes
      setUserType('New Hire');
      // Update title based on specific new hire page
      if (path === '/newhire/firstmonth') {
         setCurrentViewTitle('First Month Details'); // Specific title for this view
      } else {
         setCurrentViewTitle('Onboarding Timeline'); // Default title for /newhire or /newhire/timeline
      }
    } else if (path.startsWith('/manager')) {
      setCurrentViewTitle('Manager Dashboard');
      setUserType('Manager');
    } else {
      setCurrentViewTitle('Page Not Found');
      setUserType(null);
    }
  }, [location]);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold">DevBoost AI</span>
            </Link>
          </div>

          {/* Current View Title - Center */}
          <div className="hidden md:flex items-center justify-center absolute left-0 right-0 mx-auto pointer-events-none">
            <h1 className="text-lg font-medium">{currentViewTitle}</h1>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-1">
            {/* ----- REMOVED New Hire specific tabs ----- */}
            
            {/* Demo Controls - Quick Switch */}
            <div className="flex items-center space-x-2">
              <NavLink
                to="/newhire/timeline" // Points to the default New Hire view
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname.startsWith('/newhire') 
                      ? 'bg-blue-900' 
                      : 'hover:bg-blue-500'
                  }`
                }
              >
                New Hire
              </NavLink>
              <NavLink
                to="/manager"
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    isActive ? 'bg-blue-900' : 'hover:bg-blue-500'
                  }`
                }
              >
                Manager
              </NavLink>
            </div>

            {/* User Type Indicator */}
            {userType && (
              <div className="ml-4 flex items-center">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  userType === 'New Hire' ? 'bg-teal-500' : 'bg-indigo-500'
                }`}>
                  {userType} Mode
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-blue-800">
          <NavLink
            to="/"
            className={({ isActive }) => 
              `block px-3 py-2 rounded-md text-base font-medium ${
                isActive ? 'bg-blue-900 text-white' : 'hover:bg-blue-700'
              }`
            }
            onClick={() => setMobileMenuOpen(false)}
            end
          >
            Home
          </NavLink>
          
          {/* New Hire Option (Simplified) */}
          <div className="py-1 border-t border-blue-700">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              New Hire View
            </div>
            <NavLink
              to="/newhire/timeline" // Link directly to the timeline
              className={({ isActive }) => 
                // Highlight if on any /newhire page
                `block pl-6 pr-3 py-2 rounded-md text-base font-medium ${
                  location.pathname.startsWith('/newhire') ? 'bg-blue-900 text-white' : 'hover:bg-blue-700'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
              // `end` prop might be needed if you want it only active on /timeline exactly
              // end 
            >
              Onboarding Timeline
            </NavLink>
             {/* ----- REMOVED First Month Experience link ----- */}
          </div>
          
          {/* Manager Dashboard */}
          <div className="py-1 border-t border-blue-700">
            <div className="px-3 py-2 text-xs font-bold uppercase tracking-wider text-blue-300">
              Manager View
            </div>
            <NavLink
              to="/manager"
              className={({ isActive }) => 
                `block pl-6 pr-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-blue-900 text-white' : 'hover:bg-blue-700'
                }`
              }
              onClick={() => setMobileMenuOpen(false)}
            >
              Manager Dashboard
            </NavLink>
          </div>
          
          {/* Current Mode Indicator */}
          {userType && (
            <div className="mt-4 px-3 py-2">
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                userType === 'New Hire' ? 'bg-teal-500' : 'bg-indigo-500'
              }`}>
                Currently in: {userType} Mode
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
