// src/pages/newhires/NewHireLayout.jsx
import React from 'react';
// Remove NavLink import if no longer needed here
import { Outlet } from 'react-router-dom'; 

function NewHireLayout() {
  // Removed activeStyle function as tabs are gone

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Section Header */}
      <header className="mb-8"> {/* Increased bottom margin */}
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Welcome, New Hire!
        </h1>
        <p className="mt-1 text-md text-gray-600">
          Your personalized onboarding journey starts here.
        </p>
      </header>

      {/* ----- REMOVED Tab Navigation ----- */}
      {/* <div className="border-b border-gray-200 mb-8"> ... </div> */}

      {/* Content Area for Nested Routes */}
      {/* Renders TimelineView by default (due to App.jsx redirect) or FirstMonthView when navigated to */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default NewHireLayout;
