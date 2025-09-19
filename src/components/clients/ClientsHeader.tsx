import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeProvider';

interface ClientsHeaderProps {
  onAddClient: () => void;
}

export const ClientsHeader: React.FC<ClientsHeaderProps> = ({ onAddClient }) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.header, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.foreground }]}>Clients</Text>
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={onAddClient}
      >
        <Ionicons name="add" size={20} color={colors.primaryForeground} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
