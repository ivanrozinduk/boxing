import React from 'react';
import { Trophy, Medal, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSocialStore } from '../../stores/socialStore';

export default function Leaderboard() {
  const leaderboard = useSocialStore((state) => state.leaderboard);

  const getRankIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-orange-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Weekly Leaderboard
      </h3>

      <div className="space-y-4">
        {leaderboard.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-lg ${
              index < 3 ? 'bg-purple-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 flex items-center justify-center">
                {getRankIcon(index)}
              </div>
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">Level {user.level}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-semibold text-purple-600">{user.points} pts</p>
              <p className="text-sm text-gray-600">{user.streak} day streak</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}