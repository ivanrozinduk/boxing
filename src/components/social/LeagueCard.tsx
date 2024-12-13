import React from 'react';
import { Trophy, Users, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

interface LeagueCardProps {
  league: {
    id: string;
    name: string;
    users: Array<{ name: string; points: number }>;
    startDate: Date;
    endDate: Date;
  };
  onJoin: () => void;
}

export default function LeagueCard({ league, onJoin }: LeagueCardProps) {
  const topUsers = league.users
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{league.name}</h3>
          <p className="text-sm text-gray-600 mt-1">
            {format(league.startDate, 'MMM d')} - {format(league.endDate, 'MMM d')}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{league.users.length} participants</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {topUsers.map((user, index) => (
          <div
            key={user.name}
            className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  index === 0
                    ? 'bg-yellow-100 text-yellow-600'
                    : index === 1
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-orange-100 text-orange-600'
                }`}
              >
                {index === 0 ? (
                  <Trophy className="w-4 h-4" />
                ) : (
                  <Star className="w-4 h-4" />
                )}
              </div>
              <span className="font-medium text-gray-900">{user.name}</span>
            </div>
            <span className="font-semibold text-purple-600">
              {user.points} pts
            </span>
          </div>
        ))}
      </div>

      <button
        onClick={onJoin}
        className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
      >
        <span>Join League</span>
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}