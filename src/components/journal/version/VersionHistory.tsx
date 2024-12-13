import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, RotateCcw } from 'lucide-react';
import { format } from 'date-fns';
import { useNoteStore } from '../../../stores/noteStore';

interface VersionHistoryProps {
  noteId: string;
  onClose: () => void;
}

export default function VersionHistory({ noteId, onClose }: VersionHistoryProps) {
  const { notes } = useNoteStore();
  const note = notes.find(n => n.id === noteId);

  if (!note) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Version History</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-8rem)]">
          {note.versions.map((version, index) => (
            <div
              key={version.version}
              className="flex items-start space-x-4 py-4 border-b border-gray-100 last:border-0"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-purple-600" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900 font-medium">
                  Version {version.version}
                </p>
                <p className="text-sm text-gray-500">
                  {format(version.timestamp, 'MMM d, yyyy h:mm a')}
                </p>
                <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {version.content}
                </div>
              </div>

              <button
                onClick={() => {
                  // Implement restore version logic
                }}
                className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Restore</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}