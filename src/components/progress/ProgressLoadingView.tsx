import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from '../../ThemeProvider';

interface ProgressLoadingViewProps {
  onShowDebugInfo: () => void;
}

export const ProgressLoadingView: React.FC<ProgressLoadingViewProps> = ({
  onShowDebugInfo,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.primary} />
      <Text style={[styles.loadingText, { color: colors.foreground }]}>
        Loading progress data...
      </Text>
      <TouchableOpacity onPress={onShowDebugInfo} style={styles.debugButton}>
        <Text style={[styles.debugText, { color: colors.primary }]}>
          Show Debug Info
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    marginTop: 16,
  },
  debugButton: {
    padding: 8,
    marginTop: 8,
  },
  debugText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
