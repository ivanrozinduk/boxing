import { create } from 'zustand';
import { collection, addDoc, query, where, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuthStore } from '../stores/authStore';

interface JournalEntry {
  id: string;
  title: string;
  content: string;
  emoji: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  parentId?: string;
}

interface JournalStore {
  entries: JournalEntry[];
  activeEntryId: string | null;
  isLoading: boolean;
  error: string | null;
  fetchEntries: () => Promise<void>;
  addEntry: (entry: Omit<JournalEntry, 'id' | 'createdAt' | 'updatedAt' | 'userId'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<JournalEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  setActiveEntry: (id: string | null) => void;
}

export const useJournalStore = create<JournalStore>((set, get) => ({
  entries: [],
  activeEntryId: null,
  isLoading: false,
  error: null,

  fetchEntries: async () => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const q = query(collection(db, 'journal_entries'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const entries = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt.toDate(),
        updatedAt: doc.data().updatedAt.toDate(),
      })) as JournalEntry[];

      set({ entries, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch journal entries', isLoading: false });
    }
  },

  addEntry: async (entry) => {
    const userId = useAuthStore.getState().user?.id;
    if (!userId) return;

    set({ isLoading: true, error: null });
    try {
      const docRef = await addDoc(collection(db, 'journal_entries'), {
        ...entry,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      const newEntry = {
        id: docRef.id,
        ...entry,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      set(state => ({
        entries: [...state.entries, newEntry],
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to add journal entry', isLoading: false });
    }
  },

  updateEntry: async (id, updates) => {
    set({ isLoading: true, error: null });
    try {
      const docRef = doc(db, 'journal_entries', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date(),
      });

      set(state => ({
        entries: state.entries.map(entry =>
          entry.id === id
            ? { ...entry, ...updates, updatedAt: new Date() }
            : entry
        ),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to update journal entry', isLoading: false });
    }
  },

  deleteEntry: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await deleteDoc(doc(db, 'journal_entries', id));
      set(state => ({
        entries: state.entries.filter(entry => entry.id !== id),
        isLoading: false,
      }));
    } catch (error) {
      set({ error: 'Failed to delete journal entry', isLoading: false });
    }
  },

  setActiveEntry: (id) => {
    set({ activeEntryId: id });
  },
}));