// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Use NavLink for active styling

function Navbar() {
  // Define an active style for NavLink
  const activeStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'underline' : 'none',
    };
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50"> {/* Use blue based on docs [cite: 77] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              DevBoost AI
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/"
                style={activeStyle}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                Home
              </NavLink>
              <NavLink
                to="/timeline"
                style={activeStyle}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                My Timeline
              </NavLink>
              {/* Consider adding First Month route if needed */}
              {/* <NavLink
                to="/first-month"
                style={activeStyle}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                First Month
              </NavLink> */}
              <NavLink
                to="/dashboard"
                style={activeStyle}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                Manager Dashboard
              </NavLink>
              {/* Add other links like Profile, Settings later */}
            </div>
          </div>

          {/* Placeholder for Mobile Menu Button - Implement later if needed */}
          <div className="md:hidden">
            <button className="bg-blue-600 inline-flex items-center justify-center p-2 rounded-md text-blue-200 hover:text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-600 focus:ring-white">
              {/* Icon placeholder */}
              <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
