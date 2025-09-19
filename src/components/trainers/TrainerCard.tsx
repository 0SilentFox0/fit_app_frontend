import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";
import { Trainer } from "../../types";

interface TrainerCardProps {
  trainer: Trainer;
  onPress?: (trainer: Trainer) => void;
  showBookButton?: boolean;
  onBookPress?: (trainer: Trainer) => void;
}

export const TrainerCard: React.FC<TrainerCardProps> = ({
  trainer,
  onPress,
  showBookButton = false,
  onBookPress,
}) => {
  const { colors } = useTheme();

  const handlePress = () => {
    onPress?.(trainer);
  };

  const handleBookPress = () => {
    onBookPress?.(trainer);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={16} color={colors.warning} />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons
          key="half"
          name="star-half"
          size={16}
          color={colors.warning}
        />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={16}
          color={colors.mutedForeground}
        />
      );
    }

    return stars;
  };

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: colors.card }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.header}>
        <Image
          source={{ uri: trainer.profilePicture }}
          style={styles.profilePicture}
          defaultSource={require("../../../assets/default-avatar.png")}
        />
        <View style={styles.info}>
          <Text style={[styles.name, { color: colors.foreground }]}>
            {trainer.name}
          </Text>
          <Text style={[styles.specialty, { color: colors.mutedForeground }]}>
            {trainer.specialty}
          </Text>
          <View style={styles.ratingContainer}>
            {renderStars(trainer.rating)}
            <Text
              style={[styles.ratingText, { color: colors.mutedForeground }]}
            >
              {trainer.rating.toFixed(1)}
            </Text>
          </View>
        </View>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: trainer.isOnline
                  ? colors.success
                  : colors.mutedForeground,
              },
            ]}
          />
          <Text style={[styles.statusText, { color: colors.mutedForeground }]}>
            {trainer.isOnline ? "Online" : "Offline"}
          </Text>
        </View>
      </View>

      {showBookButton && (
        <TouchableOpacity
          style={[styles.bookButton, { backgroundColor: colors.primary }]}
          onPress={handleBookPress}
        >
          <Ionicons
            name="calendar"
            size={16}
            color={colors.primaryForeground}
          />
          <Text
            style={[styles.bookButtonText, { color: colors.primaryForeground }]}
          >
            Book Session
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  profilePicture: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  specialty: {
    fontSize: 14,
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    marginLeft: 4,
  },
  statusContainer: {
    alignItems: "center",
    gap: 4,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 10,
    textTransform: "uppercase",
  },
  bookButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    gap: 8,
  },
  bookButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
});
