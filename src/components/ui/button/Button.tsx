import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { useTheme } from "../../../ThemeProvider";

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
  textStyle,
}) => {
  const { colors } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      opacity: disabled ? 0.6 : 1,
    };

    const sizeStyles: Record<string, ViewStyle> = {
      small: { paddingHorizontal: 16, paddingVertical: 8 },
      medium: { paddingHorizontal: 20, paddingVertical: 12 },
      large: { paddingHorizontal: 24, paddingVertical: 16 },
    };

    const variantStyles: Record<string, ViewStyle> = {
      primary: {
        backgroundColor: colors.primary,
      },
      secondary: {
        backgroundColor: colors.secondary,
      },
      outline: {
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: colors.primary,
      },
      ghost: {
        backgroundColor: "transparent",
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...style,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseTextStyle: TextStyle = {
      fontWeight: "600",
    };

    const sizeTextStyles: Record<string, TextStyle> = {
      small: { fontSize: 14 },
      medium: { fontSize: 16 },
      large: { fontSize: 18 },
    };

    const variantTextStyles: Record<string, TextStyle> = {
      primary: { color: colors.primaryForeground },
      secondary: { color: colors.secondaryForeground },
      outline: { color: colors.primary },
      ghost: { color: colors.primary },
    };

    return {
      ...baseTextStyle,
      ...sizeTextStyles[size],
      ...variantTextStyles[variant],
      ...textStyle,
    };
  };

  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={getTextStyle()}>{title}</Text>
    </TouchableOpacity>
  );
};
