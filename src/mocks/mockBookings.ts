import { Booking } from '../types';

export const mockBookings: Booking[] = [
  {
    id: '1',
    trainerId: '1',
    trainerName: 'Sarah Johnson',
    date: '2024-01-15',
    time: '09:00',
    duration: 60,
    sessionType: 'Strength Training',
    status: 'upcoming',
    progress: 0,
  },
  {
    id: '2',
    trainerId: '2',
    trainerName: 'Mike Chen',
    date: '2024-01-10',
    time: '08:00',
    duration: 45,
    sessionType: 'HIIT Cardio',
    status: 'completed',
    progress: 100,
    exercises: [
      { name: 'Bench Press', sets: 3, reps: 10, weight: 135 },
      { name: 'Squats', sets: 4, reps: 12, weight: 185 },
      { name: 'Deadlifts', sets: 3, reps: 8, weight: 225 },
    ],
  },
  {
    id: '3',
    trainerId: '3',
    trainerName: 'Emma Davis',
    date: '2024-01-08',
    time: '18:00',
    duration: 90,
    sessionType: 'Yoga Flow',
    status: 'completed',
    progress: 100,
    exercises: [
      { name: 'Sun Salutation', sets: 5, reps: 1, weight: 0 },
      { name: 'Warrior Poses', sets: 3, reps: 1, weight: 0 },
      { name: 'Tree Pose', sets: 2, reps: 1, weight: 0 },
    ],
  },
];
