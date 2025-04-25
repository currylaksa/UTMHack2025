import React from 'react';
import { UserGroupIcon } from '@heroicons/react/24/outline';

const TeamMembersSection = ({ teamMembers, activeTeamMember, onTeamMemberSelect }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 text-white">
        <h2 className="text-lg font-semibold flex items-center">
          <UserGroupIcon className="w-6 h-6 mr-2" />
          Meet Your Team
        </h2>
        <p className="text-sm text-indigo-100 mt-1">Your key contacts during onboarding</p>
      </div>
      
      <div className="p-4">
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-1">
          {teamMembers.map(member => (
            <button
              key={member.id}
              onClick={() => onTeamMemberSelect(member.id)}
              className={`
                px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap
                ${activeTeamMember === member.id 
                  ? 'bg-indigo-100 text-indigo-800' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                transition-colors duration-200
              `}
            >
              {member.name.split(' ')[0]}
            </button>
          ))}
        </div>
        
        {teamMembers.map(member => (
          activeTeamMember === member.id && (
            <div key={member.id} className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center mb-3">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 text-white flex items-center justify-center text-xl font-bold mr-4">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-sm text-gray-600">{member.role}</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-700 mb-3">{member.bio}</p>
              
              <div className="text-sm bg-white rounded-lg p-3 border border-gray-200 space-y-2">
                <div className="flex">
                  <span className="text-gray-500 w-24">Contact:</span>
                  <span className="text-blue-600">{member.contactInfo}</span>
                </div>
                <div className="flex">
                  <span className="text-gray-500 w-24">Available:</span>
                  <span>{member.meetingAvailability}</span>
                </div>
              </div>
              
              <button className="mt-3 w-full py-2 bg-indigo-100 text-indigo-700 rounded-md text-sm font-medium hover:bg-indigo-200 transition-colors">
                Schedule 1:1 Meeting
              </button>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default TeamMembersSection;