import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, History, Loader2 } from 'lucide-react';
import { useNoteStore } from '../../stores/noteStore';
import { useDebounce } from 'use-debounce';
import RichTextEditor from './editor/RichTextEditor';
import NoteBreadcrumbs from './navigation/NoteBreadcrumbs';
import NoteHierarchy from './navigation/NoteHierarchy';
import VersionHistory from './version/VersionHistory';
import SavingIndicator from './ui/SavingIndicator';

export default function NoteEditor() {
  const [content, setContent] = useState('');
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [debouncedContent] = useDebounce(content, 2000);
  const { 
    selectedNoteId, 
    updateNote, 
    savingStatus,
    getNotePath 
  } = useNoteStore();

  // Auto-save effect
  useEffect(() => {
    if (selectedNoteId && debouncedContent !== '') {
      updateNote(selectedNoteId, debouncedContent);
    }
  }, [debouncedContent, selectedNoteId, updateNote]);

  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  const notePath = selectedNoteId ? getNotePath(selectedNoteId) : [];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <NoteBreadcrumbs path={notePath} />
        <div className="flex items-center space-x-4">
          <SavingIndicator status={savingStatus} />
          <button
            onClick={() => setShowVersionHistory(true)}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <History className="w-4 h-4" />
            <span>History</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        <div className="w-64 border-r border-gray-200 pr-4 overflow-y-auto">
          <NoteHierarchy />
        </div>

        <div className="flex-1 pl-4">
          <RichTextEditor
            content={content}
            onChange={handleContentChange}
          />
        </div>
      </div>

      {showVersionHistory && (
        <VersionHistory
          noteId={selectedNoteId!}
          onClose={() => setShowVersionHistory(false)}
        />
      )}
    </div>
  );
}