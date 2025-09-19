import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "../../ThemeProvider";
import { TrainingSession } from "../../types";
import {
  TrainingHistoryHeader,
  TrainingHistorySummary,
  TrainingSessionsList,
  ExerciseProgressChart,
  TrainingHistoryLoadingView,
} from "../../components/training";

export const TrainingHistoryScreen: React.FC = () => {
  const { colors } = useTheme();
  const [sessions, setSessions] = useState<TrainingSession[]>([]);
  const [selectedSession, setSelectedSession] =
    useState<TrainingSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  useEffect(() => {
    const mockSessions: TrainingSession[] = [
      {
        id: "1",
        date: "2024-06-15",
        duration: 45,
        sessionType: "Strength Training",
        trainerName: "Mike Johnson",
        exercises: [
          { name: "Bench Press", sets: 3, reps: 10, weight: 135 },
          { name: "Squats", sets: 4, reps: 12, weight: 185 },
          { name: "Deadlifts", sets: 3, reps: 8, weight: 225 },
          { name: "Pull-ups", sets: 3, reps: 8 },
        ],
      },
      {
        id: "2",
        date: "2024-06-12",
        duration: 30,
        sessionType: "Cardio",
        trainerName: "Sarah Wilson",
        exercises: [
          { name: "Treadmill", sets: 1, reps: 1 },
          { name: "Rowing", sets: 1, reps: 1 },
          { name: "Burpees", sets: 3, reps: 15 },
        ],
      },
      {
        id: "3",
        date: "2024-06-08",
        duration: 50,
        sessionType: "Strength Training",
        trainerName: "Mike Johnson",
        exercises: [
          { name: "Bench Press", sets: 4, reps: 8, weight: 155 },
          { name: "Squats", sets: 4, reps: 10, weight: 195 },
          { name: "Military Press", sets: 3, reps: 10, weight: 95 },
          { name: "Bent Over Rows", sets: 3, reps: 12, weight: 115 },
        ],
      },
    ];

    setSessions(mockSessions);
    setLoading(false);
  }, []);

  const getExerciseProgress = (exerciseName: string) => {
    const exerciseHistory = sessions
      .flatMap((session) =>
        session.exercises.map((exercise) => ({
          ...exercise,
          sessionDate: session.date,
        }))
      )
      .filter((exercise) => exercise.name === exerciseName)
      .sort(
        (a, b) =>
          new Date(a.sessionDate).getTime() - new Date(b.sessionDate).getTime()
      );

    return exerciseHistory.map((exercise, index) => ({
      value: exercise.weight || exercise.reps,
      label: `Session ${index + 1}`,
      dataPointText: exercise.weight
        ? `${exercise.weight}lbs`
        : `${exercise.reps} reps`,
    }));
  };

  if (loading) {
    return <TrainingHistoryLoadingView />;
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <TrainingHistoryHeader />

      <TrainingHistorySummary sessions={sessions} />

      {/* Training Sessions */}
      <TrainingSessionsList
        title="Recent Sessions"
        sessions={sessions}
        selectedSession={selectedSession}
        onSessionSelect={setSelectedSession}
      />

      {/* Exercise Progress Charts */}
      <View style={styles.chartsContainer}>
        <ExerciseProgressChart
          title="Bench Press Progress"
          data={getExerciseProgress("Bench Press")}
          color={colors.primary}
        />

        <ExerciseProgressChart
          title="Squats Progress"
          data={getExerciseProgress("Squats")}
          color={colors.secondary}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chartsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
