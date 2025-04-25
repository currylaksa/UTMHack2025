// src/pages/manager/ManagerDashboard.jsx
import React, { useState, useMemo } from 'react';
import {
  UsersIcon,
  CheckBadgeIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  ChevronRightIcon,
  FunnelIcon,
  PlusIcon,
  ArrowPathIcon,
  CalendarIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  RocketLaunchIcon,
  DocumentChartBarIcon
} from '@heroicons/react/24/outline';
import ManagerEmotionInsights from '../../components/ManagerEmotionInsights';

// Import components
import Avatar from '../../components/dashboard/Avatar';
import Badge from '../../components/dashboard/Badge';
import DashboardHeader from '../../components/dashboard/DashboardHeader';
import ProgressBar from '../../components/dashboard/ProgressBar';
import StatCard from '../../components/dashboard/StatCard';
import TeamProgressChart from '../../components/dashboard/TeamProgressChart';
import ComparativeBenchmarks from '../../components/dashboard/ComparativeBenchmarks';
import PredictiveAnalytics from '../../components/dashboard/PredictiveAnalytics';
import InsightCard from '../../components/dashboard/InsightCard';
import ScheduleMeetingButton from '../../components/dashboard/ScheduleMeetingButton';

// Import utilities
import { formatDate, daysSince, getMonthTitle, getProductivityClass } from '../../utils/dashboardUtils';

// Import mock data
import { mockTeamMembers, mockTeamAnalytics, mockAiInsights } from '../../data/mockDashboardData';

// Main Dashboard Component
function ManagerDashboard() {
  // State
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  // Using mock data (in real app, this would come from props or API call)
  const teamMembers = mockTeamMembers;
  const insights = mockAiInsights;
  const teamAnalytics = mockTeamAnalytics; // Use our new analytics data

  // Derived/memoized data
  const stats = useMemo(() => {
    const totalMembers = teamMembers.length;
    const onTrackMembers = teamMembers.filter(m =>
      m.productivity?.toLowerCase() === 'on track' ||
      m.productivity?.toLowerCase() === 'exceeding'
    ).length;
    const needsSupportMembers = teamMembers.filter(m =>
      m.productivity?.toLowerCase() === 'needs support'
    ).length;
    const onTrackPercent = totalMembers > 0 ? Math.round((onTrackMembers / totalMembers) * 100) : 0;
    const actionsNeeded = insights.filter(i =>
      i.type === 'warning' || i.type === 'recommendation'
    ).length;

    const totalTasks = teamMembers.reduce((sum, member) => sum + (member.tasks?.total || 0), 0);
    const completedTasks = teamMembers.reduce((sum, member) => sum + (member.tasks?.completed || 0), 0);
    const taskCompletionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return {
      totalMembers,
      onTrackMembers,
      needsSupportMembers,
      onTrackPercent,
      actionsNeeded,
      taskCompletionRate
    };
  }, [teamMembers, insights]);

  // Filtered team members
  const filteredTeamMembers = useMemo(() => {
    if (filterStatus === 'all') return teamMembers;
    return teamMembers.filter(member =>
      member.productivity?.toLowerCase() === filterStatus.toLowerCase()
    );
  }, [teamMembers, filterStatus]);

  // Event handlers
  const handleInsightClick = (insight) => {
    setSelectedInsight(selectedInsight?.id === insight.id ? null : insight);
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  const handleRefreshData = () => {
    setIsLoading(true);
    // In a real app, we would fetch fresh data here
    console.log("Refreshing data...");
    setTimeout(() => {
      setIsLoading(false);
      console.log("Data refreshed.");
    }, 800);
  };

  const handleDismissInsight = (id) => {
    // In a real app, we would call dismissInsight(id) from our hook/API
    console.log(`Dismissing insight: ${id}`);
    // Example: Update local state if needed (not done here as using mock)
    setSelectedInsight(null); // Close the card after dismissing
  };

  const handleTakeAction = (id) => {
    // In a real app, we would call markAsActioned(id) or navigate
    console.log(`Taking action on insight: ${id}`);
     setSelectedInsight(null); // Close the card after taking action
  };

  const handleMeetingScheduled = (meetingDetails) => {
    setScheduledMeetings(prev => [...prev, meetingDetails]);
    // Show notification or update UI to reflect the scheduled meeting
    console.log(`New meeting scheduled with ${meetingDetails.teamMemberName}`);
  };

  // Handler for StatCard clicks (example)
  const handleViewAllMembers = () => {
      console.log("Navigate to all members view");
      handleFilterChange('all'); // Reset filter as an example
  };

  const handleViewOnTrackDetails = () => {
      console.log("Navigate/show details for on-track members");
      handleFilterChange('on track'); // Set filter as an example
  };

  const handleViewTaskBreakdown = () => {
      console.log("Navigate/show task breakdown view");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-b from-indigo-50 to-blue-50 min-h-screen">
      {/* Dashboard Header */}
      <DashboardHeader
        title="DevBoost AI Manager Hub"
        subtitle="Personalized onboarding insights and team progress tracking"
        actions={[
          {
            icon: <FunnelIcon className="h-4 w-4" />,
            label: "Filter",
            onClick: () => { console.log("Open filter options")}, // Placeholder
            variant: "secondary"
          },
          {
            icon: <PlusIcon className="h-4 w-4" />,
            label: "Add New Hire",
            onClick: () => { console.log("Navigate to Add New Hire form")}, // Placeholder
            variant: "primary"
          }
        ]}
      />

      {/* Quick Stats Section */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8 mt-6">
        <StatCard
          icon={UsersIcon}
          title="Active New Hires"
          value={stats.totalMembers}
          color="indigo"
          trend={+1} // Example trend
          linkText="View all"
          onClick={handleViewAllMembers}
        />
        <StatCard
          icon={CheckBadgeIcon}
          title="On Track Progress"
          value={`${stats.onTrackPercent}%`}
          subtext={`${stats.onTrackMembers} meeting expectations`}
          color={stats.onTrackPercent >= 75 ? "green" : stats.onTrackPercent >= 50 ? "teal" : "yellow"}
          trend={+5} // Example trend
          linkText="View details"
          onClick={handleViewOnTrackDetails}
        />
        <StatCard
          icon={ArrowTrendingUpIcon}
          title="Task Completion"
          value={`${stats.taskCompletionRate}%`}
          subtext="Onboarding tasks completed"
          color={stats.taskCompletionRate >= 75 ? "purple" : stats.taskCompletionRate >= 50 ? "blue" : "yellow"}
          trend={+2} // Example trend
          linkText="View Breakdown"
          onClick={handleViewTaskBreakdown}
        />
        <StatCard
          icon={ExclamationTriangleIcon}
          title="Insights & Actions"
          value={stats.actionsNeeded}
          subtext={stats.actionsNeeded > 0 ? `${stats.actionsNeeded} items need attention` : 'All clear'}
          color={stats.actionsNeeded > 0 ? "yellow" : "green"}
          trend={-1} // Example trend
          linkText="View all"
          linkHref="#ai-insights" // Allows scrolling to the section
          onClick={(e) => { // Smooth scroll if desired
              e.preventDefault();
              document.getElementById('ai-insights')?.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </section>

      {/* Main Content Area */}
      {/* Grid structure with 3 columns on large screens */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Team Analytics Section - Full Width */}
        <div className="lg:col-span-3 mb-6">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <DocumentChartBarIcon className="w-5 h-5 mr-2 text-indigo-500"/>
                Team Analytics
              </h2>
              <div className="flex gap-2">
                <Badge label="Enhanced" color="indigo" size="sm" />
                <button 
                  className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-medium py-1 px-2 rounded flex items-center transition-colors"
                  onClick={handleRefreshData}
                >
                  <ArrowPathIcon className={`h-3.5 w-3.5 mr-1 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Dynamic Team Progress Visualization */}
              <div className="md:col-span-2">
                <TeamProgressChart historicalData={teamAnalytics.historicalProgress} />
              </div>
              
              {/* Comparative Benchmarks */}
              <div className="md:col-span-1">
                <ComparativeBenchmarks benchmarkData={teamAnalytics.benchmarks} />
              </div>
            </div>
            
            {/* Predictive Analytics */}
            <div className="mt-6">
              <PredictiveAnalytics 
                predictions={teamAnalytics.predictions} 
                teamMembers={teamMembers} 
              />
            </div>
          </div>
        </div>

        {/* Team Members Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Team Members Header with Filters */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 bg-gradient-to-r from-white to-blue-50">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <SparklesIcon className="w-5 h-5 mr-2 text-indigo-500"/>
                Team Member Status
              </h2>
              <div className="flex items-center space-x-2">
                <div className="flex bg-indigo-100 rounded-lg p-1">
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${filterStatus === 'all' ? 'bg-white shadow-sm text-indigo-700 font-medium' : 'text-indigo-600 hover:text-indigo-800 hover:bg-white/50'}`}
                    onClick={() => handleFilterChange('all')}
                  >
                    All ({teamMembers.length})
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${filterStatus === 'on track' ? 'bg-white shadow-sm text-indigo-700 font-medium' : 'text-indigo-600 hover:text-indigo-800 hover:bg-white/50'}`}
                    onClick={() => handleFilterChange('on track')}
                  >
                    On Track ({teamMembers.filter(m => m.productivity?.toLowerCase() === 'on track' || m.productivity?.toLowerCase() === 'exceeding').length})
                  </button>
                  <button
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${filterStatus === 'needs support' ? 'bg-white shadow-sm text-indigo-700 font-medium' : 'text-indigo-600 hover:text-indigo-800 hover:bg-white/50'}`}
                    onClick={() => handleFilterChange('needs support')}
                  >
                    Needs Support ({teamMembers.filter(m => m.productivity?.toLowerCase() === 'needs support').length})
                  </button>
                </div>
                <button
                  className="p-2 rounded-md hover:bg-indigo-100 text-indigo-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleRefreshData}
                  disabled={isLoading}
                  aria-label="Refresh data"
                >
                  <ArrowPathIcon className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Team Members Cards */}
          <div className="space-y-4">
            {isLoading ? (
                 <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <p className="text-gray-500 flex items-center justify-center">
                        <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" /> Loading team data...
                    </p>
                 </div>
            ) : filteredTeamMembers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No team members match the '{filterStatus}' filter.</p>
              </div>
            ) : (
              filteredTeamMembers.map((member) => {
                // Define member-specific colors based on productivity
                const memberColors = {
                  'On Track': {
                    gradient: 'bg-gradient-to-r from-green-50 to-teal-50',
                    border: 'border-green-200'
                  },
                  'Exceeding': {
                    gradient: 'bg-gradient-to-r from-blue-50 to-indigo-50',
                    border: 'border-blue-200'
                  },
                  'Needs Support': {
                    gradient: 'bg-gradient-to-r from-yellow-50 to-amber-50',
                    border: 'border-yellow-200'
                  },
                  'At Risk': {
                    gradient: 'bg-gradient-to-r from-red-50 to-orange-50',
                    border: 'border-red-200'
                  }
                };

                const memberColor = memberColors[member.productivity] || {
                  gradient: 'bg-gradient-to-r from-gray-50 to-slate-50',
                  border: 'border-gray-200'
                };

                // Check if we need to show a support prompt for this team member
                const needsSupport = member.productivity === 'Needs Support' || member.productivity === 'At Risk';

                return (
                  <div key={member.id} className={`rounded-xl shadow-sm ${memberColor.border} hover:shadow-md transition-all p-4 ${memberColor.gradient}`}>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Member avatar and info */}
                      <div className="flex items-center flex-grow">
                        <Avatar
                          src={member.avatar}
                          alt={member.name}
                          size="lg"
                          status={
                            member.productivity === 'On Track' ? 'success' :
                            member.productivity === 'Exceeding' ? 'info' :
                            member.productivity === 'Needs Support' ? 'warning' :
                            member.productivity === 'At Risk' ? 'danger' : undefined // Handle other cases
                          }
                        />
                        <div className="ml-4">
                          <h3 className="font-semibold text-gray-900">{member.name}</h3>
                          <div className="flex flex-wrap items-center mt-1 gap-x-2 gap-y-1">
                            <span className="text-sm text-gray-600">{member.role}</span>
                            <span className="text-gray-300 hidden sm:inline">•</span>
                            <div className="flex items-center text-sm text-gray-600">
                              <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                              <span>Joined: {formatDate(member.startDate)}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Stage and Progress */}
                      <div className="flex flex-col sm:items-end sm:ml-auto flex-shrink-0 pt-2 sm:pt-0">
                         <div className="flex items-center mb-2">
                             <Badge
                               label={`Month ${member.currentMonthInJourney}`}
                               color="indigo"
                               size="sm"
                             />
                             <span className="ml-2 text-sm text-gray-600 truncate">{getMonthTitle(member.currentMonthInJourney)}</span>
                         </div>
                         <Badge
                           label={member.productivity || 'Unknown'}
                           color={
                             member.productivity === 'On Track' ? 'green' :
                             member.productivity === 'Exceeding' ? 'blue' :
                             member.productivity === 'Needs Support' ? 'yellow' :
                             member.productivity === 'At Risk' ? 'red' : 'gray'
                           }
                         />
                       </div>
                    </div>

                    {/* Progress Section */}
                    <div className="mt-4 border-t border-gray-200/80 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Onboarding Progress</span>
                        <div className="flex items-center">
                          <span className="text-sm font-bold text-gray-800">{member.progressPercent}%</span>
                          <div className={`ml-2 w-2 h-2 rounded-full ${
                            member.progressPercent >= 75 ? 'bg-green-500' :
                            member.progressPercent >= 50 ? 'bg-blue-500' :
                            member.progressPercent >= 25 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}></div>
                        </div>
                      </div>

                      <div className="relative">
                        <ProgressBar
                          percent={member.progressPercent}
                          color={
                            member.progressPercent >= 75 ? 'green' :
                            member.progressPercent >= 50 ? 'blue' :
                            member.progressPercent >= 25 ? 'yellow' : 'red'
                          }
                          height="h-3"
                        />

                        {/* Milestone markers (Visual only) */}
                        {/* Positioned absolutely within the relative container */}
                        <div className="absolute top-0 left-0 w-full flex justify-between px-1 -mt-1 pointer-events-none">
                          <div className="w-1 h-5 bg-purple-400 rounded-full opacity-70 transform -translate-y-1"></div>
                          <div className="w-1 h-5 bg-blue-400 rounded-full opacity-70 transform -translate-y-1"></div>
                          <div className="w-1 h-5 bg-teal-400 rounded-full opacity-70 transform -translate-y-1"></div>
                          <div className="w-1 h-5 bg-green-400 rounded-full opacity-70 transform -translate-y-1"></div>
                        </div>
                      </div>

                      <div className="flex justify-between mt-3 items-center flex-wrap gap-2">
                         {member.tasks && ( // Check if tasks object exists
                            <div className="flex items-center bg-indigo-50 px-2 py-1 rounded-lg">
                              <CheckBadgeIcon className="w-4 h-4 text-indigo-600 mr-1 flex-shrink-0" />
                              <span className="text-xs font-medium text-indigo-700">
                                {member.tasks.completed} of {member.tasks.total} tasks complete
                              </span>
                            </div>
                          )}
                        <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow inline-flex items-center">
                          View details <ChevronRightIcon className="w-3.5 h-3.5 ml-1"/>
                        </button>
                      </div>
                    </div>

                    {/* Recent Interactions Section */}
                    <div className="mt-4 border-t border-gray-200/80 pt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Recent Interactions</span>
                      </div>
                      <p className="text-sm text-gray-600">{member.recentInteractions}</p>
                      
                      {/* Support Action Section - Highlight for team members that need support */}
                      {needsSupport && (
                        <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                          <div className="flex items-start">
                            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mt-0.5 mr-2 flex-shrink-0" />
                            <div>
                              <h4 className="text-sm font-medium text-yellow-800">
                                {member.name} may need additional support
                              </h4>
                              <p className="mt-1 text-xs text-yellow-700">
                                {member.name.split(' ')[0]} is currently marked as "{member.productivity}". Consider scheduling a 1:1 meeting to address challenges.
                              </p>
                              <div className="mt-2">
                                <ScheduleMeetingButton 
                                  teamMember={member} 
                                  variant="warning"
                                  size="sm"
                                  onScheduled={handleMeetingScheduled} 
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Regular actions for all members */}
                      <div className="mt-3 flex justify-between items-center">
                        <button className="text-xs font-medium px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-sm hover:shadow inline-flex items-center">
                          View details <ChevronRightIcon className="w-3.5 h-3.5 ml-1"/>
                        </button>
                        
                        {/* Add schedule button for all members, with different styling based on status */}
                        <ScheduleMeetingButton 
                          teamMember={member} 
                          variant={needsSupport ? 'warning' : 'light'} 
                          size="sm"
                          onScheduled={handleMeetingScheduled} 
                        />
                      </div>
                    </div>
                  </div> // End member card
                );
              }) // End map
            )}
          </div> {/* End Team Members Cards container */}
          
          {/* Show scheduled meetings summary if any */}
          {scheduledMeetings.length > 0 && (
            <div className="mt-8 bg-white rounded-xl shadow-md border border-indigo-200 p-4">
              <h3 className="text-md font-semibold text-indigo-800 mb-3 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2 text-indigo-600" />
                Upcoming 1:1 Meetings
              </h3>
              <div className="space-y-2">
                {scheduledMeetings.map((meeting, index) => (
                  <div key={index} className="flex items-center justify-between bg-indigo-50 px-3 py-2 rounded-lg border border-indigo-100">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                      <span className="text-sm font-medium text-gray-800">{meeting.teamMemberName}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {meeting.date} at {meeting.time} ({meeting.duration} min)
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div> {/* End Team Members Section (lg:col-span-2) */}

        {/* AI Insights Section */}
        <div id="ai-insights" className="lg:col-span-1 space-y-6">
          {/* Insights Header */}
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl shadow-md border border-indigo-200 p-4 sticky top-4 z-10"> {/* Added sticky for scrolling */}
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center">
                <LightBulbIcon className="w-6 h-6 mr-2 text-yellow-500 drop-shadow-sm"/>
                AI Insights
              </h2>
              <div className="flex items-center px-3 py-1 bg-white/70 backdrop-blur-sm rounded-full shadow-sm border border-purple-100">
                <CalendarIcon className="w-4 h-4 text-purple-500 mr-1.5"/>
                <span className="text-xs font-medium text-purple-700">
                  {/* Using the most recent insight date as an example */}
                  Updated {daysSince(new Date(insights.reduce((latest, insight) => insight.createdAt > latest ? insight.createdAt : latest, insights[0]?.createdAt || new Date())))} days ago
                </span>
              </div>
            </div>
          </div>

          {/* Insights Cards */}
          {insights.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
              <div className="flex flex-col items-center">
                <SparklesIcon className="w-12 h-12 text-gray-300 mb-3" />
                <p className="text-gray-500">No AI insights available at this time.</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {insights
                // Optional: Sort insights by date or priority
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                .map((insight) => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                  isExpanded={selectedInsight?.id === insight.id}
                  teamMembers={teamMembers}
                  onToggle={() => handleInsightClick(insight)}
                  onDismiss={() => handleDismissInsight(insight.id)}
                  onAction={() => handleTakeAction(insight.id)}
                />
              ))}

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-md border border-blue-200 p-4 text-center">
                <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 text-sm font-medium inline-flex items-center justify-center transition-all shadow-sm hover:shadow">
                  <SparklesIcon className="w-4 h-4 mr-2" />
                  View All Insights
                  <ChevronRightIcon className="w-4 h-4 ml-1"/>
                </button>
              </div>
            </div>
          )}

          {/* Insight Summary Stats */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl shadow-sm border border-indigo-200 p-4 sticky top-32 z-10"> {/* Added sticky */}
             <h3 className="text-sm font-semibold text-indigo-700 mb-3">Insight Summary</h3>
             <div className="grid grid-cols-2 gap-3">
               <div className="flex items-center p-2 bg-white/80 rounded-lg border border-purple-100 shadow-xs">
                 <div className="p-2 rounded-full bg-yellow-100 flex-shrink-0">
                   <ExclamationTriangleIcon className="h-4 w-4 text-yellow-600" />
                 </div>
                 <div className="ml-2 overflow-hidden">
                   <p className="text-xs text-gray-500 truncate">Warnings</p>
                   <p className="text-sm font-bold text-gray-800">{insights.filter(i => i.type === 'warning').length}</p>
                 </div>
               </div>
               <div className="flex items-center p-2 bg-white/80 rounded-lg border border-purple-100 shadow-xs">
                 <div className="p-2 rounded-full bg-green-100 flex-shrink-0">
                   <CheckBadgeIcon className="h-4 w-4 text-green-600" />
                 </div>
                 <div className="ml-2 overflow-hidden">
                   <p className="text-xs text-gray-500 truncate">Positive</p>
                   <p className="text-sm font-bold text-gray-800">{insights.filter(i => i.type === 'info').length}</p>
                 </div>
               </div>
               <div className="flex items-center p-2 bg-white/80 rounded-lg border border-purple-100 shadow-xs">
                 <div className="p-2 rounded-full bg-blue-100 flex-shrink-0">
                   <LightBulbIcon className="h-4 w-4 text-blue-600" />
                 </div>
                 <div className="ml-2 overflow-hidden">
                   <p className="text-xs text-gray-500 truncate">Ideas</p>
                   <p className="text-sm font-bold text-gray-800">{insights.filter(i => i.type === 'recommendation').length}</p>
                 </div>
               </div>
               <div className="flex items-center p-2 bg-white/80 rounded-lg border border-purple-100 shadow-xs">
                  <div className="p-2 rounded-full bg-red-100 flex-shrink-0"> {/* Changed color for high priority */}
                      <RocketLaunchIcon className="h-4 w-4 text-red-600" /> {/* Changed color */}
                  </div>
                  <div className="ml-2 overflow-hidden">
                      <p className="text-xs text-gray-500 truncate">High Priority</p> {/* Changed label */}
                      <p className="text-sm font-bold text-gray-800">{insights.filter(i => i.priority === 'high').length}</p>
                  </div>
               </div>
             </div>
           </div>
        </div> {/* End AI Insights Section */}

      </div> {/* End Main Grid */}
    </div> // End Page Container
  );
}

export default ManagerDashboard;
