import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../ThemeProvider";

export const WorkoutsHeader: React.FC = () => {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.lg }]}>
      <Text style={[styles.title, { color: colors.text }]}>Workouts</Text>
      <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
        Track your fitness journey
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});
