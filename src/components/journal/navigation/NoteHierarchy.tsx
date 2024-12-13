import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { useNoteStore } from '../../../stores/noteStore';

interface NoteItemProps {
  id: string;
  title: string;
  hasChildren: boolean;
  isExpanded: boolean;
  onToggle: () => void;
  level: number;
}

function NoteItem({
  id,
  title,
  hasChildren,
  isExpanded,
  onToggle,
  level,
}: NoteItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    paddingLeft: `${level * 1.5}rem`,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="flex items-center py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
        <button
          onClick={onToggle}
          className="p-1 hover:bg-gray-100 rounded-lg mr-1"
        >
          {hasChildren ? (
            isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )
          ) : (
            <File className="w-4 h-4 text-gray-400" />
          )}
        </button>
        <span className="text-sm text-gray-900">{title}</span>
      </div>
    </div>
  );
}

export default function NoteHierarchy() {
  const { notes, selectedNoteId, selectNote } = useNoteStore();
  const [expandedNotes, setExpandedNotes] = React.useState<Set<string>>(new Set());

  const toggleExpanded = (noteId: string) => {
    setExpandedNotes(prev => {
      const next = new Set(prev);
      if (next.has(noteId)) {
        next.delete(noteId);
      } else {
        next.add(noteId);
      }
      return next;
    });
  };

  const renderNoteTree = (parentId: string | null = null, level = 0) => {
    const children = notes.filter(note => note.parentId === parentId);
    
    return children.map(note => (
      <React.Fragment key={note.id}>
        <NoteItem
          id={note.id}
          title={note.title}
          hasChildren={notes.some(n => n.parentId === note.id)}
          isExpanded={expandedNotes.has(note.id)}
          onToggle={() => toggleExpanded(note.id)}
          level={level}
        />
        {expandedNotes.has(note.id) && renderNoteTree(note.id, level + 1)}
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-1">
      <div className="font-medium text-gray-900 mb-4">All Notes</div>
      {renderNoteTree()}
    </div>
  );
}