import React from 'react';
import { Check, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SavingIndicatorProps {
  status: 'saved' | 'saving' | 'error';
}

export default function SavingIndicator({ status }: SavingIndicatorProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="flex items-center space-x-2 text-sm"
      >
        {status === 'saving' && (
          <>
            <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
            <span className="text-gray-500">Saving...</span>
          </>
        )}
        
        {status === 'saved' && (
          <>
            <Check className="w-4 h-4 text-green-500" />
            <span className="text-green-600">Saved</span>
          </>
        )}
        
        {status === 'error' && (
          <>
            <AlertCircle className="w-4 h-4 text-red-500" />
            <span className="text-red-600">Error saving</span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}