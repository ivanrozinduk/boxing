import React from 'react';
import { motion } from 'framer-motion';
import { X, Clock, Dumbbell, Heart, RotateCcw } from 'lucide-react';

interface Exercise {
  name: string;
  reps?: string;
  duration?: string;
  rest?: string;
}

interface Scheme {
  sets: number;
  duration: number;
  exercises: Exercise[];
}

interface Workout {
  id: number;
  title: string;
  duration: string;
  level: string;
  type: string;
  intensity: string;
  equipment: string[];
  focus: string[];
  scheme: Scheme;
}

interface PracticeSchemeProps {
  workout: Workout;
  onClose: () => void;
}

export default function PracticeScheme({ workout, onClose }: PracticeSchemeProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl w-full max-w-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">{workout.title}</h2>
            <div className="flex items-center space-x-3 mt-2">
              <span className="inline-flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {workout.duration}
              </span>
              <span className="inline-flex items-center text-sm text-gray-600">
                <Dumbbell className="w-4 h-4 mr-1" />
                {workout.type}
              </span>
              <span className="inline-flex items-center text-sm text-gray-600">
                <Heart className="w-4 h-4 mr-1" />
                {workout.level}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-900">Practice Scheme</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <RotateCcw className="w-4 h-4" />
                <span>{workout.scheme.sets} sets</span>
              </div>
            </div>

            <div className="space-y-4">
              {workout.scheme.exercises.map((exercise, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-gray-900">{exercise.name}</div>
                      <div className="text-sm text-gray-600 mt-1">
                        {exercise.reps && <span>{exercise.reps}</span>}
                        {exercise.duration && <span>{exercise.duration}</span>}
                        {exercise.rest && (
                          <span className="text-purple-600 ml-2">
                            Rest: {exercise.rest}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-medium">
                      {index + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-purple-50 rounded-lg p-4">
            <h4 className="font-medium text-purple-900 mb-2">Equipment Needed</h4>
            <div className="flex flex-wrap gap-2">
              {workout.equipment.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-6 w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Start Workout
          </button>
        </div>
      </motion.div>
    </div>
  );
}