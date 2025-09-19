import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';

interface TabNavigationProps {
  selectedTab: string;
  onTabPress: (tab: string) => void;
  tabs: Array<{ id: string; label: string }>;
}

export const TabNavigation: React.FC<TabNavigationProps> = ({ 
  selectedTab, 
  onTabPress, 
  tabs 
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.tabContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.id}
          style={[
            styles.tabButton,
            selectedTab === tab.id && { backgroundColor: colors.primary }
          ]}
          onPress={() => onTabPress(tab.id)}
        >
          <Text style={[
            styles.tabText,
            { color: selectedTab === tab.id ? colors.primaryForeground : colors.foreground }
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
