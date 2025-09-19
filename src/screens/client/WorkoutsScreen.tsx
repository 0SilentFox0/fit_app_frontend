import React, { useState, useRef, useEffect } from "react";
import { ScrollView, Animated } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../../ThemeProvider";
import {
  WorkoutsHeader,
  WorkoutsStats,
  WorkoutTypes,
  UpcomingWorkouts,
  QuickActions,
} from "../../components/workouts";

interface WorkoutsScreenProps {
  navigation: any;
}

const workouts = [
  {
    id: "1",
    name: "Morning Cardio Blast",
    duration: "30 min",
    date: "Today",
    difficulty: "Intermediate",
    completed: false,
    calories: 280,
    type: "cardio",
    progress: 0,
  },
  {
    id: "2",
    name: "Strength Training",
    duration: "45 min",
    date: "Tomorrow",
    difficulty: "Advanced",
    completed: true,
    calories: 320,
    type: "strength",
    progress: 100,
  },
  {
    id: "3",
    name: "Yoga Flow",
    duration: "25 min",
    date: "Wednesday",
    difficulty: "Beginner",
    completed: false,
    calories: 150,
    type: "yoga",
    progress: 0,
  },
];

const workoutTypes = [
  { name: "Cardio", icon: "heart", color: "#FF6B6B", count: 12 },
  { name: "Strength", icon: "dumbbell", color: "#4ECDC4", count: 8 },
  { name: "Yoga", icon: "leaf", color: "#45B7D1", count: 6 },
  { name: "HIIT", icon: "flash", color: "#96CEB4", count: 4 },
];

export const WorkoutsScreen: React.FC<WorkoutsScreenProps> = ({
  navigation,
}) => {
  const theme = useTheme();
  const [selectedType, setSelectedType] = useState("all");
  const [totalWorkouts, setTotalWorkouts] = useState(12);
  const [completedWorkouts, setCompletedWorkouts] = useState(8);
  const [thisWeekWorkouts, setThisWeekWorkouts] = useState(4);

  // Animated progress bars
  const progressAnimations = useRef(
    workouts.map(() => new Animated.Value(0))
  ).current;
  const statsAnimations = useRef([
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0),
  ]).current;

  useEffect(() => {
    // Animate stats on mount
    statsAnimations.forEach((anim, index) => {
      Animated.timing(anim, {
        toValue: [totalWorkouts, completedWorkouts, thisWeekWorkouts][index],
        duration: 1500,
        useNativeDriver: false,
      }).start();
    });

    // Animate workout progress bars
    workouts.forEach((workout, index) => {
      Animated.timing(progressAnimations[index], {
        toValue: workout.progress / 100,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  const handleStartWorkout = (workoutId: string) => {
    // Handle workout start
    console.log("Starting workout:", workoutId);
  };

  const handleWorkoutTypePress = (type: string) => {
    setSelectedType(type);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: theme.spacing.lg }}
      >
        <WorkoutsHeader />

        <WorkoutsStats
          totalWorkouts={totalWorkouts}
          completedWorkouts={completedWorkouts}
          thisWeekWorkouts={thisWeekWorkouts}
          statsAnimations={statsAnimations}
        />

        <WorkoutTypes
          workoutTypes={workoutTypes}
          selectedType={selectedType}
          onTypePress={handleWorkoutTypePress}
        />

        <UpcomingWorkouts
          workouts={workouts}
          progressAnimations={progressAnimations}
          onStartWorkout={handleStartWorkout}
        />

        <QuickActions workoutTypes={workoutTypes} />
      </ScrollView>
    </SafeAreaView>
  );
};
