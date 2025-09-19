export const typography = {
  // Headers
  h1: {
    fontSize: 32,
    fontWeight: "bold" as const,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    fontWeight: "bold" as const,
    lineHeight: 36,
  },
  h3: {
    fontSize: 24,
    fontWeight: "bold" as const,
    lineHeight: 32,
  },
  h4: {
    fontSize: 20,
    fontWeight: "bold" as const,
    lineHeight: 28,
  },
  h5: {
    fontSize: 18,
    fontWeight: "600" as const,
    lineHeight: 24,
  },
  h6: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 22,
  },
  
  // Body text
  body1: {
    fontSize: 16,
    fontWeight: "normal" as const,
    lineHeight: 24,
  },
  body2: {
    fontSize: 14,
    fontWeight: "normal" as const,
    lineHeight: 20,
  },
  
  // Caption
  caption: {
    fontSize: 12,
    fontWeight: "normal" as const,
    lineHeight: 16,
  },
  
  // Button text
  button: {
    fontSize: 16,
    fontWeight: "600" as const,
    lineHeight: 20,
  },
  buttonSmall: {
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 18,
  },
  
  // Label
  label: {
    fontSize: 14,
    fontWeight: "600" as const,
    lineHeight: 20,
  },
  
  // Subtitle
  subtitle: {
    fontSize: 16,
    fontWeight: "normal" as const,
    lineHeight: 24,
  },
} as const;

export type TypographyKey = keyof typeof typography;
