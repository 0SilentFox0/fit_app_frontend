import React from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useTheme } from "../../ThemeProvider";

interface WorkoutsStatsProps {
  totalWorkouts: number;
  completedWorkouts: number;
  thisWeekWorkouts: number;
  statsAnimations: Animated.Value[];
}

export const WorkoutsStats: React.FC<WorkoutsStatsProps> = ({
  totalWorkouts,
  completedWorkouts,
  thisWeekWorkouts,
  statsAnimations,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.lg }]}>
      <View style={[styles.statCard, { backgroundColor: colors.primary }]}>
        <Animated.Text style={[styles.statValue, { color: colors.background }]}>
          {statsAnimations[0]}
        </Animated.Text>
        <Text style={[styles.statLabel, { color: colors.background + "CC" }]}>
          Total
        </Text>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.secondary }]}>
        <Animated.Text style={[styles.statValue, { color: colors.background }]}>
          {statsAnimations[1]}
        </Animated.Text>
        <Text style={[styles.statLabel, { color: colors.background + "CC" }]}>
          Completed
        </Text>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.accent }]}>
        <Animated.Text style={[styles.statValue, { color: colors.background }]}>
          {statsAnimations[2]}
        </Animated.Text>
        <Text style={[styles.statLabel, { color: colors.background + "CC" }]}>
          This Week
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});
