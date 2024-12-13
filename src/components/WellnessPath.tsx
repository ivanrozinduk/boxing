import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, BookOpen, Trophy, Lock } from 'lucide-react';

const modules = [
  {
    title: 'Mindful Beginnings',
    description: 'Start your journey with basic meditation',
    icon: Brain,
    completed: true,
    color: 'bg-purple-500',
  },
  {
    title: 'Body & Soul',
    description: 'Introduction to mindful movement',
    icon: Heart,
    completed: true,
    color: 'bg-pink-500',
  },
  {
    title: 'Daily Reflections',
    description: 'Learn the art of journaling',
    icon: BookOpen,
    completed: false,
    color: 'bg-blue-500',
    current: true,
  },
  {
    title: 'Advanced Techniques',
    description: 'Master advanced wellness practices',
    icon: Trophy,
    completed: false,
    color: 'bg-amber-500',
    locked: true,
  },
];

export default function WellnessPath() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6">Your Wellness Path</h2>
      <div className="space-y-4">
        {modules.map((module, index) => (
          <motion.div
            key={module.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative flex items-center p-4 rounded-xl ${
              module.current ? 'bg-purple-50 border-2 border-purple-200' : 'bg-gray-50'
            } ${module.locked ? 'opacity-50' : ''}`}
          >
            <div className={`p-3 rounded-lg ${module.color}`}>
              <module.icon className="w-6 h-6 text-white" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="font-semibold text-gray-900">{module.title}</h3>
              <p className="text-sm text-gray-600">{module.description}</p>
            </div>
            {module.completed && (
              <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            {module.locked && <Lock className="w-5 h-5 text-gray-400" />}
          </motion.div>
        ))}
      </div>
    </div>
  );
}