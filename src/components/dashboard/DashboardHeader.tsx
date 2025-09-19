import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeProvider';

interface DashboardHeaderProps {
  greeting: string;
  name: string;
  onNotificationPress: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  greeting,
  name,
  onNotificationPress,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <View>
        <Text style={[styles.greeting, { color: colors.mutedForeground }]}>{greeting}</Text>
        <Text style={[styles.name, { color: colors.foreground }]}>{name}</Text>
      </View>
      <TouchableOpacity 
        style={[styles.notificationButton, { backgroundColor: colors.card }]}
        onPress={onNotificationPress}
      >
        <Ionicons name="notifications-outline" size={24} color={colors.foreground} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    fontSize: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
