import React from "react";
import { Text, StyleSheet } from "react-native";
import { useTheme } from "../../ThemeProvider";

export const TrainingHistoryHeader: React.FC = () => {
  const { colors } = useTheme();

  return (
    <Text style={[styles.title, { color: colors.foreground }]}>
      Training History
    </Text>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
});
