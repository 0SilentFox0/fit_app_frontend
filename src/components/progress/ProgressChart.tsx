import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { RadarChart } from 'react-native-gifted-charts';
import { useTheme } from '../../ThemeProvider';

const { width } = Dimensions.get('window');

interface ProgressChartProps {
  userStats: number[];
  averageStats: number[];
  labels: string[];
}

export const ProgressChart: React.FC<ProgressChartProps> = ({
  userStats,
  averageStats,
  labels,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.chartContainer}>
      <View style={styles.chartOverlay}>
        <RadarChart
          data={averageStats}
          labels={labels}
          chartSize={Math.min(width - 80, 280)}
          maxValue={100}
          noOfSections={5}
          polygonConfig={{
            stroke: colors.muted,
            fill: colors.muted + '99',
          }}
          gridConfig={{
            stroke: colors.mutedForeground,
          }}
          labelConfig={{
            fontSize: 12,
            stroke: colors.mutedForeground,
          }}
        />
        <RadarChart
          data={userStats}
          labels={labels}
          chartSize={Math.min(width - 80, 280)}
          maxValue={100}
          noOfSections={5}
          polygonConfig={{
            stroke: colors.primary,
            fill: colors.primary + 'CC',
          }}
          gridConfig={{
            stroke: 'transparent',
          }}
          labelConfig={{
            fontSize: 12,
            stroke: 'transparent',
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  chartOverlay: {
    position: 'relative',
  },
});
