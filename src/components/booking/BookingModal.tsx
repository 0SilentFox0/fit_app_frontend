import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../ThemeProvider';
import { Trainer, TimeSlot } from '../../types';

interface SessionType {
  id: string;
  name: string;
  icon: string;
}

interface BookingModalProps {
  visible: boolean;
  onClose: () => void;
  selectedTrainer: Trainer | null;
  selectedSlot: TimeSlot | null;
  sessionType: string;
  onSessionTypeChange: (type: string) => void;
  onSlotSelect: (slot: TimeSlot) => void;
  onBookSession: () => void;
  sessionTypes: SessionType[];
}

export const BookingModal: React.FC<BookingModalProps> = ({
  visible,
  onClose,
  selectedTrainer,
  selectedSlot,
  sessionType,
  onSessionTypeChange,
  onSlotSelect,
  onBookSession,
  sessionTypes,
}) => {
  const { colors } = useTheme();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (!selectedTrainer) return null;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
          <View style={styles.modalHeader}>
            <Text style={[styles.modalTitle, { color: colors.foreground }]}>
              Book Session
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={colors.mutedForeground} />
            </TouchableOpacity>
          </View>

          <View style={styles.modalTrainerInfo}>
            <Text style={styles.trainerAvatar}>{selectedTrainer.avatar}</Text>
            <View>
              <Text style={[styles.modalTrainerName, { color: colors.foreground }]}>
                {selectedTrainer.name}
              </Text>
              <Text style={[styles.modalTrainerSpecialty, { color: colors.mutedForeground }]}>
                {selectedTrainer.specialty}
              </Text>
            </View>
          </View>

          {/* Session Type Selection */}
          <View style={styles.sessionTypeContainer}>
            <Text style={[styles.sessionTypeTitle, { color: colors.foreground }]}>
              Session Type
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {sessionTypes.map((type) => (
                <TouchableOpacity
                  key={type.id}
                  style={[
                    styles.sessionTypeButton,
                    sessionType === type.id && { backgroundColor: colors.primary }
                  ]}
                  onPress={() => onSessionTypeChange(type.id)}
                >
                  <Ionicons
                    name={type.icon as any}
                    size={20}
                    color={sessionType === type.id ? colors.primaryForeground : colors.foreground}
                  />
                  <Text style={[
                    styles.sessionTypeText,
                    { color: sessionType === type.id ? colors.primaryForeground : colors.foreground }
                  ]}>
                    {type.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Available Slots */}
          <View style={styles.slotsContainer}>
            <Text style={[styles.slotsTitle, { color: colors.foreground }]}>
              Available Slots
            </Text>
            <View style={styles.slotsGrid}>
              {selectedTrainer.availableSlots
                .filter(slot => slot.isAvailable)
                .map((slot) => (
                  <TouchableOpacity
                    key={slot.id}
                    style={[
                      styles.slotButton,
                      selectedSlot?.id === slot.id && { backgroundColor: colors.primary }
                    ]}
                    onPress={() => onSlotSelect(slot)}
                  >
                    <Text style={[
                      styles.slotText,
                      { color: selectedSlot?.id === slot.id ? colors.primaryForeground : colors.foreground }
                    ]}>
                      {formatDate(slot.date)}
                    </Text>
                    <Text style={[
                      styles.slotTime,
                      { color: selectedSlot?.id === slot.id ? colors.primaryForeground : colors.mutedForeground }
                    ]}>
                      {slot.time}
                    </Text>
                  </TouchableOpacity>
                ))}
            </View>
          </View>

          <TouchableOpacity
            style={[styles.bookButton, { backgroundColor: colors.primary }]}
            onPress={onBookSession}
            disabled={!selectedSlot}
          >
            <Text style={[styles.bookButtonText, { color: colors.primaryForeground }]}>
              Book Session
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalTrainerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  trainerAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  modalTrainerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  modalTrainerSpecialty: {
    fontSize: 14,
  },
  sessionTypeContainer: {
    marginBottom: 20,
  },
  sessionTypeTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  sessionTypeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  sessionTypeText: {
    fontSize: 12,
    marginLeft: 8,
  },
  slotsContainer: {
    marginBottom: 20,
  },
  slotsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  slotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  slotButton: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    alignItems: 'center',
  },
  slotText: {
    fontSize: 12,
    fontWeight: '500',
  },
  slotTime: {
    fontSize: 10,
    marginTop: 2,
  },
  bookButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  bookButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
