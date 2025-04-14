// src/pages/newhires/NewHireLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // Import Outlet

function NewHireLayout() {
  const activeStyle = ({ isActive }) => ({ // Style for active tab
    borderBottom: isActive ? '2px solid blue' : '2px solid transparent',
    fontWeight: isActive ? 'bold' : 'normal',
    color: isActive ? 'blue' : 'black',
  });

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">New Hire Onboarding</h1>

      {/* Tab Navigation */}
      <div className="mb-6 border-b border-gray-300">
        <nav className="flex space-x-4">
          {/* Use relative paths "" and "first-month" */}
          <NavLink
            to="" // Empty path links to the base route "/newhire"
            style={activeStyle}
            end // Add 'end' prop to only match the base route exactly
            className="py-2 px-1 hover:border-blue-500"
          >
            Timeline View
          </NavLink>
          <NavLink
            to="first-month" // Links to "/newhire/first-month"
            style={activeStyle}
            className="py-2 px-1 hover:border-blue-500"
          >
            First Month Experience
          </NavLink>
        </nav>
      </div>

      {/* Content Area for Nested Routes */}
      {/* The Outlet component renders the matched nested route */}
      <Outlet />
    </div>
  );
}

export default NewHireLayout;
