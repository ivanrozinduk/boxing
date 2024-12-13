import React from 'react';
import { motion } from 'framer-motion';
import { X, BookOpen, Dumbbell, Heart, Target, Activity } from 'lucide-react';

const THEORY_SECTIONS = [
  {
    id: 'principles',
    title: 'Training Principles',
    icon: Dumbbell,
    content: `Understanding fundamental training principles is crucial for effective workouts and 
    sustainable progress.`,
    principles: [
      {
        name: 'Progressive Overload',
        description: 'Gradually increasing the stress placed on the body during exercise training.'
      },
      {
        name: 'Specificity',
        description: 'Training specific to your goals and desired adaptations.'
      },
      {
        name: 'Recovery',
        description: 'Allowing adequate time for muscle repair and adaptation.'
      },
      {
        name: 'Variation',
        description: 'Changing exercises and routines to prevent plateaus.'
      }
    ]
  },
  {
    id: 'techniques',
    title: 'Exercise Techniques',
    icon: Activity,
    content: `Proper form and technique are essential for maximizing results and preventing injury.`,
    techniques: [
      {
        name: 'Breathing',
        description: 'Proper breathing patterns during different exercises.'
      },
      {
        name: 'Range of Motion',
        description: 'Full movement through appropriate exercise ranges.'
      },
      {
        name: 'Tempo',
        description: 'Controlling speed of movement for different goals.'
      },
      {
        name: 'Mind-Muscle Connection',
        description: 'Focusing on targeted muscles during exercises.'
      }
    ]
  },
  {
    id: 'nutrition',
    title: 'Exercise Nutrition',
    icon: Heart,
    content: `Proper nutrition supports your training goals and helps optimize performance and recovery.`,
    guidelines: [
      'Adequate protein intake for muscle recovery',
      'Carbohydrates for energy during workouts',
      'Hydration before, during, and after exercise',
      'Post-workout nutrition timing',
      'Balanced macronutrient ratios'
    ]
  }
];

interface WorkoutTheoryProps {
  onClose: () => void;
}

export default function WorkoutTheory({ onClose }: WorkoutTheoryProps) {
  const [selectedSection, setSelectedSection] = React.useState('principles');

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
            <BookOpen className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">Workout Theory</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 p-4 overflow-y-auto">
            {THEORY_SECTIONS.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`w-full flex items-center space-x-2 p-3 rounded-lg text-left mb-2 transition-colors ${
                    selectedSection === section.id
                      ? 'bg-purple-100 text-purple-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                </button>
              );
            })}
          </div>

          {/* Content */}
          <div className="flex-1 p-6 overflow-y-auto">
            {THEORY_SECTIONS.map((section) => {
              if (section.id !== selectedSection) return null;

              return (
                <div key={section.id} className="space-y-6">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {section.title}
                  </h3>
                  <p className="text-gray-600">{section.content}</p>

                  {section.principles && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.principles.map((principle) => (
                        <div
                          key={principle.name}
                          className="p-4 bg-purple-50 rounded-lg"
                        >
                          <h4 className="font-medium text-purple-900">
                            {principle.name}
                          </h4>
                          <p className="mt-1 text-sm text-purple-700">
                            {principle.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.techniques && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.techniques.map((technique) => (
                        <div
                          key={technique.name}
                          className="p-4 bg-gray-50 rounded-lg"
                        >
                          <h4 className="font-medium text-gray-900">
                            {technique.name}
                          </h4>
                          <p className="mt-1 text-sm text-gray-600">
                            {technique.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.guidelines && (
                    <div className="bg-green-50 rounded-lg p-4">
                      <h4 className="font-medium text-green-900 mb-3">
                        Nutrition Guidelines
                      </h4>
                      <ul className="space-y-2">
                        {section.guidelines.map((guideline, index) => (
                          <li
                            key={index}
                            className="flex items-center text-green-700"
                          >
                            <Target className="w-4 h-4 mr-2" />
                            {guideline}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}