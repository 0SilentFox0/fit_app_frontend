import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useAuth } from "../hooks/useAuth";
import { ScreenWrapper, StatCard, ActionButton, Button } from "../components";
import { colors, spacing } from "../theme";
import { useNavigation } from "@react-navigation/native";

const DashboardScreen: React.FC = () => {
  const { user, signOut, loading } = useAuth();
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error: any) {
      console.error("Sign out error:", error);
    }
  };

  const handleViewExercises = () => {
    (navigation as any).navigate("Exercises");
  };

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={styles.greeting}>Welcome back!</Text>
              <Text style={styles.userEmail}>{user?.email}</Text>
            </View>
            <Button
              title="Sign Out"
              onPress={handleSignOut}
              variant="secondary"
              size="small"
              loading={loading}
              disabled={loading}
            />
          </View>

          <View style={styles.statsContainer}>
            <StatCard value="0" label="Workouts" icon="💪" />
            <StatCard value="0" label="Exercises" icon="🏋️" />
            <StatCard value="0" label="Streak" icon="🔥" />
          </View>

          <View style={styles.quickActions}>
            <Text style={styles.sectionTitle}>Get Started</Text>
            <ActionButton
              title="Browse Exercises"
              subtitle="Discover new workouts"
              icon="💪"
              onPress={handleViewExercises}
            />
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xl,
    paddingTop: spacing.lg,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.xs,
    lineHeight: 34,
  },
  userEmail: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "400",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.xl,
    paddingHorizontal: 4,
  },
  quickActions: {
    marginTop: spacing.xl,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
});

export default DashboardScreen;
