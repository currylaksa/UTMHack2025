// src/pages/manager/ManagerDashboard.jsx
import React, { useState } from 'react';
import { 
  UsersIcon, 
  CheckBadgeIcon, 
  ExclamationTriangleIcon, 
  LightBulbIcon, 
  ChevronRightIcon,
  FunnelIcon,
  PlusIcon
} from '@heroicons/react/24/outline';

// --- Mock Data ---
const mockTeamMembers = [
  { id: 'tm1', name: 'Sarah Chen', role: 'Software Engineer I', startDate: '2025-03-15', currentMonthInJourney: 2, progressPercent: 45, productivity: 'Needs Support', avatar: '/path/to/sarah.jpg' },
  { id: 'tm2', name: 'James Wilson', role: 'Software Engineer II', startDate: '2025-02-01', currentMonthInJourney: 3, progressPercent: 75, productivity: 'Exceeding', avatar: '/path/to/james.jpg' },
  { id: 'tm3', name: 'Priya Patel', role: 'Software Engineer I', startDate: '2025-04-01', currentMonthInJourney: 1, progressPercent: 85, productivity: 'On Track', avatar: '/path/to/priya.jpg' },
  { id: 'tm4', name: 'Michael Brown', role: 'Senior Software Engineer', startDate: '2024-12-01', currentMonthInJourney: 5, progressPercent: 60, productivity: 'On Track', avatar: '/path/to/michael.jpg' },
];

const mockAiInsights = [
  { id: 'ai1', text: 'Sarah Chen may need additional support with technical environment setup. Consider scheduling a pairing session.', type: 'warning' },
  { id: 'ai2', text: 'James Wilson is progressing quickly through onboarding milestones and may be ready for more challenging tasks.', type: 'info' },
  { id: 'ai3', text: 'Recommended action: Schedule a team sync next week to address common questions about the deployment process.', type: 'recommendation' },
];

// Helper functions
const getMonthTitle = (monthNum) => {
  if (monthNum <= 1) return "Pre-boarding / Setup";
  if (monthNum <= 2) return "Training & Goals";
  if (monthNum <= 4) return "Culture & HR Check";
  if (monthNum <= 7) return "Continued Training";
  if (monthNum <= 10) return "Skill Review / Impact";
  return "Retention / Development";
}

const getProductivityClass = (productivity) => {
  switch (productivity?.toLowerCase()) {
    case 'on track':
      return 'bg-green-100 text-green-800';
    case 'needs support':
      return 'bg-yellow-100 text-yellow-800';
    case 'at risk':
      return 'bg-red-100 text-red-800';
    case 'exceeding':
      return 'bg-blue-100 text-blue-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const StatCard = ({ icon: Icon, title, value, subtext, color, linkText, linkHref }) => (
  <div className="bg-white overflow-hidden shadow-md rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-lg">
    <div className="p-5">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-full ${color ? `bg-${color}-50` : 'bg-gray-50'}`}>
          <Icon className={`h-6 w-6 ${color ? `text-${color}-500` : 'text-gray-400'}`} aria-hidden="true" />
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-bold text-gray-900">{value}</div>
              {subtext && (
                <div className="ml-2 text-xs font-medium truncate">
                  {subtext}
                </div>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
    {linkText && (
      <div className="bg-gray-50 px-5 py-3">
        <div className="text-sm">
          <a href={linkHref || "#"} className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200">
            {linkText}
          </a>
        </div>
      </div>
    )}
  </div>
);

function ManagerDashboard() {
  const [selectedInsight, setSelectedInsight] = useState(null);

  // Calculate overview stats from mock data
  const totalMembers = mockTeamMembers.length;
  const onTrackMembers = mockTeamMembers.filter(m => 
    m.productivity?.toLowerCase() === 'on track' || 
    m.productivity?.toLowerCase() === 'exceeding'
  ).length;
  const onTrackPercent = totalMembers > 0 ? Math.round((onTrackMembers / totalMembers) * 100) : 0;
  const actionsNeeded = mockAiInsights.filter(i => 
    i.type === 'warning' || i.type === 'recommendation'
  ).length;

  const handleInsightClick = (insight) => {
    setSelectedInsight(selectedInsight?.id === insight.id ? null : insight);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Header with gradient background */}
      <header className="mb-8 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md p-6 text-white">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold leading-tight">
              Manager Dashboard
            </h1>
            <p className="mt-1 text-md text-blue-100">
              Overview of your team's onboarding progress and AI-driven insights.
            </p>
          </div>
          <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-white bg-blue-700 bg-opacity-30 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <FunnelIcon className="h-4 w-4 mr-2" />
              Filter
            </button>
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
            >
              <PlusIcon className="h-4 w-4 mr-2" />
              Add New Hire
            </button>
          </div>
        </div>
      </header>

      {/* Overview Stats Section */}
      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-8">
        <StatCard 
          icon={UsersIcon}
          title="Active New Hires"
          value={totalMembers}
          color="blue"
          linkText="View all"
        />
        <StatCard 
          icon={CheckBadgeIcon}
          title="On Track Progress"
          value={`${onTrackPercent}%`}
          subtext={`${onTrackMembers} / ${totalMembers} members meeting expectations`}
          color={onTrackPercent >= 75 ? "green" : "yellow"}
          linkText="View details"
        />
        <StatCard 
          icon={ExclamationTriangleIcon}
          title="Insights & Actions"
          value={actionsNeeded}
          subtext={actionsNeeded > 0 ? `${actionsNeeded} items require attention` : 'No immediate actions'}
          color={actionsNeeded > 0 ? "yellow" : "green"}
          linkText="View insights"
          linkHref="#ai-insights"
        />
      </section>

      {/* Main Content Area: Table and Insights */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Team Members Table */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-200 overflow-hidden">
          <h2 className="text-lg font-semibold mb-6 text-gray-800 border-b pb-3">Team Member Status</h2>
          <div className="overflow-x-auto">
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
                  <tr key={member.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 relative">
                          <img 
                            className="h-10 w-10 rounded-full object-cover shadow-sm border border-gray-200" 
                            src={member.avatar} 
                            alt="" 
                          />
                          <span 
                            className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white ${
                              member.productivity === 'On Track' ? 'bg-green-400' : 
                              member.productivity === 'Exceeding' ? 'bg-blue-400' : 
                              member.productivity === 'Needs Support' ? 'bg-yellow-400' : 'bg-red-400'
                            }`}
                          />
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
                        <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2 overflow-hidden">
                          <div 
                            className={`h-2.5 rounded-full ${
                              member.progressPercent >= 75 ? 'bg-green-500' : 
                              member.progressPercent >= 50 ? 'bg-blue-500' : 
                              member.progressPercent >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                            }`} 
                            style={{ width: `${member.progressPercent}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600 font-medium">{member.progressPercent}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getProductivityClass(member.productivity)}`}>
                        {member.productivity}
                      </span>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center transition-colors duration-200">
                        View <ChevronRightIcon className="w-4 h-4 ml-1"/>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Insights Section */}
        <div id="ai-insights" className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 shadow-md h-fit">
          <h2 className="text-lg font-semibold mb-6 text-blue-800 flex items-center border-b border-blue-100 pb-3">
            <LightBulbIcon className="w-6 h-6 mr-2 text-blue-600"/>
            AI-Generated Insights
          </h2>
          <div className="space-y-4">
            {mockAiInsights.map((insight) => (
              <div 
                key={insight.id} 
                className={`flex items-start p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedInsight?.id === insight.id ? 'bg-white shadow-md' : 'hover:bg-white hover:shadow-sm'
                }`}
                onClick={() => handleInsightClick(insight)}
              >
                <div className="flex-shrink-0 pt-0.5">
                  {insight.type === 'warning' && <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" aria-hidden="true" />}
                  {insight.type === 'info' && <CheckBadgeIcon className="h-5 w-5 text-green-500" aria-hidden="true" />}
                  {insight.type === 'recommendation' && <LightBulbIcon className="h-5 w-5 text-blue-500" aria-hidden="true" />}
                </div>
                <div className="ml-3 flex-1">
                  <p className={`text-sm ${
                    insight.type === 'warning' ? 'text-yellow-700' : 
                    insight.type === 'info' ? 'text-green-700' : 'text-blue-700'
                  }`}>
                    {insight.text}
                  </p>
                  {selectedInsight?.id === insight.id && (
                    <div className="mt-3 flex justify-end space-x-2">
                      <button className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors duration-200">
                        Dismiss
                      </button>
                      <button className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200">
                        Take Action
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center transition-colors duration-200">
              View All Insights <ChevronRightIcon className="w-4 h-4 ml-1"/>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ManagerDashboard;
