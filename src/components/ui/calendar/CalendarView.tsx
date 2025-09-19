import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "../../../ThemeProvider";
import { CalendarEvent } from "../../../types";

interface CalendarViewProps {
  events: CalendarEvent[];
  onEventPress?: (event: CalendarEvent) => void;
  onTimeSlotPress?: (date: string, time: string) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  events,
  onEventPress,
  onTimeSlotPress,
}) => {
  const { colors } = useTheme();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"day" | "week" | "month">("week");

  // Generate time slots for the day (6 AM to 10 PM)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      slots.push(`${hour.toString().padStart(2, "0")}:00`);
    }
    return slots;
  }, []);

  // Get events for selected date
  const dayEvents = useMemo(() => {
    const selectedDateStr = selectedDate.toISOString().split("T")[0];
    return events.filter((event) => event.date === selectedDateStr);
  }, [events, selectedDate]);

  // Get events for the week
  const weekEvents = useMemo(() => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      weekDates.push(date.toISOString().split("T")[0]);
    }

    return events.filter((event) => weekDates.includes(event.date));
  }, [events, selectedDate]);

  // Generate week dates
  const weekDates = useMemo(() => {
    const startOfWeek = new Date(selectedDate);
    startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());

    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      dates.push({
        date: date.toISOString().split("T")[0],
        day: date.getDate(),
        dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
        isToday: date.toDateString() === new Date().toDateString(),
        isSelected: date.toDateString() === selectedDate.toDateString(),
      });
    }
    return dates;
  }, [selectedDate]);

  const renderDayView = () => (
    <View style={styles.dayView}>
      <Text style={[styles.dateHeader, { color: colors.foreground }]}>
        {selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </Text>

      <ScrollView style={styles.timeSlotsContainer}>
        {timeSlots.map((time) => {
          const eventsAtTime = dayEvents.filter(
            (event) =>
              event.startTime === time ||
              (event.startTime < time && event.endTime > time)
          );

          return (
            <View key={time} style={styles.timeSlot}>
              <Text
                style={[styles.timeLabel, { color: colors.mutedForeground }]}
              >
                {time}
              </Text>
              <View style={styles.timeSlotContent}>
                {eventsAtTime.length > 0 ? (
                  eventsAtTime.map((event) => (
                    <TouchableOpacity
                      key={event.id}
                      style={[
                        styles.eventItem,
                        {
                          backgroundColor: getClientColor(event.clientName),
                          borderLeftColor: getClientColor(event.clientName),
                        },
                      ]}
                      onPress={() => onEventPress?.(event)}
                    >
                      <Text style={styles.eventTitle} numberOfLines={1}>
                        {event.title}
                      </Text>
                      <Text style={styles.eventClient} numberOfLines={1}>
                        {event.clientName}
                      </Text>
                      <Text style={styles.eventTime}>
                        {event.startTime} - {event.endTime}
                      </Text>
                    </TouchableOpacity>
                  ))
                ) : (
                  <TouchableOpacity
                    style={[styles.emptySlot, { borderColor: colors.border }]}
                    onPress={() =>
                      onTimeSlotPress?.(
                        selectedDate.toISOString().split("T")[0],
                        time
                      )
                    }
                  >
                    <Text
                      style={[
                        styles.emptySlotText,
                        { color: colors.mutedForeground },
                      ]}
                    >
                      Available
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );

  const renderWeekView = () => (
    <View style={styles.weekView}>
      <View style={styles.weekHeader}>
        {weekDates.map(({ date, day, dayName, isToday, isSelected }) => (
          <TouchableOpacity
            key={date}
            style={[
              styles.weekDayHeader,
              {
                backgroundColor: isSelected ? colors.primary : "transparent",
                borderColor: isToday ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setSelectedDate(new Date(date))}
          >
            <Text
              style={[
                styles.weekDayName,
                {
                  color: isSelected
                    ? colors.primaryForeground
                    : isToday
                    ? colors.primary
                    : colors.foreground,
                },
              ]}
            >
              {dayName}
            </Text>
            <Text
              style={[
                styles.weekDayNumber,
                {
                  color: isSelected
                    ? colors.primaryForeground
                    : isToday
                    ? colors.primary
                    : colors.foreground,
                },
              ]}
            >
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.weekGrid}>
          <View style={styles.timeColumn}>
            {timeSlots.map((time) => (
              <Text
                key={time}
                style={[styles.timeLabel, { color: colors.mutedForeground }]}
              >
                {time}
              </Text>
            ))}
          </View>

          {weekDates.map(({ date }) => (
            <View key={date} style={styles.dayColumn}>
              {timeSlots.map((time) => {
                const eventsAtTime = weekEvents.filter(
                  (event) =>
                    event.date === date &&
                    (event.startTime === time ||
                      (event.startTime < time && event.endTime > time))
                );

                return (
                  <View key={time} style={styles.weekTimeSlot}>
                    {eventsAtTime.length > 0 ? (
                      eventsAtTime.map((event) => (
                        <TouchableOpacity
                          key={event.id}
                          style={[
                            styles.weekEventItem,
                            {
                              backgroundColor: getClientColor(event.clientName),
                            },
                          ]}
                          onPress={() => onEventPress?.(event)}
                        >
                          <Text style={styles.weekEventTitle} numberOfLines={2}>
                            {event.title}
                          </Text>
                        </TouchableOpacity>
                      ))
                    ) : (
                      <TouchableOpacity
                        style={[
                          styles.weekEmptySlot,
                          { borderColor: colors.border },
                        ]}
                        onPress={() => onTimeSlotPress?.(date, time)}
                      />
                    )}
                  </View>
                );
              })}
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );

  const renderMonthView = () => (
    <View style={styles.monthView}>
      <Text style={[styles.monthHeader, { color: colors.foreground }]}>
        {selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        })}
      </Text>

      <View style={styles.monthGrid}>
        {weekDates.map(({ date, day, dayName, isToday, isSelected }) => (
          <TouchableOpacity
            key={date}
            style={[
              styles.monthDay,
              {
                backgroundColor: isSelected ? colors.primary : "transparent",
                borderColor: isToday ? colors.primary : colors.border,
              },
            ]}
            onPress={() => setSelectedDate(new Date(date))}
          >
            <Text
              style={[
                styles.monthDayNumber,
                {
                  color: isSelected
                    ? colors.primaryForeground
                    : isToday
                    ? colors.primary
                    : colors.foreground,
                },
              ]}
            >
              {day}
            </Text>
            <Text
              style={[styles.monthDayName, { color: colors.mutedForeground }]}
            >
              {dayName}
            </Text>

            {/* Show event indicators */}
            {weekEvents
              .filter((event) => event.date === date)
              .slice(0, 3)
              .map((event, index) => (
                <View
                  key={event.id}
                  style={[
                    styles.eventIndicator,
                    { backgroundColor: getClientColor(event.clientName) },
                  ]}
                />
              ))}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* View Mode Selector */}
      <View style={styles.viewModeSelector}>
        {(["day", "week", "month"] as const).map((mode) => (
          <TouchableOpacity
            key={mode}
            style={[
              styles.viewModeButton,
              {
                backgroundColor:
                  viewMode === mode ? colors.primary : "transparent",
                borderColor: colors.border,
              },
            ]}
            onPress={() => setViewMode(mode)}
          >
            <Text
              style={[
                styles.viewModeText,
                {
                  color:
                    viewMode === mode
                      ? colors.primaryForeground
                      : colors.foreground,
                },
              ]}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Navigation */}
      <View style={styles.navigation}>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            const newDate = new Date(selectedDate);
            if (viewMode === "day") newDate.setDate(selectedDate.getDate() - 1);
            else if (viewMode === "week")
              newDate.setDate(selectedDate.getDate() - 7);
            else newDate.setMonth(selectedDate.getMonth() - 1);
            setSelectedDate(newDate);
          }}
        >
          <Text style={[styles.navButtonText, { color: colors.primary }]}>
            ‹
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.todayButton}
          onPress={() => setSelectedDate(new Date())}
        >
          <Text style={[styles.todayButtonText, { color: colors.primary }]}>
            Today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => {
            const newDate = new Date(selectedDate);
            if (viewMode === "day") newDate.setDate(selectedDate.getDate() + 1);
            else if (viewMode === "week")
              newDate.setDate(selectedDate.getDate() + 7);
            else newDate.setMonth(selectedDate.getMonth() + 1);
            setSelectedDate(newDate);
          }}
        >
          <Text style={[styles.navButtonText, { color: colors.primary }]}>
            ›
          </Text>
        </TouchableOpacity>
      </View>

      {/* Calendar Content */}
      {viewMode === "day" && renderDayView()}
      {viewMode === "week" && renderWeekView()}
      {viewMode === "month" && renderMonthView()}
    </View>
  );
};

// Generate consistent colors for clients
const clientColors = [
  "#4285f4", // Google Blue
  "#ea4335", // Google Red
  "#fbbc04", // Google Yellow
  "#34a853", // Google Green
  "#ff6b35", // Orange
  "#9c27b0", // Purple
  "#00bcd4", // Cyan
  "#ff9800", // Orange
  "#795548", // Brown
  "#607d8b", // Blue Grey
];

const getClientColor = (clientName: string): string => {
  const hash = clientName.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return clientColors[Math.abs(hash) % clientColors.length];
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  viewModeSelector: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  viewModeButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 6,
    borderWidth: 1,
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: "500",
  },
  navigation: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navButton: {
    padding: 8,
  },
  navButtonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  todayButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  todayButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },

  // Day View Styles
  dayView: {
    flex: 1,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
  },
  timeSlotsContainer: {
    flex: 1,
  },
  timeSlot: {
    flexDirection: "row",
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  timeLabel: {
    width: 60,
    paddingHorizontal: 8,
    paddingVertical: 8,
    fontSize: 12,
    textAlign: "right",
  },
  timeSlotContent: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  eventItem: {
    padding: 8,
    borderRadius: 6,
    marginBottom: 4,
    borderLeftWidth: 4,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 2,
  },
  eventClient: {
    fontSize: 12,
    color: "#ffffff",
    opacity: 0.9,
    marginBottom: 2,
  },
  eventTime: {
    fontSize: 10,
    color: "#ffffff",
    opacity: 0.8,
  },
  emptySlot: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 4,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  emptySlotText: {
    fontSize: 12,
    opacity: 0.6,
  },

  // Week View Styles
  weekView: {
    flex: 1,
  },
  weekHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  weekDayHeader: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  weekDayName: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  weekDayNumber: {
    fontSize: 16,
    fontWeight: "bold",
  },
  weekGrid: {
    flexDirection: "row",
  },
  timeColumn: {
    width: 60,
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  dayColumn: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: "#e0e0e0",
  },
  weekTimeSlot: {
    minHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    padding: 2,
  },
  weekEventItem: {
    padding: 4,
    borderRadius: 4,
    marginBottom: 2,
  },
  weekEventTitle: {
    fontSize: 10,
    color: "#ffffff",
    fontWeight: "500",
  },
  weekEmptySlot: {
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#e0e0e0",
    borderRadius: 2,
    minHeight: 40,
  },

  // Month View Styles
  monthView: {
    flex: 1,
  },
  monthHeader: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 16,
    textAlign: "center",
  },
  monthGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 8,
  },
  monthDay: {
    width: "14.28%",
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 8,
    margin: 1,
  },
  monthDayNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  monthDayName: {
    fontSize: 10,
    marginBottom: 4,
  },
  eventIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 1,
  },
});
