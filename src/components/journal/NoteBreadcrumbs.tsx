import React from 'react';
import { ChevronRight } from 'lucide-react';

interface Breadcrumb {
  id: string;
  title: string;
}

interface NoteBreadcrumbsProps {
  path: Breadcrumb[];
  onNavigate: (id: string) => void;
}

export default function NoteBreadcrumbs({ path, onNavigate }: NoteBreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm">
      {path.map((item, index) => (
        <React.Fragment key={item.id}>
          {index > 0 && <ChevronRight className="w-4 h-4 text-gray-400" />}
          <button
            onClick={() => onNavigate(item.id)}
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