import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";
import { Card } from "../ui/card";

const { width } = Dimensions.get("window");

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: { value: number; isPositive: boolean };
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
}) => {
  const { colors } = useTheme();

  return (
    <Card style={styles.statCard}>
      <View style={styles.statHeader}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: colors.primary + "33" },
          ]}
        >
          <Ionicons name={icon as any} size={20} color={colors.primary} />
        </View>
        {trend && (
          <View style={styles.trendContainer}>
            <Ionicons
              name={trend.isPositive ? "trending-up" : "trending-down"}
              size={16}
              color={trend.isPositive ? colors.success : colors.destructive}
            />
            <Text
              style={[
                styles.trendText,
                {
                  color: trend.isPositive ? colors.success : colors.destructive,
                },
              ]}
            >
              {trend.value}%
            </Text>
          </View>
        )}
      </View>
      <Text style={[styles.statValue, { color: colors.foreground }]}>
        {value}
      </Text>
      <Text style={[styles.statTitle, { color: colors.mutedForeground }]}>
        {title}
      </Text>
      {subtitle && (
        <Text style={[styles.statSubtitle, { color: colors.mutedForeground }]}>
          {subtitle}
        </Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  statCard: {
    width: (width - 60) / 2,
    marginBottom: 12,
    marginHorizontal: 6,
  },
  statHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  trendContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  trendText: {
    fontSize: 12,
    marginLeft: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    fontWeight: "500",
  },
  statSubtitle: {
    fontSize: 12,
    marginTop: 2,
  },
});
