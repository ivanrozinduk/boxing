import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Note {
  id: string;
  title: string;
  content: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
  version: number;
  versions: {
    content: string;
    timestamp: Date;
    version: number;
  }[];
}

interface NoteStore {
  notes: Note[];
  selectedNoteId: string | null;
  savingStatus: 'saved' | 'saving' | 'error';
  createNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt' | 'version' | 'versions'>) => void;
  updateNote: (id: string, content: string) => void;
  deleteNote: (id: string) => void;
  moveNote: (id: string, newParentId?: string) => void;
  selectNote: (id: string | null) => void;
  getNotePath: (id: string) => { id: string; title: string }[];
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set, get) => ({
      notes: [],
      selectedNoteId: null,
      savingStatus: 'saved',

      createNote: (note) => {
        const newNote: Note = {
          ...note,
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          version: 1,
          versions: [{
            content: note.content,
            timestamp: new Date(),
            version: 1,
          }],
        };

        set((state) => ({
          notes: [...state.notes, newNote],
          selectedNoteId: newNote.id,
        }));
      },

      updateNote: (id, content) => {
        set((state) => {
          const note = state.notes.find((n) => n.id === id);
          if (!note) return state;

          const newVersion = note.version + 1;
          const updatedNote = {
            ...note,
            content,
            updatedAt: new Date(),
            version: newVersion,
            versions: [
              ...note.versions,
              {
                content,
                timestamp: new Date(),
                version: newVersion,
              },
            ],
          };

          return {
            notes: state.notes.map((n) => (n.id === id ? updatedNote : n)),
            savingStatus: 'saved',
          };
        });
      },

      deleteNote: (id) => {
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
          selectedNoteId: state.selectedNoteId === id ? null : state.selectedNoteId,
        }));
      },

      moveNote: (id, newParentId) => {
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, parentId: newParentId } : note
          ),
        }));
      },

      selectNote: (id) => {
        set({ selectedNoteId: id });
      },

      getNotePath: (id) => {
        const { notes } = get();
        const path: { id: string; title: string }[] = [];
        let currentId: string | undefined = id;

        while (currentId) {
          const note = notes.find((n) => n.id === currentId);
          if (!note) break;

          path.unshift({ id: note.id, title: note.title });
          currentId = note.parentId;
        }

        return path;
      },
    }),
    {
      name: 'note-store',
    }
  )
);