import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "../../ThemeProvider";
import { TrainingSession } from "../../types";
import { TrainingSessionCard } from "./TrainingSessionCard";

interface TrainingSessionsListProps {
  title: string;
  sessions: TrainingSession[];
  selectedSession: TrainingSession | null;
  onSessionSelect: (session: TrainingSession | null) => void;
}

export const TrainingSessionsList: React.FC<TrainingSessionsListProps> = ({
  title,
  sessions,
  selectedSession,
  onSessionSelect,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        {title}
      </Text>
      {sessions.map((session) => (
        <TrainingSessionCard
          key={session.id}
          session={session}
          isExpanded={selectedSession?.id === session.id}
          onToggle={() =>
            onSessionSelect(selectedSession?.id === session.id ? null : session)
          }
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
});
