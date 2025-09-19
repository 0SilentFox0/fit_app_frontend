export const colors = {
  // Background colors - Dark theme from reference
  background: "#000000",
  surface: "#1C1C1E",
  surfaceVariant: "#2C2C2E",

  // Text colors
  text: "#FFFFFF",
  textSecondary: "#8E8E93",
  textDisabled: "#636366",

  // Primary colors - Red accent from reference
  primary: "#FF3B30",
  primaryVariant: "#D70015",
  primaryLight: "#FF6961",

  // Accent colors - Teal from reference
  accent: "#4ECDC4",
  accentVariant: "#38B2AC",

  // Progress colors from reference
  progressTeal: "#4ECDC4",
  progressPurple: "#8E44AD",
  progressYellow: "#F1C40F",

  // Status colors
  success: "#34C759",
  warning: "#FF9500",
  error: "#FF3B30",
  info: "#007AFF",

  // Border colors
  border: "#3A3A3C",
  borderLight: "#48484A",

  // Overlay colors
  overlay: "rgba(0, 0, 0, 0.5)",
  overlayLight: "rgba(0, 0, 0, 0.3)",

  // Card colors - Modern cards from reference
  card: "#1C1C1E",
  cardBorder: "#3A3A3C",

  // Button colors - Modern styling
  buttonPrimary: "#FF3B30",
  buttonSecondary: "#2C2C2E",
  buttonDanger: "#FF3B30",
  buttonSuccess: "#34C759",

  // Input colors - Modern input styling
  inputBackground: "#2C2C2E",
  inputBorder: "#3A3A3C",
  inputFocus: "#FF3B30",

  // Tab colors
  tabActive: "#FF3B30",
  tabInactive: "#8E8E93",
  tabBackground: "#1C1C1E",

  // Loading colors
  loading: "#FF3B30",

  // Placeholder colors
  placeholder: "#8E8E93",
} as const;

export type ColorKey = keyof typeof colors;
