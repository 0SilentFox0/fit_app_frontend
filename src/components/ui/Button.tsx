import React from "react";
import {
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from "react-native";
import { colors, spacing } from "../../theme";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "danger" | "pill";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  disabled?: boolean;
  icon?: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "medium",
  loading = false,
  disabled = false,
  icon,
  style,
  textStyle,
}) => {
  const getButtonStyle = () => {
    const baseStyle = [styles.button, styles[variant], styles[size]];
    if (disabled || loading) {
      baseStyle.push(styles.disabled);
    }
    return baseStyle;
  };

  const getTextStyle = () => {
    const baseTextStyle = [
      styles.text,
      styles[`${variant}Text`],
      styles[`${size}Text`],
    ];
    if (disabled || loading) {
      baseTextStyle.push(styles.disabledText);
    }
    return baseTextStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={colors.text} size="small" />
      ) : (
        <>
          {icon && <Text style={styles.icon}>{icon}</Text>}
          <Text style={[getTextStyle(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: spacing.buttonRadius,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },

  // Variants
  primary: {
    backgroundColor: colors.buttonPrimary,
    boxShadow: "0 4px 12px rgba(255, 59, 48, 0.3)",
  },
  secondary: {
    backgroundColor: colors.buttonSecondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  danger: {
    backgroundColor: colors.buttonDanger,
    boxShadow: "0 4px 12px rgba(255, 59, 48, 0.3)",
  },
  pill: {
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },

  // Sizes
  small: {
    minHeight: spacing.buttonHeightSmall,
    paddingVertical: spacing.sm,
  },
  medium: {
    minHeight: spacing.buttonHeight,
  },
  large: {
    minHeight: spacing.buttonHeightLarge,
    paddingVertical: spacing.lg,
  },

  // States
  disabled: {
    opacity: 0.6,
  },

  // Text styles
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  primaryText: {
    color: colors.text,
  },
  secondaryText: {
    color: colors.text,
  },
  dangerText: {
    color: colors.text,
  },
  pillText: {
    color: colors.text,
    fontSize: 14,
  },

  // Text sizes
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },

  disabledText: {
    opacity: 0.7,
  },

  // Icon
  icon: {
    fontSize: 16,
    marginRight: spacing.sm,
  },
});

export default Button;
