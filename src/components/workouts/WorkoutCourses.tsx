import React, { useState } from 'react';
import { X, GraduationCap, Clock, Users, ChevronRight, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const COURSES = [
  {
    id: '1',
    title: 'Introduction to Mindfulness',
    description: 'Learn the fundamentals of mindfulness meditation and daily practice.',
    duration: '4 weeks',
    enrolled: 156,
    thumbnail: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1000&q=80",
    lessons: [
      { title: 'Understanding Mindfulness', duration: '20 min', completed: true },
      { title: 'Breath Awareness', duration: '15 min', completed: true },
      { title: 'Body Scan Meditation', duration: '25 min', completed: false },
      { title: 'Mindful Living', duration: '30 min', completed: false }
    ],
    progress: 50
  },
  {
    id: '2',
    title: 'Beginner\'s Yoga Journey',
    description: 'Start your yoga practice with foundational poses and breathing techniques.',
    duration: '6 weeks',
    enrolled: 243,
    thumbnail: "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?auto=format&fit=crop&w=1000&q=80",
    lessons: [
      { title: 'Yoga Basics', duration: '30 min', completed: false },
      { title: 'Sun Salutations', duration: '25 min', completed: false },
      { title: 'Standing Poses', duration: '35 min', completed: false },
      { title: 'Balance and Flexibility', duration: '40 min', completed: false }
    ],
    progress: 0
  }
];

interface WorkoutCoursesProps {
  onClose: () => void;
}

export default function WorkoutCourses({ onClose }: WorkoutCoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col"
      >
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Workout Courses</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-1 gap-6">
            {COURSES.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-purple-200 transition-colors"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-48 h-48 md:h-auto relative">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="font-semibold">{course.progress}%</div>
                        <div className="text-sm">Complete</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-6">
                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                    <p className="text-gray-600 mt-1">{course.description}</p>
                    
                    <div className="flex items-center space-x-4 mt-4">
                      <div className="flex items-center text-sm text-gray-600">
                        <Clock className="w-4 h-4 mr-1" />
                        {course.duration}
                      </div>
                      <div className="flex items-center text-sm text-gray-600">
                        <Users className="w-4 h-4 mr-1" />
                        {course.enrolled} enrolled
                      </div>
                    </div>

                    <button
                      onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                      className="flex items-center text-sm text-purple-600 hover:text-purple-700 mt-4"
                    >
                      <span>View Lessons</span>
                      <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${
                        selectedCourse === course.id ? 'rotate-90' : ''
                      }`} />
                    </button>

                    <AnimatePresence>
                      {selectedCourse === course.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="mt-4 space-y-2 overflow-hidden"
                        >
                          {course.lessons.map((lesson, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                            >
                              <div className="flex items-center">
                                <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-3">
                                  {index + 1}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{lesson.title}</div>
                                  <div className="text-sm text-gray-600">{lesson.duration}</div>
                                </div>
                              </div>
                              <button className="p-2 text-purple-600 hover:text-purple-700">
                                <Play className="w-5 h-5" />
                              </button>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}