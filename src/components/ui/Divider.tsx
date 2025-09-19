import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, spacing } from "../../theme";

interface DividerProps {
  text?: string;
  style?: ViewStyle;
}

const Divider: React.FC<DividerProps> = ({ text, style }) => {
  if (text) {
    return (
      <View style={[styles.container, style]}>
        <View style={styles.line} />
        <Text style={styles.text}>{text}</Text>
        <View style={styles.line} />
      </View>
    );
  }

  return <View style={[styles.simpleDivider, style]} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: spacing.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textSecondary,
    marginHorizontal: spacing.md,
  },
  simpleDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.lg,
  },
});

export default Divider;
