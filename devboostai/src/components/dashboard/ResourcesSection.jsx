import React, { useState } from 'react';
import { 
  BookOpenIcon,
  SparklesIcon,
  ClockIcon,
  DocumentTextIcon,
  VideoCameraIcon 
} from '@heroicons/react/24/outline';

const ResourcesSection = ({ resources, highlightedResources = [] }) => {
  const [showResourceDetail, setShowResourceDetail] = useState(null);
  const [resourceView, setResourceView] = useState('priority'); // priority, category, recent

  // Get resource icon based on type
  const getResourceIcon = (type) => {
    switch (type) {
      case 'document': 
        return <DocumentTextIcon className="w-5 h-5 text-blue-500 flex-shrink-0" />;
      case 'video': 
        return <VideoCameraIcon className="w-5 h-5 text-purple-500 flex-shrink-0" />;
      default: 
        return <DocumentTextIcon className="w-5 h-5 text-gray-500 flex-shrink-0" />;
    }
  };
  
  // Parse relative time strings for sorting resources by recency
  const parseTimeAgo = (timeString) => {
    const number = parseInt(timeString.split(' ')[0]);
    if (timeString.includes('day')) {
      return number * 24 * 60 * 60 * 1000;
    } else if (timeString.includes('week')) {
      return number * 7 * 24 * 60 * 60 * 1000;
    } else if (timeString.includes('month')) {
      return number * 30 * 24 * 60 * 60 * 1000;
    } else {
      return 0;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-4 text-white">
        <h2 className="text-lg font-semibold flex items-center">
          <BookOpenIcon className="w-6 h-6 mr-2" />
          Knowledge Acceleration
        </h2>
        <p className="text-sm text-orange-100 mt-1">Personalized resources to accelerate your onboarding</p>
      </div>
      
      <div className="border-b border-gray-200 bg-gray-50">
        <nav className="flex -mb-px overflow-x-auto" aria-label="Resource Views">
          <button 
            onClick={() => setResourceView('priority')}
            className={`py-3 px-4 inline-flex items-center text-sm font-medium whitespace-nowrap 
              ${resourceView === 'priority' 
                ? 'border-b-2 border-orange-500 text-orange-600' 
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <SparklesIcon className={`w-5 h-5 mr-2 ${resourceView === 'priority' ? 'text-orange-500' : 'text-gray-400'}`} />
            ML Prioritized
          </button>
          <button 
            onClick={() => setResourceView('category')}
            className={`py-3 px-4 inline-flex items-center text-sm font-medium whitespace-nowrap 
              ${resourceView === 'category' 
                ? 'border-b-2 border-orange-500 text-orange-600' 
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <BookOpenIcon className={`w-5 h-5 mr-2 ${resourceView === 'category' ? 'text-orange-500' : 'text-gray-400'}`} />
            By Category
          </button>
          <button 
            onClick={() => setResourceView('recent')}
            className={`py-3 px-4 inline-flex items-center text-sm font-medium whitespace-nowrap 
              ${resourceView === 'recent' 
                ? 'border-b-2 border-orange-500 text-orange-600' 
                : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
          >
            <ClockIcon className={`w-5 h-5 mr-2 ${resourceView === 'recent' ? 'text-orange-500' : 'text-gray-400'}`} />
            Recently Updated
          </button>
        </nav>
      </div>
      
      <div className="p-4">
        {showResourceDetail ? (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800 flex items-center">
                {getResourceIcon(showResourceDetail.type)}
                <span className="ml-2">{showResourceDetail.title}</span>
                {showResourceDetail.aiRecommended && (
                  <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700 flex items-center">
                    <SparklesIcon className="w-3 h-3 mr-1" />
                    AI Recommended
                  </span>
                )}
              </h3>
              <button 
                onClick={() => setShowResourceDetail(null)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                Back to list
              </button>
            </div>
            
            <p className="text-sm text-gray-700 mb-3">{showResourceDetail.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                Category: {showResourceDetail.category}
              </span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {showResourceDetail.viewCount} views
              </span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                {showResourceDetail.type === 'video' ? `Duration: ${showResourceDetail.duration}` : `Est. read time: ${showResourceDetail.estimatedReadTime}`}
              </span>
            </div>
            
            <div className="text-xs text-gray-500 mb-3">
              Last updated: {showResourceDetail.lastUpdated}
            </div>
            
            <button className="mt-1 w-full py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
              {showResourceDetail.type === 'video' ? 'Watch Video' : 'View Document'}
            </button>
          </div>
        ) : (
          <>
            {resourceView === 'priority' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600">Showing resources prioritized specifically for your current learning focus</p>
                  <div className="bg-blue-50 text-blue-700 px-2 py-1 text-xs rounded-md flex items-center">
                    <SparklesIcon className="w-4 h-4 mr-1" />
                    ML-ranked
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {resources
                    .sort((a, b) => b.relevanceScore - a.relevanceScore)
                    .map(resource => (
                    <li 
                      key={resource.id} 
                      className={`border rounded-lg ${
                        highlightedResources.includes(resource.id) 
                          ? 'border-orange-300 bg-orange-50/30' 
                          : 'border-gray-100'
                      } hover:border-orange-200 hover:bg-orange-50/10 transition-colors`}
                    >
                      <button 
                        onClick={() => setShowResourceDetail(resource)}
                        className="w-full text-left p-3"
                      >
                        <div className="flex items-start">
                          <div className="mr-3 mt-0.5">
                            {getResourceIcon(resource.type)}
                          </div>
                          <div className="flex-grow">
                            <div className="flex justify-between items-center">
                              <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                              <div className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                                <span className="text-xs font-medium text-gray-700">{resource.relevanceScore}% Match</span>
                              </div>
                            </div>
                            <p className="text-xs text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
                            <div className="flex items-center mt-2 text-xs text-gray-500">
                              <span className="mr-3">{resource.type === 'video' ? `${resource.duration}` : `${resource.estimatedReadTime} read`}</span>
                              <span>{resource.lastUpdated}</span>
                              {resource.aiRecommended && (
                                <span className="ml-auto text-blue-600 flex items-center">
                                  <SparklesIcon className="w-3 h-3 mr-1" />
                                  AI Suggested
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {resourceView === 'category' && (
              <div>
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full font-medium">All</button>
                    <button className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Technical</button>
                    <button className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Process</button>
                    <button className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">Company</button>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {Object.entries(resources.reduce((acc, resource) => {
                    const category = resource.category;
                    if (!acc[category]) {
                      acc[category] = [];
                    }
                    acc[category].push(resource);
                    return acc;
                  }, {})).map(([category, categoryResources]) => (
                    <li key={category} className="mb-4">
                      <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">{category}</h3>
                      <ul className="space-y-2">
                        {categoryResources.map(resource => (
                          <li 
                            key={resource.id} 
                            className={`border rounded-lg ${
                              highlightedResources.includes(resource.id) 
                                ? 'border-orange-300 bg-orange-50/30' 
                                : 'border-gray-100'
                            } hover:border-orange-200 hover:bg-orange-50/10 transition-colors`}
                          >
                            <button 
                              onClick={() => setShowResourceDetail(resource)}
                              className="w-full text-left p-3"
                            >
                              <div className="flex items-start">
                                <div className="mr-3 mt-0.5">
                                  {getResourceIcon(resource.type)}
                                </div>
                                <div className="flex-grow">
                                  <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-1">{resource.description}</p>
                                </div>
                              </div>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {resourceView === 'recent' && (
              <ul className="space-y-3">
                {resources
                  .sort((a, b) => parseTimeAgo(a.lastUpdated) - parseTimeAgo(b.lastUpdated))
                  .map(resource => (
                  <li 
                    key={resource.id} 
                    className={`border rounded-lg ${
                      highlightedResources.includes(resource.id) 
                        ? 'border-orange-300 bg-orange-50/30' 
                        : 'border-gray-100'
                    } hover:border-orange-200 hover:bg-orange-50/10 transition-colors`}
                  >
                    <button 
                      onClick={() => setShowResourceDetail(resource)}
                      className="w-full text-left p-3"
                    >
                      <div className="flex items-start">
                        <div className="mr-3 mt-0.5">
                          {getResourceIcon(resource.type)}
                        </div>
                        <div className="flex-grow">
                          <h4 className="text-sm font-medium text-gray-800">{resource.title}</h4>
                          <p className="text-xs text-gray-600 mt-1 line-clamp-2">{resource.description}</p>
                          <div className="text-xs text-gray-500 mt-2">
                            Updated: {resource.lastUpdated}
                          </div>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ResourcesSection;