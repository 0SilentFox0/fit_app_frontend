import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeProvider';

export const ClientsEmptyState: React.FC = () => {
  const { colors } = useTheme();

  return (
    <View style={[styles.emptyState, { backgroundColor: colors.card }]}>
      <Ionicons
        name="people-outline"
        size={48}
        color={colors.mutedForeground}
      />
      <Text style={[styles.emptyText, { color: colors.mutedForeground }]}>
        No clients found
      </Text>
      <Text style={[styles.emptySubtext, { color: colors.mutedForeground }]}>
        Try adjusting your search or filters
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    padding: 40,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    textAlign: 'center',
  },
});
