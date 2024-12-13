import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SubscriptionState {
  isSubscribed: boolean;
  plan: 'free' | 'premium' | null;
  subscriptionId: string | null;
  expiresAt: string | null;
  setPremium: (subscriptionId: string, expiresAt: string) => void;
  setFree: () => void;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set) => ({
      isSubscribed: false,
      plan: null,
      subscriptionId: null,
      expiresAt: null,

      setPremium: (subscriptionId, expiresAt) => {
        set({
          isSubscribed: true,
          plan: 'premium',
          subscriptionId,
          expiresAt,
        });
      },

      setFree: () => {
        set({
          isSubscribed: false,
          plan: 'free',
          subscriptionId: null,
          expiresAt: null,
        });
      },
    }),
    {
      name: 'subscription-store',
    }
  )
);