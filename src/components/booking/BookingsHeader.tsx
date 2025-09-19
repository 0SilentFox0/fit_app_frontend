import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../ThemeProvider';

interface BookingsHeaderProps {
  title: string;
  subtitle: string;
}

export const BookingsHeader: React.FC<BookingsHeaderProps> = ({ title, subtitle }) => {
  const { colors } = useTheme();

  return (
    <LinearGradient
      colors={[colors.primary, colors.chart1]}
      style={styles.headerGradient}
    >
      <Text style={[styles.headerTitle, { color: colors.primaryForeground }]}>
        {title}
      </Text>
      <Text style={[styles.headerSubtitle, { color: colors.primaryForeground }]}>
        {subtitle}
      </Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
});
