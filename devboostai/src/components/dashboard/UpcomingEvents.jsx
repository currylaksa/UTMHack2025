import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';

const UpcomingEvents = ({ events }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-4 text-white">
        <h2 className="text-lg font-semibold flex items-center">
          <CalendarIcon className="w-6 h-6 mr-2" />
          Upcoming Events
        </h2>
      </div>
      
      <div className="p-4">
        <ul className="space-y-2">
          {events.map(event => (
            <li 
              key={event.id} 
              className={`
                p-3 rounded-lg border
                ${event.type === 'important' 
                  ? 'border-blue-200 bg-blue-50' 
                  : 'border-gray-100 bg-white'}
              `}
            >
              <div className="flex justify-between">
                <span className="font-medium text-gray-800 text-sm">{event.title}</span>
                {event.type === 'important' && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                    <span className="text-xs font-medium">Important</span>
                  </span>
                )}
              </div>
              <div className="text-xs text-gray-500">{event.date} at {event.time}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UpcomingEvents;