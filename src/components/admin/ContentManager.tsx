import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Video, FileText, 
  Music, Image as ImageIcon, MoreVertical 
} from 'lucide-react';

const MOCK_CONTENT = [
  {
    id: '1',
    title: 'Morning Meditation Guide',
    type: 'video',
    category: 'meditation',
    author: 'Sarah Johnson',
    status: 'published',
    lastModified: '2024-02-28',
  },
  {
    id: '2',
    title: 'Mindfulness Journal Prompts',
    type: 'document',
    category: 'journaling',
    author: 'Michael Chen',
    status: 'draft',
    lastModified: '2024-02-27',
  },
];

const CONTENT_TYPES = {
  video: { icon: Video, color: 'text-blue-500 bg-blue-100' },
  document: { icon: FileText, color: 'text-purple-500 bg-purple-100' },
  audio: { icon: Music, color: 'text-green-500 bg-green-100' },
  image: { icon: ImageIcon, color: 'text-amber-500 bg-amber-100' },
};

export default function ContentManager() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="meditation">Meditation</option>
              <option value="fitness">Fitness</option>
              <option value="journaling">Journaling</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
              <Plus className="w-5 h-5" />
              <span>Add Content</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_CONTENT.map((content) => {
            const TypeIcon = CONTENT_TYPES[content.type as keyof typeof CONTENT_TYPES].icon;
            const iconColor = CONTENT_TYPES[content.type as keyof typeof CONTENT_TYPES].color;

            return (
              <div
                key={content.id}
                className="relative group bg-white rounded-lg border border-gray-200 p-4 hover:border-purple-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className={`p-2 rounded-lg ${iconColor}`}>
                    <TypeIcon className="w-5 h-5" />
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                <div className="mt-4">
                  <h3 className="font-medium text-gray-900">{content.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">By {content.author}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    content.status === 'published' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {content.status}
                  </span>
                  <span className="text-sm text-gray-500">{content.lastModified}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}