import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../ThemeProvider';
import { ClientCard } from './ClientCard';
import { ClientsEmptyState } from './ClientsEmptyState';
import { Client } from '../../types';

interface ClientsListProps {
  clients: Client[];
  onClientPress: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
}

export const ClientsList: React.FC<ClientsListProps> = ({
  clients,
  onClientPress,
  onEditClient,
  onDeleteClient,
}) => {
  const { colors } = useTheme();

  if (clients.length === 0) {
    return <ClientsEmptyState />;
  }

  return (
    <View style={styles.clientsContainer}>
      <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
        {clients.length} Client{clients.length !== 1 ? 's' : ''}
      </Text>

      {clients.map((client) => (
        <ClientCard
          key={client.id}
          client={client}
          onPress={onClientPress}
          showActions={true}
          onEditPress={onEditClient}
          onDeletePress={onDeleteClient}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  clientsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
