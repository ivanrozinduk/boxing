import React, { useState } from 'react';
import { Search, Star, Tag, X } from 'lucide-react';

interface Prompt {
  id: string;
  text: string;
  category: string;
  favorite?: boolean;
}

const DEFAULT_PROMPTS: Prompt[] = [
  {
    id: '1',
    text: "What are three things you're grateful for today and why?",
    category: 'Gratitude',
    favorite: true,
  },
  {
    id: '2',
    text: 'What is the hardest problem you solved today?',
    category: 'Self-Reflection',
  },
  {
    id: '3',
    text: 'What is one thing you will be proud of accomplishing today?',
    category: 'Goal Setting',
  },
  {
    id: '4',
    text: 'How are you feeling right now and what might be causing these emotions?',
    category: 'Emotional Awareness',
  },
  {
    id: '5',
    text: 'What new perspective have you gained recently?',
    category: 'Personal Growth',
  },
];

interface JournalPromptSelectorProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function JournalPromptSelector({ onSelectPrompt }: JournalPromptSelectorProps) {
  const [prompts, setPrompts] = useState<Prompt[]>(DEFAULT_PROMPTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(prompts.map(p => p.category)));

  const filteredPrompts = prompts.filter(prompt => {
    const matchesSearch = prompt.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || prompt.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFavorite = (promptId: string) => {
    setPrompts(prev =>
      prev.map(prompt =>
        prompt.id === promptId ? { ...prompt, favorite: !prompt.favorite } : prompt
      )
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search prompts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
            !selectedCategory
              ? 'bg-purple-100 text-purple-700'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          All
        </button>
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-purple-100 text-purple-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Prompts */}
      <div className="space-y-3">
        {filteredPrompts.map(prompt => (
          <div
            key={prompt.id}
            className="group relative p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => onSelectPrompt(prompt.text)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 pr-8">
                <p className="text-gray-900">{prompt.text}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-gray-200 text-gray-700 rounded text-xs">
                  {prompt.category}
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(prompt.id);
                }}
                className={`absolute right-4 top-4 p-1 rounded-full transition-colors ${
                  prompt.favorite
                    ? 'text-yellow-500'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Star className={`w-5 h-5 ${prompt.favorite ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>
        ))}

        {filteredPrompts.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p className="text-lg font-medium text-gray-900">No prompts found</p>
            <p className="mt-1">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}