import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../ThemeProvider";

// Import screens
import { HomeScreen } from "../screens/client/HomeScreen";
import { WorkoutsScreen } from "../screens/client/WorkoutsScreen";
import { ChatScreen } from "../screens/ChatScreen";
import { BookingsScreen } from "../screens/client/BookingsScreen";
import { ProgressScreen } from "../screens/client/ProgressScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { TrainingHistoryScreen } from "../screens/client/TrainingHistoryScreen";
import { TrainerDashboardScreen } from "../screens/trainer/TrainerDashboardScreen";
import { TrainerCalendarScreen } from "../screens/trainer/TrainerCalendarScreen";
import { ClientsScreen } from "../screens/ClientsScreen";
import { TrainerSlotsScreen } from "../screens/client/TrainerSlotsScreen";

const Tab = createBottomTabNavigator();

type AccountType = "client" | "admin";

interface AppNavigatorProps {
  accountType: AccountType;
}

export const AppNavigator: React.FC<AppNavigatorProps> = ({ accountType }) => {
  const { colors } = useTheme();

  const getScreens = () => {
    if (accountType === "admin") {
      return [
        {
          name: "Dashboard",
          component: TrainerDashboardScreen,
          icon: "people",
        },
        {
          name: "Calendar",
          component: TrainerCalendarScreen,
          icon: "calendar",
        },
        { name: "Clients", component: ClientsScreen, icon: "person" },
        { name: "Profile", component: ProfileScreen, icon: "person-circle" },
      ];
    } else {
      return [
        { name: "Home", component: HomeScreen, icon: "home" },
        { name: "Workouts", component: WorkoutsScreen, icon: "fitness" },
        { name: "Book Slots", component: TrainerSlotsScreen, icon: "calendar" },
        { name: "Chat", component: ChatScreen, icon: "chatbubbles" },
        { name: "Progress", component: ProgressScreen, icon: "analytics" },
        { name: "History", component: TrainingHistoryScreen, icon: "time" },
        { name: "Profile", component: ProfileScreen, icon: "person" },
      ];
    }
  };

  const screens = getScreens();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const screen = screens.find((s) => s.name === route.name);
          const iconName = focused
            ? `${screen?.icon}`
            : `${screen?.icon}-outline`;
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      {screens.map((screen) => (
        <Tab.Screen
          key={screen.name}
          name={screen.name}
          component={screen.component}
          options={{
            tabBarLabel: screen.name,
          }}
        />
      ))}
    </Tab.Navigator>
  );
};
