import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";
import { Client } from "../../types";

interface ClientCardProps {
  client: Client;
  onPress?: (client: Client) => void;
  showActions?: boolean;
  onEditPress?: (client: Client) => void;
  onDeletePress?: (client: Client) => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({
  client,
  onPress,
  showActions = false,
  onEditPress,
  onDeletePress,
}) => {
  const { colors } = useTheme();

  const handlePress = () => {
    onPress?.(client);
  };

  const handleEditPress = () => {
    onEditPress?.(client);
  };

  const handleDeletePress = () => {
    onDeletePress?.(client);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return colors.success;
      case "pending":
        return colors.warning;
      case "inactive":
        return colors.error;
      default:
        return colors.mutedForeground;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return "checkmark-circle";
      case "pending":
        return "time";
      case "inactive":
        return "close-circle";
      default:
        return "help-circle";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: client.profilePicture }}
          style={styles.profilePicture}
        />
        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={[styles.name, { color: colors.foreground }]}>
              {client.firstName} {client.lastName}
            </Text>
            <View style={styles.statusContainer}>
              <Ionicons
                name={getStatusIcon(client.status) as any}
                size={16}
                color={getStatusColor(client.status)}
              />
              <Text
                style={[
                  styles.statusText,
                  { color: getStatusColor(client.status) },
                ]}
              >
                {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
              </Text>
            </View>
          </View>

          <Text style={[styles.email, { color: colors.mutedForeground }]}>
            {client.email}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.stat}>
              <Ionicons
                name="calendar"
                size={14}
                color={colors.mutedForeground}
              />
              <Text
                style={[styles.statText, { color: colors.mutedForeground }]}
              >
                Joined {formatDate(client.joinDate)}
              </Text>
            </View>
            <View style={styles.stat}>
              <Ionicons
                name="fitness"
                size={14}
                color={colors.mutedForeground}
              />
              <Text
                style={[styles.statText, { color: colors.mutedForeground }]}
              >
                {client.totalSessions} sessions
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.goalsContainer}>
        <Text style={[styles.goalsTitle, { color: colors.foreground }]}>
          Goals:
        </Text>
        <View style={styles.goalsList}>
          {client.goals.slice(0, 3).map((goal, index) => (
            <View
              key={index}
              style={[
                styles.goalTag,
                { backgroundColor: colors.primary + "20" },
              ]}
            >
              <Text style={[styles.goalText, { color: colors.primary }]}>
                {goal}
              </Text>
            </View>
          ))}
          {client.goals.length > 3 && (
            <Text style={[styles.moreGoals, { color: colors.mutedForeground }]}>
              +{client.goals.length - 3} more
            </Text>
          )}
        </View>
      </View>

      {showActions && (
        <View style={styles.actions}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.primary }]}
            onPress={handleEditPress}
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
              Edit
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: colors.error }]}
            onPress={handleDeletePress}
          >
            <Ionicons name="trash" size={16} color={colors.primaryForeground} />
            <Text
              style={[
                styles.actionButtonText,
                { color: colors.primaryForeground },
              ]}
            >
              Delete
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "500",
  },
  email: {
    fontSize: 14,
    marginBottom: 8,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  stat: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  statText: {
    fontSize: 12,
  },
  goalsContainer: {
    marginBottom: 16,
  },
  goalsTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
  },
  goalsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  goalTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  goalText: {
    fontSize: 12,
    fontWeight: "500",
  },
  moreGoals: {
    fontSize: 12,
    fontStyle: "italic",
    alignSelf: "center",
  },
  actions: {
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
