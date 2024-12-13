import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useJournalStore } from '../../hooks/useJournalStore';
import { useAuthStore } from '../../stores/authStore';
import EditorHeader from './EditorHeader';
import JournalPromptSelector from './JournalPromptSelector';
import JournalTheory from './JournalTheory';
import JournalNotes from './JournalNotes';

interface Note {
  id: string;
  title: string;
  emoji: string;
  content: string;
  createdAt: Date;
}

const DEFAULT_NOTES: Note[] = [
  {
    id: '1',
    title: 'Morning Reflections',
    emoji: '🌅',
    content: 'Today started with a beautiful sunrise. I feel energized and ready for new challenges.',
    createdAt: new Date(),
  },
  {
    id: '2',
    title: 'Project Ideas',
    emoji: '💡',
    content: 'Create a mobile app that helps people track their daily habits and mood patterns.',
    createdAt: new Date(),
  },
  {
    id: '3',
    title: 'Weekly Goals',
    emoji: '🎯',
    content: 'Focus on completing the main project tasks and start learning a new programming language.',
    createdAt: new Date(),
  },
];

export default function JournalEditor() {
  const [content, setContent] = useState('');
  const [showPrompts, setShowPrompts] = useState(false);
  const [showTheory, setShowTheory] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState('💭');
  const [title, setTitle] = useState('');
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [notes, setNotes] = useState<Note[]>(DEFAULT_NOTES);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [showSavedIndicator, setShowSavedIndicator] = useState(false);
  const [isPlaceholderVisible, setIsPlaceholderVisible] = useState(true);
  const [isTitlePlaceholderVisible, setIsTitlePlaceholderVisible] = useState(true);

  const { user } = useAuthStore();
  const { addEntry, activeEntryId, entries, updateEntry, isLoading } = useJournalStore();

  const handleNoteSelect = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setSelectedEmoji(note.emoji);
    setContent(note.content);
    setIsPlaceholderVisible(false);
    setIsTitlePlaceholderVisible(false);
  };

  const handleNewNote = () => {
    setSelectedNote(null);
    setTitle('');
    setSelectedEmoji('💭');
    setContent('');
    setIsPlaceholderVisible(true);
    setIsTitlePlaceholderVisible(true);
  };

  const handleDeleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    if (selectedNote?.id === id) {
      handleNewNote();
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    setIsPlaceholderVisible(newContent === '');

    if (selectedNote) {
      setNotes(prev => prev.map(note =>
        note.id === selectedNote.id
          ? { ...note, content: newContent }
          : note
      ));
      setShowSavedIndicator(true);
      setTimeout(() => setShowSavedIndicator(false), 2000);
    } else if (newContent && !selectedNote) {
      const newNote: Note = {
        id: crypto.randomUUID(),
        title: title || 'New idea...',
        emoji: selectedEmoji,
        content: newContent,
        createdAt: new Date(),
      };
      setNotes(prev => [newNote, ...prev]);
      setSelectedNote(newNote);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
    setIsTitlePlaceholderVisible(newTitle === '');
    
    if (selectedNote) {
      setNotes(prev => prev.map(note =>
        note.id === selectedNote.id
          ? { ...note, title: newTitle || 'New idea...' }
          : note
      ));
      setShowSavedIndicator(true);
      setTimeout(() => setShowSavedIndicator(false), 2000);
    }
  };

  const toggleFullScreen = () => setIsFullScreen(!isFullScreen);

  const editorClasses = `
    transition-all duration-300 ease-in-out
    ${isFullScreen ? 'fixed inset-0 z-50 bg-white p-6' : 'relative'}
  `;

  if (!user) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
        <p className="text-gray-600">Please sign in to access your journal.</p>
      </div>
    );
  }

  return (
    <div className={editorClasses}>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <EditorHeader
          title={title}
          selectedEmoji={selectedEmoji}
          showEmojiPicker={showEmojiPicker}
          onTitleChange={handleTitleChange}
          onEmojiPickerToggle={() => setShowEmojiPicker(!showEmojiPicker)}
          onEmojiSelect={setSelectedEmoji}
          onEmojiPickerClose={() => setShowEmojiPicker(false)}
          onTheoryToggle={() => setShowTheory(true)}
          onPromptsToggle={() => setShowPrompts(true)}
          onFullScreenToggle={toggleFullScreen}
          onNewNote={handleNewNote}
          isFullScreen={isFullScreen}
          showSavedIndicator={showSavedIndicator}
          isPlaceholderVisible={isTitlePlaceholderVisible}
        />

        <div className="min-h-[400px] relative">
          <textarea
            value={content}
            onChange={handleContentChange}
            placeholder=""
            className="w-full h-[400px] p-4 border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          {isPlaceholderVisible && (
            <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
              Start writing your thoughts...
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-gray-100 pt-8">
          <JournalNotes
            notes={notes}
            onSelectNote={handleNoteSelect}
            onDeleteNote={handleDeleteNote}
            selectedNoteId={selectedNote?.id}
          />
        </div>
      </div>

      {showPrompts && (
        <JournalPromptSelector
          onSelectPrompt={(prompt) => {
            setContent((prev) => prev + (prev ? '\n\n' : '') + prompt);
            setShowPrompts(false);
          }}
          onClose={() => setShowPrompts(false)}
        />
      )}
      
      {showTheory && (
        <JournalTheory onClose={() => setShowTheory(false)} />
      )}
    </div>
  );
}