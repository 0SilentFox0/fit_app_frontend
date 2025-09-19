import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";
import {
  CalendarView,
  EventModal,
  TimeSlotPicker,
} from "../../components/ui/calendar";
import { useCalendar } from "../../hooks";
import { mockCalendarEvents, mockBookingRequests } from "../../mocks";
import { CalendarEvent, BookingRequest } from "../../types";

export const TrainerCalendarScreen: React.FC = () => {
  const { colors } = useTheme();
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );
  const [showEventModal, setShowEventModal] = useState(false);
  const [showTimeSlotPicker, setShowTimeSlotPicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [selectedTime, setSelectedTime] = useState("");

  const {
    events,
    requests,
    selectedDate: calendarDate,
    viewMode,
    dayEvents,
    weekEvents,
    monthEvents,
    pendingRequests,
    addEvent,
    updateEvent,
    deleteEvent,
    updateEventStatus,
    addRequest,
    updateRequestStatus,
    deleteRequest,
    setSelectedDate: setCalendarDate,
    changeViewMode,
    goToToday,
  } = useCalendar({
    initialEvents: mockCalendarEvents,
    initialRequests: mockBookingRequests,
  });

  const handleEventPress = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleTimeSlotPress = (date: string, time: string) => {
    setSelectedDate(date);
    setSelectedTime(time);
    setShowTimeSlotPicker(true);
  };

  const handleTimeSlotSelect = (
    date: string,
    time: string,
    duration: number
  ) => {
    // Here you would typically open a form to create a new event
    Alert.alert(
      "Create Event",
      `Create event on ${date} at ${time} for ${duration} minutes?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Create",
          onPress: () => {
            const endTime = addMinutesToTime(time, duration);
            const newEvent: Omit<CalendarEvent, "id"> = {
              title: "New Training Session",
              date,
              startTime: time,
              endTime,
              sessionType: "Training",
              clientName: "New Client",
              status: "pending",
            };
            addEvent(newEvent);
          },
        },
      ]
    );
  };

  const handleEventEdit = (event: CalendarEvent) => {
    // Here you would typically open an edit form
    Alert.alert("Edit Event", "Edit functionality would be implemented here");
  };

  const handleEventDelete = (eventId: string) => {
    deleteEvent(eventId);
  };

  const handleEventStatusChange = (
    eventId: string,
    status: CalendarEvent["status"]
  ) => {
    updateEventStatus(eventId, status);
  };

  const handleRequestStatusChange = (
    requestId: string,
    status: BookingRequest["status"]
  ) => {
    updateRequestStatus(requestId, status);

    if (status === "accepted") {
      // Convert request to event
      const request = requests.find((r) => r.id === requestId);
      if (request) {
        const endTime = addMinutesToTime(request.time, request.duration);
        const newEvent: Omit<CalendarEvent, "id"> = {
          title: `${request.sessionType} Session`,
          date: request.date,
          startTime: request.time,
          endTime,
          sessionType: request.sessionType,
          clientName: request.clientName,
          status: "confirmed",
        };
        addEvent(newEvent);
      }
    }
  };

  // Helper function to add minutes to time
  const addMinutesToTime = (time: string, minutes: number): string => {
    const [hours, mins] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + mins + minutes;
    const newHours = Math.floor(totalMinutes / 60);
    const newMins = totalMinutes % 60;
    return `${newHours.toString().padStart(2, "0")}:${newMins
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Calendar
        </Text>
        <TouchableOpacity
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowTimeSlotPicker(true)}
        >
          <Ionicons name="add" size={20} color={colors.primaryForeground} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Calendar View */}
        <CalendarView
          events={events}
          onEventPress={handleEventPress}
          onTimeSlotPress={handleTimeSlotPress}
        />

        {/* Pending Requests */}
        {pendingRequests.length > 0 && (
          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
              Pending Booking Requests
            </Text>
            {pendingRequests.map((request) => (
              <View
                key={request.id}
                style={[styles.requestItem, { borderColor: colors.border }]}
              >
                <View style={styles.requestHeader}>
                  <Text
                    style={[styles.requestClient, { color: colors.foreground }]}
                  >
                    {request.clientName}
                  </Text>
                  <Text
                    style={[
                      styles.requestDate,
                      { color: colors.mutedForeground },
                    ]}
                  >
                    {request.date} at {request.time}
                  </Text>
                </View>

                <Text style={[styles.requestType, { color: colors.primary }]}>
                  {request.sessionType} • {request.duration}min
                </Text>

                {request.message && (
                  <Text
                    style={[
                      styles.requestMessage,
                      { color: colors.mutedForeground },
                    ]}
                  >
                    {request.message}
                  </Text>
                )}

                <View style={styles.requestActions}>
                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: colors.success },
                    ]}
                    onPress={() =>
                      handleRequestStatusChange(request.id, "accepted")
                    }
                  >
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={colors.primaryForeground}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        { color: colors.primaryForeground },
                      ]}
                    >
                      Accept
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.actionButton,
                      { backgroundColor: colors.error },
                    ]}
                    onPress={() =>
                      handleRequestStatusChange(request.id, "rejected")
                    }
                  >
                    <Ionicons
                      name="close"
                      size={16}
                      color={colors.primaryForeground}
                    />
                    <Text
                      style={[
                        styles.actionButtonText,
                        { color: colors.primaryForeground },
                      ]}
                    >
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {/* Event Modal */}
      <EventModal
        event={selectedEvent}
        visible={showEventModal}
        onClose={() => setShowEventModal(false)}
        onEdit={handleEventEdit}
        onDelete={handleEventDelete}
        onStatusChange={handleEventStatusChange}
      />

      {/* Time Slot Picker */}
      <TimeSlotPicker
        visible={showTimeSlotPicker}
        onClose={() => setShowTimeSlotPicker(false)}
        onSelect={handleTimeSlotSelect}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
        existingEvents={events
          .filter((event) => event.date === selectedDate)
          .map((event) => ({
            startTime: event.startTime,
            endTime: event.endTime,
          }))}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  section: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  requestItem: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  requestHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  requestClient: {
    fontSize: 16,
    fontWeight: "600",
  },
  requestDate: {
    fontSize: 14,
  },
  requestType: {
    fontSize: 14,
    fontWeight: "500",
    marginBottom: 8,
  },
  requestMessage: {
    fontSize: 14,
    marginBottom: 12,
    fontStyle: "italic",
  },
  requestActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
