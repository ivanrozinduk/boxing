import React from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Brain, Dumbbell, BookOpen } from 'lucide-react';

const activities = [
  { name: 'Meditation', icon: Brain, progress: 75, color: '#8B5CF6' },
  { name: 'Workout', icon: Dumbbell, progress: 45, color: '#EC4899' },
  { name: 'Journal', icon: BookOpen, progress: 90, color: '#3B82F6' },
];

export default function DailyProgress() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6">Today's Progress</h2>
      <div className="grid grid-cols-3 gap-6">
        {activities.map((activity) => (
          <div key={activity.name} className="flex flex-col items-center">
            <div className="w-20 h-20 mb-3">
              <CircularProgressbar
                value={activity.progress}
                text={`${activity.progress}%`}
                styles={buildStyles({
                  pathColor: activity.color,
                  textColor: activity.color,
                  trailColor: '#F3F4F6',
                })}
              />
            </div>
            <div className="flex items-center space-x-2">
              <activity.icon className="w-4 h-4" style={{ color: activity.color }} />
              <span className="text-sm font-medium text-gray-600">{activity.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}