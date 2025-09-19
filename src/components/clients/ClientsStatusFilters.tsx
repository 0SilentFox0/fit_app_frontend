import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';

interface ClientsStatusFiltersProps {
  filterStatus: 'all' | 'active' | 'pending';
  onFilterChange: (status: 'all' | 'active' | 'pending') => void;
  totalClients: number;
  activeClients: number;
  pendingClients: number;
}

export const ClientsStatusFilters: React.FC<ClientsStatusFiltersProps> = ({
  filterStatus,
  onFilterChange,
  totalClients,
  activeClients,
  pendingClients,
}) => {
  const { colors } = useTheme();

  const getFilterButtonStyle = (status: 'all' | 'active' | 'pending') => {
    return {
      ...styles.filterButton,
      backgroundColor: filterStatus === status ? colors.primary : 'transparent',
      borderColor: colors.border,
    };
  };

  const getFilterButtonTextStyle = (status: 'all' | 'active' | 'pending') => {
    return {
      ...styles.filterButtonText,
      color: filterStatus === status ? colors.primaryForeground : colors.foreground,
    };
  };

  return (
    <View style={[styles.filtersContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.filtersTitle, { color: colors.foreground }]}>
        Filter by Status
      </Text>
      <View style={styles.filterButtons}>
        <TouchableOpacity
          style={getFilterButtonStyle('all')}
          onPress={() => onFilterChange('all')}
        >
          <Text style={getFilterButtonTextStyle('all')}>
            All ({totalClients})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getFilterButtonStyle('active')}
          onPress={() => onFilterChange('active')}
        >
          <Text style={getFilterButtonTextStyle('active')}>
            Active ({activeClients})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={getFilterButtonStyle('pending')}
          onPress={() => onFilterChange('pending')}
        >
          <Text style={getFilterButtonTextStyle('pending')}>
            Pending ({pendingClients})
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  filterButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
