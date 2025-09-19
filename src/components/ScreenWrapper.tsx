import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
} from "react-native";

interface ScreenWrapperProps {
  children: React.ReactNode;
  backgroundColor?: string;
  paddingTop?: number;
  showStatusBar?: boolean;
  statusBarStyle?: "light" | "dark";
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  backgroundColor = "#121212",
  paddingTop = Platform.OS === "ios" ? 60 : 20,
  showStatusBar = true,
  statusBarStyle = "light",
}) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
      {showStatusBar && (
        <StatusBar
          barStyle={statusBarStyle === "light" ? "light-content" : "dark-content"}
          backgroundColor={backgroundColor}
        />
      )}
      <View style={[styles.content, { paddingTop }]}>
        {children}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default ScreenWrapper;
