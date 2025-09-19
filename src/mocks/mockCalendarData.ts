import { CalendarEvent, BookingRequest } from "../types";

// Mock calendar events
export const mockCalendarEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Strength Training Session",
    date: "2024-01-15",
    startTime: "09:00",
    endTime: "10:00",
    sessionType: "Strength Training",
    clientName: "John Smith",
    status: "confirmed",
  },
  {
    id: "2",
    title: "Cardio Workout",
    date: "2024-01-15",
    startTime: "14:00",
    endTime: "15:00",
    sessionType: "Cardio",
    clientName: "Sarah Johnson",
    status: "confirmed",
  },
  {
    id: "3",
    title: "Yoga Session",
    date: "2024-01-16",
    startTime: "10:00",
    endTime: "11:00",
    sessionType: "Yoga",
    clientName: "Mike Davis",
    status: "pending",
  },
  {
    id: "4",
    title: "HIIT Training",
    date: "2024-01-16",
    startTime: "16:00",
    endTime: "17:00",
    sessionType: "HIIT",
    clientName: "Emily Wilson",
    status: "confirmed",
  },
  {
    id: "5",
    title: "Personal Training",
    date: "2024-01-17",
    startTime: "08:00",
    endTime: "09:00",
    sessionType: "Personal Training",
    clientName: "David Brown",
    status: "confirmed",
  },
  {
    id: "6",
    title: "Pilates Class",
    date: "2024-01-17",
    startTime: "11:00",
    endTime: "12:00",
    sessionType: "Pilates",
    clientName: "Lisa Anderson",
    status: "pending",
  },
  {
    id: "7",
    title: "Boxing Session",
    date: "2024-01-18",
    startTime: "15:00",
    endTime: "16:00",
    sessionType: "Boxing",
    clientName: "Robert Taylor",
    status: "confirmed",
  },
  {
    id: "8",
    title: "CrossFit Training",
    date: "2024-01-18",
    startTime: "17:00",
    endTime: "18:00",
    sessionType: "CrossFit",
    clientName: "Jennifer Lee",
    status: "confirmed",
  },
  {
    id: "9",
    title: "Swimming Lesson",
    date: "2024-01-19",
    startTime: "09:00",
    endTime: "10:00",
    sessionType: "Swimming",
    clientName: "Thomas Clark",
    status: "pending",
  },
  {
    id: "10",
    title: "Dance Fitness",
    date: "2024-01-19",
    startTime: "14:00",
    endTime: "15:00",
    sessionType: "Dance Fitness",
    clientName: "Amanda White",
    status: "confirmed",
  },
];

// Mock booking requests
export const mockBookingRequests: BookingRequest[] = [
  {
    id: "req1",
    clientName: "Alex Rodriguez",
    date: "2024-01-20",
    time: "10:00",
    duration: 60,
    sessionType: "Strength Training",
    status: "pending",
    message: "I would like to focus on upper body strength.",
  },
  {
    id: "req2",
    clientName: "Maria Garcia",
    date: "2024-01-21",
    time: "15:00",
    duration: 90,
    sessionType: "Yoga",
    status: "pending",
    message: "Looking for a relaxing yoga session.",
  },
  {
    id: "req3",
    clientName: "James Wilson",
    date: "2024-01-22",
    time: "08:00",
    duration: 60,
    sessionType: "Cardio",
    status: "pending",
    message: "Need an early morning cardio boost.",
  },
  {
    id: "req4",
    clientName: "Sophie Chen",
    date: "2024-01-23",
    time: "16:00",
    duration: 120,
    sessionType: "Personal Training",
    status: "pending",
    message: "Comprehensive fitness assessment and training plan.",
  },
];

// Helper function to get events for a specific date
export const getEventsForDate = (date: string): CalendarEvent[] => {
  return mockCalendarEvents.filter((event) => event.date === date);
};

// Helper function to get events for a date range
export const getEventsForDateRange = (
  startDate: string,
  endDate: string
): CalendarEvent[] => {
  return mockCalendarEvents.filter((event) => {
    const eventDate = new Date(event.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return eventDate >= start && eventDate <= end;
  });
};

// Helper function to get pending booking requests
export const getPendingRequests = (): BookingRequest[] => {
  return mockBookingRequests.filter((request) => request.status === "pending");
};

// Helper function to get confirmed events for a specific date
export const getConfirmedEventsForDate = (date: string): CalendarEvent[] => {
  return mockCalendarEvents.filter(
    (event) => event.date === date && event.status === "confirmed"
  );
};

// Helper function to check if a time slot is available
export const isTimeSlotAvailable = (
  date: string,
  startTime: string,
  duration: number
): boolean => {
  const endTime = addMinutesToTime(startTime, duration);

  return !mockCalendarEvents.some((event) => {
    if (event.date !== date) return false;

    const eventStart = timeToMinutes(event.startTime);
    const eventEnd = timeToMinutes(event.endTime);
    const slotStart = timeToMinutes(startTime);
    const slotEnd = timeToMinutes(endTime);

    // Check for overlap
    return !(slotEnd <= eventStart || slotStart >= eventEnd);
  });
};

// Utility functions
const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const addMinutesToTime = (time: string, minutes: number): string => {
  const totalMinutes = timeToMinutes(time) + minutes;
  const hours = Math.floor(totalMinutes / 60);
  const mins = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}`;
};
