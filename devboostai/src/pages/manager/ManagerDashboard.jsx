// src/pages/manager/ManagerDashboard.jsx
import React from 'react';
import { UsersIcon, CheckBadgeIcon, ExclamationTriangleIcon, LightBulbIcon, ChevronRightIcon } from '@heroicons/react/24/outline'; // Example icons

// --- Mock Data ---
// In a real app, this would come from an API / state management
const mockTeamMembers = [
  { id: 'tm1', name: 'Sarah Chen', role: 'Software Engineer I', startDate: '2025-03-15', currentMonthInJourney: 2, progressPercent: 45, productivity: 'Needs Support', avatar: '/path/to/sarah.jpg' },
  { id: 'tm2', name: 'James Wilson', role: 'Software Engineer II', startDate: '2025-02-01', currentMonthInJourney: 3, progressPercent: 75, productivity: 'Exceeding', avatar: '/path/to/james.jpg' },
  { id: 'tm3', name: 'Priya Patel', role: 'Software Engineer I', startDate: '2025-04-01', currentMonthInJourney: 1, progressPercent: 85, productivity: 'On Track', avatar: '/path/to/priya.jpg' },
  { id: 'tm4', name: 'Michael Brown', role: 'Senior Software Engineer', startDate: '2024-12-01', currentMonthInJourney: 5, progressPercent: 60, productivity: 'On Track', avatar: '/path/to/michael.jpg' },
];

// Mock AI Insights based on DevBoostAI_CompleteGuide.docx [cite: 67, 68]
const mockAiInsights = [
  { id: 'ai1', text: 'Sarah Chen may need additional support with technical environment setup. Consider scheduling a pairing session.', type: 'warning' },
  { id: 'ai2', text: 'James Wilson is progressing quickly through onboarding milestones and may be ready for more challenging tasks.', type: 'info' },
  { id: 'ai3', text: 'Recommended action: Schedule a team sync next week to address common questions about the deployment process.', type: 'recommendation' },
];

// Helper function to get month title (simplified)
const getMonthTitle = (monthNum) => {
    if (monthNum <= 1) return "Pre-boarding / Setup";
    if (monthNum <= 2) return "Training & Goals";
    if (monthNum <= 4) return "Culture & HR Check";
    if (monthNum <= 7) return "Continued Training";
    if (monthNum <= 10) return "Skill Review / Impact";
    return "Retention / Development";
}

// Helper function for productivity badge styling based on status colors [cite: 77]
const getProductivityClass = (productivity) => {
  switch (productivity?.toLowerCase()) {
    case 'on track':
      return 'bg-green-100 text-green-800'; // Success
    case 'needs support':
      return 'bg-yellow-100 text-yellow-800'; // Warning
    case 'at risk':
      return 'bg-red-100 text-red-800'; // Alert
    case 'exceeding':
        return 'bg-blue-100 text-blue-800'; // Info/Positive emphasis
    default:
      return 'bg-gray-100 text-gray-800';
  }
};
// --- End Mock Data ---


function ManagerDashboard() {
  // Calculate overview stats from mock data
  const totalMembers = mockTeamMembers.length;
  const onTrackMembers = mockTeamMembers.filter(m => m.productivity?.toLowerCase() === 'on track' || m.productivity?.toLowerCase() === 'exceeding').length;
  const onTrackPercent = totalMembers > 0 ? Math.round((onTrackMembers / totalMembers) * 100) : 0;
  const actionsNeeded = mockAiInsights.filter(i => i.type === 'warning' || i.type === 'recommendation').length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <header className="mb-8 md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
           <h1 className="text-3xl font-bold text-gray-900 leading-tight">
             Manager Dashboard
           </h1>
           <p className="mt-1 text-md text-gray-600">
             Overview of your team's onboarding progress and AI-driven insights.
           </p>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
           <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
          >
            Filter
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add New Hire
          </button>
        </div>
      </header>

      {/* Overview Stats Section [cite: 53, 54, 55, 56] */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        {/* Card 1: Team Members */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UsersIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Active New Hires</dt>
                  <dd className="text-3xl font-semibold text-gray-900">{totalMembers}</dd>
                </dl>
              </div>
            </div>
          </div>
           <div className="bg-gray-50 px-5 py-3">
             <div className="text-sm">
               {/* Placeholder link */}
               <a href="#" className="font-medium text-blue-700 hover:text-blue-900"> View all </a>
             </div>
           </div>
        </div>

        {/* Card 2: On Track % */}
         <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
           <div className="p-5">
             <div className="flex items-center">
               <div className="flex-shrink-0">
                 <CheckBadgeIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
               </div>
               <div className="ml-5 w-0 flex-1">
                 <dl>
                   <dt className="text-sm font-medium text-gray-500 truncate">On Track Progress</dt>
                   <dd>
                    <div className="text-3xl font-semibold text-gray-900">{onTrackPercent}%</div>
                    <div className={`mt-1 text-xs font-medium ${onTrackPercent >= 75 ? 'text-green-600' : 'text-yellow-600'}`}>
                        {onTrackMembers} / {totalMembers} members meeting expectations
                    </div>
                   </dd>
                 </dl>
               </div>
             </div>
           </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                {/* Placeholder link */}
                <a href="#" className="font-medium text-blue-700 hover:text-blue-900"> View details </a>
              </div>
            </div>
         </div>

        {/* Card 3: Actions Needed */}
        <div className="bg-white overflow-hidden shadow rounded-lg border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ExclamationTriangleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Insights & Actions</dt>
                   <dd>
                    <div className="text-3xl font-semibold text-gray-900">{actionsNeeded}</div>
                     <div className={`mt-1 text-xs font-medium ${actionsNeeded > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                        {actionsNeeded > 0 ? `${actionsNeeded} items require attention` : 'No immediate actions'}
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
           <div className="bg-gray-50 px-5 py-3">
             <div className="text-sm">
               {/* Placeholder link */}
               <a href="#ai-insights" className="font-medium text-blue-700 hover:text-blue-900"> View insights </a>
             </div>
           </div>
        </div>
      </section>

        {/* Main Content Area: Table and Insights */}
       <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Team Members Table [cite: 57, 58, 59, 60, 61, 62, 63, 64, 65] */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Team Member Status</h2>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Stage</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Productivity</th>
                  <th scope="col" className="relative px-4 py-3"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockTeamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-full object-cover bg-gray-200" src={member.avatar} alt="" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.role}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">Month {member.currentMonthInJourney}</div>
                      <div className="text-sm text-gray-500">{getMonthTitle(member.currentMonthInJourney)}</div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                       <div className="flex items-center">
                           <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                              <div className="bg-blue-600 h-2 rounded-full" style={{ width: `${member.progressPercent}%` }}></div>
                           </div>
                           <span className="text-sm text-gray-600">{member.progressPercent}%</span>
                       </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getProductivityClass(member.productivity)}`}>
                        {member.productivity}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                        View Details <ChevronRightIcon className="w-4 h-4 ml-1"/>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         {/* AI Insights Section [cite: 66, 67, 68, 69] */}
          <div id="ai-insights" className="bg-blue-50 border border-blue-100 rounded-lg p-6 shadow-sm h-fit">
             <h2 className="text-lg font-semibold mb-4 text-blue-800 flex items-center">
                <LightBulbIcon className="w-6 h-6 mr-2 text-blue-600"/>
                AI-Generated Insights
             </h2>
             <div className="space-y-4">
               {mockAiInsights.map((insight) => (
                 <div key={insight.id} className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                       {insight.type === 'warning' && <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />}
                       {insight.type === 'info' && <CheckBadgeIcon className="h-5 w-5 text-green-500" aria-hidden="true" />}
                       {insight.type === 'recommendation' && <LightBulbIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />}
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-blue-700">{insight.text}</p>
                    </div>
                 </div>
               ))}
             </div>
         </div>
       </section>

    </div>
  );
}

export default ManagerDashboard;
