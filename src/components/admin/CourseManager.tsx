import React, { useState } from 'react';
import { Plus, GraduationCap, Clock, Users, ChevronRight, Edit, Trash2 } from 'lucide-react';

const MOCK_COURSES = [
  {
    id: '1',
    title: 'Introduction to Mindfulness',
    description: 'Learn the fundamentals of mindfulness meditation and daily practice.',
    duration: '4 weeks',
    enrolled: 156,
    lessons: [
      'Understanding Mindfulness',
      'Breath Awareness',
      'Body Scan Meditation',
      'Mindful Living'
    ],
    status: 'active'
  },
  {
    id: '2',
    title: 'Beginner\'s Yoga Journey',
    description: 'Start your yoga practice with foundational poses and breathing techniques.',
    duration: '6 weeks',
    enrolled: 243,
    lessons: [
      'Yoga Basics',
      'Sun Salutations',
      'Standing Poses',
      'Balance and Flexibility'
    ],
    status: 'draft'
  }
];

export default function CourseManager() {
  const [showNewCourse, setShowNewCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-5 h-5 text-purple-600" />
            <h2 className="text-lg font-semibold text-gray-900">Course Management</h2>
          </div>
          <button
            onClick={() => setShowNewCourse(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Course</span>
          </button>
        </div>

        <div className="space-y-4">
          {MOCK_COURSES.map((course) => (
            <div
              key={course.id}
              className="border border-gray-200 rounded-lg p-4 hover:border-purple-200 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                  
                  <div className="flex items-center space-x-4 mt-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {course.enrolled} enrolled
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      course.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {course.status}
                    </span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Edit className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-4">
                <button
                  onClick={() => setSelectedCourse(selectedCourse === course.id ? null : course.id)}
                  className="flex items-center text-sm text-purple-600 hover:text-purple-700"
                >
                  <span>View Lessons</span>
                  <ChevronRight className={`w-4 h-4 ml-1 transition-transform ${
                    selectedCourse === course.id ? 'rotate-90' : ''
                  }`} />
                </button>

                {selectedCourse === course.id && (
                  <div className="mt-3 pl-4 border-l-2 border-purple-100 space-y-2">
                    {course.lessons.map((lesson, index) => (
                      <div
                        key={index}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mr-2">
                          {index + 1}
                        </div>
                        {lesson}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {showNewCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Course</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Course Title
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Enter course title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows={3}
                  placeholder="Enter course description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="e.g., 4 weeks"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                    <option value="draft">Draft</option>
                    <option value="active">Active</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowNewCourse(false)}
                  className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowNewCourse(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}