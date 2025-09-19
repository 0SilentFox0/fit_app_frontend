// API Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface SignupRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  accountType: "client" | "trainer" | "admin";
}

export interface SignupResponse {
  message: string;
  user: User;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  accountType: "client" | "trainer" | "admin";
  profilePicture?: string;
}

// Progress and Analytics Types
export interface ProgressData {
  date: string;
  value: number;
  label: string;
}

export interface AnalyticsResponse {
  progress: ProgressData[];
  totalSessions: number;
  totalHours: number;
  averageRating: number;
}

// Training Types
export interface TrainingSession {
  id: string;
  date: string;
  duration: number;
  sessionType: string;
  trainerName: string;
  exercises: Exercise[];
  notes?: string;
  rating?: number;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight?: number;
  duration?: number;
  notes?: string;
}

export interface TrainingHistoryResponse {
  sessions: TrainingSession[];
  total: number;
}

// Client and Trainer Types
export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profilePicture?: string;
  joinDate: string;
  lastActive: string;
  totalSessions: number;
  averageRating: number;
  status: "active" | "inactive" | "pending";
  goals: string[];
  preferences: {
    sessionType: string[];
    duration: number[];
    timeOfDay: string[];
  };
}

export interface TrainerClientsResponse {
  clients: Client[];
  total: number;
}

// Calendar and Booking Types
export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  sessionType: string;
  clientName: string;
  status: "confirmed" | "pending" | "cancelled";
}

export interface BookingRequest {
  id: string;
  clientName: string;
  date: string;
  time: string;
  duration: number;
  sessionType: string;
  status: "pending" | "accepted" | "rejected";
  message?: string;
}

export interface CalendarResponse {
  events: CalendarEvent[];
  requests: BookingRequest[];
}

export interface BookingRequestsResponse {
  requests: BookingRequest[];
  total: number;
}

// Chat Types
export interface Message {
  id: string;
  text: string;
  senderId: string;
  senderName: string;
  timestamp: string;
  isRead: boolean;
}

export interface Trainer {
  id: string;
  name: string;
  specialty: string;
  avatar: string;
  rating: number;
  price: number;
  profilePicture?: string;
  isOnline: boolean;
  availableSlots: TimeSlot[];
}

// Trainer Slots Types
export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  duration: number;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  trainerId: string;
}

export interface TrainerSlot {
  id: string;
  trainerName: string;
  specialty: string;
  rating: number;
  profilePicture?: string;
  slots: TimeSlot[];
}

// Booking Types
export interface Booking {
  id: string;
  trainerId: string;
  trainerName: string;
  date: string;
  time: string;
  duration: number;
  sessionType: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  progress?: number;
  exercises?: Exercise[];
}

// Badge and Achievement Types
export interface Badge {
  id: string;
  name: string;
  title: string;
  description: string;
  unlocked: boolean;
  icon: string;
  unlockedAt?: string;
}

// Weekly and Monthly Data Types
export interface WeeklyData {
  day: string;
  value: number;
}

export interface MonthlyData {
  month: string;
  value: number;
}

// Navigation Types
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Workouts: undefined;
  Progress: undefined;
  Chat: undefined;
  Profile: undefined;
};

export type TrainerTabParamList = {
  Dashboard: undefined;
  Clients: undefined;
  Calendar: undefined;
  Slots: undefined;
  Chat: undefined;
  Profile: undefined;
};

// Theme Types
export interface ThemeColors {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  popover: string;
  popoverForeground: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  secondaryForeground: string;
  muted: string;
  mutedForeground: string;
  accent: string;
  accentForeground: string;
  destructive: string;
  border: string;
  input: string;
  ring: string;
  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;
  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
  success: string;
  warning: string;
  error: string;
  tabInactive: string;
  // Legacy properties
  text: string;
  textSecondary: string;
  inputBorder: string;
  inputBackground: string;
  placeholder: string;
}

export interface ThemeSpacing {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}

export interface Theme {
  colors: ThemeColors;
  spacing: ThemeSpacing;
  borderRadius: number;
  font: {
    regular: string;
    bold: string;
  };
}

// Component Props Types
export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  disabled?: boolean;
  style?: any;
}

export interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  style?: any;
}

export interface CardProps {
  children: React.ReactNode;
  style?: any;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error";
  style?: any;
}

export interface ProgressProps {
  value: number;
  maxValue: number;
  style?: any;
}
