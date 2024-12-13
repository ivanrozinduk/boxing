import React from 'react';
import { Target, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const challenges = [
  {
    id: 1,
    title: 'Meditation Master',
    description: 'Complete 7 meditation sessions',
    reward: 500,
    progress: 3,
    total: 7,
  },
  {
    id: 2,
    title: 'Workout Warrior',
    description: 'Finish 5 workout videos',
    reward: 400,
    progress: 2,
    total: 5,
  },
  {
    id: 3,
    title: 'Mindful Journaling',
    description: 'Write 3 journal entries',
    reward: 300,
    progress: 3,
    total: 3,
    completed: true,
  },
];

export default function WeeklyChallenge() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Target className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Weekly Challenges</h3>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 rounded-lg ${
              challenge.completed ? 'bg-green-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium text-gray-900">{challenge.title}</h4>
                <p className="text-sm text-gray-600 mt-1">
                  {challenge.description}
                </p>
              </div>
              {challenge.completed && (
                <CheckCircle2 className="w-5 h-5 text-green-500" />
              )}
            </div>

            {!challenge.completed && (
              <>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{
                      width: `${(challenge.progress / challenge.total) * 100}%`,
                    }}
                  />
                </div>
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-600">
                    {challenge.progress}/{challenge.total} completed
                  </span>
                  <span className="font-medium text-purple-600">
                    +{challenge.reward} pts
                  </span>
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}