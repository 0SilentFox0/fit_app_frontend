import { ProgressData, Badge, WeeklyData, MonthlyData } from "../types";

export const mockProgressData: ProgressData = {
  weight: {
    current: 165,
    target: 160,
    start: 180,
    unit: "lbs",
    history: [
      { date: "2024-01-01", value: 180 },
      { date: "2024-01-08", value: 178 },
      { date: "2024-01-15", value: 175 },
      { date: "2024-01-22", value: 172 },
      { date: "2024-01-29", value: 170 },
      { date: "2024-02-05", value: 168 },
      { date: "2024-02-12", value: 165 },
    ],
  },
  bodyFat: {
    current: 18,
    target: 15,
    start: 22,
    unit: "%",
    history: [
      { date: "2024-01-01", value: 22 },
      { date: "2024-01-15", value: 21 },
      { date: "2024-01-29", value: 20 },
      { date: "2024-02-12", value: 18 },
    ],
  },
  muscleMass: {
    current: 135,
    target: 140,
    start: 130,
    unit: "lbs",
    history: [
      { date: "2024-01-01", value: 130 },
      { date: "2024-01-15", value: 131 },
      { date: "2024-01-29", value: 133 },
      { date: "2024-02-12", value: 135 },
    ],
  },
  strength: {
    benchPress: { current: 185, start: 135, unit: "lbs" },
    squat: { current: 225, start: 185, unit: "lbs" },
    deadlift: { current: 275, start: 225, unit: "lbs" },
    pullUps: { current: 12, start: 5, unit: "reps" },
  },
  endurance: {
    running: { current: 25, start: 15, unit: "minutes" },
    cycling: { current: 45, start: 30, unit: "minutes" },
    swimming: { current: 20, start: 10, unit: "minutes" },
  },
  flexibility: {
    sitAndReach: { current: 8, start: 2, unit: "inches" },
    shoulderFlexibility: { current: 85, start: 70, unit: "degrees" },
    hipFlexibility: { current: 90, start: 75, unit: "degrees" },
  },
};

export const mockWeeklyData: WeeklyData[] = [
  {
    week: "2024-W01",
    startDate: "2024-01-01",
    endDate: "2024-01-07",
    sessionsCompleted: 4,
    totalDuration: 240,
    caloriesBurned: 2800,
    averageRating: 4.5,
    goalsMet: 3,
    totalGoals: 4,
  },
  {
    week: "2024-W02",
    startDate: "2024-01-08",
    endDate: "2024-01-14",
    sessionsCompleted: 5,
    totalDuration: 300,
    caloriesBurned: 3500,
    averageRating: 4.7,
    goalsMet: 4,
    totalGoals: 5,
  },
  {
    week: "2024-W03",
    startDate: "2024-01-15",
    endDate: "2024-01-21",
    sessionsCompleted: 6,
    totalDuration: 360,
    caloriesBurned: 4200,
    averageRating: 4.8,
    goalsMet: 5,
    totalGoals: 6,
  },
  {
    week: "2024-W04",
    startDate: "2024-01-22",
    endDate: "2024-01-28",
    sessionsCompleted: 5,
    totalDuration: 300,
    caloriesBurned: 3800,
    averageRating: 4.6,
    goalsMet: 4,
    totalGoals: 5,
  },
  {
    week: "2024-W05",
    startDate: "2024-01-29",
    endDate: "2024-02-04",
    sessionsCompleted: 7,
    totalDuration: 420,
    caloriesBurned: 4900,
    averageRating: 4.9,
    goalsMet: 6,
    totalGoals: 7,
  },
  {
    week: "2024-W06",
    startDate: "2024-02-05",
    endDate: "2024-02-11",
    sessionsCompleted: 6,
    totalDuration: 360,
    caloriesBurned: 4200,
    averageRating: 4.7,
    goalsMet: 5,
    totalGoals: 6,
  },
];

export const mockMonthlyData: MonthlyData[] = [
  {
    month: "2024-01",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    sessionsCompleted: 20,
    totalDuration: 1200,
    caloriesBurned: 14300,
    averageRating: 4.7,
    goalsMet: 18,
    totalGoals: 22,
    weightChange: -10,
    bodyFatChange: -4,
    muscleMassChange: 5,
  },
  {
    month: "2024-02",
    startDate: "2024-02-01",
    endDate: "2024-02-29",
    sessionsCompleted: 18,
    totalDuration: 1080,
    caloriesBurned: 12900,
    averageRating: 4.8,
    goalsMet: 16,
    totalGoals: 20,
    weightChange: -5,
    bodyFatChange: -3,
    muscleMassChange: 2,
  },
];

export const mockBadges: Badge[] = [
  {
    id: "1",
    name: "First Steps",
    description: "Complete your first training session",
    icon: "🏃‍♂️",
    unlocked: true,
    unlockedDate: "2024-01-01",
    category: "achievement",
  },
  {
    id: "2",
    name: "Week Warrior",
    description: "Complete 5 sessions in a week",
    icon: "🔥",
    unlocked: true,
    unlockedDate: "2024-01-15",
    category: "consistency",
  },
  {
    id: "3",
    name: "Strength Builder",
    description: "Increase bench press by 50 lbs",
    icon: "💪",
    unlocked: true,
    unlockedDate: "2024-01-20",
    category: "strength",
  },
  {
    id: "4",
    name: "Flexibility Master",
    description: "Improve sit-and-reach by 6 inches",
    icon: "🧘‍♀️",
    unlocked: false,
    category: "flexibility",
  },
  {
    id: "5",
    name: "Endurance Champion",
    description: "Run for 30 minutes continuously",
    icon: "🏃‍♀️",
    unlocked: false,
    category: "endurance",
  },
  {
    id: "6",
    name: "Perfect Week",
    description: "Complete all planned sessions in a week",
    icon: "⭐",
    unlocked: false,
    category: "consistency",
  },
  {
    id: "7",
    name: "Weight Loss Hero",
    description: "Lose 20 lbs from starting weight",
    icon: "🎯",
    unlocked: false,
    category: "weight",
  },
  {
    id: "8",
    name: "Muscle Builder",
    description: "Gain 10 lbs of muscle mass",
    icon: "🏋️‍♂️",
    unlocked: false,
    category: "muscle",
  },
  {
    id: "9",
    name: "Consistency King",
    description: "Train for 30 consecutive days",
    icon: "👑",
    unlocked: false,
    category: "consistency",
  },
  {
    id: "10",
    name: "Goal Crusher",
    description: "Achieve 5 monthly goals",
    icon: "🚀",
    unlocked: false,
    category: "achievement",
  },
];

export const mockAnalytics = {
  totalSessions: 38,
  totalDuration: 2280,
  totalCaloriesBurned: 27200,
  averageSessionDuration: 60,
  averageRating: 4.75,
  completionRate: 85,
  goalAchievementRate: 82,
  favoriteSessionType: "Strength Training",
  bestTimeOfDay: "morning",
  mostProductiveDay: "wednesday",
  streakDays: 12,
  longestStreak: 18,
  totalWeightLost: 15,
  totalMuscleGained: 7,
  totalBodyFatLost: 7,
};

export const getProgressByMetric = (metric: keyof ProgressData) => {
  return mockProgressData[metric];
};

export const getWeeklyProgress = (week: string): WeeklyData | undefined => {
  return mockWeeklyData.find((w) => w.week === week);
};

export const getMonthlyProgress = (month: string): MonthlyData | undefined => {
  return mockMonthlyData.find((m) => m.month === month);
};

export const getUnlockedBadges = (): Badge[] => {
  return mockBadges.filter((badge) => badge.unlocked);
};

export const getBadgesByCategory = (category: string): Badge[] => {
  return mockBadges.filter((badge) => badge.category === category);
};

export const getProgressTrend = (metric: string, days: number = 30) => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  // This would typically come from a real API
  // For now, return mock trend data
  return {
    trend: "increasing",
    change: 5.2,
    changePercent: 12.5,
    data: Array.from({ length: days }, (_, i) => ({
      date: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      value: Math.random() * 100 + 50,
    })),
  };
};

export const getGoalProgress = (goalType: string) => {
  const goals = {
    weight: {
      current: mockProgressData.weight.current,
      target: mockProgressData.weight.target,
      start: mockProgressData.weight.start,
      progress:
        ((mockProgressData.weight.start - mockProgressData.weight.current) /
          (mockProgressData.weight.start - mockProgressData.weight.target)) *
        100,
    },
    strength: {
      benchPress: {
        current: mockProgressData.strength.benchPress.current,
        start: mockProgressData.strength.benchPress.start,
        progress:
          ((mockProgressData.strength.benchPress.current -
            mockProgressData.strength.benchPress.start) /
            50) *
          100,
      },
      squat: {
        current: mockProgressData.strength.squat.current,
        start: mockProgressData.strength.squat.start,
        progress:
          ((mockProgressData.strength.squat.current -
            mockProgressData.strength.squat.start) /
            40) *
          100,
      },
    },
  };

  return goals[goalType as keyof typeof goals];
};
