import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';

interface ProgressErrorViewProps {
  error: string;
  onRetry: () => void;
  onShowDebugInfo: () => void;
}

export const ProgressErrorView: React.FC<ProgressErrorViewProps> = ({
  error,
  onRetry,
  onShowDebugInfo,
}) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.errorText, { color: colors.destructive }]}>{error}</Text>
      <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
        <Text style={[styles.retryText, { color: colors.primary }]}>Retry</Text>
      </TouchableOpacity>
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
  errorText: {
    fontSize: 16,
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    marginTop: 8,
  },
  retryText: {
    fontSize: 16,
    fontWeight: '500',
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
