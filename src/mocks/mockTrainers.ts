import { Trainer } from "../types";

export const mockTrainers: Trainer[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: "Strength Training & Powerlifting",
    rating: 4.9,
    profilePicture: "https://example.com/sarah.jpg",
    isOnline: true,
  },
  {
    id: "2",
    name: "Mike Chen",
    specialty: "Yoga & Mindfulness",
    rating: 4.8,
    profilePicture: "https://example.com/mike.jpg",
    isOnline: false,
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    specialty: "HIIT & Cardio",
    rating: 4.7,
    profilePicture: "https://example.com/alex.jpg",
    isOnline: true,
  },
  {
    id: "4",
    name: "Emily Wilson",
    specialty: "Pilates & Flexibility",
    rating: 4.9,
    profilePicture: "https://example.com/emily.jpg",
    isOnline: true,
  },
  {
    id: "5",
    name: "David Brown",
    specialty: "CrossFit & Functional Training",
    rating: 4.6,
    profilePicture: "https://example.com/david.jpg",
    isOnline: false,
  },
  {
    id: "6",
    name: "Lisa Anderson",
    specialty: "Boxing & Martial Arts",
    rating: 4.8,
    profilePicture: "https://example.com/lisa.jpg",
    isOnline: true,
  },
  {
    id: "7",
    name: "Robert Taylor",
    specialty: "Swimming & Aquatic Fitness",
    rating: 4.7,
    profilePicture: "https://example.com/robert.jpg",
    isOnline: false,
  },
  {
    id: "8",
    name: "Jennifer Lee",
    specialty: "Dance Fitness & Zumba",
    rating: 4.9,
    profilePicture: "https://example.com/jennifer.jpg",
    isOnline: true,
  },
];

export const mockTrainerDetails = {
  "1": {
    ...mockTrainers[0],
    experience: "8 years",
    certifications: ["NASM-CPT", "Powerlifting Coach", "Nutrition Specialist"],
    languages: ["English", "Spanish"],
    location: "Downtown Fitness Center",
    priceRange: "$75-120 per session",
    availability: {
      monday: ["06:00-12:00", "16:00-20:00"],
      tuesday: ["07:00-13:00", "17:00-21:00"],
      wednesday: ["06:00-12:00", "16:00-20:00"],
      thursday: ["07:00-13:00", "17:00-21:00"],
      friday: ["06:00-12:00", "16:00-20:00"],
      saturday: ["08:00-14:00"],
      sunday: ["09:00-15:00"],
    },
    specialties: [
      "Strength Training",
      "Powerlifting",
      "Weight Loss",
      "Muscle Building",
    ],
    clientSuccess: "95% of clients achieve their goals within 3 months",
  },
  "2": {
    ...mockTrainers[1],
    experience: "12 years",
    certifications: ["RYT-500", "Mindfulness Coach", "Meditation Teacher"],
    languages: ["English", "Mandarin"],
    location: "Zen Wellness Studio",
    priceRange: "$60-90 per session",
    availability: {
      monday: ["08:00-14:00", "18:00-21:00"],
      tuesday: ["09:00-15:00", "19:00-22:00"],
      wednesday: ["08:00-14:00", "18:00-21:00"],
      thursday: ["09:00-15:00", "19:00-22:00"],
      friday: ["08:00-14:00", "18:00-21:00"],
      saturday: ["10:00-16:00"],
      sunday: ["10:00-16:00"],
    },
    specialties: ["Yoga", "Mindfulness", "Stress Relief", "Flexibility"],
    clientSuccess:
      "90% of clients report reduced stress and improved flexibility",
  },
  "3": {
    ...mockTrainers[2],
    experience: "6 years",
    certifications: ["ACE-CPT", "HIIT Specialist", "Sports Nutrition"],
    languages: ["English", "Spanish"],
    location: "Elite Fitness Club",
    priceRange: "$65-95 per session",
    availability: {
      monday: ["06:00-10:00", "16:00-20:00"],
      tuesday: ["07:00-11:00", "17:00-21:00"],
      wednesday: ["06:00-10:00", "16:00-20:00"],
      thursday: ["07:00-11:00", "17:00-21:00"],
      friday: ["06:00-10:00", "16:00-20:00"],
      saturday: ["08:00-12:00"],
      sunday: ["09:00-13:00"],
    },
    specialties: ["HIIT", "Cardio", "Weight Loss", "Endurance"],
    clientSuccess: "88% of clients lose 10+ pounds in 8 weeks",
  },
};

export const getTrainersBySpecialty = (specialty: string): Trainer[] => {
  return mockTrainers.filter((trainer) =>
    trainer.specialty.toLowerCase().includes(specialty.toLowerCase())
  );
};

export const getTrainersByRating = (minRating: number): Trainer[] => {
  return mockTrainers.filter((trainer) => trainer.rating >= minRating);
};

export const getOnlineTrainers = (): Trainer[] => {
  return mockTrainers.filter((trainer) => trainer.isOnline);
};

export const getTrainerById = (id: string): Trainer | undefined => {
  return mockTrainers.find((trainer) => trainer.id === id);
};
