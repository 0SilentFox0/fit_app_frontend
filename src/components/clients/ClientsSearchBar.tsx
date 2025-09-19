import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeProvider';

interface ClientsSearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
}

export const ClientsSearchBar: React.FC<ClientsSearchBarProps> = ({
  searchQuery,
  onSearchChange,
  onClearSearch,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.searchContainer, { backgroundColor: colors.card }]}>
      <Ionicons name="search" size={20} color={colors.mutedForeground} />
      <TextInput
        style={[styles.searchInput, { color: colors.foreground }]}
        placeholder="Search clients..."
        placeholderTextColor={colors.placeholder}
        value={searchQuery}
        onChangeText={onSearchChange}
      />
      {searchQuery ? (
        <TouchableOpacity onPress={onClearSearch}>
          <Ionicons
            name="close-circle"
            size={20}
            color={colors.mutedForeground}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 20,
    padding: 16,
    borderRadius: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
});
