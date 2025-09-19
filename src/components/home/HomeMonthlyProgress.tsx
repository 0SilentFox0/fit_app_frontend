import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../ThemeProvider";

interface MonthlyData {
  month: string;
  value: number;
}

interface HomeMonthlyProgressProps {
  data: MonthlyData[];
}

export const HomeMonthlyProgress: React.FC<HomeMonthlyProgressProps> = ({
  data,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.monthlyContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Monthly Progress
      </Text>
      <View style={styles.monthlyChart}>
        {data.map((month, idx) => (
          <View key={idx} style={styles.monthlyBar}>
            <View
              style={[
                styles.bar,
                {
                  backgroundColor: colors.chart1,
                  height: (month.value / 30) * 60,
                },
              ]}
            />
            <Text
              style={[styles.monthLabel, { color: colors.mutedForeground }]}
            >
              {idx + 1}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  monthlyContainer: {
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
  monthlyChart: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    height: 80,
  },
  monthlyBar: {
    alignItems: "center",
    flex: 1,
  },
  bar: {
    width: 20,
    borderRadius: 10,
    marginBottom: 8,
  },
  monthLabel: {
    fontSize: 10,
    fontWeight: "500",
    marginTop: 8,
  },
});
