import React from 'react';
import { Maximize2, Minimize2, BookOpen, Sparkles, Plus } from 'lucide-react';
import EmojiPicker from 'emoji-picker-react';
import SavedIndicator from './ui/SavedIndicator';

interface EditorHeaderProps {
  title: string;
  selectedEmoji: string;
  showEmojiPicker: boolean;
  onTitleChange: (value: string) => void;
  onEmojiPickerToggle: () => void;
  onEmojiSelect: (emoji: string) => void;
  onEmojiPickerClose: () => void;
  onTheoryToggle: () => void;
  onPromptsToggle: () => void;
  onFullScreenToggle: () => void;
  onNewNote?: () => void;
  isFullScreen: boolean;
  showSavedIndicator: boolean;
  isPlaceholderVisible: boolean;
}

export default function EditorHeader({
  title,
  selectedEmoji,
  showEmojiPicker,
  onTitleChange,
  onEmojiPickerToggle,
  onEmojiSelect,
  onEmojiPickerClose,
  onTheoryToggle,
  onPromptsToggle,
  onFullScreenToggle,
  onNewNote,
  isFullScreen,
  showSavedIndicator,
  isPlaceholderVisible,
}: EditorHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4 flex-1">
        <button
          onClick={onEmojiPickerToggle}
          className="text-2xl hover:bg-gray-100 p-2 rounded-lg transition-colors"
        >
          {selectedEmoji}
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full text-xl font-semibold bg-transparent border-none focus:outline-none focus:ring-0 placeholder-transparent"
          />
          {isPlaceholderVisible && (
            <div className="absolute inset-0 pointer-events-none text-xl font-semibold text-gray-400">
              New idea...
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <SavedIndicator show={showSavedIndicator} />
        
        <button
          onClick={onTheoryToggle}
          className="group flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Theory</span>
        </button>

        <button
          onClick={onPromptsToggle}
          className="group flex items-center space-x-2 px-4 py-2 bg-purple-50 text-purple-700 rounded-lg hover:bg-purple-100 transition-colors"
        >
          <Sparkles className="w-4 h-4 transition-transform group-hover:scale-110" />
          <span>Prompts</span>
        </button>

        <button
          onClick={onNewNote}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          title="New Note"
        >
          <Plus className="w-5 h-5" />
        </button>

        <button
          onClick={onFullScreenToggle}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          {isFullScreen ? (
            <Minimize2 className="w-5 h-5" />
          ) : (
            <Maximize2 className="w-5 h-5" />
          )}
        </button>
      </div>

      {showEmojiPicker && (
        <div className="absolute top-16 left-0 z-50">
          <div
            className="fixed inset-0"
            onClick={onEmojiPickerClose}
          />
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onEmojiSelect(emojiData.emoji);
              onEmojiPickerClose();
            }}
          />
        </div>
      )}
    </div>
  );
}