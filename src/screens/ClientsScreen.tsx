import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Alert } from "react-native";
import { useTheme } from "../ThemeProvider";
import {
  ClientsHeader,
  ClientsSearchBar,
  ClientsStatusFilters,
  ClientsSortOptions,
  ClientsList,
} from "../components/clients";
import { mockClients } from "../mocks";
import { Client } from "../types";

export const ClientsScreen: React.FC = () => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "pending"
  >("all");
  const [sortBy, setSortBy] = useState<"name" | "joinDate" | "sessions">(
    "name"
  );

  const filteredClients = useMemo(() => {
    let clients = mockClients;

    // Filter by status
    if (filterStatus === "active") {
      clients = mockClients.filter((client) => client.status === "active");
    } else if (filterStatus === "pending") {
      clients = mockClients.filter((client) => client.status === "pending");
    }

    // Filter by search query
    if (searchQuery) {
      clients = clients.filter(
        (client) =>
          client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          client.goals.some((goal) =>
            goal.toLowerCase().includes(searchQuery.toLowerCase())
          )
      );
    }

    // Sort clients
    clients.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.firstName.localeCompare(b.firstName);
        case "joinDate":
          return (
            new Date(b.joinDate).getTime() - new Date(a.joinDate).getTime()
          );
        case "sessions":
          return b.totalSessions - a.totalSessions;
        default:
          return 0;
      }
    });

    return clients;
  }, [searchQuery, filterStatus, sortBy]);

  const handleClientPress = (client: Client) => {
    // Navigate to client details or open client modal
    Alert.alert(
      "Client Details",
      `Viewing details for ${client.firstName} ${client.lastName}`
    );
  };

  const handleEditClient = (client: Client) => {
    Alert.alert("Edit Client", `Edit ${client.firstName} ${client.lastName}`);
  };

  const handleDeleteClient = (client: Client) => {
    Alert.alert(
      "Delete Client",
      `Are you sure you want to delete ${client.firstName} ${client.lastName}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            // In a real app, this would call an API to delete the client
            Alert.alert("Success", "Client deleted successfully");
          },
        },
      ]
    );
  };

  const handleAddClient = () => {
    Alert.alert("Add Client", "Add new client functionality");
  };

  const getStatusCount = (status: string) => {
    return mockClients.filter((client) => client.status === status).length;
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ClientsHeader onAddClient={handleAddClient} />

      <ScrollView style={styles.content}>
        <ClientsSearchBar
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClearSearch={() => setSearchQuery("")}
        />

        <ClientsStatusFilters
          filterStatus={filterStatus}
          onFilterChange={setFilterStatus}
          totalClients={mockClients.length}
          activeClients={getStatusCount("active")}
          pendingClients={getStatusCount("pending")}
        />

        <ClientsSortOptions sortBy={sortBy} onSortChange={setSortBy} />

        <ClientsList
          clients={filteredClients}
          onClientPress={handleClientPress}
          onEditClient={handleEditClient}
          onDeleteClient={handleDeleteClient}
        />
      </ScrollView>
    </View>
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
