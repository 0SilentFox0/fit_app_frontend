import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeProvider";
import { Card, Badge, Progress } from "../components/ui";
import { mockProgressData } from "../mocks";
import { ProgressData } from "../types";

const { width } = Dimensions.get("window");

export const ProfileScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const [selectedTab, setSelectedTab] = useState("profile");

  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@email.com",
    level: 15,
    xp: 2840,
    nextLevelXp: 3000,
    joinDate: "March 2024",
    totalWorkouts: 47,
    totalHours: 89,
    streak: 12,
    achievements: 8,
  };

  const stats = [
    { label: "Workouts", value: user.totalWorkouts, icon: "fitness" },
    { label: "Hours", value: user.totalHours, icon: "time" },
    { label: "Streak", value: user.streak, icon: "flame" },
    { label: "Achievements", value: user.achievements, icon: "trophy" },
  ];

  const menuItems = [
    { title: "Edit Profile", icon: "person-outline", action: () => {} },
    { title: "Settings", icon: "settings-outline", action: () => {} },
    { title: "Notifications", icon: "notifications-outline", action: () => {} },
    { title: "Privacy", icon: "shield-outline", action: () => {} },
    { title: "Help & Support", icon: "help-circle-outline", action: () => {} },
    { title: "About", icon: "information-circle-outline", action: () => {} },
    {
      title: "Logout",
      icon: "log-out-outline",
      action: () => {},
      isDestructive: true,
    },
  ];

  const progressPercentage = (user.xp / user.nextLevelXp) * 100;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <Card style={styles.headerCard}>
        <View style={styles.headerContent}>
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: colors.primary },
            ]}
          >
            <Text
              style={[styles.avatarText, { color: colors.primaryForeground }]}
            >
              AJ
            </Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.foreground }]}>
              {user.name}
            </Text>
            <Text style={[styles.userEmail, { color: colors.mutedForeground }]}>
              {user.email}
            </Text>
            <View style={styles.levelContainer}>
              <Badge variant="outline" size="sm">
                Level {user.level}
              </Badge>
            </View>
          </View>
        </View>
      </Card>

      {/* XP Progress */}
      <Card style={styles.xpContainer}>
        <View style={styles.xpHeader}>
          <Text style={[styles.xpTitle, { color: colors.foreground }]}>
            Experience Points
          </Text>
          <Text style={[styles.xpValue, { color: colors.primary }]}>
            {user.xp} / {user.nextLevelXp} XP
          </Text>
        </View>
        <Progress
          value={progressPercentage}
          variant="success"
          style={styles.progressBar}
        />
      </Card>

      {/* Stats Grid */}
      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <Card key={index} style={styles.statCard}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: colors.primary + "33" },
              ]}
            >
              <Ionicons
                name={stat.icon as any}
                size={24}
                color={colors.primary}
              />
            </View>
            <Text style={[styles.statValue, { color: colors.foreground }]}>
              {stat.value}
            </Text>
            <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
              {stat.label}
            </Text>
          </Card>
        ))}
      </View>

      {/* Menu Items */}
      <View style={styles.menuContainer}>
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.menuItem, { backgroundColor: colors.card }]}
            onPress={item.action}
          >
            <View style={styles.menuItemContent}>
              <Ionicons
                name={item.icon as any}
                size={20}
                color={
                  item.isDestructive ? colors.destructive : colors.foreground
                }
              />
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color: item.isDestructive
                      ? colors.destructive
                      : colors.foreground,
                  },
                ]}
              >
                {item.title}
              </Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={16}
              color={colors.mutedForeground}
            />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    margin: 20,
    marginTop: 60,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatarContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: "bold",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    marginBottom: 8,
  },
  levelContainer: {
    alignSelf: "flex-start",
  },
  xpContainer: {
    margin: 20,
    marginTop: 0,
  },
  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  xpTitle: {
    fontSize: 16,
    fontWeight: "600",
  },
  xpValue: {
    fontSize: 14,
    fontWeight: "600",
  },
  progressBar: {
    marginTop: 8,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 60) / 2,
    alignItems: "center",
    marginBottom: 12,
    marginHorizontal: 6,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  menuContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  menuItemContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 12,
  },
});
