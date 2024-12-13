import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SoundState {
  isMuted: boolean;
  volume: number;
  setMuted: (muted: boolean) => void;
  setVolume: (volume: number) => void;
}

export const useSoundStore = create<SoundState>()(
  persist(
    (set) => ({
      isMuted: false,
      volume: 0.5,
      setMuted: (muted) => set({ isMuted: muted }),
      setVolume: (volume) => set({ volume: volume }),
    }),
    {
      name: 'sound-store',
    }
  )
);