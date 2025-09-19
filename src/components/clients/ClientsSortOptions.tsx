import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';

interface ClientsSortOptionsProps {
  sortBy: 'name' | 'joinDate' | 'sessions';
  onSortChange: (sortBy: 'name' | 'joinDate' | 'sessions') => void;
}

export const ClientsSortOptions: React.FC<ClientsSortOptionsProps> = ({
  sortBy,
  onSortChange,
}) => {
  const { colors } = useTheme();

  const sortOptions = [
    { key: 'name', label: 'Name' },
    { key: 'joinDate', label: 'Join Date' },
    { key: 'sessions', label: 'Sessions' },
  ];

  return (
    <View style={[styles.sortContainer, { backgroundColor: colors.card }]}>
      <Text style={[styles.sortTitle, { color: colors.foreground }]}>
        Sort by
      </Text>
      <View style={styles.sortButtons}>
        {sortOptions.map((option) => (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.sortButton,
              {
                backgroundColor:
                  sortBy === option.key ? colors.primary : 'transparent',
                borderColor: colors.border,
              },
            ]}
            onPress={() => onSortChange(option.key as any)}
          >
            <Text
              style={[
                styles.sortButtonText,
                {
                  color:
                    sortBy === option.key
                      ? colors.primaryForeground
                      : colors.foreground,
                },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
  },
  sortTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  sortButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  sortButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
