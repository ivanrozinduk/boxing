import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User as FirebaseUser } from 'firebase/auth';
import { auth, signIn, createUser, resetUserPassword, getCurrentUser, UserData, signInWithGoogle } from '../lib/firebase';
import { validateCredentials, validateName } from '../lib/auth-validation';
import { getAuthErrorMessage } from '../lib/auth-errors';

interface ValidationError {
  field: string;
  message: string;
}

interface AuthState {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  validateCredentials: (email: string, password: string) => ValidationError[];
  validateName: (name: string) => ValidationError[];
  handleAuthStateChange: (user: FirebaseUser | null) => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      validateCredentials,
      validateName,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const userData = await signIn(email, password);
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = getAuthErrorMessage(error);
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
            user: null,
          });
          throw new Error(errorMessage);
        }
      },

      loginWithGoogle: async () => {
        set({ isLoading: true, error: null });
        try {
          const userData = await signInWithGoogle();
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = getAuthErrorMessage(error);
          set({
            isLoading: false,
            error: errorMessage,
            isAuthenticated: false,
            user: null,
          });
          throw new Error(errorMessage);
        }
      },

      signup: async (email: string, password: string, name: string) => {
        set({ isLoading: true, error: null });
        try {
          const userData = await createUser(email, password, name);
          set({
            user: userData,
            isAuthenticated: true,
            isLoading: false,
            error: null,
          });
        } catch (error) {
          const errorMessage = getAuthErrorMessage(error);
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw new Error(errorMessage);
        }
      },

      resetPassword: async (email: string) => {
        set({ isLoading: true, error: null });
        try {
          await resetUserPassword(email);
          set({ isLoading: false, error: null });
        } catch (error) {
          const errorMessage = getAuthErrorMessage(error);
          set({
            isLoading: false,
            error: errorMessage,
          });
          throw new Error(errorMessage);
        }
      },

      handleAuthStateChange: async (firebaseUser: FirebaseUser | null) => {
        if (!firebaseUser) {
          set({ user: null, isAuthenticated: false });
          return;
        }

        const userData = await getCurrentUser(firebaseUser);
        if (userData) {
          set({
            user: userData,
            isAuthenticated: true,
          });
        }
      },

      logout: async () => {
        try {
          await auth.signOut();
          set({ user: null, isAuthenticated: false, error: null });
        } catch (error) {
          const errorMessage = getAuthErrorMessage(error);
          set({ error: errorMessage });
          throw new Error(errorMessage);
        }
      },
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Set up auth state listener
auth.onAuthStateChanged((user) => {
  useAuthStore.getState().handleAuthStateChange(user);
});