import React, { useState } from 'react';
import { WORKOUTS } from '../../data/workouts';
import { Play, Book, GraduationCap } from 'lucide-react';
import WorkoutTheory from './WorkoutTheory';
import WorkoutCourses from './WorkoutCourses';
import PracticeScheme from './PracticeScheme';
import RecordBook from './RecordBook';
import QuizModule from './QuizModule';

export default function WorkoutPlayer() {
  const [showTheory, setShowTheory] = useState(false);
  const [showCourses, setShowCourses] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<typeof WORKOUTS[0] | null>(null);
  const [showPracticeScheme, setShowPracticeScheme] = useState(false);

  return (
    <div className="space-y-6">
      {/* Main Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => setShowCourses(true)}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-purple-200 cursor-pointer transition-colors h-full"
        >
          <GraduationCap className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Courses</h3>
          <p className="text-gray-600 mt-2">
            Structured learning paths with progressive workouts
          </p>
        </div>

        <div
          onClick={() => setShowTheory(true)}
          className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:border-purple-200 cursor-pointer transition-colors h-full"
        >
          <Book className="w-8 h-8 text-purple-600 mb-4" />
          <h3 className="text-lg font-semibold text-gray-900">Theory</h3>
          <p className="text-gray-600 mt-2">
            Learn proper form and training principles
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
          <QuizModule />
        </div>
      </div>

      {/* Record Book Section */}
      <RecordBook />

      {/* Modals */}
      {showTheory && <WorkoutTheory onClose={() => setShowTheory(false)} />}
      {showCourses && <WorkoutCourses onClose={() => setShowCourses(false)} />}
      {showPracticeScheme && selectedWorkout && (
        <PracticeScheme
          workout={selectedWorkout}
          onClose={() => setShowPracticeScheme(false)}
        />
      )}
    </div>
  );
}