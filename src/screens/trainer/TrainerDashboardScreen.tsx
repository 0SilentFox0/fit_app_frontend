import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeProvider';
import { Card, Badge, Progress } from '../../components/ui';
import {
  DashboardHeader,
  PeriodSelector,
  StatsGrid,
  PerformanceMetrics,
} from '../../components/dashboard';

const { width } = Dimensions.get('window');

export const TrainerDashboardScreen: React.FC = () => {
  const { colors, spacing } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month'>('week');

  // Mock data
  const dashboardData = {
    totalTrainings: {
      day: 8,
      week: 45,
      month: 180,
    },
    revenue: {
      day: 320,
      week: 1800,
      month: 7200,
    },
    availableSlots: {
      day: 12,
      week: 35,
      month: 120,
    },
    clients: 24,
    averageRating: 4.8,
    completionRate: 92,
  };

  const recentBookings = [
    { id: 1, client: 'Sarah Johnson', time: '09:00 AM', type: 'Strength Training', status: 'confirmed' },
    { id: 2, client: 'Mike Chen', time: '10:30 AM', type: 'Cardio', status: 'confirmed' },
    { id: 3, client: 'Emma Davis', time: '02:00 PM', type: 'Yoga', status: 'pending' },
    { id: 4, client: 'Alex Brown', time: '04:30 PM', type: 'HIIT', status: 'confirmed' },
  ];

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const handleNotificationPress = () => {
    // Handle notification press
  };

  const handlePeriodChange = (period: 'day' | 'week' | 'month') => {
    setSelectedPeriod(period);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <DashboardHeader
        greeting="Good morning,"
        name="John Trainer"
        onNotificationPress={handleNotificationPress}
      />

      <PeriodSelector
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
      />

      <StatsGrid
        selectedPeriod={selectedPeriod}
        dashboardData={dashboardData}
      />

      <PerformanceMetrics
        averageRating={dashboardData.averageRating}
        completionRate={dashboardData.completionRate}
        goalProgress={75}
      />

      {/* Recent Bookings */}
      <Card style={styles.bookingsCard}>
        <View style={styles.cardHeader}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Recent Bookings</Text>
          <TouchableOpacity>
            <Text style={[styles.viewAllText, { color: colors.primary }]}>View All</Text>
          </TouchableOpacity>
        </View>
        {recentBookings.map((booking) => (
          <View key={booking.id} style={styles.bookingItem}>
            <View style={styles.bookingInfo}>
              <Text style={[styles.clientName, { color: colors.foreground }]}>
                {booking.client}
              </Text>
              <Text style={[styles.bookingTime, { color: colors.mutedForeground }]}>
                {booking.time} • {booking.type}
              </Text>
            </View>
            <Badge variant={getStatusVariant(booking.status)} size="sm">
              {booking.status}
            </Badge>
          </View>
        ))}
      </Card>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
          <Ionicons name="calendar-outline" size={24} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.foreground }]}>Schedule</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
          <Ionicons name="people-outline" size={24} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.foreground }]}>Clients</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
          <Ionicons name="analytics-outline" size={24} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.foreground }]}>Analytics</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: colors.card }]}>
          <Ionicons name="chatbubble-outline" size={24} color={colors.primary} />
          <Text style={[styles.actionText, { color: colors.foreground }]}>Messages</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookingsCard: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    fontWeight: '500',
  },
  bookingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  bookingInfo: {
    flex: 1,
  },
  clientName: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  bookingTime: {
    fontSize: 14,
  },
  quickActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 16,
    marginHorizontal: 4,
    borderRadius: 12,
    alignItems: 'center',
  },
  actionText: {
    fontSize: 12,
    fontWeight: '500',
    marginTop: 8,
  },
}); 