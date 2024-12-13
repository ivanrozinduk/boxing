import React from 'react';
import { ChevronRight } from 'lucide-react';
import { useNoteStore } from '../../../stores/noteStore';

interface NoteBreadcrumbsProps {
  path: Array<{ id: string; title: string }>;
}

export default function NoteBreadcrumbs({ path }: NoteBreadcrumbsProps) {
  const { selectNote } = useNoteStore();

  return (
    <nav className="flex items-center space-x-2 text-sm">
      <button
        onClick={() => selectNote(null)}
        className="text-gray-600 hover:text-gray-900"
      >
        All Notes
      </button>
      
      {path.map((item, index) => (
        <React.Fragment key={item.id}>
          <ChevronRight className="w-4 h-4 text-gray-400" />
          <button
            onClick={() => selectNote(item.id)}
            className={`hover:text-purple-600 ${
              index === path.length - 1
                ? 'text-gray-900 font-medium'
                : 'text-gray-600'
            }`}
          >
            {item.title}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
}