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
  ArrowTrendingUpIcon
} from '@heroicons/react/24/outline';

// --- Mock Data ---
const mockTeamMembers = [
  { id: 'tm1', name: 'Sarah Chen', role: 'Software Engineer I', startDate: '2025-03-15', currentMonthInJourney: 2, progressPercent: 45, productivity: 'Needs Support', avatar: '/path/to/sarah.jpg', tasks: { completed: 12, total: 25 } },
  { id: 'tm2', name: 'James Wilson', role: 'Software Engineer II', startDate: '2025-02-01', currentMonthInJourney: 3, progressPercent: 75, productivity: 'Exceeding', avatar: '/path/to/james.jpg', tasks: { completed: 30, total: 35 } },
  { id: 'tm3', name: 'Priya Patel', role: 'Software Engineer I', startDate: '2025-04-01', currentMonthInJourney: 1, progressPercent: 85, productivity: 'On Track', avatar: '/path/to/priya.jpg', tasks: { completed: 8, total: 10 } },
  { id: 'tm4', name: 'Michael Brown', role: 'Senior Software Engineer', startDate: '2024-12-01', currentMonthInJourney: 5, progressPercent: 60, productivity: 'On Track', avatar: '/path/to/michael.jpg', tasks: { completed: 42, total: 50 } },
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
  const diffTime = Math.abs(today - date);
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
  <header className="mb-6 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md p-6 text-white">
    <div className="md:flex md:items-center md:justify-between">
      <div className="flex-1 min-w-0">
        <h1 className="text-2xl md:text-3xl font-bold leading-tight">{title}</h1>
        {subtitle && (
          <p className="mt-1 text-sm md:text-md text-blue-100">{subtitle}</p>
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
                  ? 'border-transparent text-blue-700 bg-white hover:bg-blue-50 focus:ring-offset-blue-600' 
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
        className={`${sizeClasses[size]} rounded-full object-cover shadow-sm border border-gray-200`} 
        src={src} 
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
    red: 'bg-red-100 text-red-800'
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-xs',
    lg: 'px-3 py-1 text-sm'
  };

  return (
    <span className={`inline-flex rounded-full font-medium ${colorClasses[color]} ${sizeClasses[size]}`}>
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
    red: 'bg-red-500'
  };

  return (
    <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${height}`}>
      <div 
        className={`${height} rounded-full ${colorClasses[color]}`} 
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

const StatCard = ({ icon: Icon, title, value, subtext, color, trend, linkText, linkHref, onClick }) => (
  <div className="bg-white overflow-hidden shadow-sm rounded-xl border border-gray-200 transition-all duration-300 hover:shadow-md">
    <div className="p-4">
      <div className="flex items-center">
        <div className={`flex-shrink-0 p-3 rounded-full ${color ? `bg-${color}-50` : 'bg-gray-50'}`}>
          <Icon className={`h-5 w-5 ${color ? `text-${color}-500` : 'text-gray-400'}`} aria-hidden="true" />
        </div>
        <div className="ml-4 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              <div className="text-xl font-bold text-gray-900">{value}</div>
              {trend && (
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
    {linkText && (
      <div className="bg-gray-50 px-4 py-2.5 border-t border-gray-100">
        <div className="text-sm">
          <a 
            href={linkHref || "#"} 
            className="font-medium text-blue-600 hover:text-blue-800 transition-colors duration-200 inline-flex items-center"
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

const InsightCard = ({ insight, isExpanded, teamMembers, onToggle, onDismiss, onAction }) => {
  const typeIcons = {
    warning: <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500" />,
    info: <CheckBadgeIcon className="h-5 w-5 text-green-500" />,
    recommendation: <LightBulbIcon className="h-5 w-5 text-blue-500" />
  };

  const typeColors = {
    warning: 'text-yellow-700 border-yellow-200',
    info: 'text-green-700 border-green-200',
    recommendation: 'text-blue-700 border-blue-200'
  };

  const relatedMember = insight.relatedMember 
    ? teamMembers.find(m => m.id === insight.relatedMember) 
    : null;

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm border ${typeColors[insight.type]} transition-all duration-200 ${
        isExpanded ? 'shadow-md' : 'hover:shadow'
      }`}
    >
      <div 
        className="p-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            {typeIcons[insight.type]}
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium">{insight.title}</h3>
            <p className={`text-sm mt-1 ${isExpanded ? typeColors[insight.type] : 'text-gray-600'}`}>
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
                  className="text-xs px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDismiss();
                  }}
                >
                  Dismiss
                </button>
                <button 
                  className="text-xs px-2 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
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
  
  // Using mock data
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
    
    const totalTasks = teamMembers.reduce((sum, member) => sum + member.tasks.total, 0);
    const completedTasks = teamMembers.reduce((sum, member) => sum + member.tasks.completed, 0);
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
    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const handleDismissInsight = (id) => {
    // In a real app, we would call dismissInsight(id) from our hook
    console.log(`Dismissing insight: ${id}`);
  };

  const handleTakeAction = (id) => {
    // In a real app, we would call markAsActioned(id) from our hook
    console.log(`Taking action on insight: ${id}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 min-h-screen">
      {/* Dashboard Header */}
      <DashboardHeader 
        title="Manager Dashboard"
        subtitle="Overview of your team's onboarding progress and AI-driven insights"
        actions={[
          {
            icon: <FunnelIcon className="h-4 w-4" />,
            label: "Filter",
            onClick: () => {}, // Would open filter dialog in real app
            variant: "secondary"
          },
          {
            icon: <PlusIcon className="h-4 w-4" />,
            label: "Add New Hire",
            onClick: () => {}, // Would navigate to add form in real app
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
          color="blue"
          trend={+1}
          linkText="View all"
          onClick={() => {}}
        />
        <StatCard 
          icon={CheckBadgeIcon}
          title="On Track Progress"
          value={`${stats.onTrackPercent}%`}
          subtext={`${stats.onTrackMembers} meeting expectations`}
          color={stats.onTrackPercent >= 75 ? "green" : stats.onTrackPercent >= 50 ? "blue" : "yellow"}
          trend={+5}
          linkText="View details"
          onClick={() => {}}
        />
        <StatCard 
          icon={ArrowTrendingUpIcon}
          title="Task Completion"
          value={`${stats.taskCompletionRate}%`}
          subtext="Onboarding tasks completed"
          color={stats.taskCompletionRate >= 75 ? "green" : stats.taskCompletionRate >= 50 ? "blue" : "yellow"}
          trend={+2}
          onClick={() => {}}
        />
        <StatCard 
          icon={ExclamationTriangleIcon}
          title="Insights & Actions"
          value={stats.actionsNeeded}
          subtext={stats.actionsNeeded > 0 ? `${stats.actionsNeeded} items need attention` : 'All clear'}
          color={stats.actionsNeeded > 0 ? "yellow" : "green"}
          trend={-1}
          linkText="View all"
          linkHref="#ai-insights"
          onClick={() => {}}
        />
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Team Members Header with Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="text-lg font-semibold text-gray-800">Team Member Status</h2>
              <div className="flex items-center space-x-2">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button 
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${filterStatus === 'all' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => handleFilterChange('all')}
                  >
                    All
                  </button>
                  <button 
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${filterStatus === 'on track' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => handleFilterChange('on track')}
                  >
                    On Track
                  </button>
                  <button 
                    className={`px-3 py-1.5 text-sm rounded-md transition-all ${filterStatus === 'needs support' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => handleFilterChange('needs support')}
                  >
                    Needs Support
                  </button>
                </div>
                <button 
                  className="p-2 rounded-md hover:bg-gray-100 text-gray-600 transition-all"
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
            {filteredTeamMembers.length === 0 ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No team members match the selected filter.</p>
              </div>
            ) : (
              filteredTeamMembers.map((member) => (
                <div key={member.id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all p-4">
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
                          member.productivity === 'Needs Support' ? 'warning' : 'danger'
                        }
                      />
                      <div className="ml-4">
                        <h3 className="font-medium text-gray-900">{member.name}</h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm text-gray-500">{member.role}</span>
                          <span className="mx-2 text-gray-300">•</span>
                          <div className="flex items-center text-sm text-gray-500">
                            <CalendarIcon className="h-4 w-4 mr-1 text-gray-400" />
                            <span>{formatDate(member.startDate)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stage and Progress */}
                    <div className="flex flex-col sm:items-end">
                      <div className="flex items-center mb-2">
                        <Badge 
                          label={`Month ${member.currentMonthInJourney}`}
                          color="blue"
                          size="sm"
                        />
                        <span className="ml-2 text-sm text-gray-500">{getMonthTitle(member.currentMonthInJourney)}</span>
                      </div>
                      <Badge 
                        label={member.productivity}
                        color={
                          member.productivity === 'On Track' ? 'green' : 
                          member.productivity === 'Exceeding' ? 'blue' : 
                          member.productivity === 'Needs Support' ? 'yellow' : 'red'
                        }
                      />
                    </div>
                  </div>

                  {/* Progress Section */}
                  <div className="mt-4 border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Onboarding Progress</span>
                      <span className="text-sm font-medium text-gray-700">{member.progressPercent}%</span>
                    </div>
                    <ProgressBar 
                      percent={member.progressPercent}
                      color={
                        member.progressPercent >= 75 ? 'green' : 
                        member.progressPercent >= 50 ? 'blue' : 
                        member.progressPercent >= 25 ? 'yellow' : 'red'
                      }
                    />
                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                      <span>{member.tasks.completed} of {member.tasks.total} tasks complete</span>
                      <button className="text-blue-600 hover:text-blue-800 inline-flex items-center transition-all font-medium">
                        View details <ChevronRightIcon className="w-4 h-4 ml-1"/>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* AI Insights Section */}
        <div id="ai-insights" className="space-y-6">
          {/* Insights Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800 flex items-center">
                <LightBulbIcon className="w-5 h-5 mr-2 text-yellow-500"/>
                AI-Generated Insights
              </h2>
              <div className="text-sm text-gray-500">
                Updated {daysSince(new Date('2025-04-15'))} day(s) ago
              </div>
            </div>
          </div>

          {/* Insights Cards */}
          {insights.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
              <p className="text-gray-500">No insights available at this time.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {insights.map((insight) => (
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
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium inline-flex items-center transition-all">
                  View All Insights <ChevronRightIcon className="w-4 h-4 ml-1"/>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagerDashboard;
