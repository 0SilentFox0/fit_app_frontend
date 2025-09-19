import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import MuscleGroupsScreen from "../screens/MuscleGroupsScreen";
import ExercisesListScreen from "../screens/ExercisesListScreen";
import ExerciseDetailsScreen from "../screens/ExerciseDetailsScreen";

export type ExercisesStackParamList = {
  MuscleGroups: undefined;
  ExercisesList: {
    muscleGroup: string;
    bodyPart: string;
  };
  ExerciseDetails: {
    exercise: any;
  };
};

const Stack = createStackNavigator<ExercisesStackParamList>();

const ExercisesStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MuscleGroups" component={MuscleGroupsScreen} />
      <Stack.Screen name="ExercisesList" component={ExercisesListScreen} />
      <Stack.Screen name="ExerciseDetails" component={ExerciseDetailsScreen} />
    </Stack.Navigator>
  );
};

export default ExercisesStackNavigator;
