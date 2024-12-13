import React from 'react';
import { motion } from 'framer-motion';
import { StickyNote, Trash2, Pin } from 'lucide-react';
import { format } from 'date-fns';

interface Note {
  id: string;
  title: string;
  emoji: string;
  content: string;
  createdAt: Date;
}

interface JournalNotesProps {
  notes: Note[];
  onSelectNote: (note: Note) => void;
  onDeleteNote: (id: string) => void;
  selectedNoteId: string | null;
}

export default function JournalNotes({
  notes,
  onSelectNote,
  onDeleteNote,
  selectedNoteId,
}: JournalNotesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <StickyNote className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">All Notes</h3>
      </div>

      <div className="space-y-3">
        {notes.map((note) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedNoteId === note.id ? 'bg-purple-50 border border-purple-100' : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => onSelectNote(note)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{note.emoji}</span>
                <div>
                  <h4 className="font-medium text-gray-900">{note.title}</h4>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{note.content}</p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteNote(note.id);
                }}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {format(note.createdAt, 'MMM d, yyyy h:mm a')}
            </p>
          </motion.div>
        ))}

        {notes.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            No notes yet. Start writing your thoughts above!
          </div>
        )}
      </div>
    </div>
  );
}