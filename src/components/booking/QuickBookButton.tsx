import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeProvider';

interface QuickBookButtonProps {
  onPress: () => void;
}

export const QuickBookButton: React.FC<QuickBookButtonProps> = ({ onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.quickBookButton, { backgroundColor: colors.primary }]}
      onPress={onPress}
    >
      <Ionicons name="add" size={24} color={colors.primaryForeground} />
      <Text style={[styles.quickBookText, { color: colors.primaryForeground }]}>
        Quick Book
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  quickBookButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  quickBookText: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});
