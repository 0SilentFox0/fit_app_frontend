import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';

interface ProgressHeaderProps {
  title: string;
  subtitle: string;
}

export const ProgressHeader: React.FC<ProgressHeaderProps> = ({
  title,
  subtitle,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.foreground }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
        {subtitle}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
});
