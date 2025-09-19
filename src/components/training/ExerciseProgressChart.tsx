import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { useTheme } from "../../ThemeProvider";
import { Card } from "../ui";

const { width } = Dimensions.get("window");

interface ExerciseProgressChartProps {
  title: string;
  data: Array<{
    value: number;
    label: string;
    dataPointText: string;
  }>;
  color: string;
}

export const ExerciseProgressChart: React.FC<ExerciseProgressChartProps> = ({
  title,
  data,
  color,
}) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.chartCard}>
      <Text style={[styles.chartTitle, { color: colors.foreground }]}>
        {title}
      </Text>
      <View style={styles.chartContainer}>
        <LineChart
          data={data}
          width={width - 80}
          height={200}
          color={color}
          thickness={3}
          dataPointsColor={color}
          dataPointsRadius={4}
          curved
          showVerticalLines
          verticalLinesColor={colors.border}
          yAxisColor={colors.border}
          xAxisColor={colors.border}
          yAxisTextStyle={{ color: colors.mutedForeground }}
          xAxisLabelTextStyle={{ color: colors.mutedForeground }}
        />
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  chartCard: {
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  chartContainer: {
    alignItems: "center",
    paddingVertical: 16,
  },
});
