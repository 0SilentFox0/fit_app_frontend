import React from "react";
import { View, Text, StyleSheet, ViewStyle } from "react-native";
import { colors, spacing } from "../../theme";
import Card from "./Card";

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: string;
  color?: string;
  style?: ViewStyle;
}

const StatCard: React.FC<StatCardProps> = ({
  value,
  label,
  icon,
  color = colors.primary,
  style,
}) => {
  return (
    <Card style={[styles.container, style]}>
      <View style={styles.content}>
        {icon && (
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{icon}</Text>
          </View>
        )}
        <Text style={[styles.value, { color }]}>{value}</Text>
        <Text style={styles.label}>{label}</Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 2,
  },
  content: {
    alignItems: "center",
  },
  iconContainer: {
    marginBottom: spacing.sm,
  },
  icon: {
    fontSize: 24,
  },
  value: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: spacing.xs,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    fontWeight: "500",
  },
});

export default StatCard;
