import React, { useState } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

const PROMPT_CATEGORIES = [
  'Gratitude',
  'Self-Reflection',
  'Goal Setting',
  'Emotional Awareness',
  'Personal Growth'
] as const;

const PROMPTS = {
  Gratitude: [
    "List three unexpected moments of joy you experienced today.",
    "Write about someone who made a positive impact on your life recently.",
    "What aspects of your daily routine are you most grateful for?"
  ],
  'Self-Reflection': [
    "Describe a challenge you faced recently and what you learned from it.",
    "How have your priorities shifted in the past year?",
    "What patterns do you notice in your emotional responses?"
  ],
  'Goal Setting': [
    "What is one thing you will be proud of accomplishing today?",
    "What's one small step you can take today toward a larger goal?",
    "Visualize where you want to be in 3 months and write about it.",
    "What habits would you like to develop or change?"
  ],
  'Emotional Awareness': [
    "Describe your current emotional state using metaphors.",
    "What triggered strong emotions today and how did you respond?",
    "Write about a moment when you felt truly at peace."
  ],
  'Personal Growth': [
    "What new perspective have you gained recently?",
    "How have you stepped out of your comfort zone lately?",
    "What would your future self thank you for doing today?"
  ]
};

interface AIPromptGeneratorProps {
  onSelectPrompt: (prompt: string) => void;
}

export default function AIPromptGenerator({ onSelectPrompt }: AIPromptGeneratorProps) {
  const [selectedCategory, setSelectedCategory] = useState<keyof typeof PROMPTS>('Gratitude');
  const [currentPrompt, setCurrentPrompt] = useState('');

  const generatePrompt = () => {
    const prompts = PROMPTS[selectedCategory];
    const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];
    setCurrentPrompt(randomPrompt);
    onSelectPrompt(randomPrompt);
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">AI Prompt Generator</h3>
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {PROMPT_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-100 text-purple-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {currentPrompt && (
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
            <p className="text-gray-900">{currentPrompt}</p>
          </div>
        )}

        <button
          onClick={generatePrompt}
          className="w-full flex items-center justify-center space-x-2 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Generate Prompt</span>
        </button>
      </div>
    </div>
  );
}