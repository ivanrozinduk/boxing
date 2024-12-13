import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Pencil, Brain, Target } from 'lucide-react';

const THEORY_SECTIONS = [
  {
    id: 'basics',
    title: 'Journaling Fundamentals',
    icon: Pencil,
    content: `Journaling is a powerful tool for self-reflection, personal growth, and emotional 
    well-being. It provides a safe space to explore thoughts, feelings, and experiences.`,
    tips: [
      'Write without judgment',
      'Be honest with yourself',
      'Make it a regular habit',
      'Find your preferred time'
    ]
  },
  {
    id: 'techniques',
    title: 'Writing Techniques',
    icon: Brain,
    content: `Different journaling techniques serve different purposes. Experiment with various 
    methods to find what works best for you.`,
    methods: [
      {
        name: 'Stream of Consciousness',
        description: 'Write whatever comes to mind without editing'
      },
      {
        name: 'Gratitude Journal',
        description: "Focus on things you're thankful for"
      },
      {
        name: 'Structured Prompts',
        description: 'Respond to specific questions or topics'
      },
      {
        name: 'Goal Setting',
        description: 'Document and track your objectives'
      }
    ]
  },
  {
    id: 'benefits',
    title: 'Benefits of Journaling',
    icon: Target,
    content: `Regular journaling practice offers numerous mental health and personal development benefits.`,
    benefits: [
      'Reduced stress and anxiety',
      'Improved self-awareness',
      'Better problem-solving skills',
      'Enhanced creativity',
      'Emotional processing',
      'Goal clarity',
      'Memory improvement'
    ]
  }
];

interface JournalTheoryProps {
  onClose: () => void;
}

export default function JournalTheory({ onClose }: JournalTheoryProps) {
  const [selectedSection, setSelectedSection] = React.useState('basics');

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
            <h2 className="text-xl font-semibold text-gray-900">Journal Theory</h2>
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
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                {THEORY_SECTIONS.map((section) => {
                  if (section.id !== selectedSection) return null;

                  return (
                    <div key={section.id}>
                      <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                        {section.title}
                      </h3>
                      <p className="text-gray-600 mb-6">{section.content}</p>

                      {section.tips && (
                        <div className="bg-purple-50 rounded-lg p-4">
                          <h4 className="font-semibold text-purple-900 mb-3">
                            Key Tips
                          </h4>
                          <ul className="space-y-2">
                            {section.tips.map((tip, index) => (
                              <li key={index} className="flex items-center text-purple-700">
                                <span className="w-2 h-2 bg-purple-500 rounded-full mr-2" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.methods && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          {section.methods.map((method, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <h5 className="font-medium text-gray-900">
                                {method.name}
                              </h5>
                              <p className="text-gray-600 text-sm mt-1">
                                {method.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.benefits && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          {section.benefits.map((benefit, index) => (
                            <div
                              key={index}
                              className="flex items-center space-x-2 bg-green-50 text-green-700 rounded-lg p-3"
                            >
                              <Target className="w-5 h-5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}