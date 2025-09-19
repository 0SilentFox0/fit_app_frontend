import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ScreenWrapper, Card } from "../components";
import { colors, spacing } from "../theme";

interface MuscleGroup {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  bodyPart: string;
}

const MuscleGroupsScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const muscleGroups: MuscleGroup[] = [
    {
      id: "abs",
      name: "Abs",
      icon: "fitness",
      color: colors.progressTeal,
      bodyPart: "waist",
    },
    {
      id: "biceps",
      name: "Biceps",
      icon: "fitness",
      color: colors.progressPurple,
      bodyPart: "upper arms",
    },
    {
      id: "triceps",
      name: "Triceps",
      icon: "fitness",
      color: colors.progressYellow,
      bodyPart: "upper arms",
    },
    {
      id: "chest",
      name: "Chest",
      icon: "fitness",
      color: colors.primary,
      bodyPart: "chest",
    },
    {
      id: "back",
      name: "Back",
      icon: "fitness",
      color: colors.accent,
      bodyPart: "back",
    },
    {
      id: "shoulders",
      name: "Shoulders",
      icon: "fitness",
      color: colors.success,
      bodyPart: "shoulders",
    },
    {
      id: "legs",
      name: "Legs",
      icon: "fitness",
      color: colors.warning,
      bodyPart: "upper legs",
    },
    {
      id: "glutes",
      name: "Glutes",
      icon: "fitness",
      color: colors.error,
      bodyPart: "upper legs",
    },
    {
      id: "calves",
      name: "Calves",
      icon: "fitness",
      color: colors.info,
      bodyPart: "lower legs",
    },
    {
      id: "forearms",
      name: "Forearms",
      icon: "fitness",
      color: colors.progressTeal,
      bodyPart: "lower arms",
    },
  ];

  const handleMuscleGroupPress = (muscleGroup: MuscleGroup) => {
    navigation.navigate("ExercisesList", {
      muscleGroup: muscleGroup.name,
      bodyPart: muscleGroup.bodyPart,
    });
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Muscle Groups</Text>
            <Text style={styles.subtitle}>
              Select a muscle group to explore exercises
            </Text>
          </View>

          <View style={styles.grid}>
            {muscleGroups.map((muscleGroup, index) => (
              <TouchableOpacity
                key={muscleGroup.id}
                onPress={() => handleMuscleGroupPress(muscleGroup)}
                activeOpacity={0.8}
                style={styles.muscleCardWrapper}
              >
                <Card style={styles.muscleCard}>
                  <View style={styles.cardContent}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: muscleGroup.color },
                      ]}
                    >
                      <Ionicons
                        name={muscleGroup.icon}
                        size={32}
                        color={colors.text}
                      />
                    </View>
                    <Text style={styles.muscleName}>{muscleGroup.name}</Text>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
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
    flex: 1,
    paddingHorizontal: spacing.padding,
    paddingTop: spacing.lg,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    textAlign: "center",
    marginBottom: spacing.sm,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "400",
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 22,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  muscleCardWrapper: {
    width: "31%",
    marginBottom: spacing.md,
  },
  muscleCard: {
    width: "100%",
  },
  cardContent: {
    alignItems: "center",
    paddingVertical: spacing.lg,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
  },
  muscleName: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.text,
    textAlign: "center",
  },
});

export default MuscleGroupsScreen;
