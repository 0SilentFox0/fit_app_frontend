import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';

export const ProgressLegend: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.legendRow}>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: colors.primary }]} />
        <Text style={[styles.legendLabel, { color: colors.foreground }]}>You</Text>
      </View>
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, { backgroundColor: colors.muted }]} />
        <Text style={[styles.legendLabel, { color: colors.foreground }]}>Average</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 14,
    fontWeight: '500',
  },
});
