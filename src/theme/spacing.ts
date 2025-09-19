export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,

  // Common spacing patterns
  padding: 20,
  paddingSmall: 12,
  paddingLarge: 32,

  margin: 20,
  marginSmall: 12,
  marginLarge: 32,

  // Border radius - Modern values from reference
  radius: 12,
  radiusSmall: 6,
  radiusLarge: 16,
  radiusXLarge: 20,
  // Card radius from reference
  cardRadius: 16,
  // Button radius from reference
  buttonRadius: 12,
  // Input radius from reference
  inputRadius: 12,

  // Icon sizes
  iconSmall: 16,
  iconMedium: 20,
  iconLarge: 24,
  iconXLarge: 32,

  // Button heights - Modern sizing
  buttonHeight: 52,
  buttonHeightSmall: 44,
  buttonHeightLarge: 60,

  // Input heights - Modern sizing
  inputHeight: 52,
  inputHeightSmall: 44,

  // Card padding
  cardPadding: 20,
  cardPaddingSmall: 16,
  cardPaddingLarge: 24,
} as const;

export type SpacingKey = keyof typeof spacing;
