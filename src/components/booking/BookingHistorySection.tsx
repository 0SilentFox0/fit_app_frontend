import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';
import { Booking } from '../../types';

interface BookingHistorySectionProps {
  bookings: Booking[];
}

export const BookingHistorySection: React.FC<BookingHistorySectionProps> = ({
  bookings,
}) => {
  const { colors } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (timeString: string) => {
    return timeString;
  };

  const completedBookings = bookings.filter(b => b.status === 'completed');

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Training History
      </Text>
      {completedBookings.map((booking) => (
        <View key={booking.id} style={[styles.bookingCard, { backgroundColor: colors.card }]}>
          <View style={styles.bookingHeader}>
            <Text style={[styles.bookingTrainer, { color: colors.foreground }]}>
              {booking.trainerName}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: colors.success + '33' }]}>
              <Text style={[styles.statusText, { color: colors.success }]}>
                Completed
              </Text>
            </View>
          </View>
          <Text style={[styles.bookingDetails, { color: colors.mutedForeground }]}>
            {formatDate(booking.date)} at {formatTime(booking.time)} • {booking.duration}min
          </Text>
          <Text style={[styles.bookingType, { color: colors.foreground }]}>
            {booking.sessionType}
          </Text>
          
          {/* Exercise Progress */}
          {booking.exercises && (
            <View style={styles.exercisesContainer}>
              <Text style={[styles.exercisesTitle, { color: colors.foreground }]}>
                Exercises Completed
              </Text>
              {booking.exercises.map((exercise, index) => (
                <View key={index} style={styles.exerciseItem}>
                  <Text style={[styles.exerciseName, { color: colors.foreground }]}>
                    {exercise.name}
                  </Text>
                  <Text style={[styles.exerciseDetails, { color: colors.mutedForeground }]}>
                    {exercise.sets} sets × {exercise.reps} reps
                    {exercise.weight > 0 && ` @ ${exercise.weight}lbs`}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  bookingCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  bookingTrainer: {
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  bookingDetails: {
    fontSize: 14,
    marginBottom: 4,
  },
  bookingType: {
    fontSize: 14,
    fontWeight: '500',
  },
  exercisesContainer: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  exercisesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  exerciseItem: {
    marginBottom: 6,
  },
  exerciseName: {
    fontSize: 12,
    fontWeight: '500',
  },
  exerciseDetails: {
    fontSize: 11,
  },
});
