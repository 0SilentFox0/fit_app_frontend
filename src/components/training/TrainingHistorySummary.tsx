import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../ThemeProvider";
import { Card } from "../ui";
import { TrainingSession } from "../../types";

interface TrainingHistorySummaryProps {
  sessions: TrainingSession[];
}

export const TrainingHistorySummary: React.FC<TrainingHistorySummaryProps> = ({
  sessions,
}) => {
  const { colors } = useTheme();

  const avgDuration = Math.round(
    sessions.reduce((total, session) => total + session.duration, 0) /
      sessions.length
  );

  return (
    <View style={styles.summaryContainer}>
      <Card style={styles.summaryCard}>
        <Text style={[styles.summaryValue, { color: colors.primary }]}>
          {sessions.length}
        </Text>
        <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
          Total Sessions
        </Text>
      </Card>
      <Card style={styles.summaryCard}>
        <Text style={[styles.summaryValue, { color: colors.primary }]}>
          {avgDuration}min
        </Text>
        <Text style={[styles.summaryLabel, { color: colors.mutedForeground }]}>
          Avg Duration
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: 4,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 12,
    textAlign: "center",
  },
});
