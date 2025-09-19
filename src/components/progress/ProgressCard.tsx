import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";

interface ProgressCardProps {
  title: string;
  currentValue: number;
  targetValue: number;
  startValue: number;
  unit: string;
  icon: string;
  onPress?: () => void;
  showProgress?: boolean;
}

export const ProgressCard: React.FC<ProgressCardProps> = ({
  title,
  currentValue,
  targetValue,
  startValue,
  unit,
  icon,
  onPress,
  showProgress = true,
}) => {
  const { colors } = useTheme();

  const calculateProgress = () => {
    if (startValue === targetValue) return 0;

    if (targetValue > startValue) {
      // Goal is to increase (e.g., muscle mass)
      return Math.min(
        ((currentValue - startValue) / (targetValue - startValue)) * 100,
        100
      );
    } else {
      // Goal is to decrease (e.g., weight loss)
      return Math.min(
        ((startValue - currentValue) / (startValue - targetValue)) * 100,
        100
      );
    }
  };

  const progress = calculateProgress();
  const isGoalReached =
    targetValue > startValue
      ? currentValue >= targetValue
      : currentValue <= targetValue;

  const getProgressColor = () => {
    if (isGoalReached) return colors.success;
    if (progress >= 75) return colors.warning;
    if (progress >= 50) return colors.primary;
    return colors.mutedForeground;
  };

  const getProgressIcon = () => {
    if (isGoalReached) return "checkmark-circle";
    if (progress >= 75) return "trending-up";
    if (progress >= 50) return "trending-up";
    return "trending-down";
  };

  const formatValue = (value: number) => {
    if (unit === "%") return `${value.toFixed(1)}%`;
    if (unit === "lbs" || unit === "kg") return `${value} ${unit}`;
    if (unit === "inches" || unit === "cm") return `${value} ${unit}`;
    if (unit === "degrees") return `${value}°`;
    if (unit === "minutes") return `${value} min`;
    if (unit === "reps") return `${value} reps`;
    return `${value} ${unit}`;
  };

  const getChangeText = () => {
    const change = currentValue - startValue;
    const changePercent = (change / startValue) * 100;

    if (change === 0) return "No change";

    const changeText = change > 0 ? "+" : "";
    const percentText = changePercent > 0 ? "+" : "";

    return `${changeText}${formatValue(
      change
    )} (${percentText}${changePercent.toFixed(1)}%)`;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.primary + "20" },
          ]}
        >
          <Text style={styles.icon}>{icon}</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { color: colors.foreground }]}>
            {title}
          </Text>
          <Text style={[styles.changeText, { color: colors.mutedForeground }]}>
            {getChangeText()}
          </Text>
        </View>
        <View style={styles.statusContainer}>
          <Ionicons
            name={getProgressIcon() as any}
            size={20}
            color={getProgressColor()}
          />
        </View>
      </View>

      <View style={styles.valuesContainer}>
        <View style={styles.valueRow}>
          <Text style={[styles.valueLabel, { color: colors.mutedForeground }]}>
            Current:
          </Text>
          <Text style={[styles.currentValue, { color: colors.foreground }]}>
            {formatValue(currentValue)}
          </Text>
        </View>

        <View style={styles.valueRow}>
          <Text style={[styles.valueLabel, { color: colors.mutedForeground }]}>
            Target:
          </Text>
          <Text style={[styles.targetValue, { color: colors.primary }]}>
            {formatValue(targetValue)}
          </Text>
        </View>
      </View>

      {showProgress && (
        <View style={styles.progressContainer}>
          <View style={styles.progressHeader}>
            <Text
              style={[styles.progressLabel, { color: colors.mutedForeground }]}
            >
              Progress
            </Text>
            <Text
              style={[styles.progressPercent, { color: getProgressColor() }]}
            >
              {progress.toFixed(1)}%
            </Text>
          </View>

          <View
            style={[
              styles.progressBar,
              { backgroundColor: colors.muted + "30" },
            ]}
          >
            <View
              style={[
                styles.progressFill,
                {
                  backgroundColor: getProgressColor(),
                  width: `${Math.min(progress, 100)}%`,
                },
              ]}
            />
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  changeText: {
    fontSize: 12,
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  valuesContainer: {
    marginBottom: 16,
  },
  valueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  valueLabel: {
    fontSize: 14,
  },
  currentValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  targetValue: {
    fontSize: 16,
    fontWeight: "600",
  },
  progressContainer: {
    gap: 8,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressLabel: {
    fontSize: 12,
    fontWeight: "500",
  },
  progressPercent: {
    fontSize: 12,
    fontWeight: "600",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
});
