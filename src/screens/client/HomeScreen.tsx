import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  HomeHeader,
  HomeStats,
  HomeRadarChart,
  HomeBadges,
  HomeWeeklyActivity,
  HomeMonthlyProgress,
} from "../../components/home";

export const HomeScreen: React.FC = () => {
  const [level, setLevel] = useState(15);
  const [xp, setXp] = useState(2840);
  const [xpMax] = useState(3000);
  const [streak, setStreak] = useState(12);
  const [showConfetti, setShowConfetti] = useState(false);

  const radarData = [
    { value: 85, label: "Strength" },
    { value: 70, label: "Cardio" },
    { value: 90, label: "Flexibility" },
    { value: 75, label: "Balance" },
    { value: 80, label: "Endurance" },
  ];

  const badges = [
    { id: 1, name: "🏆", title: "First Workout", unlocked: true },
    { id: 2, name: "🔥", title: "Streak Master", unlocked: true },
    { id: 3, name: "💪", title: "Strength Hero", unlocked: true },
    { id: 4, name: "🏃", title: "Marathon Runner", unlocked: false },
    { id: 5, name: "🧘", title: "Yoga Master", unlocked: false },
    { id: 6, name: "⚡", title: "Speed Demon", unlocked: false },
  ];

  const weeklyData = [
    { day: "Mon", value: 45 },
    { day: "Tue", value: 60 },
    { day: "Wed", value: 30 },
    { day: "Thu", value: 75 },
    { day: "Fri", value: 50 },
    { day: "Sat", value: 80 },
    { day: "Sun", value: 65 },
  ];

  const monthlyData = [
    { month: "Jan", value: 12 },
    { month: "Feb", value: 15 },
    { month: "Mar", value: 18 },
    { month: "Apr", value: 22 },
    { month: "May", value: 25 },
    { month: "Jun", value: 28 },
  ];

  const handleLevelUp = () => {
    setLevel(level + 1);
    setXp(0);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  return (
    <ScrollView style={styles.container}>
      <HomeHeader
        userName="Sam Lopez"
        level={level}
        xp={xp}
        xpMax={xpMax}
        onLevelUp={handleLevelUp}
      />

      <HomeStats streak={streak} workouts={47} />

      <HomeRadarChart data={radarData} />

      <HomeBadges badges={badges} />

      <HomeWeeklyActivity data={weeklyData} />

      <HomeMonthlyProgress data={monthlyData} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
