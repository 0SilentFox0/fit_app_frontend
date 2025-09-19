import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeProvider";
import { TrainerCard } from "../components/screens";
import {
  mockTrainers,
  getTrainersBySpecialty,
  getTrainersByRating,
  getOnlineTrainers,
} from "../mocks";
import { Trainer } from "../types";

export const TrainersScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [minRating, setMinRating] = useState<number>(0);
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const specialties = useMemo(() => {
    const allSpecialties = mockTrainers.map((trainer) => trainer.specialty);
    return ["all", ...Array.from(new Set(allSpecialties))];
  }, []);

  const filteredTrainers = useMemo(() => {
    let trainers = mockTrainers;

    // Filter by specialty
    if (selectedSpecialty !== "all") {
      trainers = getTrainersBySpecialty(selectedSpecialty);
    }

    // Filter by rating
    if (minRating > 0) {
      trainers = getTrainersByRating(minRating);
    }

    // Filter by online status
    if (showOnlineOnly) {
      trainers = getOnlineTrainers();
    }

    // Filter by search query
    if (searchQuery) {
      trainers = trainers.filter(
        (trainer) =>
          trainer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          trainer.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return trainers;
  }, [searchQuery, selectedSpecialty, minRating, showOnlineOnly]);

  const handleTrainerPress = (trainer: Trainer) => {
    Alert.alert("Trainer Details", `Viewing details for ${trainer.name}`);
  };

  const handleBookPress = (trainer: Trainer) => {
    Alert.alert("Book Session", `Book a session with ${trainer.name}`);
  };

  const getRatingButtonStyle = (rating: number) => {
    return {
      ...styles.ratingButton,
      backgroundColor: minRating === rating ? colors.primary : "transparent",
      borderColor: colors.border,
    };
  };

  const getRatingButtonTextStyle = (rating: number) => {
    return {
      ...styles.ratingButtonText,
      color:
        minRating === rating ? colors.primaryForeground : colors.foreground,
    };
  };

  const getSpecialtyButtonStyle = (specialty: string) => {
    return {
      ...styles.specialtyButton,
      backgroundColor:
        selectedSpecialty === specialty ? colors.primary : "transparent",
      borderColor: colors.border,
    };
  };

  const getSpecialtyButtonTextStyle = (specialty: string) => {
    return {
      ...styles.specialtyButtonText,
      color:
        selectedSpecialty === specialty
          ? colors.primaryForeground
          : colors.foreground,
    };
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card }]}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Find Trainers
        </Text>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: colors.primary }]}
          onPress={() =>
            Alert.alert("Advanced Filters", "Advanced filtering options")
          }
        >
          <Ionicons name="options" size={20} color={colors.primaryForeground} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Search Bar */}
        <View
          style={[styles.searchContainer, { backgroundColor: colors.card }]}
        >
          <Ionicons name="search" size={20} color={colors.mutedForeground} />
          <TextInput
            style={[styles.searchInput, { color: colors.foreground }]}
            placeholder="Search trainers by name or specialty..."
            placeholderTextColor={colors.placeholder}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons
                name="close-circle"
                size={20}
                color={colors.mutedForeground}
              />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Rating Filter */}
        <View
          style={[styles.filterContainer, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.filterTitle, { color: colors.foreground }]}>
            Minimum Rating
          </Text>
          <View style={styles.ratingButtons}>
            {[0, 4.0, 4.5, 4.8].map((rating) => (
              <TouchableOpacity
                key={rating}
                style={getRatingButtonStyle(rating)}
                onPress={() => setMinRating(rating)}
              >
                <Text style={getRatingButtonTextStyle(rating)}>
                  {rating === 0 ? "Any" : `${rating}+`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Specialty Filter */}
        <View
          style={[styles.filterContainer, { backgroundColor: colors.card }]}
        >
          <Text style={[styles.filterTitle, { color: colors.foreground }]}>
            Specialty
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.specialtyButtons}>
              {specialties.map((specialty) => (
                <TouchableOpacity
                  key={specialty}
                  style={getSpecialtyButtonStyle(specialty)}
                  onPress={() => setSelectedSpecialty(specialty)}
                >
                  <Text style={getSpecialtyButtonTextStyle(specialty)}>
                    {specialty === "all" ? "All" : specialty}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Online Filter */}
        <View
          style={[styles.filterContainer, { backgroundColor: colors.card }]}
        >
          <TouchableOpacity
            style={[
              styles.onlineFilter,
              {
                backgroundColor: showOnlineOnly
                  ? colors.success
                  : "transparent",
                borderColor: colors.border,
              },
            ]}
            onPress={() => setShowOnlineOnly(!showOnlineOnly)}
          >
            <Ionicons
              name={showOnlineOnly ? "checkmark-circle" : "radio-button-off"}
              size={20}
              color={
                showOnlineOnly
                  ? colors.primaryForeground
                  : colors.mutedForeground
              }
            />
            <Text
              style={[
                styles.onlineFilterText,
                {
                  color: showOnlineOnly
                    ? colors.primaryForeground
                    : colors.foreground,
                },
              ]}
            >
              Show Online Trainers Only
            </Text>
          </TouchableOpacity>
        </View>

        {/* Results */}
        <View style={styles.resultsContainer}>
          <View style={styles.resultsHeader}>
            <Text style={[styles.resultsTitle, { color: colors.foreground }]}>
              {filteredTrainers.length} Trainer
              {filteredTrainers.length !== 1 ? "s" : ""} Found
            </Text>
            <TouchableOpacity
              style={styles.sortButton}
              onPress={() =>
                Alert.alert("Sort Options", "Sort by rating, experience, etc.")
              }
            >
              <Ionicons
                name="funnel"
                size={16}
                color={colors.mutedForeground}
              />
              <Text
                style={[
                  styles.sortButtonText,
                  { color: colors.mutedForeground },
                ]}
              >
                Sort
              </Text>
            </TouchableOpacity>
          </View>

          {filteredTrainers.length === 0 ? (
            <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
              <Ionicons
                name="fitness-outline"
                size={48}
                color={colors.mutedForeground}
              />
              <Text
                style={[styles.emptyText, { color: colors.mutedForeground }]}
              >
                No trainers found
              </Text>
              <Text
                style={[styles.emptySubtext, { color: colors.mutedForeground }]}
              >
                Try adjusting your filters or search criteria
              </Text>
            </View>
          ) : (
            filteredTrainers.map((trainer) => (
              <TrainerCard
                key={trainer.id}
                trainer={trainer}
                onPress={handleTrainerPress}
                showBookButton={true}
                onBookPress={handleBookPress}
              />
            ))
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 20,
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 16,
  },
  ratingButtons: {
    flexDirection: "row",
    gap: 12,
  },
  ratingButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
  },
  ratingButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  specialtyButtons: {
    flexDirection: "row",
    gap: 12,
    paddingRight: 20,
  },
  specialtyButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
  },
  specialtyButtonText: {
    fontSize: 14,
    fontWeight: "500",
  },
  onlineFilter: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    gap: 12,
  },
  onlineFilterText: {
    fontSize: 16,
    fontWeight: "500",
  },
  resultsContainer: {
    padding: 20,
  },
  resultsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    padding: 8,
  },
  sortButtonText: {
    fontSize: 14,
  },
  emptyState: {
    padding: 40,
    borderRadius: 16,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: "center",
  },
});
