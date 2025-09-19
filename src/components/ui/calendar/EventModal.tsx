import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../../ThemeProvider";
import { CalendarEvent } from "../../../types";

interface EventModalProps {
  event: CalendarEvent | null;
  visible: boolean;
  onClose: () => void;
  onEdit?: (event: CalendarEvent) => void;
  onDelete?: (eventId: string) => void;
  onStatusChange?: (eventId: string, status: CalendarEvent["status"]) => void;
}

export const EventModal: React.FC<EventModalProps> = ({
  event,
  visible,
  onClose,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const { colors } = useTheme();

  if (!event) return null;

  const handleDelete = () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          onDelete?.(event.id);
          onClose();
        },
      },
    ]);
  };

  const handleStatusChange = (newStatus: CalendarEvent["status"]) => {
    onStatusChange?.(event.id, newStatus);
    onClose();
  };

  const getStatusColor = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "confirmed":
        return colors.success;
      case "pending":
        return colors.warning;
      case "cancelled":
        return colors.error;
      default:
        return colors.mutedForeground;
    }
  };

  const getStatusIcon = (status: CalendarEvent["status"]) => {
    switch (status) {
      case "confirmed":
        return "checkmark-circle";
      case "pending":
        return "time";
      case "cancelled":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

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
              {event.title}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={colors.foreground} />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            {/* Status */}
            <View style={styles.section}>
              <View style={styles.statusContainer}>
                <Ionicons
                  name={getStatusIcon(event.status) as any}
                  size={20}
                  color={getStatusColor(event.status)}
                />
                <Text
                  style={[
                    styles.status,
                    { color: getStatusColor(event.status) },
                  ]}
                >
                  {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                </Text>
              </View>
            </View>

            {/* Event Details */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Event Details
              </Text>

              <View style={styles.detailRow}>
                <Ionicons
                  name="calendar"
                  size={16}
                  color={colors.mutedForeground}
                />
                <Text style={[styles.detailText, { color: colors.foreground }]}>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons
                  name="time"
                  size={16}
                  color={colors.mutedForeground}
                />
                <Text style={[styles.detailText, { color: colors.foreground }]}>
                  {event.startTime} - {event.endTime}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons
                  name="person"
                  size={16}
                  color={colors.mutedForeground}
                />
                <Text style={[styles.detailText, { color: colors.foreground }]}>
                  {event.clientName}
                </Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons
                  name="fitness"
                  size={16}
                  color={colors.mutedForeground}
                />
                <Text style={[styles.detailText, { color: colors.foreground }]}>
                  {event.sessionType}
                </Text>
              </View>
            </View>

            {/* Actions */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
                Actions
              </Text>

              {onEdit && (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: colors.primary },
                  ]}
                  onPress={() => onEdit(event)}
                >
                  <Ionicons
                    name="create"
                    size={16}
                    color={colors.primaryForeground}
                  />
                  <Text
                    style={[
                      styles.actionButtonText,
                      { color: colors.primaryForeground },
                    ]}
                  >
                    Edit Event
                  </Text>
                </TouchableOpacity>
              )}

              {onStatusChange && event.status === "pending" && (
                <View style={styles.statusActions}>
                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      { backgroundColor: colors.success },
                    ]}
                    onPress={() => handleStatusChange("confirmed")}
                  >
                    <Ionicons
                      name="checkmark"
                      size={16}
                      color={colors.primaryForeground}
                    />
                    <Text
                      style={[
                        styles.statusButtonText,
                        { color: colors.primaryForeground },
                      ]}
                    >
                      Accept
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.statusButton,
                      { backgroundColor: colors.error },
                    ]}
                    onPress={() => handleStatusChange("cancelled")}
                  >
                    <Ionicons
                      name="close"
                      size={16}
                      color={colors.primaryForeground}
                    />
                    <Text
                      style={[
                        styles.statusButtonText,
                        { color: colors.primaryForeground },
                      ]}
                    >
                      Reject
                    </Text>
                  </TouchableOpacity>
                </View>
              )}

              {onDelete && (
                <TouchableOpacity
                  style={[
                    styles.actionButton,
                    { backgroundColor: colors.error },
                  ]}
                  onPress={handleDelete}
                >
                  <Ionicons
                    name="trash"
                    size={16}
                    color={colors.primaryForeground}
                  />
                  <Text
                    style={[
                      styles.actionButtonText,
                      { color: colors.primaryForeground },
                    ]}
                  >
                    Delete Event
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
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
    maxHeight: "80%",
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
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  status: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 12,
  },
  detailText: {
    fontSize: 16,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    gap: 8,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  statusActions: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  statusButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  statusButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});
