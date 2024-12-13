import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { addDays, isSameDay, startOfDay } from 'date-fns';

interface StreakState {
  currentStreak: number;
  lastCheckIn: Date | null;
  multiplier: number;
  updateStreak: () => void;
  resetStreak: () => void;
}

export const useStreakStore = create<StreakState>()(
  persist(
    (set, get) => ({
      currentStreak: 0,
      lastCheckIn: null,
      multiplier: 1,

      updateStreak: () => {
        const { lastCheckIn, currentStreak } = get();
        const today = startOfDay(new Date());
        
        if (!lastCheckIn) {
          set({ currentStreak: 1, lastCheckIn: today, multiplier: 1 });
          return;
        }

        const lastCheck = startOfDay(new Date(lastCheckIn));
        const isYesterday = isSameDay(addDays(lastCheck, 1), today);
        const isToday = isSameDay(lastCheck, today);

        if (isToday) return;

        if (isYesterday) {
          const newStreak = currentStreak + 1;
          const newMultiplier = Math.floor(newStreak / 7) + 1;
          set({ 
            currentStreak: newStreak,
            lastCheckIn: today,
            multiplier: newMultiplier
          });
        } else {
          set({ currentStreak: 1, lastCheckIn: today, multiplier: 1 });
        }
      },

      resetStreak: () => {
        set({ currentStreak: 0, lastCheckIn: null, multiplier: 1 });
      },
    }),
    {
      name: 'streak-store',
    }
  )
);