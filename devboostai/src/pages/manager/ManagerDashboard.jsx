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
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

// Import images
import JY1 from '../../images/JY1.png';
import JY2 from '../../images/JY2.jpg';
import QY1 from '../../images/QY1.png';
import QY2 from '../../images/QY2.jpg';

// --- Mock Data ---
const mockTeamMembers = [
  { id: 'tm1', name: 'Sarah Chen', role: 'Software Engineer I', startDate: '2025-03-15', currentMonthInJourney: 2, progressPercent: 45, productivity: 'Needs Support', avatar: JY1, tasks: { completed: 12, total: 25 } },
  { id: 'tm2', name: 'James Wilson', role: 'Software Engineer II', startDate: '2025-02-01', currentMonthInJourney: 3, progressPercent: 75, productivity: 'Exceeding', avatar: QY1, tasks: { completed: 30, total: 35 } },
  { id: 'tm3', name: 'Priya Patel', role: 'Software Engineer I', startDate: '2025-04-01', currentMonthInJourney: 1, progressPercent: 85, productivity: 'On Track', avatar: JY2, tasks: { completed: 8, total: 10 } },
  { id: 'tm4', name: 'Michael Brown', role: 'Senior Software Engineer', startDate: '2024-12-01', currentMonthInJourney: 5, progressPercent: 60, productivity: 'On Track', avatar: QY2, tasks: { completed: 42, total: 50 } },
];

const mockAiInsights = [
  {
    id: 'ai1',
    title: 'Support Needed',
    text: 'Sarah Chen may need additional support with technical environment setup. Consider scheduling a pairing session.',
    type: 'warning',
    priority: 'high',
    relatedMember: 'tm1',
    createdAt: '2025-04-15T10:30:00'
  },
  {
    id: 'ai2',
    title: 'Exceeding Expectations',
    text: 'James Wilson is progressing quickly through onboarding milestones and may be ready for more challenging tasks.',
    type: 'info',
    priority: 'medium',
    relatedMember: 'tm2',
    createdAt: '2025-04-14T15:45:00'
  },
  {
    id: 'ai3',
    title: 'Team Recommendation',
    text: 'Schedule a team sync next week to address common questions about the deployment process.',
    type: 'recommendation',
    priority: 'medium',
    relatedMember: null,
    createdAt: '2025-04-13T09:15:00'
  },
];

// Utility functions
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

const daysSince = (date) => {
  const today = new Date();
  // Ensure 'date' is a Date object before comparison
  const startDate = date instanceof Date ? date : new Date(date);
  if (isNaN(startDate)) return 0; // Handle invalid date input
  const diffTime = Math.abs(today - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const getMonthTitle = (monthNum) => {
  if (monthNum <= 1) return "Pre-boarding / Setup";
  if (monthNum <= 2) return "Training & Goals";
  if (monthNum <= 4) return "Culture & HR Check";
  if (monthNum <= 7) return "Continued Training";
  if (monthNum <= 10) return "Skill Review / Impact";
  return "Retention / Development";
};

const getProductivityClass = (productivity) => {
  // FIX: Added optional chaining (?.) to prevent errors if productivity is null/undefined
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

// Component definitions
const DashboardHeader = ({ title, subtitle, actions }) => (
  <header className="mb-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 shadow-lg p-6 text-white">
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight flex items-center">
          <RocketLaunchIcon className="h-8 w-8 mr-3 text-yellow-300" />
          {title}
        </h1>
        {subtitle && (
          <p className="mt-2 text-sm md:text-md text-blue-100">{subtitle}</p>
        )}
      </div>
      {actions && actions.length > 0 && (
        <div className="mt-4 flex md:mt-0 md:ml-4 space-x-3">
          {actions.map((action, i) => (
            <button
              key={i}
              type="button"
              onClick={action.onClick}
              className={`inline-flex items-center px-3 py-2 border rounded-md shadow-sm text-sm font-medium transition-all duration-200 ${
                action.variant === 'primary'
                  ? 'border-transparent text-indigo-700 bg-white hover:bg-blue-50 focus:ring-offset-indigo-600'
                  : 'border-blue-300 text-white bg-blue-700 bg-opacity-30 hover:bg-opacity-50 focus:ring-offset-blue-600'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              {action.icon && <span className="mr-2">{action.icon}</span>}
              {action.label}
            </button>
          ))}
        </div>
      )}
    </div>
  </header>
);

const Avatar = ({ src, alt, size = 'md', status }) => {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };

  const statusColors = {
    success: 'bg-green-400',
    info: 'bg-blue-400',
    warning: 'bg-yellow-400',
    danger: 'bg-red-400'
  };

  return (
    <div className="flex-shrink-0 relative">
      <img
        className={`${sizeClasses[size]} rounded-full object-cover shadow-sm border-2 border-gray-200`}
        // Provide a default empty string or a placeholder if src might be missing
        src={src || '/path/to/default-avatar.png'}
        alt={alt}
      />
      {status && (
        <span
          className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${statusColors[status]}`}
        />
      )}
    </div>
  );
};

const Badge = ({ label, color = 'gray', size = 'md' }) => {
  const colorClasses = {
    gray: 'bg-gray-100 text-gray-800',
    blue: 'bg-blue-100 text-blue-800',
    green: 'bg-green-100 text-green-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
    purple: 'bg-purple-100 text-purple-800',
    teal: 'bg-teal-100 text-teal-800',
    indigo: 'bg-indigo-100 text-indigo-800',
    pink: 'bg-pink-100 text-pink-800'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex rounded-full font-medium ${colorClasses[color] || colorClasses.gray} ${sizeClasses[size]}`}>
      {label}
    </span>
  );
};

const ProgressBar = ({ percent, color = 'blue', height = 'h-2.5' }) => {
  const colorClasses = {
    gray: 'bg-gray-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
    purple: 'bg-purple-500',
    teal: 'bg-teal-500',
    indigo: 'bg-indigo-500',
    pink: 'bg-pink-500'
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
      <div
        className={`${height} rounded-full ${colorClasses[color] || colorClasses.blue}`}
        style={{ width: `${percent}%`, transition: 'width 1s ease-in-out' }}
      />
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, subtext, color, trend, linkText, linkHref, onClick }) => {
  // Define gradient backgrounds based on colors
  const gradientBgs = {
    blue: 'bg-gradient-to-br from-blue-50 to-blue-100',
    green: 'bg-gradient-to-br from-green-50 to-green-100',
    yellow: 'bg-gradient-to-br from-yellow-50 to-yellow-100',
    red: 'bg-gradient-to-br from-red-50 to-red-100',
    purple: 'bg-gradient-to-br from-purple-50 to-purple-100',
    teal: 'bg-gradient-to-br from-teal-50 to-teal-100',
    indigo: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
    pink: 'bg-gradient-to-br from-pink-50 to-pink-100',
    gray: 'bg-gradient-to-br from-gray-50 to-gray-100'
  };

  const iconBgs = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
    purple: 'bg-purple-100',
    teal: 'bg-teal-100',
    indigo: 'bg-indigo-100',
    pink: 'bg-pink-100',
    gray: 'bg-gray-100'
  };

  const iconColors = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    yellow: 'text-yellow-600',
    red: 'text-red-600',
    purple: 'text-purple-600',
    teal: 'text-teal-600',
    indigo: 'text-indigo-600',
    pink: 'text-pink-600',
    gray: 'text-gray-600'
  };

  // FIX: Use a default color if the provided one is invalid
  const colorToUse = color && gradientBgs[color] ? color : 'gray';

  return (
    <div className={`overflow-hidden shadow-md rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-lg ${gradientBgs[colorToUse]}`}>
      <div className="p-4">
        <div className="flex items-center">
          <div className={`flex-shrink-0 p-3 rounded-full ${iconBgs[colorToUse]}`}>
            <Icon className={`h-5 w-5 ${iconColors[colorToUse]}`} aria-hidden="true" />
          </div>
          <div className="ml-4 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-gray-600 truncate">{title}</dt>
              <dd className="flex items-baseline">
                <div className="text-xl font-bold text-gray-900">{value}</div>
                {trend !== undefined && trend !== null && ( // Render trend only if provided
                  <span className={`ml-2 flex items-center text-xs font-medium ${trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                    {trend > 0 ? '+' : ''}{trend}
                  </span>
                )}
              </dd>
              {subtext && (
                <div className="mt-1 text-xs text-gray-500 truncate">
                  {subtext}
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
      {linkText && ( // Render link section only if linkText is provided
        <div className="bg-white bg-opacity-60 px-4 py-2.5 border-t border-gray-100">
          <div className="text-sm">
            <a
              href={linkHref || "#"}
              className={`font-medium ${iconColors[colorToUse]} hover:text-blue-800 transition-colors duration-200 inline-flex items-center`}
              onClick={onClick}
            >
              {linkText}
              <ChevronRightIcon className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};


const InsightCard = ({ insight, isExpanded, teamMembers, onToggle, onDismiss, onAction }) => {
  const typeIcons = {
    warning: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />,
    info: <CheckBadgeIcon className="h-5 w-5 text-green-500" />,
    recommendation: <LightBulbIcon className="h-5 w-5 text-blue-500" />
  };

  const typeGradients = {
    warning: 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200', // Adjusted gradient
    info: 'bg-gradient-to-br from-green-50 to-teal-50 border-green-200',
    recommendation: 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200'
  };

  const typeColors = {
    warning: 'text-yellow-700',
    info: 'text-green-700',
    recommendation: 'text-blue-700'
  };

  const typeBorders = {
    warning: 'border-yellow-200',
    info: 'border-green-200',
    recommendation: 'border-blue-200'
  };

  const typeButtonColors = {
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-green-500 hover:bg-green-600',
    recommendation: 'bg-blue-500 hover:bg-blue-600'
  };

  const safeType = insight.type && typeIcons[insight.type] ? insight.type : 'info'; // Default to 'info' if type is invalid

  const relatedMember = insight.relatedMember
    ? teamMembers.find(m => m.id === insight.relatedMember)
    : null;

  return (
    <div
      className={`rounded-xl shadow-sm border ${typeBorders[safeType]} ${typeGradients[safeType]} transition-all duration-200 ${
        isExpanded ? 'shadow-md' : 'hover:shadow'
      }`}
    >
      <div
        className="p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {typeIcons[safeType]}
          </div>
          <div className="ml-3 flex-1">
            <h3 className={`text-sm font-medium ${typeColors[safeType]}`}>{insight.title}</h3>
            <p className={`text-sm mt-1 ${isExpanded ? typeColors[safeType] : 'text-gray-600'}`}>
              {insight.text}
            </p>

            {/* Related member info */}
            {relatedMember && (
              <div className="mt-2 flex items-center">
                <Avatar
                  src={relatedMember.avatar}
                  alt={relatedMember.name}
                  size="sm"
                />
                <span className="ml-2 text-xs text-gray-500">Related to: {relatedMember.name}</span>
              </div>
            )}

            {/* Created date */}
            <div className="mt-2 text-xs text-gray-500">
              {new Date(insight.createdAt).toLocaleString()}
            </div>

            {/* Action buttons */}
            {isExpanded && (
              <div className="mt-3 flex justify-end space-x-2">
                <button
                  className="text-xs px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent toggle when clicking button
                    onDismiss();
                  }}
                >
                  Dismiss
                </button>
                <button
                  className={`text-xs px-2 py-1 ${typeButtonColors[safeType]} text-white rounded transition-colors duration-200`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent toggle when clicking button
                    onAction();
                  }}
                >
                  Take Action
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


// Main Dashboard Component
function ManagerDashboard() {
  // State
  const [selectedInsight, setSelectedInsight] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Using mock data (in real app, this would come from props or API call)
  const teamMembers = mockTeamMembers;
  const insights = mockAiInsights;

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
          // FIX: Added missing linkText prop
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
      {/* FIX: Corrected structure - Team Members and AI Insights are now siblings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

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
                  </div> // End member card
                );
              }) // End map
            )}
          </div> {/* End Team Members Cards container */}
        </div> {/* End Team Members Section (lg:col-span-2) */}

        {/* AI Insights Section */}
        {/* FIX: Moved this section to be a direct child of the grid */}
        <div id="ai-insights" className="lg:col-span-1 space-y-6"> {/* Adjusted to col-span-1 */}
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
