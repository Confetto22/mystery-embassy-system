/**
 * Utility functions for date operations
 */

/**
 * Get start and end of day for a given date
 * @param {Date|string} date - The date to get boundaries for
 * @returns {Object} - Object with startOfDay and endOfDay Date objects
 */
export const getDayBoundaries = (date = new Date()) => {
  const targetDate = new Date(date);
  
  const startOfDay = new Date(targetDate);
  startOfDay.setHours(0, 0, 0, 0);
  
  const endOfDay = new Date(targetDate);
  endOfDay.setHours(23, 59, 59, 999);
  
  return { startOfDay, endOfDay };
};

/**
 * Get date range for filtering (start of day to start of next day)
 * @param {Date|string} date - The date to get range for
 * @returns {Object} - Object with gte and lt Date objects for Prisma queries
 */
export const getDateRange = (date = new Date()) => {
  const targetDate = new Date(date);
  targetDate.setHours(0, 0, 0, 0);
  
  const nextDay = new Date(targetDate);
  nextDay.setDate(nextDay.getDate() + 1);
  
  return {
    gte: targetDate,
    lt: nextDay
  };
};

/**
 * Get upcoming date range (from now to specified days ahead)
 * @param {number} days - Number of days ahead (default: 30)
 * @returns {Object} - Object with gte and lte Date objects
 */
export const getUpcomingRange = (days = 30) => {
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(now.getDate() + days);
  
  return {
    gte: now,
    lte: futureDate
  };
};

/**
 * Check if a date is today
 * @param {Date|string} date - The date to check
 * @returns {boolean} - True if the date is today
 */
export const isToday = (date) => {
  const today = new Date();
  const checkDate = new Date(date);
  
  return today.toDateString() === checkDate.toDateString();
};