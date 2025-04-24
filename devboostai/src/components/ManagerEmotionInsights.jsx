import React, { useState } from 'react';
import { 
  FaceSmileIcon, 
  FaceFrownIcon, 
  QuestionMarkCircleIcon,
  FireIcon,
  ClockIcon,
  HeartIcon,
  ExclamationCircleIcon,
  AcademicCapIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  MinusIcon
} from '@heroicons/react/24/outline';

// This component provides managers with insights and recommendations 
// based on team members' emotional data

const ManagerEmotionInsights = ({ teamMemberData }) => {
  const [activeTab, setActiveTab] = useState('insights'); // insights, recommendations, trends
  const [expandedMember, setExpandedMember] = useState(null);
  const [trendTimeframe, setTrendTimeframe] = useState('week'); // week, month, quarter
  
  // Get emotion icon based on emotion name
  const getEmotionIcon = (emotion, size = 'h-5 w-5') => {
    switch (emotion) {
      case 'excited':
        return <FireIcon className={`${size} text-orange-500`} />;
      case 'frustrated':
        return <FaceFrownIcon className={`${size} text-red-500`} />;
      case 'confused':
        return <QuestionMarkCircleIcon className={`${size} text-purple-500`} />;
      case 'bored':
        return <ClockIcon className={`${size} text-gray-500`} />;
      case 'anxious':
        return <ExclamationCircleIcon className={`${size} text-yellow-500`} />;
      case 'interested':
        return <HeartIcon className={`${size} text-blue-500`} />;
      default: // neutral
        return <FaceSmileIcon className={`${size} text-green-500`} />;
    }
  };
  
  // Get trend icon based on trend name
  const getTrendIcon = (trend, size = 'h-5 w-5') => {
    switch (trend) {
      case 'improving':
        return <ArrowTrendingUpIcon className={`${size} text-green-500`} />;
      case 'declining':
        return <ArrowTrendingDownIcon className={`${size} text-red-500`} />;
      default: // stable
        return <MinusIcon className={`${size} text-gray-500`} />;
    }
  };

  // Get emotion color classes based on emotion name
  const getEmotionColors = (emotion) => {
    const config = {
      excited: { text: 'text-orange-500', bg: 'bg-orange-100', border: 'border-orange-200' },
      frustrated: { text: 'text-red-500', bg: 'bg-red-100', border: 'border-red-200' },
      confused: { text: 'text-purple-500', bg: 'bg-purple-100', border: 'border-purple-200' },
      bored: { text: 'text-gray-500', bg: 'bg-gray-100', border: 'border-gray-200' },
      anxious: { text: 'text-yellow-500', bg: 'bg-yellow-100', border: 'border-yellow-200' },
      interested: { text: 'text-blue-500', bg: 'bg-blue-100', border: 'border-blue-200' },
      neutral: { text: 'text-green-500', bg: 'bg-green-100', border: 'border-green-200' },
    };
    
    return config[emotion] || config.neutral;
  };
  
  // Get emotion label
  const getEmotionLabel = (emotion) => {
    const labels = {
      excited: 'Excited',
      frustrated: 'Frustrated',
      confused: 'Confused',
      bored: 'Disengaged',
      anxious: 'Anxious',
      interested: 'Interested',
      neutral: 'Neutral'
    };
    
    return labels[emotion] || 'Neutral';
  };
  
  // Get trend label
  const getTrendLabel = (trend) => {
    const labels = {
      improving: 'Improving',
      declining: 'Declining',
      stable: 'Stable'
    };
    
    return labels[trend] || 'Stable';
  };
  
  // Get trend color classes
  const getTrendColors = (trend) => {
    const config = {
      improving: { text: 'text-green-500', bg: 'bg-green-100', border: 'border-green-200' },
      declining: { text: 'text-red-500', bg: 'bg-red-100', border: 'border-red-200' },
      stable: { text: 'text-gray-500', bg: 'bg-gray-100', border: 'border-gray-200' },
    };
    
    return config[trend] || config.stable;
  };
  
  // Get coaching recommendations based on emotion
  const getCoachingRecommendations = (emotion, trend) => {
    const recommendations = {
      excited: [
        "Leverage their enthusiasm by encouraging them to mentor others",
        "Give them challenging stretch goals to maintain momentum",
        "Connect them with projects that match their excitement level",
        "Be careful not to overwhelm them with too many responsibilities at once"
      ],
      frustrated: [
        "Schedule a 1:1 to discuss obstacles and challenges they're facing",
        "Break down complex tasks into smaller, manageable chunks",
        "Offer additional resources or pair them with a more experienced team member",
        "Focus on small wins to rebuild confidence and momentum"
      ],
      confused: [
        "Provide clearer documentation and step-by-step guidance",
        "Schedule a walkthrough session to clarify expectations",
        "Create visual aids or diagrams to explain complex concepts",
        "Check in more frequently with specific questions to identify knowledge gaps"
      ],
      bored: [
        "Introduce more challenging tasks to re-engage them",
        "Explore their interests and align tasks with their preferences",
        "Give them opportunities to learn new skills or technologies",
        "Involve them in decision-making to increase their investment"
      ],
      anxious: [
        "Provide reassurance and emphasize that mistakes are part of learning",
        "Establish clearer expectations and smaller milestones",
        "Reduce perceived time pressure if possible",
        "Schedule regular check-ins to address concerns early"
      ],
      interested: [
        "Provide deeper learning resources on topics they're exploring",
        "Connect them with subject matter experts in the organization",
        "Give them opportunities to pursue areas of interest within project bounds",
        "Encourage them to present what they're learning to the team"
      ],
      neutral: [
        "Check in casually to ensure they have what they need",
        "Continue with the established onboarding pace",
        "Introduce variety in tasks to maintain engagement",
        "Schedule periodic career development discussions"
      ]
    };
    
    // Adjust recommendations based on trend
    if (trend === 'improving' && emotion !== 'excited' && emotion !== 'interested') {
      return [
        "Their emotional state is improving - maintain current approach",
        ...recommendations[emotion].slice(0, 3)
      ];
    } else if (trend === 'declining' && emotion !== 'neutral') {
      return [
        "Their emotional state is declining - consider a more active intervention",
        "Schedule a 1:1 to discuss their experience and needs",
        ...recommendations[emotion].slice(0, 2)
      ];
    }
    
    return recommendations[emotion] || recommendations.neutral;
  };
  
  // Function to calculate team mood score (0-100)
  const calculateTeamMoodScore = () => {
    if (!teamMemberData || teamMemberData.length === 0) {
      return 75; // Default neutral-positive
    }
    
    // Calculate based on dominant emotions and trends
    const emotionScores = {
      excited: 90,
      interested: 80,
      neutral: 70,
      anxious: 50,
      confused: 40,
      bored: 30,
      frustrated: 20
    };
    
    const trendModifiers = {
      improving: 10,
      stable: 0,
      declining: -10
    };
    
    // Calculate average score
    let totalScore = 0;
    teamMemberData.forEach(member => {
      const baseScore = emotionScores[member.dominantEmotion] || 70;
      const modifier = trendModifiers[member.trend] || 0;
      totalScore += baseScore + modifier;
    });
    
    const averageScore = Math.round(totalScore / teamMemberData.length);
    return Math.min(Math.max(averageScore, 0), 100); // Clamp between 0-100
  };
  
  // Get team mood category and color
  const getTeamMoodCategory = (score) => {
    if (score >= 80) return { label: 'Excellent', color: 'text-green-500' };
    if (score >= 70) return { label: 'Good', color: 'text-blue-500' };
    if (score >= 50) return { label: 'Moderate', color: 'text-yellow-500' };
    if (score >= 30) return { label: 'Concerning', color: 'text-orange-500' };
    return { label: 'Critical', color: 'text-red-500' };
  };
  
  const moodScore = calculateTeamMoodScore();
  const moodCategory = getTeamMoodCategory(moodScore);
  
  // Function to get overall team recommendations
  const getTeamRecommendations = () => {
    if (moodScore >= 80) {
      return [
        "Team morale is excellent - perfect time for challenging projects",
        "Capitalize on positive momentum with team building activities",
        "Recognize and celebrate recent achievements",
        "Consider pairing excited team members with newer hires"
      ];
    } else if (moodScore >= 70) {
      return [
        "Team morale is good - maintain current management approach",
        "Look for opportunities to address individual concerns",
        "Continue regular 1:1s and team check-ins",
        "Consider a team retrospective to identify improvement areas"
      ];
    } else if (moodScore >= 50) {
      return [
        "Team morale is moderate - some attention needed",
        "Schedule individual check-ins with team members showing concerns",
        "Review onboarding materials for clarity and completeness",
        "Consider a team workshop to address common challenges"
      ];
    } else if (moodScore >= 30) {
      return [
        "Team morale is concerning - immediate attention required",
        "Schedule urgent 1:1s with struggling team members",
        "Review workload and deadlines for potential adjustments",
        "Consider bringing in additional support or resources"
      ];
    } else {
      return [
        "Team morale is critical - urgent intervention needed",
        "Pause non-essential work to address critical issues",
        "Consider team restructuring or project timeline adjustments",
        "Schedule daily check-ins until situation improves"
      ];
    }
  };
  
  // Mock data for emotion trends over time (this would come from the API in a real app)
  const mockEmotionTrendData = {
    tm1: { // Sarah Chen
      week: [
        { date: '2025-04-18', emotion: 'confused', intensity: 0.7 },
        { date: '2025-04-19', emotion: 'confused', intensity: 0.8 },
        { date: '2025-04-20', emotion: 'frustrated', intensity: 0.6 },
        { date: '2025-04-21', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-22', emotion: 'neutral', intensity: 0.4 },
        { date: '2025-04-23', emotion: 'interested', intensity: 0.6 },
        { date: '2025-04-24', emotion: 'interested', intensity: 0.7 }
      ],
      month: [
        { date: '2025-03-24', emotion: 'excited', intensity: 0.9 },
        { date: '2025-03-31', emotion: 'interested', intensity: 0.8 },
        { date: '2025-04-07', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-14', emotion: 'confused', intensity: 0.6 },
        { date: '2025-04-21', emotion: 'interested', intensity: 0.7 }
      ]
    },
    tm2: { // James Wilson
      week: [
        { date: '2025-04-18', emotion: 'interested', intensity: 0.8 },
        { date: '2025-04-19', emotion: 'excited', intensity: 0.9 },
        { date: '2025-04-20', emotion: 'excited', intensity: 0.9 },
        { date: '2025-04-21', emotion: 'interested', intensity: 0.7 },
        { date: '2025-04-22', emotion: 'interested', intensity: 0.8 },
        { date: '2025-04-23', emotion: 'excited', intensity: 0.9 },
        { date: '2025-04-24', emotion: 'excited', intensity: 0.9 }
      ],
      month: [
        { date: '2025-03-24', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-03-31', emotion: 'interested', intensity: 0.6 },
        { date: '2025-04-07', emotion: 'interested', intensity: 0.7 },
        { date: '2025-04-14', emotion: 'interested', intensity: 0.8 },
        { date: '2025-04-21', emotion: 'excited', intensity: 0.9 }
      ]
    },
    tm3: { // Priya Patel
      week: [
        { date: '2025-04-18', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-19', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-20', emotion: 'interested', intensity: 0.6 },
        { date: '2025-04-21', emotion: 'interested', intensity: 0.7 },
        { date: '2025-04-22', emotion: 'interested', intensity: 0.8 },
        { date: '2025-04-23', emotion: 'interested', intensity: 0.8 },
        { date: '2025-04-24', emotion: 'excited', intensity: 0.9 }
      ],
      month: [
        { date: '2025-04-01', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-07', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-14', emotion: 'interested', intensity: 0.7 },
        { date: '2025-04-21', emotion: 'excited', intensity: 0.8 }
      ]
    },
    tm4: { // Michael Brown
      week: [
        { date: '2025-04-18', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-19', emotion: 'interested', intensity: 0.6 },
        { date: '2025-04-20', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-21', emotion: 'interested', intensity: 0.6 },
        { date: '2025-04-22', emotion: 'interested', intensity: 0.7 },
        { date: '2025-04-23', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-24', emotion: 'neutral', intensity: 0.5 }
      ],
      month: [
        { date: '2025-03-24', emotion: 'confused', intensity: 0.6 },
        { date: '2025-03-31', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-07', emotion: 'interested', intensity: 0.7 },
        { date: '2025-04-14', emotion: 'neutral', intensity: 0.5 },
        { date: '2025-04-21', emotion: 'interested', intensity: 0.6 }
      ]
    }
  };

  // Calculate team emotion distribution for a given timeframe
  const calculateTeamEmotionDistribution = (timeframe) => {
    const distribution = {
      excited: 0,
      interested: 0,
      neutral: 0,
      confused: 0,
      anxious: 0,
      bored: 0,
      frustrated: 0
    };
    
    // Count occurrences of each emotion
    Object.keys(mockEmotionTrendData).forEach(memberId => {
      if (mockEmotionTrendData[memberId][timeframe]) {
        mockEmotionTrendData[memberId][timeframe].forEach(entry => {
          if (distribution[entry.emotion] !== undefined) {
            distribution[entry.emotion]++;
          }
        });
      }
    });
    
    return distribution;
  };

  // Render the trend chart for a team member
  const renderMemberTrendChart = (memberId) => {
    const trendData = mockEmotionTrendData[memberId]?.[trendTimeframe] || [];
    if (trendData.length === 0) return <p className="text-sm text-gray-500 italic">No trend data available</p>;
    
    // Render a simple horizontal emotion timeline
    return (
      <div className="mt-2">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2">
          {trendData.map((entry, index) => {
            const colors = getEmotionColors(entry.emotion);
            // Format date based on timeframe
            const dateLabel = trendTimeframe === 'week' 
              ? new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' })
              : new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              
            return (
              <div key={index} className="flex flex-col items-center">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${colors.bg} border ${colors.border}`}
                  style={{ opacity: 0.5 + entry.intensity * 0.5 }} // Adjust opacity based on intensity
                >
                  {getEmotionIcon(entry.emotion, 'h-5 w-5')}
                </div>
                <span className="text-xs text-gray-500 mt-1">{dateLabel}</span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render team emotion distribution chart
  const renderTeamDistributionChart = () => {
    const distribution = calculateTeamEmotionDistribution(trendTimeframe);
    const emotions = Object.keys(distribution);
    const maxCount = Math.max(...Object.values(distribution), 1); // Avoid division by zero
    
    return (
      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Team emotion distribution:</h4>
        <div className="space-y-2">
          {emotions.map(emotion => {
            const count = distribution[emotion];
            const percentage = Math.round((count / maxCount) * 100);
            const colors = getEmotionColors(emotion);
            
            return (
              <div key={emotion} className="flex items-center">
                <div className="w-24 text-xs text-gray-600">{getEmotionLabel(emotion)}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div 
                      className={`${colors.bg} h-2.5 rounded-full`} 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-8 text-right text-xs text-gray-600">{count}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
      <div className="px-4 py-5 sm:px-6 bg-gradient-to-r from-indigo-50 via-purple-50 to-blue-50 border-b border-gray-200">
        <h3 className="text-lg font-bold leading-6 text-indigo-800">Team Member Emotions</h3>
        <p className="mt-1 text-sm text-gray-600">Monitor emotional states and get coaching recommendations</p>
        
        <div className="mt-3 flex border-b border-gray-200">
          <button
            className={`px-4 py-2 text-sm font-medium ${activeTab === 'insights' ? 'text-indigo-700 border-b-2 border-indigo-500' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('insights')}
          >
            Insights
          </button>
          <button
            className={`ml-8 px-4 py-2 text-sm font-medium ${activeTab === 'recommendations' ? 'text-indigo-700 border-b-2 border-indigo-500' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('recommendations')}
          >
            Recommendations
          </button>
          <button
            className={`ml-8 px-4 py-2 text-sm font-medium ${activeTab === 'trends' ? 'text-indigo-700 border-b-2 border-indigo-500' : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
            onClick={() => setActiveTab('trends')}
          >
            Trends
          </button>
        </div>
      </div>
      
      <div className="px-4 py-5 sm:p-6">
        {activeTab === 'insights' && (
          <div className="space-y-6">
            {teamMemberData.map((member) => (
              <div 
                key={member.id} 
                className={`rounded-lg border ${expandedMember === member.id ? 'border-indigo-200 bg-indigo-50' : 'border-gray-200 hover:bg-gray-50'} 
                cursor-pointer transition-colors duration-150`}
                onClick={() => setExpandedMember(expandedMember === member.id ? null : member.id)}
              >
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full overflow-hidden">
                        <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTrendColors(member.trend || 'stable').bg} ${getTrendColors(member.trend || 'stable').text}`}>
                        {getTrendLabel(member.trend || 'stable')}
                      </div>
                      <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${getEmotionColors(member.emotion || 'neutral').bg} ${getEmotionColors(member.emotion || 'neutral').text}`}>
                        {getEmotionLabel(member.emotion || 'neutral')}
                      </div>
                    </div>
                  </div>
                  
                  {expandedMember === member.id && (
                    <div className="mt-4 border-t border-gray-200 pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Recent triggers:</h5>
                          {member.triggers && member.triggers.length > 0 ? (
                            <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                              {member.triggers.map((trigger, idx) => (
                                <li key={idx}>{trigger}</li>
                              ))}
                            </ul>
                          ) : (
                            <p className="text-sm text-gray-500 italic">No specific triggers detected</p>
                          )}
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-gray-700 mb-2">Recent interactions:</h5>
                          <p className="text-sm text-gray-600">{member.recentInteractions || "No recent interactions recorded"}</p>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Onboarding progress:</h5>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-1">
                          <div 
                            className="bg-indigo-600 h-2.5 rounded-full" 
                            style={{ width: `${member.onboardingProgress || 0}%` }}
                          ></div>
                        </div>
                        <p className="text-xs text-right text-gray-500">{member.onboardingProgress || 0}% complete</p>
                      </div>
                      
                      <div className="mt-4">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">Recommended approach:</h5>
                        <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                          {getCoachingRecommendations(member.emotion || 'neutral', member.trend || 'stable').slice(0, 2).map((rec, idx) => (
                            <li key={idx}>{rec}</li>
                          ))}
                        </ul>
                        <button className="mt-2 text-xs text-indigo-600 font-medium hover:text-indigo-800">
                          View all recommendations →
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'recommendations' && (
          <div className="space-y-4">
            <p className="text-sm text-gray-500">Select a team member to view personalized coaching recommendations.</p>
            {/* Recommendations tab content */}
          </div>
        )}
        
        {activeTab === 'trends' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h4 className="text-sm font-bold text-gray-700">Emotional trend patterns</h4>
              <div className="flex space-x-1 border border-gray-200 rounded-md">
                <button 
                  className={`px-3 py-1 text-xs ${trendTimeframe === 'week' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setTrendTimeframe('week')}
                >
                  Week
                </button>
                <button 
                  className={`px-3 py-1 text-xs ${trendTimeframe === 'month' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
                  onClick={() => setTrendTimeframe('month')}
                >
                  Month
                </button>
              </div>
            </div>
            
            {/* Team emotion summary */}
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Team emotional trends</h4>
              {renderTeamDistributionChart()}
              
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Key observations:</h4>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  <li>Team's overall emotional state is {trendTimeframe === 'week' ? 'improving' : 'stable'} this {trendTimeframe}</li>
                  <li>Interest levels are increasing across most team members</li>
                  <li>Sarah has shown improvement from confusion to interest</li>
                  <li>James maintains consistently high engagement</li>
                </ul>
              </div>
            </div>
            
            {/* Individual member trends */}
            <h4 className="text-sm font-bold text-gray-700 mt-6 mb-2">Individual trends</h4>
            <div className="space-y-4">
              {teamMemberData.map((member) => (
                <div key={member.id} className="rounded-lg border border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full overflow-hidden">
                        <img src={member.avatar} alt={member.name} className="h-full w-full object-cover" />
                      </div>
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{member.name}</h4>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className={`px-2.5 py-1 rounded-full text-xs font-medium ${getTrendColors(member.trend || 'stable').bg} ${getTrendColors(member.trend || 'stable').text}`}>
                      {getTrendLabel(member.trend || 'stable')}
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    {renderMemberTrendChart(member.id)}
                  </div>
                  
                  <div className="mt-2 text-xs text-gray-500">
                    {member.id === 'tm1' && "Confusion → Interest: Sarah is adapting well after initial documentation struggles"}
                    {member.id === 'tm2' && "Consistently excited: James is highly engaged and motivated"}
                    {member.id === 'tm3' && "Rapidly improving: Priya is thriving and gaining confidence"}
                    {member.id === 'tm4' && "Steady and stable: Michael shows consistent balanced emotional pattern"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagerEmotionInsights;