import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';

type Period = 'day' | 'week' | 'month';

interface PeriodSelectorProps {
  selectedPeriod: Period;
  onPeriodChange: (period: Period) => void;
}

export const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  selectedPeriod,
  onPeriodChange,
}) => {
  const { colors } = useTheme();

  const periods: Period[] = ['day', 'week', 'month'];

  return (
    <View style={styles.periodSelector}>
      {periods.map((period) => (
        <TouchableOpacity
          key={period}
          style={[
            styles.periodButton,
            {
              backgroundColor: selectedPeriod === period ? colors.primary : colors.card,
            },
          ]}
          onPress={() => onPeriodChange(period)}
        >
          <Text
            style={[
              styles.periodText,
              {
                color: selectedPeriod === period ? colors.primaryForeground : colors.foreground,
              },
            ]}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  periodSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  periodButton: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
