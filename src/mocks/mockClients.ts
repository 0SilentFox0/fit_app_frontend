import { Client } from "../types";

export const mockClients: Client[] = [
  {
    id: "1",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    profilePicture: "https://example.com/john.jpg",
    joinDate: "2024-01-15",
    lastActive: "2024-01-20",
    totalSessions: 12,
    averageRating: 4.8,
    status: "active",
    goals: ["Build muscle", "Increase strength", "Improve fitness"],
    preferences: {
      sessionType: ["Strength Training", "HIIT"],
      duration: [60, 90],
      timeOfDay: ["morning", "evening"],
    },
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    profilePicture: "https://example.com/sarah.jpg",
    joinDate: "2024-01-10",
    lastActive: "2024-01-19",
    totalSessions: 8,
    averageRating: 4.9,
    status: "active",
    goals: ["Weight loss", "Improve flexibility", "Reduce stress"],
    preferences: {
      sessionType: ["Yoga", "Pilates", "Cardio"],
      duration: [45, 60, 90],
      timeOfDay: ["morning", "afternoon"],
    },
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Davis",
    email: "mike.davis@email.com",
    profilePicture: "https://example.com/mike.jpg",
    joinDate: "2024-01-05",
    lastActive: "2024-01-18",
    totalSessions: 15,
    averageRating: 4.7,
    status: "active",
    goals: ["Improve endurance", "Build strength", "Sports performance"],
    preferences: {
      sessionType: ["HIIT", "Strength Training", "CrossFit"],
      duration: [60, 90],
      timeOfDay: ["early_morning", "evening"],
    },
  },
  {
    id: "4",
    firstName: "Emily",
    lastName: "Wilson",
    email: "emily.wilson@email.com",
    profilePicture: "https://example.com/emily.jpg",
    joinDate: "2024-01-12",
    lastActive: "2024-01-20",
    totalSessions: 6,
    averageRating: 4.8,
    status: "active",
    goals: ["Improve flexibility", "Core strength", "Posture correction"],
    preferences: {
      sessionType: ["Pilates", "Yoga", "Core Training"],
      duration: [45, 60],
      timeOfDay: ["morning", "lunch"],
    },
  },
  {
    id: "5",
    firstName: "David",
    lastName: "Brown",
    email: "david.brown@email.com",
    profilePicture: "https://example.com/david.jpg",
    joinDate: "2023-12-20",
    lastActive: "2024-01-15",
    totalSessions: 25,
    averageRating: 4.9,
    status: "active",
    goals: ["Weight loss", "Cardiovascular health", "Maintain fitness"],
    preferences: {
      sessionType: ["Cardio", "HIIT", "Swimming"],
      duration: [30, 45, 60],
      timeOfDay: ["early_morning", "morning"],
    },
  },
  {
    id: "6",
    firstName: "Lisa",
    lastName: "Anderson",
    email: "lisa.anderson@email.com",
    profilePicture: "https://example.com/lisa.jpg",
    joinDate: "2024-01-08",
    lastActive: "2024-01-17",
    totalSessions: 4,
    averageRating: 4.6,
    status: "pending",
    goals: ["Learn boxing", "Self-defense", "Cardio fitness"],
    preferences: {
      sessionType: ["Boxing", "Martial Arts", "HIIT"],
      duration: [60, 90],
      timeOfDay: ["evening", "weekend"],
    },
  },
  {
    id: "7",
    firstName: "Robert",
    lastName: "Taylor",
    email: "robert.taylor@email.com",
    profilePicture: "https://example.com/robert.jpg",
    joinDate: "2024-01-03",
    lastActive: "2024-01-16",
    totalSessions: 10,
    averageRating: 4.7,
    status: "active",
    goals: ["Swimming technique", "Water safety", "Aquatic fitness"],
    preferences: {
      sessionType: ["Swimming", "Aquatic Fitness"],
      duration: [45, 60],
      timeOfDay: ["morning", "afternoon"],
    },
  },
  {
    id: "8",
    firstName: "Jennifer",
    lastName: "Lee",
    email: "jennifer.lee@email.com",
    profilePicture: "https://example.com/jennifer.jpg",
    joinDate: "2024-01-14",
    lastActive: "2024-01-20",
    totalSessions: 3,
    averageRating: 4.8,
    status: "active",
    goals: ["Dance fitness", "Weight loss", "Have fun"],
    preferences: {
      sessionType: ["Dance Fitness", "Zumba", "Cardio"],
      duration: [45, 60],
      timeOfDay: ["evening", "weekend"],
    },
  },
];

export const getActiveClients = (): Client[] => {
  return mockClients.filter((client) => client.status === "active");
};

export const getPendingClients = (): Client[] => {
  return mockClients.filter((client) => client.status === "pending");
};

export const getClientsByGoal = (goal: string): Client[] => {
  return mockClients.filter((client) =>
    client.goals.some((g) => g.toLowerCase().includes(goal.toLowerCase()))
  );
};

export const getClientsBySessionType = (sessionType: string): Client[] => {
  return mockClients.filter((client) =>
    client.preferences.sessionType.some((type) =>
      type.toLowerCase().includes(sessionType.toLowerCase())
    )
  );
};

export const getClientById = (id: string): Client | undefined => {
  return mockClients.find((client) => client.id === id);
};

export const getTopRatedClients = (minRating: number = 4.5): Client[] => {
  return mockClients
    .filter((client) => client.averageRating >= minRating)
    .sort((a, b) => b.averageRating - a.averageRating);
};

export const getClientsByJoinDate = (
  startDate: string,
  endDate: string
): Client[] => {
  return mockClients.filter((client) => {
    const joinDate = new Date(client.joinDate);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return joinDate >= start && joinDate <= end;
  });
};
