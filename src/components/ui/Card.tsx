import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { colors, spacing } from "../../theme";

interface CardProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
  padding?: "small" | "medium" | "large";
  style?: ViewStyle;
}

const Card: React.FC<CardProps> = ({
  children,
  variant = "default",
  padding = "medium",
  style,
}) => {
  const getCardStyle = () => {
    const baseStyle = [
      styles.card,
      styles[variant],
      styles[`padding${padding.charAt(0).toUpperCase() + padding.slice(1)}`],
    ];
    return baseStyle;
  };

  return <View style={[getCardStyle(), style]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: spacing.cardRadius,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },

  // Variants
  default: {
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
  },
  elevated: {
    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.15)",
  },
  outlined: {
    boxShadow: "none",
    borderWidth: 1,
    borderColor: colors.border,
  },

  // Padding variants
  paddingSmall: {
    padding: spacing.cardPaddingSmall,
  },
  paddingMedium: {
    padding: spacing.cardPadding,
  },
  paddingLarge: {
    padding: spacing.cardPaddingLarge,
  },
});

export default Card;
