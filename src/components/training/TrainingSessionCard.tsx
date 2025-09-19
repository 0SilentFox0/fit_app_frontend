import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useTheme } from "../../ThemeProvider";
import { Card } from "../ui";
import { TrainingSession } from "../../types";

interface TrainingSessionCardProps {
  session: TrainingSession;
  isExpanded: boolean;
  onToggle: () => void;
}

export const TrainingSessionCard: React.FC<TrainingSessionCardProps> = ({
  session,
  isExpanded,
  onToggle,
}) => {
  const { colors } = useTheme();

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <TouchableOpacity style={styles.sessionCard} onPress={onToggle}>
      <Card style={styles.sessionCardContent}>
        <View style={styles.sessionHeader}>
          <View>
            <Text style={[styles.sessionDate, { color: colors.foreground }]}>
              {formatDate(session.date)}
            </Text>
            <Text
              style={[styles.sessionType, { color: colors.mutedForeground }]}
            >
              {session.sessionType} with {session.trainerName}
            </Text>
          </View>
          <View style={styles.sessionStats}>
            <Text style={[styles.sessionDuration, { color: colors.primary }]}>
              {session.duration}min
            </Text>
          </View>
        </View>

        {isExpanded && (
          <View style={styles.exercisesContainer}>
            <Text style={[styles.exercisesTitle, { color: colors.foreground }]}>
              Exercises
            </Text>
            {session.exercises.map((exercise, index) => (
              <View key={index} style={styles.exerciseItem}>
                <View style={styles.exerciseHeader}>
                  <Text
                    style={[styles.exerciseName, { color: colors.foreground }]}
                  >
                    {exercise.name}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.exerciseDetails,
                    { color: colors.mutedForeground },
                  ]}
                >
                  {exercise.sets} sets × {exercise.reps} reps
                  {exercise.weight &&
                    exercise.weight > 0 &&
                    ` @ ${exercise.weight}lbs`}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  sessionCard: {
    marginBottom: 12,
  },
  sessionCardContent: {
    padding: 16,
  },
  sessionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  sessionDate: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  sessionType: {
    fontSize: 14,
  },
  sessionStats: {
    alignItems: "flex-end",
  },
  sessionDuration: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  sessionCalories: {
    fontSize: 14,
  },
  exercisesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  exercisesTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  exerciseItem: {
    marginBottom: 12,
  },
  exerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "500",
  },
  exerciseCalories: {
    fontSize: 14,
  },
  exerciseDetails: {
    fontSize: 14,
  },
});
