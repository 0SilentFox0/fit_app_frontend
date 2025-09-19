import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";
import { Card } from "../ui/card";
import { Progress } from "../ui/progress";

interface PerformanceMetricsProps {
  averageRating: number;
  completionRate: number;
  goalProgress: number;
}

export const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  averageRating,
  completionRate,
  goalProgress,
}) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.metricsCard}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Performance
      </Text>
      <View style={styles.metricsRow}>
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
            Rating
          </Text>
          <View style={styles.ratingContainer}>
            <Text style={[styles.metricValue, { color: colors.foreground }]}>
              {averageRating}
            </Text>
            <Ionicons name="star" size={16} color={colors.warning} />
          </View>
        </View>
        <View style={styles.metricItem}>
          <Text style={[styles.metricLabel, { color: colors.mutedForeground }]}>
            Completion Rate
          </Text>
          <Text style={[styles.metricValue, { color: colors.foreground }]}>
            {completionRate}%
          </Text>
        </View>
      </View>
      <View style={styles.progressContainer}>
        <Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>
          Goal Progress
        </Text>
        <Progress
          value={goalProgress}
          variant="success"
          style={styles.progress}
        />
        <Text style={[styles.progressText, { color: colors.mutedForeground }]}>
          {goalProgress}% of monthly goal
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  metricsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  metricsRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  metricItem: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  metricValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressContainer: {
    marginTop: 8,
  },
  progressLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  progress: {
    marginBottom: 8,
  },
  progressText: {
    fontSize: 12,
  },
});
