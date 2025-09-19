const API_KEY = process.env.EXPO_PUBLIC_EXERCISEDB_API_KEY;
const API_HOST = process.env.EXPO_PUBLIC_EXERCISEDB_HOST;
const BASE_URL = `https://${API_HOST}`;

export interface Exercise {
  id: string;
  name: string;
  target: string;
  bodyPart: string;
  equipment: string;
  secondaryMuscles: string[];
  instructions: string[];
  description?: string;
  difficulty?: string;
  category?: string;
}

export interface MuscleGroup {
  name: string;
  exercises: Exercise[];
}

export interface BodyPart {
  name: string;
  exercises: Exercise[];
}

class ExerciseApiService {
  private async makeRequest<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "GET",
      headers: {
        "x-rapidapi-host": API_HOST,
        "x-rapidapi-key": API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async getAllExercises(): Promise<Exercise[]> {
    return this.makeRequest<Exercise[]>("/exercises");
  }

  async getExerciseById(id: string): Promise<Exercise> {
    return this.makeRequest<Exercise>(`/exercises/exercise/${id}`);
  }

  async getExercisesByBodyPart(bodyPart: string): Promise<Exercise[]> {
    return this.makeRequest<Exercise[]>(`/exercises/bodyPart/${bodyPart}`);
  }

  async getExercisesByTarget(target: string): Promise<Exercise[]> {
    return this.makeRequest<Exercise[]>(`/exercises/target/${target}`);
  }

  async getExercisesByEquipment(equipment: string): Promise<Exercise[]> {
    return this.makeRequest<Exercise[]>(`/exercises/equipment/${equipment}`);
  }

  async getBodyPartList(): Promise<string[]> {
    return this.makeRequest<string[]>("/exercises/bodyPartList");
  }

  async getTargetList(): Promise<string[]> {
    return this.makeRequest<string[]>("/exercises/targetList");
  }

  async getEquipmentList(): Promise<string[]> {
    return this.makeRequest<string[]>("/exercises/equipmentList");
  }

  getExerciseImage(exerciseId: string, resolution: string = "180"): string {
    return `${BASE_URL}/image?exerciseId=${exerciseId}&resolution=${resolution}`;
  }

  groupExercisesByMuscle(exercises: Exercise[]): MuscleGroup[] {
    const groups: { [key: string]: Exercise[] } = {};

    exercises.forEach((exercise) => {
      const muscle = exercise.target;
      if (!groups[muscle]) {
        groups[muscle] = [];
      }
      groups[muscle].push(exercise);
    });

    return Object.entries(groups)
      .map(([name, exercises]) => ({ name, exercises }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }

  groupExercisesByBodyPart(exercises: Exercise[]): BodyPart[] {
    const groups: { [key: string]: Exercise[] } = {};

    exercises.forEach((exercise) => {
      const bodyPart = exercise.bodyPart;
      if (!groups[bodyPart]) {
        groups[bodyPart] = [];
      }
      groups[bodyPart].push(exercise);
    });

    return Object.entries(groups)
      .map(([name, exercises]) => ({ name, exercises }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }
}

export const exerciseApi = new ExerciseApiService();
