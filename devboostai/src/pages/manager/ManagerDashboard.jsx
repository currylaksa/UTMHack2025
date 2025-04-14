// src/pages/manager/ManagerDashboard.jsx
import React from 'react';

function ManagerDashboard() {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h2 className="font-semibold mb-2">Team Overview / Status</h2>
          <div className="border p-4 h-64 bg-gray-100 rounded">Charts/Tables...</div>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Priority Alerts / AI Insights</h2>
          <div className="border p-4 h-64 bg-gray-100 rounded">Alerts/Recommendations...</div>
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
