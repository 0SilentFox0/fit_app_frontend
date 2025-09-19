import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../ThemeProvider";

interface TimeSlotPickerProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (date: string, time: string, duration: number) => void;
  selectedDate: string;
  selectedTime?: string;
  existingEvents?: Array<{ startTime: string; endTime: string }>;
}

export const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  visible,
  onClose,
  onSelect,
  selectedDate,
  selectedTime,
  existingEvents = [],
}) => {
  const { colors } = useTheme();
  const [selectedSlot, setSelectedSlot] = useState(selectedTime || "");
  const [duration, setDuration] = useState(60); // Default 60 minutes

  // Generate time slots from 6 AM to 10 PM
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 6; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")}`;
        slots.push(time);
      }
    }
    return slots;
  }, []);

  // Check if a time slot is available
  const isSlotAvailable = (startTime: string, durationMinutes: number) => {
    const startMinutes = timeToMinutes(startTime);
    const endMinutes = startMinutes + durationMinutes;

    // Check if slot overlaps with existing events
    return !existingEvents.some((event) => {
      const eventStart = timeToMinutes(event.startTime);
      const eventEnd = timeToMinutes(event.endTime);
      return !(endMinutes <= eventStart || startMinutes >= eventEnd);
    });
  };

  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const handleSelect = () => {
    if (selectedSlot) {
      onSelect(selectedDate, selectedSlot, duration);
      onClose();
    }
  };

  const durationOptions = [30, 60, 90, 120]; // 30 min, 1 hour, 1.5 hours, 2 hours

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, { backgroundColor: colors.card }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: colors.foreground }]}>
              Select Time Slot
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.foreground} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Date Display */}
            <View style={styles.dateSection}>
              <Ionicons name="calendar" size={20} color={colors.primary} />
              <Text style={[styles.dateText, { color: colors.foreground }]}>
                {new Date(selectedDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
            </View>

            {/* Duration Selection */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Session Duration
              </Text>
              <View style={styles.durationOptions}>
                {durationOptions.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={[
                      styles.durationOption,
                      {
                        backgroundColor:
                          duration === option ? colors.primary : "transparent",
                        borderColor: colors.border,
                      },
                    ]}
                    onPress={() => setDuration(option)}
                  >
                    <Text
                      style={[
                        styles.durationOptionText,
                        {
                          color:
                            duration === option
                              ? colors.primaryForeground
                              : colors.foreground,
                        },
                      ]}
                    >
                      {option} min
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Time Slots */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Available Time Slots
              </Text>
              <View style={styles.timeSlotsGrid}>
                {timeSlots.map((time) => {
                  const available = isSlotAvailable(time, duration);
                  const isSelected = selectedSlot === time;

                  return (
                    <TouchableOpacity
                      key={time}
                      style={[
                        styles.timeSlot,
                        {
                          backgroundColor: isSelected
                            ? colors.primary
                            : "transparent",
                          borderColor: available
                            ? colors.border
                            : colors.mutedForeground,
                          opacity: available ? 1 : 0.3,
                        },
                      ]}
                      onPress={() => available && setSelectedSlot(time)}
                      disabled={!available}
                    >
                      <Text
                        style={[
                          styles.timeSlotText,
                          {
                            color: isSelected
                              ? colors.primaryForeground
                              : colors.foreground,
                          },
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Custom Time Input */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Custom Time
              </Text>
              <View style={styles.customTimeContainer}>
                <TextInput
                  style={[
                    styles.timeInput,
                    {
                      borderColor: colors.border,
                      color: colors.foreground,
                      backgroundColor: colors.input,
                    },
                  ]}
                  placeholder="HH:MM"
                  placeholderTextColor={colors.placeholder}
                  value={selectedSlot}
                  onChangeText={setSelectedSlot}
                  keyboardType="numeric"
                />
                <Text
                  style={[
                    styles.timeInputLabel,
                    { color: colors.mutedForeground },
                  ]}
                >
                  Format: 14:30
                </Text>
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.cancelButton, { borderColor: colors.border }]}
              onPress={onClose}
            >
              <Text
                style={[styles.cancelButtonText, { color: colors.foreground }]}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.selectButton,
                {
                  backgroundColor: selectedSlot ? colors.primary : colors.muted,
                },
              ]}
              onPress={handleSelect}
              disabled={!selectedSlot}
            >
              <Text
                style={[
                  styles.selectButtonText,
                  {
                    color: selectedSlot
                      ? colors.primaryForeground
                      : colors.mutedForeground,
                  },
                ]}
              >
                Select Slot
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "90%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  content: {
    padding: 20,
  },
  dateSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginBottom: 20,
    gap: 12,
  },
  dateText: {
    fontSize: 18,
    fontWeight: "600",
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  durationOptions: {
    flexDirection: "row",
    gap: 8,
  },
  durationOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  durationOptionText: {
    fontSize: 14,
    fontWeight: "500",
  },
  timeSlotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  timeSlot: {
    width: "30%",
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    marginBottom: 8,
  },
  timeSlotText: {
    fontSize: 14,
    fontWeight: "500",
  },
  customTimeContainer: {
    alignItems: "center",
  },
  timeInput: {
    width: 120,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
    textAlign: "center",
    marginBottom: 8,
  },
  timeInputLabel: {
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    padding: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  selectButton: {
    flex: 2,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
