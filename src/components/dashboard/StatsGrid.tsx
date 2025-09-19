import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatCard } from './StatCard';

type Period = 'day' | 'week' | 'month';

interface DashboardData {
  totalTrainings: Record<Period, number>;
  revenue: Record<Period, number>;
  availableSlots: Record<Period, number>;
  clients: number;
}

interface StatsGridProps {
  selectedPeriod: Period;
  dashboardData: DashboardData;
}

export const StatsGrid: React.FC<StatsGridProps> = ({
  selectedPeriod,
  dashboardData,
}) => {
  return (
    <View style={styles.statsGrid}>
      <StatCard
        title="Trainings"
        value={dashboardData.totalTrainings[selectedPeriod]}
        subtitle={`${selectedPeriod}ly total`}
        icon="fitness"
        trend={{ value: 12, isPositive: true }}
      />
      <StatCard
        title="Revenue"
        value={`$${dashboardData.revenue[selectedPeriod]}`}
        subtitle={`${selectedPeriod}ly earnings`}
        icon="cash"
        trend={{ value: 8, isPositive: true }}
      />
      <StatCard
        title="Available Slots"
        value={dashboardData.availableSlots[selectedPeriod]}
        subtitle="Open time slots"
        icon="time"
      />
      <StatCard
        title="Active Clients"
        value={dashboardData.clients}
        subtitle="Total clients"
        icon="people"
        trend={{ value: 5, isPositive: true }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
});
