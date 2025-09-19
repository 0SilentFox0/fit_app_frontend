import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { exerciseApi, Exercise } from "../services/exerciseApi";
import { ScreenWrapper, ExerciseImage, Card, Button } from "../components";
import { colors, spacing } from "../theme";

interface ExerciseDetailsScreenProps {
  navigation: any;
  route: {
    params: {
      exercise: Exercise;
    };
  };
}

const ExerciseDetailsScreen: React.FC<ExerciseDetailsScreenProps> = ({
  navigation,
  route,
}) => {
  const { exercise } = route.params;
  const [imageResolution, setImageResolution] = useState("180");

  const handleResolutionChange = (resolution: string) => {
    setImageResolution(resolution);
  };

  const handleAddToWorkout = () => {
    Alert.alert("Add to Workout", `Add "${exercise.name}" to your workout?`, [
      { text: "Cancel", style: "cancel" },
      { text: "Add", onPress: () => console.log("Added to workout") },
    ]);
  };

  const renderInstruction = (instruction: string, index: number) => (
    <View key={index} style={styles.instructionItem}>
      <View style={styles.instructionNumber}>
        <Text style={styles.instructionNumberText}>{index + 1}</Text>
      </View>
      <Text style={styles.instructionText}>{instruction}</Text>
    </View>
  );

  const screenWidth = Dimensions.get("window").width;
  const imageWidth = screenWidth - spacing.padding * 2;

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.imageContainer}>
            <ExerciseImage
              exerciseId={exercise.id}
              style={[styles.exerciseImage, { width: imageWidth }]}
              resolution={imageResolution}
            />
          </View>

          <View style={styles.resolutionButtons}>
            <TouchableOpacity
              style={[
                styles.resolutionButton,
                imageResolution === "180" && styles.resolutionButtonActive,
              ]}
              onPress={() => handleResolutionChange("180")}
            >
              <Text
                style={[
                  styles.resolutionButtonText,
                  imageResolution === "180" &&
                    styles.resolutionButtonTextActive,
                ]}
              >
                Small
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.resolutionButton,
                imageResolution === "360" && styles.resolutionButtonActive,
              ]}
              onPress={() => handleResolutionChange("360")}
            >
              <Text
                style={[
                  styles.resolutionButtonText,
                  imageResolution === "360" &&
                    styles.resolutionButtonTextActive,
                ]}
              >
                Medium
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.resolutionButton,
                imageResolution === "720" && styles.resolutionButtonActive,
              ]}
              onPress={() => handleResolutionChange("720")}
            >
              <Text
                style={[
                  styles.resolutionButtonText,
                  imageResolution === "720" &&
                    styles.resolutionButtonTextActive,
                ]}
              >
                Large
              </Text>
            </TouchableOpacity>
          </View>

          <Card style={styles.detailsCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Target</Text>
                <Text style={styles.detailValue}>{exercise.target}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Body Part</Text>
                <Text style={styles.detailValue}>{exercise.bodyPart}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Equipment</Text>
                <Text style={styles.detailValue}>{exercise.equipment}</Text>
              </View>
            </View>

            {exercise.secondaryMuscles &&
              exercise.secondaryMuscles.length > 0 && (
                <View style={styles.secondaryMuscles}>
                  <Text style={styles.secondaryMusclesLabel}>
                    Secondary Muscles
                  </Text>
                  <View style={styles.muscleTags}>
                    {exercise.secondaryMuscles.map((muscle, index) => (
                      <View key={index} style={styles.muscleTag}>
                        <Text style={styles.muscleTagText}>{muscle}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              )}
          </Card>

          {exercise.instructions && exercise.instructions.length > 0 && (
            <Card style={styles.instructionsCard}>
              <Text style={styles.instructionsTitle}>Instructions</Text>
              {exercise.instructions.map((instruction, index) =>
                renderInstruction(instruction, index)
              )}
            </Card>
          )}

          <Button
            title="Add to Workout"
            onPress={handleAddToWorkout}
            icon="➕"
            style={styles.addButton}
          />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.padding,
    paddingTop: spacing.lg,
    paddingBottom: spacing.xl,
  },
  imageContainer: {
    marginBottom: spacing.lg,
    borderRadius: spacing.cardRadius,
    overflow: "hidden",
  },
  exerciseImage: {
    height: 250,
    borderRadius: spacing.cardRadius,
  },
  resolutionButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  resolutionButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: spacing.buttonRadius,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  resolutionButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  resolutionButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
  },
  resolutionButtonTextActive: {
    color: colors.text,
  },
  detailsCard: {
    marginBottom: spacing.lg,
  },
  exerciseName: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
    lineHeight: 30,
  },
  detailsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  detailItem: {
    flex: 1,
    minWidth: "45%",
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.text,
  },
  secondaryMuscles: {
    marginTop: spacing.lg,
  },
  secondaryMusclesLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    marginBottom: spacing.sm,
  },
  muscleTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  muscleTag: {
    backgroundColor: colors.surfaceVariant,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: spacing.radius,
  },
  muscleTagText: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.text,
  },
  instructionsCard: {
    marginBottom: spacing.lg,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: spacing.md,
  },
  instructionNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  instructionNumberText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.text,
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    lineHeight: 24,
  },
  addButton: {
    marginTop: spacing.lg,
  },
});

export default ExerciseDetailsScreen;
