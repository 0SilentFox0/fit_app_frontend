import { TrainingSession, Exercise } from "../types";

export const mockExercises: Exercise[] = [
  {
    name: "Bench Press",
    sets: 4,
    reps: 8,
    weight: 135,
    notes: "Focus on form, control the descent",
  },
  {
    name: "Squats",
    sets: 4,
    reps: 10,
    weight: 185,
    notes: "Keep chest up, knees in line with toes",
  },
  {
    name: "Deadlifts",
    sets: 3,
    reps: 6,
    weight: 225,
    notes: "Maintain neutral spine, drive through heels",
  },
  {
    name: "Pull-ups",
    sets: 3,
    reps: 8,
    weight: undefined,
    notes: "Full range of motion, controlled movement",
  },
  {
    name: "Push-ups",
    sets: 3,
    reps: 15,
    weight: undefined,
    notes: "Maintain plank position throughout",
  },
  {
    name: "Plank",
    sets: 3,
    duration: 60,
    notes: "Keep body in straight line",
  },
  {
    name: "Burpees",
    sets: 3,
    reps: 10,
    notes: "Explosive movement, full extension",
  },
  {
    name: "Mountain Climbers",
    sets: 3,
    duration: 45,
    notes: "Keep core engaged, maintain pace",
  },
  {
    name: "Lunges",
    sets: 3,
    reps: 12,
    weight: 45,
    notes: "Step forward, lower until back knee nearly touches ground",
  },
  {
    name: "Overhead Press",
    sets: 3,
    reps: 8,
    weight: 95,
    notes: "Press directly overhead, avoid arching back",
  },
];

export const mockTrainingSessions: TrainingSession[] = [
  {
    id: "1",
    date: "2024-01-20",
    duration: 75,
    sessionType: "Strength Training",
    trainerName: "Sarah Johnson",
    exercises: [
      mockExercises[0], // Bench Press
      mockExercises[1], // Squats
      mockExercises[2], // Deadlifts
    ],
    notes:
      "Great session! Focused on compound movements. Client showed improvement in form.",
    rating: 5,
  },
  {
    id: "2",
    date: "2024-01-18",
    duration: 60,
    sessionType: "HIIT",
    trainerName: "Alex Rodriguez",
    exercises: [
      mockExercises[6], // Burpees
      mockExercises[7], // Mountain Climbers
      mockExercises[8], // Lunges
    ],
    notes:
      "High intensity cardio session. Client maintained good energy throughout.",
    rating: 4,
  },
  {
    id: "3",
    date: "2024-01-15",
    duration: 90,
    sessionType: "Yoga",
    trainerName: "Mike Chen",
    exercises: [
      {
        name: "Sun Salutation A",
        sets: 5,
        duration: 10,
        notes: "Flow sequence, focus on breath",
      },
      {
        name: "Warrior Poses",
        sets: 3,
        duration: 15,
        notes: "Hold each pose, engage core",
      },
      {
        name: "Tree Pose",
        sets: 3,
        duration: 20,
        notes: "Balance work, find focus point",
      },
    ],
    notes: "Relaxing session focused on flexibility and mindfulness.",
    rating: 5,
  },
  {
    id: "4",
    date: "2024-01-13",
    duration: 60,
    sessionType: "Pilates",
    trainerName: "Emily Wilson",
    exercises: [
      {
        name: "Hundred",
        sets: 1,
        duration: 5,
        notes: "Core engagement, controlled breathing",
      },
      {
        name: "Roll Up",
        sets: 3,
        reps: 8,
        notes: "Sequential movement, control each vertebra",
      },
      {
        name: "Single Leg Stretch",
        sets: 3,
        duration: 10,
        notes: "Keep pelvis stable, engage core",
      },
    ],
    notes: "Core-focused session with emphasis on control and precision.",
    rating: 4,
  },
  {
    id: "5",
    date: "2024-01-10",
    duration: 45,
    sessionType: "Cardio",
    trainerName: "David Brown",
    exercises: [
      {
        name: "Treadmill Run",
        sets: 1,
        duration: 20,
        notes: "Progressive intensity, maintain form",
      },
      {
        name: "Rowing Machine",
        sets: 1,
        duration: 15,
        notes: "Full body movement, proper technique",
      },
      {
        name: "Jump Rope",
        sets: 1,
        duration: 10,
        notes: "Light on feet, maintain rhythm",
      },
    ],
    notes: "Cardiovascular endurance training with variety of equipment.",
    rating: 4,
  },
];

export const getSessionsByDate = (date: string): TrainingSession[] => {
  return mockTrainingSessions.filter((session) => session.date === date);
};

export const getSessionsByType = (sessionType: string): TrainingSession[] => {
  return mockTrainingSessions.filter((session) =>
    session.sessionType.toLowerCase().includes(sessionType.toLowerCase())
  );
};

export const getSessionsByTrainer = (
  trainerName: string
): TrainingSession[] => {
  return mockTrainingSessions.filter((session) =>
    session.trainerName.toLowerCase().includes(trainerName.toLowerCase())
  );
};

export const getTopRatedSessions = (
  minRating: number = 4
): TrainingSession[] => {
  return mockTrainingSessions
    .filter((session) => session.rating && session.rating >= minRating)
    .sort((a, b) => (b.rating || 0) - (a.rating || 0));
};

export const getSessionsByDateRange = (
  startDate: string,
  endDate: string
): TrainingSession[] => {
  return mockTrainingSessions.filter((session) => {
    const sessionDate = new Date(session.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return sessionDate >= start && sessionDate <= end;
  });
};

export const getExercisesByMuscleGroup = (muscleGroup: string): Exercise[] => {
  const muscleGroupMap: { [key: string]: string[] } = {
    chest: ["Bench Press", "Push-ups", "Overhead Press"],
    legs: ["Squats", "Deadlifts", "Lunges"],
    back: ["Pull-ups", "Deadlifts"],
    core: ["Plank", "Mountain Climbers", "Burpees"],
    shoulders: ["Overhead Press", "Push-ups"],
    arms: ["Pull-ups", "Push-ups"],
  };

  const exercises = muscleGroupMap[muscleGroup.toLowerCase()] || [];
  return mockExercises.filter((exercise) => exercises.includes(exercise.name));
};

export const getExercisesByDifficulty = (
  difficulty: "beginner" | "intermediate" | "advanced"
): Exercise[] => {
  const difficultyMap: { [key: string]: string[] } = {
    beginner: ["Push-ups", "Plank", "Lunges"],
    intermediate: ["Bench Press", "Squats", "Mountain Climbers"],
    advanced: ["Deadlifts", "Pull-ups", "Burpees", "Overhead Press"],
  };

  const exercises = difficultyMap[difficulty] || [];
  return mockExercises.filter((exercise) => exercises.includes(exercise.name));
};
