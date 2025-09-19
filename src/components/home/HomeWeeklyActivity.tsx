import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../ThemeProvider";

interface WeeklyData {
  day: string;
  value: number;
}

interface HomeWeeklyActivityProps {
  data: WeeklyData[];
}

export const HomeWeeklyActivity: React.FC<HomeWeeklyActivityProps> = ({
  data,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.activityContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Weekly Activity
      </Text>
      <View style={styles.weeklyChart}>
        {data.map((day, idx) => (
          <View key={idx} style={styles.weeklyBar}>
            <View
              style={[
                styles.bar,
                {
                  backgroundColor: colors.primary,
                  height: (day.value / 100) * 80,
                },
              ]}
            />
            <Text style={[styles.dayLabel, { color: colors.mutedForeground }]}>
              D{idx + 1}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  weeklyChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 100,
  },
  weeklyBar: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  dayLabel: {
    fontSize: 10,
    fontWeight: "500",
  },
});
