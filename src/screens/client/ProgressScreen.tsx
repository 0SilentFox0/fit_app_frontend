import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { useTheme } from "../../ThemeProvider";
import { apiService, ProgressData } from "../../services/api";
import { Card } from "../../components/ui";
import {
  ProgressLoadingView,
  ProgressErrorView,
  ProgressHeader,
  ProgressChart,
  ProgressLegend,
  ProgressStats,
} from "../../components/progress";

export const ProgressScreen: React.FC = () => {
  const { colors } = useTheme();
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

  useEffect(() => {
    fetchProgressData();
  }, []);

  const fetchProgressData = async () => {
    try {
      setLoading(true);
      setError(null);
      setDebugInfo("Starting API request...");

      // Try analytics endpoint first, fallback to client progress
      let response;
      let endpoint = "";
      try {
        endpoint = "/analytics/progress";
        setDebugInfo(`Trying ${endpoint}...`);
        response = await apiService.getProgress();
        setDebugInfo(`✅ ${endpoint} successful`);
      } catch (analyticsError) {
        setDebugInfo(`❌ ${endpoint} failed, trying client progress...`);
        endpoint = "/clients/progress";
        response = await apiService.getClientProgress();
        setDebugInfo(`✅ ${endpoint} successful`);
      }

      if (response.success && response.data) {
        setProgressData(response.data);
        setDebugInfo(`✅ Data loaded: ${response.data.labels.length} metrics`);
      } else {
        setDebugInfo("⚠️ API returned empty data, using fallback");
        // Fallback to mock data if API returns empty or error
        setProgressData({
          userStats: [80, 65, 90, 70, 60, 75],
          averageStats: [60, 55, 70, 60, 50, 65],
          labels: [
            "Strength",
            "Cardio",
            "Flexibility",
            "Balance",
            "Endurance",
            "Speed",
          ],
          userPercentile: 56,
          trending: 5.2,
          timeRange: "January - June 2024",
        });
      }
    } catch (err) {
      console.error("Failed to fetch progress data:", err);
      setError("Failed to load progress data");
      setDebugInfo(
        `❌ Error: ${err instanceof Error ? err.message : "Unknown error"}`
      );
      // Set fallback data
      setProgressData({
        userStats: [80, 65, 90, 70, 60, 75],
        averageStats: [60, 55, 70, 60, 50, 65],
        labels: [
          "Strength",
          "Cardio",
          "Flexibility",
          "Balance",
          "Endurance",
          "Speed",
        ],
        userPercentile: 56,
        trending: 5.2,
        timeRange: "January - June 2024",
      });
    } finally {
      setLoading(false);
    }
  };

  const showDebugInfo = () => {
    Alert.alert(
      "Debug Information",
      `Status: ${
        loading ? "Loading" : error ? "Error" : "Success"
      }\n\n${debugInfo}`,
      [{ text: "OK" }]
    );
  };

  if (loading) {
    return <ProgressLoadingView onShowDebugInfo={showDebugInfo} />;
  }

  if (error && !progressData) {
    return (
      <ProgressErrorView
        error={error}
        onRetry={fetchProgressData}
        onShowDebugInfo={showDebugInfo}
      />
    );
  }

  if (!progressData) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            justifyContent: "center",
            alignItems: "center",
          },
        ]}
      >
        <Text style={[styles.errorText, { color: colors.foreground }]}>
          No progress data available
        </Text>
        <TouchableOpacity
          onPress={fetchProgressData}
          style={styles.retryButton}
        >
          <Text style={[styles.retryText, { color: colors.primary }]}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Debug button */}
      <TouchableOpacity onPress={showDebugInfo} style={styles.debugButton}>
        <Text style={[styles.debugText, { color: colors.primary }]}>Debug</Text>
      </TouchableOpacity>

      <Card style={styles.card}>
        <ProgressHeader
          title="Progress Overview"
          subtitle="Your progress vs. average for the last 6 months"
        />

        <ProgressChart
          userStats={progressData.userStats}
          averageStats={progressData.averageStats}
          labels={progressData.labels}
        />

        <ProgressLegend />

        <ProgressStats
          trending={progressData.trending}
          userPercentile={progressData.userPercentile}
        />

        {/* Time Range */}
        <Text style={[styles.timeRange, { color: colors.mutedForeground }]}>
          {progressData.timeRange}
        </Text>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 20,
    marginTop: 60,
  },
  timeRange: {
    fontSize: 14,
    textAlign: "center",
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    marginTop: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: "500",
  },
  debugButton: {
    padding: 8,
    marginTop: 8,
  },
  debugText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
