import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useTheme } from "../../ThemeProvider";

const { width } = Dimensions.get("window");

interface Badge {
  id: number;
  name: string;
  title: string;
  unlocked: boolean;
}

interface HomeBadgesProps {
  badges: Badge[];
}

export const HomeBadges: React.FC<HomeBadgesProps> = ({ badges }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.badgesContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Achievements
      </Text>
      <View style={styles.badgesGrid}>
        {badges.map((badge) => (
          <TouchableOpacity
            key={badge.id}
            style={[
              styles.badgeItem,
              {
                backgroundColor: badge.unlocked
                  ? colors.primary + "33"
                  : colors.muted,
                borderColor: badge.unlocked ? colors.primary : colors.border,
              },
            ]}
          >
            <Text style={styles.badgeIcon}>{badge.name}</Text>
            <Text
              style={[
                styles.badgeTitle,
                {
                  color: badge.unlocked
                    ? colors.foreground
                    : colors.mutedForeground,
                },
              ]}
            >
              {badge.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  badgesContainer: {
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
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  badgeItem: {
    width: (width - 80) / 3,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  badgeIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  badgeTitle: {
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
  },
});
