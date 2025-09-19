import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";

interface HomeStatsProps {
  streak: number;
  workouts: number;
}

export const HomeStats: React.FC<HomeStatsProps> = ({ streak, workouts }) => {
  const { colors } = useTheme();

  return (
    <View style={styles.statsContainer}>
      <View style={[styles.statCard, { backgroundColor: colors.card }]}>
        <View style={[styles.statGradient, { backgroundColor: colors.chart1 }]}>
          <Ionicons name="flame" size={24} color={colors.primaryForeground} />
          <Text style={[styles.statValue, { color: colors.primaryForeground }]}>
            {streak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.primaryForeground }]}>
            Day Streak
          </Text>
        </View>
      </View>

      <View style={[styles.statCard, { backgroundColor: colors.card }]}>
        <View style={[styles.statGradient, { backgroundColor: colors.chart3 }]}>
          <Ionicons name="fitness" size={24} color={colors.primaryForeground} />
          <Text style={[styles.statValue, { color: colors.primaryForeground }]}>
            {workouts}
          </Text>
          <Text style={[styles.statLabel, { color: colors.primaryForeground }]}>
            Workouts
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statGradient: {
    padding: 20,
    alignItems: "center",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
});
