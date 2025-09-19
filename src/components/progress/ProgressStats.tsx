import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';
import { Card } from '../ui';

interface ProgressStatsProps {
  trending: number;
  userPercentile: number;
}

export const ProgressStats: React.FC<ProgressStatsProps> = ({
  trending,
  userPercentile,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.statsContainer}>
      <Card style={styles.statCard}>
        <Text style={[styles.statValue, { color: colors.success }]}>
          +{trending}%
        </Text>
        <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
          Trending this month
        </Text>
      </Card>
      
      <Card style={styles.statCard}>
        <Text style={[styles.statValue, { color: colors.primary }]}>
          {userPercentile}%
        </Text>
        <Text style={[styles.statLabel, { color: colors.mutedForeground }]}>
          Percentile rank
        </Text>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
});
