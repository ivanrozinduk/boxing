import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { format, eachDayOfInterval, subDays, isSameDay } from 'date-fns';
import { useProgressStore } from '../../stores/progressStore';

export default function HabitTracker() {
  const activities = useProgressStore((state) => state.activities);
  const today = new Date();
  const last30Days = eachDayOfInterval({
    start: subDays(today, 29),
    end: today,
  });

  const getActivityCountForDay = (date: Date) => {
    return activities.filter((activity) =>
      isSameDay(new Date(activity.completedAt), date)
    ).length;
  };

  const getColorForCount = (count: number) => {
    if (count === 0) return 'bg-gray-100';
    if (count === 1) return 'bg-purple-200';
    if (count === 2) return 'bg-purple-400';
    return 'bg-purple-600';
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-6">
        <Calendar className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Habit Tracker</h3>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {last30Days.map((date, index) => (
          <motion.div
            key={date.toISOString()}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.02 }}
            className="relative group"
          >
            <div
              className={`aspect-square rounded-lg ${
                getColorForCount(getActivityCountForDay(date))
              }`}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-gray-900 text-white text-xs rounded px-2 py-1">
                {format(date, 'MMM d')}
                <br />
                {getActivityCountForDay(date)} activities
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 rounded" />
          <span>No activity</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-600 rounded" />
          <span>3+ activities</span>
        </div>
      </div>
    </div>
  );
}