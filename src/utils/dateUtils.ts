// Date and time utility functions

/**
 * Convert a date to ISO string format (YYYY-MM-DD)
 */
export const dateToISOString = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

/**
 * Convert a date string to Date object
 */
export const stringToDate = (dateString: string): Date => {
  return new Date(dateString);
};

/**
 * Get the start of the week for a given date
 */
export const getStartOfWeek = (date: Date): Date => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() - date.getDay());
  return startOfWeek;
};

/**
 * Get the end of the week for a given date
 */
export const getEndOfWeek = (date: Date): Date => {
  const endOfWeek = new Date(date);
  endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
  return endOfWeek;
};

/**
 * Get the start of the month for a given date
 */
export const getStartOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth(), 1);
};

/**
 * Get the end of the month for a given date
 */
export const getEndOfMonth = (date: Date): Date => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
};

/**
 * Check if a date is today
 */
export const isToday = (date: Date): boolean => {
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Check if a date is in the past
 */
export const isPast = (date: Date): boolean => {
  return date < new Date();
};

/**
 * Check if a date is in the future
 */
export const isFuture = (date: Date): boolean => {
  return date > new Date();
};

/**
 * Format a date for display
 */
export const formatDate = (
  date: Date,
  format: "short" | "long" | "month" = "short"
): string => {
  switch (format) {
    case "short":
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    case "long":
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "month":
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
      });
    default:
      return date.toLocaleDateString();
  }
};

/**
 * Get the day name for a date
 */
export const getDayName = (
  date: Date,
  format: "short" | "long" = "short"
): string => {
  return date.toLocaleDateString("en-US", { weekday: format });
};

/**
 * Add days to a date
 */
export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(date.getDate() + days);
  return newDate;
};

/**
 * Add months to a date
 */
export const addMonths = (date: Date, months: number): Date => {
  const newDate = new Date(date);
  newDate.setMonth(date.getMonth() + months);
  return newDate;
};

/**
 * Get the number of days between two dates
 */
export const getDaysBetween = (startDate: Date, endDate: Date): number => {
  const timeDiff = endDate.getTime() - startDate.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

/**
 * Check if two dates are the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

/**
 * Check if two dates are in the same week
 */
export const isSameWeek = (date1: Date, date2: Date): boolean => {
  const week1Start = getStartOfWeek(date1);
  const week2Start = getStartOfWeek(date2);
  return isSameDay(week1Start, week2Start);
};

/**
 * Check if two dates are in the same month
 */
export const isSameMonth = (date1: Date, date2: Date): boolean => {
  return (
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
