// src/pages/newhires/FirstMonthView.jsx
import React from 'react';

function FirstMonthView() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-3">First Month Experience</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="font-medium">AI Assistant Chat</h3>
          <div className="border p-2 h-48 bg-gray-100 rounded">Chat interface...</div>
        </div>
        <div>
          <h3 className="font-medium">Technical Setup Guide</h3>
          <div className="border p-2 h-48 bg-gray-100 rounded">Setup checklist...</div>
        </div>
        <div>
          <h3 className="font-medium">Team Introduction</h3>
          <div className="border p-2 h-48 bg-gray-100 rounded">Team photos/roles...</div>
        </div>
         <div>
          <h3 className="font-medium">Resources Panel</h3>
          <div className="border p-2 h-48 bg-gray-100 rounded">Links/docs...</div>
        </div>
      </div>
    </div>
  );
}

export default FirstMonthView;
