import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Trophy, Star, ArrowRight } from 'lucide-react';

const QUIZ_TOPICS = [
  {
    id: 'progressive-overload',
    title: 'Progressive Overload',
    description: 'Learn how to gradually increase workout intensity',
    icon: Brain,
    unlocked: true,
  },
  {
    id: 'form-technique',
    title: 'Form & Technique',
    description: 'Master proper exercise execution',
    icon: Star,
    unlocked: true,
  },
  {
    id: 'nutrition',
    title: 'Nutrition Basics',
    description: 'Understand fundamental nutrition principles',
    icon: Trophy,
    unlocked: false,
  },
];

export default function QuizModule() {
  return (
    <div className="h-full">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Fitness Knowledge Path</h3>
      <div className="space-y-4">
        {QUIZ_TOPICS.map((topic) => (
          <motion.div
            key={topic.id}
            whileHover={topic.unlocked ? { scale: 1.02 } : undefined}
            className={`relative p-4 rounded-lg border ${
              topic.unlocked
                ? 'border-purple-200 hover:border-purple-300 cursor-pointer'
                : 'border-gray-200 opacity-75'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                topic.unlocked ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <topic.icon className={`w-5 h-5 ${
                  topic.unlocked ? 'text-purple-600' : 'text-gray-400'
                }`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{topic.title}</h4>
                <p className="text-sm text-gray-600">{topic.description}</p>
              </div>
              {topic.unlocked && (
                <ArrowRight className="w-5 h-5 text-gray-400 ml-auto" />
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}