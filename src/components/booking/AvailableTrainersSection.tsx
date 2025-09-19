import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeProvider';
import { Trainer } from '../../types';

interface AvailableTrainersSectionProps {
  trainers: Trainer[];
  onTrainerSelect: (trainer: Trainer) => void;
}

export const AvailableTrainersSection: React.FC<AvailableTrainersSectionProps> = ({
  trainers,
  onTrainerSelect,
}) => {
  const { colors } = useTheme();

  return (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        Available Trainers
      </Text>
      {trainers.map((trainer) => (
        <TouchableOpacity
          key={trainer.id}
          style={[styles.trainerCard, { backgroundColor: colors.card }]}
          onPress={() => onTrainerSelect(trainer)}
        >
          <View style={styles.cardTrainerInfo}>
            <Text style={styles.trainerAvatar}>{trainer.avatar}</Text>
            <View style={styles.trainerDetails}>
              <Text style={[styles.trainerName, { color: colors.foreground }]}>
                {trainer.name}
              </Text>
              <Text style={[styles.trainerSpecialty, { color: colors.mutedForeground }]}>
                {trainer.specialty}
              </Text>
              <View style={styles.trainerStats}>
                <Ionicons name="star" size={12} color={colors.warning} />
                <Text style={[styles.trainerRating, { color: colors.mutedForeground }]}>
                  {trainer.rating}
                </Text>
                <Text style={[styles.trainerPrice, { color: colors.primary }]}>
                  ${trainer.price}/session
                </Text>
              </View>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  trainerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTrainerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainerAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  trainerDetails: {
    flex: 1,
  },
  trainerName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  trainerSpecialty: {
    fontSize: 14,
    marginBottom: 4,
  },
  trainerStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trainerRating: {
    fontSize: 12,
    marginLeft: 4,
    marginRight: 8,
  },
  trainerPrice: {
    fontSize: 12,
    fontWeight: '600',
  },
});
