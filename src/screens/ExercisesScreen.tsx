import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from "react-native";
import { exerciseApi, Exercise, MuscleGroup } from "../services/exerciseApi";

const ExercisesScreen: React.FC = () => {
  const [muscleGroups, setMuscleGroups] = useState<MuscleGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchExercises = async () => {
    try {
      setError(null);
      const exercises = await exerciseApi.getAllExercises();

      // Group exercises by target muscle
      const grouped = exerciseApi.groupExercisesByMuscle(exercises);
      setMuscleGroups(grouped);
    } catch (err: any) {
      console.error("Error fetching exercises:", err);
      setError(err.message || "Failed to fetch exercises");
      Alert.alert("Error", "Failed to load exercises. Please try again.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchExercises();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#64b5f6" />
        <Text style={styles.loadingText}>Loading exercises...</Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Exercises</Text>
        <Text style={styles.subtitle}>
          {muscleGroups.reduce(
            (total, group) => total + group.exercises.length,
            0
          )}{" "}
          exercises
        </Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchExercises}>
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {muscleGroups.map((group, groupIndex) => (
        <View key={groupIndex} style={styles.muscleGroup}>
          <Text style={styles.muscleGroupTitle}>{group.name}</Text>
          <Text style={styles.exerciseCount}>
            {group.exercises.length} exercises
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.exercisesScroll}
          >
            {group.exercises.map((exercise, exerciseIndex) => (
              <TouchableOpacity
                key={exerciseIndex}
                style={styles.exerciseCard}
                onPress={() => {
                  Alert.alert(
                    exercise.name,
                    `Target: ${exercise.target}\nBody Part: ${exercise.bodyPart}\nEquipment: ${exercise.equipment}`,
                    [{ text: "OK" }]
                  );
                }}
              >
                <Image
                  source={{ uri: exerciseApi.getExerciseImage(exercise.id) }}
                  style={styles.exerciseImage}
                  resizeMode="cover"
                />
                <View style={styles.exerciseInfo}>
                  <Text style={styles.exerciseName} numberOfLines={2}>
                    {exercise.name}
                  </Text>
                  <Text style={styles.exerciseEquipment}>
                    {exercise.equipment}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121212",
  },
  loadingText: {
    color: "#b3b3b3",
    marginTop: 16,
    fontSize: 16,
  },
  header: {
    padding: 20,
    paddingTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#b3b3b3",
  },
  errorContainer: {
    backgroundColor: "#2d1b1b",
    padding: 16,
    margin: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ff5252",
    alignItems: "center",
  },
  errorText: {
    color: "#ff5252",
    textAlign: "center",
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: "#ff5252",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  retryButtonText: {
    color: "#ffffff",
    fontWeight: "600",
  },
  muscleGroup: {
    marginBottom: 24,
    paddingHorizontal: 20,
  },
  muscleGroupTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 4,
  },
  exerciseCount: {
    fontSize: 14,
    color: "#b3b3b3",
    marginBottom: 12,
  },
  exercisesScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  exerciseCard: {
    backgroundColor: "#1e1e1e",
    borderRadius: 12,
    marginRight: 12,
    width: 160,
    borderWidth: 1,
    borderColor: "#333333",
    overflow: "hidden",
  },
  exerciseImage: {
    width: "100%",
    height: 120,
    backgroundColor: "#333333",
  },
  exerciseInfo: {
    padding: 12,
  },
  exerciseName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 4,
  },
  exerciseEquipment: {
    fontSize: 12,
    color: "#b3b3b3",
  },
});

export default ExercisesScreen;
