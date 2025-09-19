import React from "react";
import { View, Text, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../../../ThemeProvider";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "secondary"
    | "destructive"
    | "outline"
    | "success"
    | "warning";
  size?: "sm" | "md" | "lg";
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  style,
  textStyle,
}) => {
  const { colors, borderRadius, spacing } = useTheme();

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: colors.secondary,
          borderColor: colors.secondary,
        };
      case "destructive":
        return {
          backgroundColor: colors.destructive,
          borderColor: colors.destructive,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderColor: colors.border,
        };
      case "success":
        return {
          backgroundColor: colors.success,
          borderColor: colors.success,
        };
      case "warning":
        return {
          backgroundColor: colors.warning,
          borderColor: colors.warning,
        };
      default:
        return {
          backgroundColor: colors.primary,
          borderColor: colors.primary,
        };
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case "secondary":
        return colors.secondaryForeground;
      case "destructive":
        return colors.primaryForeground;
      case "outline":
        return colors.foreground;
      case "success":
        return colors.primaryForeground;
      case "warning":
        return colors.primaryForeground;
      default:
        return colors.primaryForeground;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          paddingHorizontal: spacing.xs,
          paddingVertical: 2,
          fontSize: 12,
        };
      case "lg":
        return {
          paddingHorizontal: spacing.md,
          paddingVertical: spacing.xs,
          fontSize: 16,
        };
      default:
        return {
          paddingHorizontal: spacing.sm,
          paddingVertical: 4,
          fontSize: 14,
        };
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  const badgeStyle = [
    styles.badge,
    {
      borderRadius: borderRadius / 2,
      borderWidth: 1,
      ...variantStyles,
      ...sizeStyles,
    },
    style,
  ];

  const textStyleCombined = [
    {
      color: getTextColor(),
      fontWeight: "500" as TextStyle["fontWeight"],
      fontSize: sizeStyles.fontSize,
    },
    textStyle,
  ];

  return (
    <View style={badgeStyle}>
      <Text style={textStyleCombined}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
  },
});
