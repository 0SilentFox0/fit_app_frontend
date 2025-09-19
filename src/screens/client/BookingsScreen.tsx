import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useTheme } from "../../ThemeProvider";
import {
  BookingsHeader,
  TabNavigation,
  AvailableTrainersSection,
  UpcomingBookingsSection,
  BookingHistorySection,
  BookingModal,
  QuickBookButton,
} from "../../components/booking";
import { Trainer, TimeSlot, Booking } from "../../types";
import { mockTrainers, mockBookings } from "../../mocks";

export const BookingsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [selectedTab, setSelectedTab] = useState<"upcoming" | "history">(
    "upcoming"
  );
  const [selectedTrainer, setSelectedTrainer] = useState<Trainer | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<TimeSlot | null>(null);
  const [sessionType, setSessionType] = useState("strength");

  // Use imported mock data
  const trainers: Trainer[] = mockTrainers.map((trainer) => ({
    ...trainer,
    avatar: trainer.profilePicture ? "🖼️" : "👤",
    price: Math.floor(Math.random() * 50) + 50, // Random price between 50-100
    availableSlots: [
      {
        id: "1",
        date: "2024-01-15",
        time: "09:00",
        duration: 60,
        isAvailable: true,
        trainerId: trainer.id,
        startTime: "09:00",
        endTime: "10:00",
      },
      {
        id: "2",
        date: "2024-01-15",
        time: "10:30",
        duration: 60,
        isAvailable: true,
        trainerId: trainer.id,
        startTime: "10:30",
        endTime: "11:30",
      },
      {
        id: "3",
        date: "2024-01-16",
        time: "09:00",
        duration: 60,
        isAvailable: true,
        trainerId: trainer.id,
        startTime: "09:00",
        endTime: "10:00",
      },
    ],
  }));

  const bookings: Booking[] = mockBookings;

  const sessionTypes = [
    { id: "strength", name: "Strength Training", icon: "fitness" },
    { id: "cardio", name: "Cardio & HIIT", icon: "heart" },
    { id: "yoga", name: "Yoga & Flexibility", icon: "leaf" },
    { id: "pilates", name: "Pilates", icon: "body" },
    { id: "crossfit", name: "CrossFit", icon: "flash" },
  ];

  const tabs = [
    { id: "upcoming", label: "Upcoming" },
    { id: "history", label: "History" },
  ];

  const handleBookSession = () => {
    if (selectedSlot && selectedTrainer) {
      Alert.alert(
        "Confirm Booking",
        `Book ${sessionType} session with ${selectedTrainer.name} on ${selectedSlot.date} at ${selectedSlot.time}?`,
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Book",
            onPress: () => {
              setShowBookingModal(false);
              setSelectedSlot(null);
              setSelectedTrainer(null);
              Alert.alert("Success", "Session booked successfully!");
            },
          },
        ]
      );
    }
  };

  const handleTrainerSelect = (trainer: Trainer) => {
    setSelectedTrainer(trainer);
    setShowBookingModal(true);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleSessionTypeChange = (type: string) => {
    setSessionType(type);
  };

  const handleCloseModal = () => {
    setShowBookingModal(false);
    setSelectedSlot(null);
    setSelectedTrainer(null);
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <BookingsHeader
        title="Book Sessions"
        subtitle="Schedule your training sessions"
      />

      <TabNavigation
        selectedTab={selectedTab}
        onTabPress={setSelectedTab}
        tabs={tabs}
      />

      <ScrollView style={styles.content}>
        {selectedTab === "upcoming" ? (
          <>
            <AvailableTrainersSection
              trainers={trainers}
              onTrainerSelect={handleTrainerSelect}
            />
            <UpcomingBookingsSection bookings={bookings} />
          </>
        ) : (
          <BookingHistorySection bookings={bookings} />
        )}
      </ScrollView>

      <BookingModal
        visible={showBookingModal}
        onClose={handleCloseModal}
        selectedTrainer={selectedTrainer}
        selectedSlot={selectedSlot}
        sessionType={sessionType}
        onSessionTypeChange={handleSessionTypeChange}
        onSlotSelect={handleSlotSelect}
        onBookSession={handleBookSession}
        sessionTypes={sessionTypes}
      />

      <QuickBookButton onPress={() => setShowBookingModal(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
});
