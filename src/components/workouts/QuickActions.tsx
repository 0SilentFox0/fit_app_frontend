import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";

interface WorkoutType {
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface QuickActionsProps {
  workoutTypes: WorkoutType[];
}

export const QuickActions: React.FC<QuickActionsProps> = ({ workoutTypes }) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          { color: colors.accent, marginBottom: spacing.md },
        ]}
      >
        Quick Actions
      </Text>
      <View style={styles.actionsContainer}>
        {workoutTypes.map((type) => (
          <TouchableOpacity
            key={type.name}
            style={[
              styles.actionCard,
              {
                backgroundColor: colors.card,
                shadowColor: type.color,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={type.icon as any}
              size={32}
              color={type.color}
              style={{ marginBottom: 8 }}
            />
            <Text
              style={[
                styles.actionName,
                { color: colors.text, marginBottom: 4 },
              ]}
            >
              {type.name}
            </Text>
            <Text style={[styles.actionCount, { color: colors.textSecondary }]}>
              {type.count} workouts available
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  actionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  actionCard: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionName: {
    fontSize: 14,
    fontWeight: "600",
  },
  actionCount: {
    fontSize: 12,
    textAlign: "center",
  },
});
