import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  RefreshControl,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { exerciseApi, Exercise } from "../services/exerciseApi";
import { ScreenWrapper, ExerciseImage, Card, Button } from "../components";
import { colors, spacing } from "../theme";

interface ExercisesListScreenProps {
  navigation: any;
  route: {
    params: {
      muscleGroup: string;
      bodyPart: string;
    };
  };
}

const ExercisesListScreen: React.FC<ExercisesListScreenProps> = ({
  navigation,
  route,
}) => {
  const { muscleGroup, bodyPart } = route.params;
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  const fetchExercises = async () => {
    try {
      setError(null);
      let fetchedExercises: Exercise[];

      if (bodyPart === "all") {
        fetchedExercises = await exerciseApi.getAllExercises();
      } else {
        fetchedExercises = await exerciseApi.getExercisesByBodyPart(bodyPart);
      }

      setExercises(fetchedExercises);
    } catch (err: any) {
      setError(err.message || "Failed to fetch exercises");
      Alert.alert("Error", err.message || "Failed to fetch exercises");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, [bodyPart]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchExercises();
  };

  const handleExercisePress = (exercise: Exercise) => {
    navigation.navigate("ExerciseDetails", { exercise });
  };

  const toggleViewMode = () => {
    setViewMode(viewMode === "list" ? "grid" : "list");
  };

  const renderExerciseItem = ({ item }: { item: Exercise }) => (
    <TouchableOpacity
      onPress={() => handleExercisePress(item)}
      activeOpacity={0.8}
      style={viewMode === "list" ? styles.listItem : styles.gridItem}
    >
      <Card style={styles.exerciseCard}>
        <View
          style={
            viewMode === "list" ? styles.exerciseContent : styles.gridContent
          }
        >
          <View
            style={
              viewMode === "list"
                ? styles.imageContainer
                : styles.gridImageContainer
            }
          >
            <ExerciseImage
              exerciseId={item.id}
              style={styles.exerciseImage}
              resolution="180"
            />
          </View>
          <View
            style={
              viewMode === "list"
                ? styles.exerciseInfo
                : styles.gridExerciseInfo
            }
          >
            <Text
              style={styles.exerciseName}
              numberOfLines={viewMode === "list" ? 1 : 2}
            >
              {item.name}
            </Text>
            <Text style={styles.exerciseTarget} numberOfLines={1}>
              {item.target}
            </Text>
            <Text style={styles.exerciseEquipment} numberOfLines={1}>
              {item.equipment}
            </Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <ScreenWrapper>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Loading exercises...</Text>
        </View>
      </ScreenWrapper>
    );
  }

  if (error) {
    return (
      <ScreenWrapper>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Try Again"
            onPress={fetchExercises}
            style={styles.retryButton}
          />
        </View>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{muscleGroup} Exercises</Text>
            <Text style={styles.subtitle}>
              {exercises.length} exercises found
            </Text>
          </View>
          <TouchableOpacity onPress={toggleViewMode} style={styles.viewToggle}>
            <Ionicons
              name={viewMode === "list" ? "grid-outline" : "list-outline"}
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>
        </View>

        <FlatList
          data={exercises}
          renderItem={renderExerciseItem}
          keyExtractor={(item) => item.id}
          numColumns={viewMode === "grid" ? 2 : 1}
          key={viewMode}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
          contentContainerStyle={[
            styles.listContainer,
            viewMode === "grid" && styles.gridContainer,
          ]}
          columnWrapperStyle={viewMode === "grid" ? styles.gridRow : undefined}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.padding,
  },
  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.padding,
  },
  errorText: {
    fontSize: 16,
    color: colors.error,
    textAlign: "center",
    marginBottom: spacing.lg,
  },
  retryButton: {
    marginTop: spacing.md,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.padding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  viewToggle: {
    padding: spacing.sm,
  },
  listContainer: {
    paddingHorizontal: spacing.padding,
    paddingBottom: spacing.xl,
  },
  gridContainer: {
    justifyContent: "space-between",
  },
  gridRow: {
    justifyContent: "space-between",
  },
  listItem: {
    width: "100%",
    marginBottom: spacing.md,
  },
  gridItem: {
    width: "48%",
    marginBottom: spacing.md,
  },
  exerciseCard: {
    width: "100%",
  },
  exerciseContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  gridContent: {
    flexDirection: "column",
    alignItems: "center",
  },
  imageContainer: {
    width: 80,
    height: 80,
    borderRadius: spacing.radius,
    overflow: "hidden",
    marginRight: spacing.md,
  },
  gridImageContainer: {
    width: "100%",
    height: 120,
    borderRadius: spacing.radius,
    overflow: "hidden",
    marginBottom: spacing.md,
  },
  exerciseImage: {
    width: "100%",
    height: "100%",
  },
  exerciseInfo: {
    flex: 1,
  },
  gridExerciseInfo: {
    flex: 1,
    alignItems: "center",
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.xs,
  },
  exerciseTarget: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  exerciseEquipment: {
    fontSize: 12,
    color: colors.textSecondary,
  },
});

export default ExercisesListScreen;
