import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useAuth } from "../hooks/useAuth";

// Import screens
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import EmailVerificationScreen from "../screens/EmailVerificationScreen";
import LoadingScreen from "../components/LoadingScreen";

// Import navigators
import MainTabNavigator from "./MainTabNavigator";

export type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  EmailVerification: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { user, loading, pendingVerificationEmail } = useAuth();

  console.log("🟡 APP NAVIGATOR: Render triggered");
  console.log(
    "🟡 APP NAVIGATOR: User:",
    user ? `${user.email} (verified: ${user.emailVerified})` : "null"
  );
  console.log("🟡 APP NAVIGATOR: Loading:", loading);
  console.log(
    "🟡 APP NAVIGATOR: Pending verification:",
    pendingVerificationEmail
  );

  if (loading) {
    console.log("🟡 APP NAVIGATOR: Showing loading screen");
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {!user
          ? // Auth screens
            (() => {
              console.log("🟡 APP NAVIGATOR: Rendering auth screens (no user)");
              return (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="SignUp" component={SignUpScreen} />
                  <Stack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                  />
                </>
              );
            })()
          : pendingVerificationEmail
          ? // Email verification screen
            (() => {
              console.log(
                "🟡 APP NAVIGATOR: Rendering email verification screen"
              );
              return (
                <Stack.Screen
                  name="EmailVerification"
                  component={EmailVerificationScreen}
                />
              );
            })()
          : // Main app with tab navigation
            (() => {
              console.log(
                "🟡 APP NAVIGATOR: Rendering main app (user authenticated)"
              );
              return <Stack.Screen name="Main" component={MainTabNavigator} />;
            })()}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
