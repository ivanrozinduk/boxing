import React from 'react';
import { Users, MessageCircle, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSocialStore } from '../../stores/socialStore';

export default function FriendsList() {
  const friends = useSocialStore((state) => state.friends);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-900">Friends</h3>
        </div>
        <button className="text-purple-600 hover:text-purple-700">
          <UserPlus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {friends.map((friend) => (
          <motion.div
            key={friend.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <img
                src={friend.avatar}
                alt={friend.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-medium text-gray-900">{friend.name}</p>
                <p className="text-sm text-gray-600">
                  Level {friend.level} • {friend.streak} day streak
                </p>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              <MessageCircle className="w-5 h-5" />
            </button>
          </motion.div>
        ))}

        {friends.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No friends added yet</p>
            <button className="mt-2 text-purple-600 hover:text-purple-700 text-sm font-medium">
              Find Friends
            </button>
          </div>
        )}
      </div>
    </div>
  );
}