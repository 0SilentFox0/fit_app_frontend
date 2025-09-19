import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { RadarChart } from "react-native-gifted-charts";
import { useTheme } from "../../ThemeProvider";

interface RadarData {
  value: number;
  label: string;
}

interface HomeRadarChartProps {
  data: RadarData[];
}

export const HomeRadarChart: React.FC<HomeRadarChartProps> = ({ data }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.chartContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Fitness Radar
      </Text>
      <View style={styles.radarContainer}>
        <RadarChart
          data={data.map((item) => item.value)}
          labels={data.map((item) => item.label)}
          chartSize={200}
          maxValue={100}
          noOfSections={5}
          polygonConfig={{
            stroke: colors.primary,
            fill: colors.primary + "33",
          }}
          gridConfig={{
            stroke: colors.mutedForeground,
          }}
          labelConfig={{
            fontSize: 14,
            stroke: colors.mutedForeground,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
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
  radarContainer: {
    alignItems: "center",
  },
});
