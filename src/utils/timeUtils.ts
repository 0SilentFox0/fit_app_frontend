// Time utility functions

/**
 * Convert time string (HH:MM) to minutes
 */
export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

/**
 * Convert minutes to time string (HH:MM)
 */
export const minutesToTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};

/**
 * Add minutes to a time string
 */
export const addMinutesToTime = (time: string, minutes: number): string => {
  const totalMinutes = timeToMinutes(time) + minutes;
  return minutesToTime(totalMinutes);
};

/**
 * Subtract minutes from a time string
 */
export const subtractMinutesFromTime = (
  time: string,
  minutes: number
): string => {
  const totalMinutes = timeToMinutes(time) - minutes;
  if (totalMinutes < 0) {
    return "00:00";
  }
  return minutesToTime(totalMinutes);
};

/**
 * Get the duration between two time strings in minutes
 */
export const getDurationBetweenTimes = (
  startTime: string,
  endTime: string
): number => {
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  return endMinutes - startMinutes;
};

/**
 * Check if a time is between two other times
 */
export const isTimeBetween = (
  time: string,
  startTime: string,
  endTime: string
): boolean => {
  const timeMinutes = timeToMinutes(time);
  const startMinutes = timeToMinutes(startTime);
  const endMinutes = timeToMinutes(endTime);
  return timeMinutes >= startMinutes && timeMinutes <= endMinutes;
};

/**
 * Check if two time ranges overlap
 */
export const doTimeRangesOverlap = (
  start1: string,
  end1: string,
  start2: string,
  end2: string
): boolean => {
  const start1Minutes = timeToMinutes(start1);
  const end1Minutes = timeToMinutes(end1);
  const start2Minutes = timeToMinutes(start2);
  const end2Minutes = timeToMinutes(end2);

  return !(end1Minutes <= start2Minutes || start1Minutes >= end2Minutes);
};

/**
 * Validate time string format (HH:MM)
 */
export const isValidTimeFormat = (time: string): boolean => {
  const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return timeRegex.test(time);
};

/**
 * Check if time is within business hours (6 AM to 10 PM)
 */
export const isWithinBusinessHours = (time: string): boolean => {
  const minutes = timeToMinutes(time);
  const businessStart = 6 * 60; // 6 AM
  const businessEnd = 22 * 60; // 10 PM
  return minutes >= businessStart && minutes <= businessEnd;
};

/**
 * Generate time slots with specified interval
 */
export const generateTimeSlots = (
  startHour: number = 6,
  endHour: number = 22,
  intervalMinutes: number = 30
): string[] => {
  const slots: string[] = [];
  const startMinutes = startHour * 60;
  const endMinutes = endHour * 60;

  for (
    let minutes = startMinutes;
    minutes <= endMinutes;
    minutes += intervalMinutes
  ) {
    slots.push(minutesToTime(minutes));
  }

  return slots;
};

/**
 * Format time for display (e.g., "2:30 PM")
 */
export const formatTimeForDisplay = (time: string): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
  return `${displayHours}:${minutes.toString().padStart(2, "0")} ${period}`;
};

/**
 * Get the next available time slot after a given time
 */
export const getNextAvailableSlot = (
  time: string,
  intervalMinutes: number = 30
): string => {
  const minutes = timeToMinutes(time);
  const nextMinutes = Math.ceil(minutes / intervalMinutes) * intervalMinutes;
  return minutesToTime(nextMinutes);
};

/**
 * Check if a time slot is available given existing events
 */
export const isTimeSlotAvailable = (
  startTime: string,
  duration: number,
  existingEvents: Array<{ startTime: string; endTime: string }>
): boolean => {
  const endTime = addMinutesToTime(startTime, duration);

  return !existingEvents.some((event) => {
    return doTimeRangesOverlap(
      startTime,
      endTime,
      event.startTime,
      event.endTime
    );
  });
};

/**
 * Get available time slots for a given duration
 */
export const getAvailableTimeSlots = (
  duration: number,
  existingEvents: Array<{ startTime: string; endTime: string }>,
  startHour: number = 6,
  endHour: number = 22,
  intervalMinutes: number = 30
): string[] => {
  const allSlots = generateTimeSlots(startHour, endHour, intervalMinutes);

  return allSlots.filter((slot) => {
    const endTime = addMinutesToTime(slot, duration);
    if (timeToMinutes(endTime) > endHour * 60) {
      return false; // Slot extends beyond business hours
    }
    return isTimeSlotAvailable(slot, duration, existingEvents);
  });
};
