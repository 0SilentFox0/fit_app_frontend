import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';
import { Booking } from '../../types';

interface UpcomingBookingsSectionProps {
  bookings: Booking[];
}

export const UpcomingBookingsSection: React.FC<UpcomingBookingsSectionProps> = ({
  bookings,
}) => {
  const { colors } = useTheme();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return colors.primary;
      case 'completed': return colors.success;
      case 'cancelled': return colors.destructive;
      default: return colors.mutedForeground;
    }
  };

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

  const upcomingBookings = bookings.filter(b => b.status === 'upcoming');

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Upcoming Sessions
      </Text>
      {upcomingBookings.map((booking) => (
        <View key={booking.id} style={[styles.bookingCard, { backgroundColor: colors.card }]}>
          <View style={styles.bookingHeader}>
            <Text style={[styles.bookingTrainer, { color: colors.foreground }]}>
              {booking.trainerName}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: getStatusColor(booking.status) + '33' }]}>
              <Text style={[styles.statusText, { color: getStatusColor(booking.status) }]}>
                {booking.status}
              </Text>
            </View>
          </View>
          <Text style={[styles.bookingDetails, { color: colors.mutedForeground }]}>
            {formatDate(booking.date)} at {formatTime(booking.time)} • {booking.duration}min
          </Text>
          <Text style={[styles.bookingType, { color: colors.foreground }]}>
            {booking.sessionType}
          </Text>
          {booking.progress !== undefined && (
            <View style={styles.progressContainer}>
              <Text style={[styles.progressLabel, { color: colors.mutedForeground }]}>Session Progress</Text>
              <Text style={[styles.progressValue, { color: colors.primary }]}>{booking.progress}%</Text>
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
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  progressLabel: {
    fontSize: 12,
  },
  progressValue: {
    fontSize: 12,
    fontWeight: '600',
  },
});
