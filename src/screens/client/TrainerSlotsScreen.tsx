import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";
import { Card } from "../../components/ui";
import { Badge } from "../../components/ui";
import { Button } from "../../components/ui";

const { width } = Dimensions.get("window");

interface Trainer {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  avatar: string;
  hourlyRate: number;
}

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  bookedBy?: string;
}

interface TrainerSlot {
  trainer: Trainer;
  date: string;
  slots: TimeSlot[];
}

export const TrainerSlotsScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [selectedTrainer, setSelectedTrainer] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  // Mock data
  const trainers: Trainer[] = [
    {
      id: "1",
      name: "Mike Johnson",
      specialty: "Strength Training",
      rating: 4.8,
      experience: "5 years",
      avatar: "MJ",
      hourlyRate: 60,
    },
    {
      id: "2",
      name: "Sarah Wilson",
      specialty: "Cardio & HIIT",
      rating: 4.9,
      experience: "3 years",
      avatar: "SW",
      hourlyRate: 55,
    },
    {
      id: "3",
      name: "Alex Chen",
      specialty: "Yoga & Flexibility",
      rating: 4.7,
      experience: "7 years",
      avatar: "AC",
      hourlyRate: 50,
    },
  ];

  const trainerSlots: TrainerSlot[] = [
    {
      trainer: trainers[0],
      date: "2024-01-15",
      slots: [
        { id: "1", time: "09:00 AM", available: true },
        { id: "2", time: "10:00 AM", available: false, bookedBy: "John Doe" },
        { id: "3", time: "11:00 AM", available: true },
        { id: "4", time: "02:00 PM", available: true },
        { id: "5", time: "03:00 PM", available: false, bookedBy: "Jane Smith" },
        { id: "6", time: "04:00 PM", available: true },
      ],
    },
    {
      trainer: trainers[1],
      date: "2024-01-15",
      slots: [
        { id: "7", time: "08:00 AM", available: true },
        { id: "8", time: "09:00 AM", available: true },
        { id: "9", time: "10:00 AM", available: false, bookedBy: "Mike Chen" },
        { id: "10", time: "01:00 PM", available: true },
        { id: "11", time: "02:00 PM", available: true },
        { id: "12", time: "03:00 PM", available: true },
      ],
    },
    {
      trainer: trainers[2],
      date: "2024-01-15",
      slots: [
        { id: "13", time: "07:00 AM", available: true },
        {
          id: "14",
          time: "08:00 AM",
          available: false,
          bookedBy: "Emma Davis",
        },
        { id: "15", time: "09:00 AM", available: true },
        { id: "16", time: "10:00 AM", available: true },
        { id: "17", time: "11:00 AM", available: true },
        { id: "18", time: "12:00 PM", available: true },
      ],
    },
  ];

  const dates = [
    { date: "2024-01-15", day: "Mon", dayNum: "15" },
    { date: "2024-01-16", day: "Tue", dayNum: "16" },
    { date: "2024-01-17", day: "Wed", dayNum: "17" },
    { date: "2024-01-18", day: "Thu", dayNum: "18" },
    { date: "2024-01-19", day: "Fri", dayNum: "19" },
  ];

  const handleBookSlot = () => {
    if (selectedTrainer && selectedSlot) {
      // Handle booking logic here
      console.log(
        "Booking slot:",
        selectedSlot,
        "with trainer:",
        selectedTrainer
      );
    }
  };

  const TrainerCard = ({
    trainer,
    slots,
  }: {
    trainer: Trainer;
    slots: TimeSlot[];
  }) => (
    <Card style={styles.trainerCard}>
      <View style={styles.trainerHeader}>
        <View
          style={[styles.avatarContainer, { backgroundColor: colors.primary }]}
        >
          <Text
            style={[styles.avatarText, { color: colors.primaryForeground }]}
          >
            {trainer.avatar}
          </Text>
        </View>
        <View style={styles.trainerInfo}>
          <Text style={[styles.trainerName, { color: colors.foreground }]}>
            {trainer.name}
          </Text>
          <Text
            style={[styles.trainerSpecialty, { color: colors.mutedForeground }]}
          >
            {trainer.specialty}
          </Text>
          <View style={styles.trainerStats}>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={colors.warning} />
              <Text style={[styles.ratingText, { color: colors.foreground }]}>
                {trainer.rating}
              </Text>
            </View>
            <Text
              style={[styles.experienceText, { color: colors.mutedForeground }]}
            >
              {trainer.experience}
            </Text>
          </View>
        </View>
        <View style={styles.priceContainer}>
          <Text style={[styles.priceText, { color: colors.primary }]}>
            ${trainer.hourlyRate}/hr
          </Text>
        </View>
      </View>

      <View style={styles.slotsContainer}>
        <Text style={[styles.slotsTitle, { color: colors.foreground }]}>
          Available Slots
        </Text>
        <View style={styles.slotsGrid}>
          {slots.map((slot) => (
            <TouchableOpacity
              key={slot.id}
              style={[
                styles.slotButton,
                {
                  backgroundColor: slot.available ? colors.card : colors.muted,
                  borderColor:
                    selectedSlot === slot.id ? colors.primary : colors.border,
                },
              ]}
              onPress={() => slot.available && setSelectedSlot(slot.id)}
              disabled={!slot.available}
            >
              <Text
                style={[
                  styles.slotText,
                  {
                    color: slot.available
                      ? colors.foreground
                      : colors.mutedForeground,
                  },
                ]}
              >
                {slot.time}
              </Text>
              {!slot.available && (
                <Text
                  style={[styles.bookedText, { color: colors.mutedForeground }]}
                >
                  Booked
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Card>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.foreground }]}>
          Book Trainer
        </Text>
        <Text style={[styles.subtitle, { color: colors.mutedForeground }]}>
          Find and book available training sessions
        </Text>
      </View>

      {/* Date Selector */}
      <View style={styles.dateContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {dates.map((date) => (
            <TouchableOpacity
              key={date.date}
              style={[
                styles.dateButton,
                {
                  backgroundColor:
                    selectedDate === date.date ? colors.primary : colors.card,
                },
              ]}
              onPress={() => setSelectedDate(date.date)}
            >
              <Text
                style={[
                  styles.dateDay,
                  {
                    color:
                      selectedDate === date.date
                        ? colors.primaryForeground
                        : colors.foreground,
                  },
                ]}
              >
                {date.day}
              </Text>
              <Text
                style={[
                  styles.dateNumber,
                  {
                    color:
                      selectedDate === date.date
                        ? colors.primaryForeground
                        : colors.foreground,
                  },
                ]}
              >
                {date.dayNum}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Trainers List */}
      <View style={styles.trainersContainer}>
        {trainerSlots.map((trainerSlot) => (
          <TrainerCard
            key={trainerSlot.trainer.id}
            trainer={trainerSlot.trainer}
            slots={trainerSlot.slots}
          />
        ))}
      </View>

      {/* Booking Button */}
      {selectedSlot && (
        <View style={styles.bookingContainer}>
          <Button
            title="Book Session"
            onPress={handleBookSlot}
            variant="primary"
            size="large"
          />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  dateContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dateButton: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginRight: 12,
    borderRadius: 12,
    minWidth: 60,
  },
  dateDay: {
    fontSize: 12,
    fontWeight: "500",
    marginBottom: 2,
  },
  dateNumber: {
    fontSize: 18,
    fontWeight: "bold",
  },
  trainersContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  trainerCard: {
    marginBottom: 16,
  },
  trainerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  trainerInfo: {
    flex: 1,
  },
  trainerName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 2,
  },
  trainerSpecialty: {
    fontSize: 14,
    marginBottom: 8,
  },
  trainerStats: {
    flexDirection: "row",
    alignItems: "center",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "500",
    marginLeft: 4,
  },
  experienceText: {
    fontSize: 12,
  },
  priceContainer: {
    alignItems: "flex-end",
  },
  priceText: {
    fontSize: 16,
    fontWeight: "600",
  },
  slotsContainer: {
    marginTop: 8,
  },
  slotsTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 12,
  },
  slotsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  slotButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: "center",
    minWidth: 80,
  },
  slotText: {
    fontSize: 14,
    fontWeight: "500",
  },
  bookedText: {
    fontSize: 10,
    marginTop: 2,
  },
  bookingContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
