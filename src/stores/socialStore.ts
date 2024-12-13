import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  avatar: string;
  points: number;
  streak: number;
  level: number;
}

interface League {
  id: string;
  name: string;
  users: User[];
  startDate: Date;
  endDate: Date;
}

interface SocialState {
  currentLeague: League | null;
  leaderboard: User[];
  friends: User[];
  addFriend: (friend: User) => void;
  removeFriend: (friendId: string) => void;
  updatePoints: (points: number) => void;
  joinLeague: (league: League) => void;
}

export const useSocialStore = create<SocialState>()(
  persist(
    (set, get) => ({
      currentLeague: null,
      leaderboard: [],
      friends: [],

      addFriend: (friend) => {
        set((state) => ({
          friends: [...state.friends, friend],
        }));
      },

      removeFriend: (friendId) => {
        set((state) => ({
          friends: state.friends.filter((f) => f.id !== friendId),
        }));
      },

      updatePoints: (points) => {
        const { currentLeague } = get();
        if (currentLeague) {
          set((state) => ({
            currentLeague: {
              ...state.currentLeague!,
              users: state.currentLeague!.users.map((u) =>
                u.id === 'current-user' ? { ...u, points: u.points + points } : u
              ),
            },
          }));
        }
      },

      joinLeague: (league) => {
        set({ currentLeague: league });
      },
    }),
    {
      name: 'social-store',
    }
  )
);