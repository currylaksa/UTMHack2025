// src/pages/newhires/NewHireLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

function NewHireLayout() {
  // Function to determine NavLink styles (bold, blue underline for active)
  const activeStyle = ({ isActive }) => `
    py-3 px-1 mr-4 text-sm font-medium border-b-2 transition-colors duration-150
    ${isActive
      ? 'border-blue-600 text-blue-700'
      : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
    }
  `;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Welcome, New Hire!
        </h1>
        <p className="mt-1 text-md text-gray-600">
          Your personalized onboarding journey starts here.
        </p>
      </header>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-6" aria-label="Tabs">
          <NavLink
            to="/newhire" // Base path for this layout
            className={activeStyle}
            end // Match only "/newhire", not sub-routes like "/newhire/first-month"
          >
            12-Month Timeline
          </NavLink>
          <NavLink
            to="first-month" // Relative path to "/newhire/first-month"
            className={activeStyle}
          >
            First Month Focus
          </NavLink>
          {/* Add more tabs here if needed later */}
        </nav>
      </div>

      {/* Content Area for Nested Routes */}
      {/* Renders the component matched by the nested route (TimelineView or FirstMonthView) */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default NewHireLayout;
