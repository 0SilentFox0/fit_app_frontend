import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";

interface Workout {
  id: string;
  name: string;
  duration: string;
  date: string;
  difficulty: string;
  completed: boolean;
  calories: number;
  type: string;
  progress: number;
}

interface UpcomingWorkoutsProps {
  workouts: Workout[];
  progressAnimations: Animated.Value[];
  onStartWorkout: (workoutId: string) => void;
}

export const UpcomingWorkouts: React.FC<UpcomingWorkoutsProps> = ({
  workouts,
  progressAnimations,
  onStartWorkout,
}) => {
  const { colors, spacing } = useTheme();

  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case "cardio":
        return "heart";
      case "strength":
        return "dumbbell";
      case "yoga":
        return "leaf";
      default:
        return "fitness";
    }
  };

  const getWorkoutColor = (type: string) => {
    switch (type) {
      case "cardio":
        return "#FF6B6B";
      case "strength":
        return "#4ECDC4";
      case "yoga":
        return "#45B7D1";
      default:
        return colors.primary;
    }
  };

  return (
    <View style={[styles.container, { marginBottom: spacing.lg }]}>
      <Text
        style={[
          styles.title,
          { color: colors.primary, marginBottom: spacing.md },
        ]}
      >
        Upcoming Workouts
      </Text>
      {workouts.map((workout, index) => (
        <View
          key={workout.id}
          style={[
            styles.workoutCard,
            {
              backgroundColor: colors.card,
              shadowColor: getWorkoutColor(workout.type),
            },
          ]}
        >
          <View style={styles.workoutHeader}>
            <View style={styles.workoutInfo}>
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: getWorkoutColor(workout.type) + "20",
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={getWorkoutIcon(workout.type) as any}
                  size={24}
                  color={getWorkoutColor(workout.type)}
                />
              </View>
              <View style={styles.workoutDetails}>
                <Text style={[styles.workoutName, { color: colors.text }]}>
                  {workout.name}
                </Text>
                <View style={styles.workoutMeta}>
                  <Text
                    style={[styles.metaText, { color: colors.textSecondary }]}
                  >
                    ⏱️ {workout.duration}
                  </Text>
                  <Text
                    style={[styles.metaText, { color: colors.textSecondary }]}
                  >
                    🔥 {workout.calories} cal
                  </Text>
                  <Text
                    style={[styles.metaText, { color: colors.textSecondary }]}
                  >
                    📅 {workout.date}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={[
                styles.statusBadge,
                {
                  backgroundColor: workout.completed
                    ? colors.success
                    : colors.warning,
                },
              ]}
            >
              <Text style={[styles.statusText, { color: colors.background }]}>
                {workout.completed ? "Completed" : workout.difficulty}
              </Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text
                style={[styles.progressLabel, { color: colors.textSecondary }]}
              >
                Progress
              </Text>
              <Text
                style={[styles.progressLabel, { color: colors.textSecondary }]}
              >
                {workout.progress}%
              </Text>
            </View>
            <View
              style={[styles.progressBar, { backgroundColor: colors.border }]}
            >
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    backgroundColor: getWorkoutColor(workout.type),
                    width: progressAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
          </View>

          {!workout.completed && (
            <TouchableOpacity
              onPress={() => onStartWorkout(workout.id)}
              style={[
                styles.startButton,
                { backgroundColor: getWorkoutColor(workout.type) },
              ]}
            >
              <Text
                style={[styles.startButtonText, { color: colors.background }]}
              >
                Start Workout
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  workoutCard: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  workoutInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  workoutDetails: {
    flex: 1,
  },
  workoutName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 2,
  },
  workoutMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    marginRight: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "500",
  },
  progressContainer: {
    marginTop: 12,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  progressLabel: {
    fontSize: 12,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  startButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  startButtonText: {
    fontWeight: "600",
    fontSize: 14,
  },
});
