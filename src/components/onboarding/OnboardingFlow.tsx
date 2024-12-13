import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Dumbbell, BookOpen, Target } from 'lucide-react';

interface Goal {
  id: string;
  icon: typeof Brain;
  title: string;
  description: string;
}

const goals: Goal[] = [
  {
    id: 'meditation',
    icon: Brain,
    title: 'Mindfulness & Meditation',
    description: 'Reduce stress and improve focus through daily meditation practice'
  },
  {
    id: 'fitness',
    icon: Dumbbell,
    title: 'Physical Fitness',
    description: 'Build strength and endurance with guided workout sessions'
  },
  {
    id: 'journaling',
    icon: BookOpen,
    title: 'Self-Reflection',
    description: 'Develop self-awareness through guided journaling'
  },
  {
    id: 'goals',
    icon: Target,
    title: 'Goal Setting',
    description: 'Track progress and achieve personal wellness milestones'
  }
];

export default function OnboardingFlow() {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [step, setStep] = useState(0);

  const handleGoalToggle = (goalId: string) => {
    setSelectedGoals(prev =>
      prev.includes(goalId)
        ? prev.filter(id => id !== goalId)
        : [...prev, goalId]
    );
  };

  const handleComplete = () => {
    // TODO: Save user preferences and redirect to dashboard
    console.log('Selected goals:', selectedGoals);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-sm p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to Rozin</h2>
          <p className="text-gray-600 mb-8">Let's personalize your wellness journey</p>

          <div className="space-y-4">
            {goals.map((goal) => (
              <motion.button
                key={goal.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleGoalToggle(goal.id)}
                className={`w-full flex items-start p-4 rounded-lg border-2 transition-colors ${
                  selectedGoals.includes(goal.id)
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`p-3 rounded-lg ${
                  selectedGoals.includes(goal.id) ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <goal.icon className={`w-6 h-6 ${
                    selectedGoals.includes(goal.id) ? 'text-purple-600' : 'text-gray-600'
                  }`} />
                </div>
                <div className="ml-4 text-left">
                  <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{goal.description}</p>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-8">
            <button
              onClick={handleComplete}
              disabled={selectedGoals.length === 0}
              className="w-full py-3 px-4 rounded-lg bg-purple-600 text-white font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}