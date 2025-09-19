import React, { createContext, useContext, useState } from 'react';

interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
  success: string;
  warning: string;
  error: string;
  tabInactive: string;
  // Legacy properties for compatibility
  text: string;
  textSecondary: string;
  inputBorder: string;
  inputBackground: string;
  placeholder: string;
}

interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: number;
  isDark: boolean;
  toggleTheme: () => void;
}

const lightColors: ThemeColors = {
  background: '#ffffff',
  foreground: '#1a1a1a',
  card: '#ffffff',
  cardForeground: '#1a1a1a',
  popover: '#ffffff',
  popoverForeground: '#1a1a1a',
  primary: '#ff6b35',
  primaryForeground: '#ffffff',
  secondary: '#f5f5f5',
  secondaryForeground: '#1a1a1a',
  muted: '#f5f5f5',
  mutedForeground: '#6b7280',
  accent: '#f5f5f5',
  accentForeground: '#1a1a1a',
  destructive: '#ff4444',
  border: '#e5e7eb',
  input: '#ffffff',
  ring: '#ff6b35',
  chart1: '#ff6b35',
  chart2: '#4caf50',
  chart3: '#2196f3',
  chart4: '#ff9800',
  chart5: '#9c27b0',
  sidebar: '#ffffff',
  sidebarForeground: '#1a1a1a',
  sidebarPrimary: '#ff6b35',
  sidebarPrimaryForeground: '#ffffff',
  sidebarAccent: '#f5f5f5',
  sidebarAccentForeground: '#1a1a1a',
  sidebarBorder: '#e5e7eb',
  sidebarRing: '#ff6b35',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#ff4444',
  tabInactive: '#6b7280',
  // Legacy properties
  text: '#1a1a1a',
  textSecondary: '#6b7280',
  inputBorder: '#e5e7eb',
  inputBackground: '#ffffff',
  placeholder: '#6b7280',
};

const darkColors: ThemeColors = {
  background: '#1a1a1a',
  foreground: '#ffffff',
  card: '#2a2a2a',
  cardForeground: '#ffffff',
  popover: '#2a2a2a',
  popoverForeground: '#ffffff',
  primary: '#ff6b35',
  primaryForeground: '#ffffff',
  secondary: '#4a4a4a',
  secondaryForeground: '#ffffff',
  muted: '#4a4a4a',
  mutedForeground: '#b3b3b3',
  accent: '#4a4a4a',
  accentForeground: '#ffffff',
  destructive: '#ff4444',
  border: '#404040',
  input: '#2a2a2a',
  ring: '#ff6b35',
  chart1: '#ff6b35',
  chart2: '#4caf50',
  chart3: '#2196f3',
  chart4: '#ff9800',
  chart5: '#9c27b0',
  sidebar: '#2a2a2a',
  sidebarForeground: '#ffffff',
  sidebarPrimary: '#ff6b35',
  sidebarPrimaryForeground: '#ffffff',
  sidebarAccent: '#4a4a4a',
  sidebarAccentForeground: '#ffffff',
  sidebarBorder: '#404040',
  sidebarRing: '#ff6b35',
  success: '#4caf50',
  warning: '#ff9800',
  error: '#ff4444',
  tabInactive: '#b3b3b3',
  // Legacy properties
  text: '#ffffff',
  textSecondary: '#b3b3b3',
  inputBorder: '#404040',
  inputBackground: '#2a2a2a',
  placeholder: '#b3b3b3',
};

const spacing: ThemeSpacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

const ThemeContext = createContext<Theme | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true); // Default to dark mode

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const theme: Theme = {
    colors: isDark ? darkColors : lightColors,
    spacing,
    borderRadius: 10.4, // 0.65rem * 16px
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 