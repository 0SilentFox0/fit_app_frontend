import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../../ThemeProvider";

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: "default" | "outlined";
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = "default",
}) => {
  const { colors, borderRadius } = useTheme();

  const cardStyle = [
    styles.card,
    {
      backgroundColor: colors.card,
      borderColor: variant === "outlined" ? colors.border : "transparent",
      borderWidth: variant === "outlined" ? 1 : 0,
      borderRadius,
    },
    style,
  ];

  return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
});
