import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";

interface HomeHeaderProps {
  userName: string;
  level: number;
  xp: number;
  xpMax: number;
  onLevelUp: () => void;
}

export const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName,
  level,
  xp,
  xpMax,
  onLevelUp,
}) => {
  const { colors } = useTheme();
  const progressPercentage = (xp / xpMax) * 100;

  return (
    <View style={[styles.headerGradient, { backgroundColor: colors.primary }]}>
      <View style={styles.headerContent}>
        <View style={styles.userInfo}>
          <Text style={[styles.userName, { color: colors.primaryForeground }]}>
            {userName}
          </Text>
          <Text
            style={[styles.userSubtitle, { color: colors.primaryForeground }]}
          >
            Level {level} · Fitness UI/UX
          </Text>
        </View>
        <TouchableOpacity style={styles.levelUpButton} onPress={onLevelUp}>
          <Ionicons name="trophy" size={20} color={colors.primaryForeground} />
        </TouchableOpacity>
      </View>

      {/* XP Progress */}
      <View style={styles.xpContainer}>
        <View style={styles.xpHeader}>
          <Text style={[styles.xpTitle, { color: colors.primaryForeground }]}>
            Experience Points
          </Text>
          <Text style={[styles.xpValue, { color: colors.primaryForeground }]}>
            {xp}/{xpMax} XP
          </Text>
        </View>
        <View
          style={[
            styles.progressBar,
            { backgroundColor: "rgba(255, 255, 255, 0.2)" },
          ]}
        >
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: colors.primaryForeground,
                width: `${progressPercentage}%`,
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerGradient: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 4,
  },
  userSubtitle: {
    fontSize: 14,
    opacity: 0.8,
  },
  levelUpButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  xpContainer: {
    marginTop: 10,
  },
  xpHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  xpTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  xpValue: {
    fontSize: 12,
    fontWeight: "600",
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
});
