import { useState, useCallback, useMemo } from "react";
import { CalendarEvent, BookingRequest } from "../types";
import {
  dateToISOString,
  getStartOfWeek,
  getEndOfWeek,
} from "../utils/dateUtils";
import { isTimeSlotAvailable } from "../utils/timeUtils";

interface UseCalendarProps {
  initialEvents?: CalendarEvent[];
  initialRequests?: BookingRequest[];
}

export const useCalendar = ({
  initialEvents = [],
  initialRequests = [],
}: UseCalendarProps = {}) => {
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [requests, setRequests] = useState<BookingRequest[]>(initialRequests);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");

  // Get events for selected date
  const dayEvents = useMemo(() => {
    const selectedDateStr = dateToISOString(selectedDate);
    return events.filter((event) => event.date === selectedDateStr);
  }, [events, selectedDate]);

  // Get events for the week
  const weekEvents = useMemo(() => {
    const startOfWeek = getStartOfWeek(selectedDate);
    const endOfWeek = getEndOfWeek(selectedDate);

    const weekDates = [];
    const currentDate = new Date(startOfWeek);

    while (currentDate <= endOfWeek) {
      weekDates.push(dateToISOString(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return events.filter((event) => weekDates.includes(event.date));
  }, [events, selectedDate]);

  // Get events for the month
  const monthEvents = useMemo(() => {
    const selectedMonth = selectedDate.getMonth();
    const selectedYear = selectedDate.getFullYear();

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getMonth() === selectedMonth &&
        eventDate.getFullYear() === selectedYear
      );
    });
  }, [events, selectedDate]);

  // Get pending requests
  const pendingRequests = useMemo(() => {
    return requests.filter((request) => request.status === "pending");
  }, [requests]);

  // Add new event
  const addEvent = useCallback((event: Omit<CalendarEvent, "id">) => {
    const newEvent: CalendarEvent = {
      ...event,
      id: Date.now().toString(),
    };
    setEvents((prev) => [...prev, newEvent]);
  }, []);

  // Update event
  const updateEvent = useCallback(
    (eventId: string, updates: Partial<CalendarEvent>) => {
      setEvents((prev) =>
        prev.map((event) =>
          event.id === eventId ? { ...event, ...updates } : event
        )
      );
    },
    []
  );

  // Delete event
  const deleteEvent = useCallback((eventId: string) => {
    setEvents((prev) => prev.filter((event) => event.id !== eventId));
  }, []);

  // Update event status
  const updateEventStatus = useCallback(
    (eventId: string, status: CalendarEvent["status"]) => {
      updateEvent(eventId, { status });
    },
    [updateEvent]
  );

  // Add new request
  const addRequest = useCallback((request: Omit<BookingRequest, "id">) => {
    const newRequest: BookingRequest = {
      ...request,
      id: `req${Date.now()}`,
    };
    setRequests((prev) => [...prev, newRequest]);
  }, []);

  // Update request status
  const updateRequestStatus = useCallback(
    (requestId: string, status: BookingRequest["status"]) => {
      setRequests((prev) =>
        prev.map((request) =>
          request.id === requestId ? { ...request, status } : request
        )
      );
    },
    []
  );

  // Delete request
  const deleteRequest = useCallback((requestId: string) => {
    setRequests((prev) => prev.filter((request) => request.id !== requestId));
  }, []);

  // Check if time slot is available
  const isSlotAvailable = useCallback(
    (date: string, startTime: string, duration: number) => {
      const dateEvents = events.filter((event) => event.date === date);
      const existingEvents = dateEvents.map((event) => ({
        startTime: event.startTime,
        endTime: event.endTime,
      }));

      return isTimeSlotAvailable(startTime, duration, existingEvents);
    },
    [events]
  );

  // Get available time slots for a date
  const getAvailableSlots = useCallback(
    (
      date: string,
      duration: number,
      startHour: number = 6,
      endHour: number = 22,
      intervalMinutes: number = 30
    ) => {
      const dateEvents = events.filter((event) => event.date === date);
      const existingEvents = dateEvents.map((event) => ({
        startTime: event.startTime,
        endTime: event.endTime,
      }));

      // Generate all possible slots
      const allSlots = [];
      for (let hour = startHour; hour < endHour; hour++) {
        for (let minute = 0; minute < 60; minute += intervalMinutes) {
          const time = `${hour.toString().padStart(2, "0")}:${minute
            .toString()
            .padStart(2, "0")}`;
          allSlots.push(time);
        }
      }

      // Filter available slots
      return allSlots.filter((slot) => isSlotAvailable(date, slot, duration));
    },
    [events, isSlotAvailable]
  );

  // Navigate to next/previous period
  const navigateDate = useCallback(
    (direction: "next" | "prev") => {
      const newDate = new Date(selectedDate);

      switch (viewMode) {
        case "day":
          newDate.setDate(
            selectedDate.getDate() + (direction === "next" ? 1 : -1)
          );
          break;
        case "week":
          newDate.setDate(
            selectedDate.getDate() + (direction === "next" ? 7 : -7)
          );
          break;
        case "month":
          newDate.setMonth(
            selectedDate.getMonth() + (direction === "next" ? 1 : -1)
          );
          break;
      }

      setSelectedDate(newDate);
    },
    [selectedDate, viewMode]
  );

  // Go to today
  const goToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  // Change view mode
  const changeViewMode = useCallback((mode: "day" | "week" | "month") => {
    setViewMode(mode);
  }, []);

  return {
    // State
    events,
    requests,
    selectedDate,
    viewMode,

    // Computed values
    dayEvents,
    weekEvents,
    monthEvents,
    pendingRequests,

    // Actions
    addEvent,
    updateEvent,
    deleteEvent,
    updateEventStatus,
    addRequest,
    updateRequestStatus,
    deleteRequest,
    isSlotAvailable,
    getAvailableSlots,

    // Navigation
    setSelectedDate,
    navigateDate,
    goToToday,
    changeViewMode,
  };
};
