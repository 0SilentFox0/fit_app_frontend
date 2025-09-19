import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../ThemeProvider";

interface CalendarHeaderProps {
  selectedDate: Date;
  viewMode: "day" | "week" | "month";
  onViewModeChange: (mode: "day" | "week" | "month") => void;
  onDateChange: (date: Date) => void;
  onToday: () => void;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  selectedDate,
  viewMode,
  onViewModeChange,
  onDateChange,
  onToday,
}) => {
  const { colors } = useTheme();

  const navigateDate = (direction: "prev" | "next") => {
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

    onDateChange(newDate);
  };

  const getDateDisplay = () => {
    switch (viewMode) {
      case "day":
        return selectedDate.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      case "week":
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
        const endOfWeek = new Date(startOfWeek);
        endOfWeek.setDate(startOfWeek.getDate() + 6);

        if (startOfWeek.getMonth() === endOfWeek.getMonth()) {
          return `${startOfWeek.toLocaleDateString("en-US", {
            month: "long",
          })} ${startOfWeek.getDate()}-${endOfWeek.getDate()}, ${startOfWeek.getFullYear()}`;
        } else {
          return `${startOfWeek.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          })} - ${endOfWeek.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}`;
        }
      case "month":
        return selectedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        });
      default:
        return "";
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
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
            onPress={() => onViewModeChange(mode)}
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
          onPress={() => navigateDate("prev")}
        >
          <Ionicons name="chevron-back" size={24} color={colors.primary} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.todayButton} onPress={onToday}>
          <Text style={[styles.todayButtonText, { color: colors.primary }]}>
            Today
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigateDate("next")}
        >
          <Ionicons name="chevron-forward" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Date Display */}
      <View style={styles.dateDisplay}>
        <Text style={[styles.dateText, { color: colors.foreground }]}>
          {getDateDisplay()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
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
  dateDisplay: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
