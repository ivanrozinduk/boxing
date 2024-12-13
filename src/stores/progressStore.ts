import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Activity {
  id: string;
  type: 'meditation' | 'workout' | 'journal';
  duration: number;
  completedAt: Date;
}

interface ProgressState {
  activities: Activity[];
  addActivity: (activity: Omit<Activity, 'id' | 'completedAt'>) => void;
  getStats: () => {
    totalMeditationMinutes: number;
    totalWorkouts: number;
    totalJournalEntries: number;
    streakDays: number;
  };
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      activities: [],

      addActivity: (activity) => {
        const newActivity = {
          ...activity,
          id: crypto.randomUUID(),
          completedAt: new Date(),
        };
        set((state) => ({
          activities: [...state.activities, newActivity],
        }));
      },

      getStats: () => {
        const activities = get().activities;
        return {
          totalMeditationMinutes: activities
            .filter((a) => a.type === 'meditation')
            .reduce((acc, curr) => acc + curr.duration, 0),
          totalWorkouts: activities.filter((a) => a.type === 'workout').length,
          totalJournalEntries: activities.filter((a) => a.type === 'journal').length,
          streakDays: activities.length > 0 ? Math.floor(activities.length / 3) : 0,
        };
      },
    }),
    {
      name: 'progress-store',
    }
  )
);