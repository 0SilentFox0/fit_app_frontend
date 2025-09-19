import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "../../ThemeProvider";

interface WorkoutType {
  name: string;
  icon: string;
  color: string;
  count: number;
}

interface WorkoutTypesProps {
  workoutTypes: WorkoutType[];
  selectedType: string;
  onTypePress: (type: string) => void;
}

export const WorkoutTypes: React.FC<WorkoutTypesProps> = ({
  workoutTypes,
  selectedType,
  onTypePress,
}) => {
  const { colors, spacing } = useTheme();

  return (
    <View style={[styles.container, { marginBottom: spacing.lg }]}>
      <Text
        style={[
          styles.title,
          { color: colors.primary, marginBottom: spacing.md },
        ]}
      >
        Workout Types
      </Text>
      <View style={styles.typesContainer}>
        {workoutTypes.map((type) => (
          <TouchableOpacity
            key={type.name}
            onPress={() => onTypePress(type.name.toLowerCase())}
            style={[
              styles.typeCard,
              {
                backgroundColor:
                  selectedType === type.name.toLowerCase()
                    ? type.color
                    : colors.card,
                shadowColor: type.color,
                shadowOpacity:
                  selectedType === type.name.toLowerCase() ? 0.2 : 0.05,
              },
            ]}
          >
            <MaterialCommunityIcons
              name={type.icon as any}
              size={24}
              color={
                selectedType === type.name.toLowerCase()
                  ? colors.background
                  : type.color
              }
            />
            <Text
              style={[
                styles.typeName,
                {
                  color:
                    selectedType === type.name.toLowerCase()
                      ? colors.background
                      : colors.text,
                },
              ]}
            >
              {type.name}
            </Text>
            <Text
              style={[
                styles.typeCount,
                {
                  color:
                    selectedType === type.name.toLowerCase()
                      ? colors.background + "CC"
                      : colors.textSecondary,
                },
              ]}
            >
              {type.count} workouts
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  typesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  typeCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: "center",
    shadowRadius: 8,
    elevation: 3,
  },
  typeName: {
    fontSize: 12,
    fontWeight: "600",
    marginTop: 4,
  },
  typeCount: {
    fontSize: 10,
  },
});
