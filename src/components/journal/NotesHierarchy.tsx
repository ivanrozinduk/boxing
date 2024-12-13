import React from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface NoteItem {
  id: string;
  title: string;
  type: 'folder' | 'note';
  children?: NoteItem[];
  parentId?: string;
}

interface NotesHierarchyProps {
  items: NoteItem[];
  onSelect: (id: string) => void;
  selectedId?: string;
  level?: number;
}

function NoteTreeItem({ item, onSelect, selectedId, level = 0 }: { item: NoteItem } & Omit<NotesHierarchyProps, 'items'>) {
  const [isExpanded, setIsExpanded] = React.useState(false);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <div
        className={`flex items-center px-2 py-1 rounded-lg cursor-pointer ${
          selectedId === item.id ? 'bg-purple-50' : 'hover:bg-gray-50'
        }`}
        style={{ paddingLeft: `${level * 1.5 + 0.5}rem` }}
        onClick={() => onSelect(item.id)}
        {...listeners}
      >
        {item.type === 'folder' ? (
          <button
            onClick={handleToggle}
            className="p-1 hover:bg-gray-100 rounded-lg mr-1"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRight className="w-4 h-4 text-gray-500" />
            )}
          </button>
        ) : (
          <File className="w-4 h-4 text-gray-400 mx-1.5" />
        )}
        <span className="text-sm text-gray-700">{item.title}</span>
      </div>

      {item.type === 'folder' && isExpanded && item.children && (
        <NotesHierarchy
          items={item.children}
          onSelect={onSelect}
          selectedId={selectedId}
          level={level + 1}
        />
      )}
    </div>
  );
}

export default function NotesHierarchy({
  items,
  onSelect,
  selectedId,
  level = 0,
}: NotesHierarchyProps) {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <NoteTreeItem
          key={item.id}
          item={item}
          onSelect={onSelect}
          selectedId={selectedId}
          level={level}
        />
      ))}
    </div>
  );
}