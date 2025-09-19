import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../../ThemeProvider";

interface ProgressProps {
  value: number; // 0-100
  max?: number;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "success" | "warning" | "destructive";
  style?: ViewStyle;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  size = "md",
  variant = "default",
  style,
}) => {
  const { colors, borderRadius } = useTheme();

  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const getVariantColor = () => {
    switch (variant) {
      case "success":
        return colors.success;
      case "warning":
        return colors.warning;
      case "destructive":
        return colors.destructive;
      default:
        return colors.primary;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return { height: 4 };
      case "lg":
        return { height: 12 };
      default:
        return { height: 8 };
    }
  };

  const progressStyle = [
    styles.progress,
    {
      backgroundColor: colors.muted,
      borderRadius: borderRadius / 2,
      ...getSizeStyles(),
    },
    style,
  ];

  const fillStyle = [
    styles.fill,
    {
      backgroundColor: getVariantColor(),
      width: `${percentage}%` as any,
      borderRadius: borderRadius / 2,
    },
  ];

  return (
    <View style={progressStyle}>
      <View style={fillStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    overflow: "hidden",
  },
  fill: {
    height: "100%",
  },
});
