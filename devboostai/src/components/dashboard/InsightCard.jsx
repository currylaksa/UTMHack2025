// src/components/dashboard/InsightCard.jsx
import React from 'react';
import { ExclamationTriangleIcon, CheckBadgeIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import Avatar from './Avatar';

/**
 * Card component for displaying AI insights
 */
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

export default InsightCard;