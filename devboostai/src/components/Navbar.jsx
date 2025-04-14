// src/components/Navbar.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const activeStyle = ({ isActive }) => {
    return {
      fontWeight: isActive ? 'bold' : 'normal',
      textDecoration: isActive ? 'underline' : 'none',
    };
  };

  return (
    <nav className="bg-blue-700 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              DevBoost AI
            </Link>
          </div>

          {/* Navigation Links - Updated Paths */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink
                to="/" // Home/Landing Page
                style={activeStyle}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
                end // Match only the exact root path
              >
                Home
              </NavLink>
              <NavLink
                to="/newhire" // Link to the New Hire base route
                style={activeStyle}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                New Hire View
              </NavLink>
              <NavLink
                to="/manager" // Link to the Manager Dashboard
                style={activeStyle}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-600"
              >
                Manager Dashboard
              </NavLink>
            </div>
          </div>

          {/* Mobile Menu Button Placeholder */}
          {/* ... (keep the mobile button if you had it) ... */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
