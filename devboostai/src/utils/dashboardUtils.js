// src/utils/dashboardUtils.js

/**
 * Format a date string to a more readable format
 * @param {string} dateString - Date string in ISO format
 * @returns {string} - Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

/**
 * Calculate days since a given date
 * @param {Date|string} date - Date to calculate days since
 * @returns {number} - Number of days
 */
export const daysSince = (date) => {
  const today = new Date();
  // Ensure 'date' is a Date object before comparison
  const startDate = date instanceof Date ? date : new Date(date);
  if (isNaN(startDate)) return 0; // Handle invalid date input
  const diffTime = Math.abs(today - startDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Get appropriate month title based on month number
 * @param {number} monthNum - Month number in the onboarding journey
 * @returns {string} - Month title
 */
export const getMonthTitle = (monthNum) => {
  if (monthNum <= 1) return "Pre-boarding / Setup";
  if (monthNum <= 2) return "Training & Goals";
  if (monthNum <= 4) return "Culture & HR Check";
  if (monthNum <= 7) return "Continued Training";
  if (monthNum <= 10) return "Skill Review / Impact";
  return "Retention / Development";
};

/**
 * Get appropriate CSS class for productivity status
 * @param {string} productivity - Productivity status 
 * @returns {string} - CSS class for the status
 */
export const getProductivityClass = (productivity) => {
  // Added optional chaining (?.) to prevent errors if productivity is null/undefined
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