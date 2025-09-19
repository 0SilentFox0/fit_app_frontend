import '@testing-library/jest-native/extend-expect';
import React from 'react';
import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../ThemeProvider';

// Mock Expo modules
jest.mock('expo-status-bar', () => ({
  StatusBar: 'StatusBar',
}));

jest.mock('expo-constants', () => ({
  Constants: {
    expoConfig: {
      extra: {
        apiUrl: 'http://localhost:3001',
      },
    },
  },
}));

jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

jest.mock('expo-notifications', () => ({
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  getExpoPushTokenAsync: jest.fn(),
  addNotificationReceivedListener: jest.fn(),
  addNotificationResponseReceivedListener: jest.fn(),
}));

// Mock React Navigation
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    setOptions: jest.fn(),
  }),
  useRoute: () => ({
    params: {},
  }),
}));

// Custom render function with ThemeProvider
const customRender = (ui: React.ReactElement, options = {}) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider>{children}</ThemeProvider>
  );
  return render(ui, { wrapper: Wrapper, ...options });
};

// Override the default render function
export * from '@testing-library/react-native';
export { customRender as render };

// Global test timeout
jest.setTimeout(10000); 