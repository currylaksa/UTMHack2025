// src/components/dashboard/Avatar.jsx
import React from 'react';

/**
 * Avatar component for displaying user profile images
 */
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

export default Avatar;