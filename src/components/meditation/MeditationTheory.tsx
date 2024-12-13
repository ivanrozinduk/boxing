import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, Brain, Wind, Heart, Sun } from 'lucide-react';

const THEORY_SECTIONS = [
  {
    id: 'basics',
    title: 'Basics of Meditation',
    icon: Brain,
    content: `Meditation is a practice where an individual uses a technique – such as mindfulness, 
    or focusing the mind on a particular object, thought, or activity – to train attention and 
    awareness, and achieve a mentally clear and emotionally calm and stable state.`,
    tips: [
      'Find a quiet, comfortable space',
      'Set aside dedicated time',
      'Start with short sessions',
      'Be patient with yourself'
    ]
  },
  {
    id: 'breathing',
    title: 'Breathing Techniques',
    icon: Wind,
    content: `Proper breathing is fundamental to meditation. Deep, mindful breathing helps calm 
    the nervous system and anchor your attention to the present moment. Common techniques include 
    diaphragmatic breathing, counted breathing, and alternate nostril breathing.`,
    techniques: [
      {
        name: '4-7-8 Breathing',
        description: 'Inhale for 4 counts, hold for 7, exhale for 8'
      },
      {
        name: 'Box Breathing',
        description: 'Equal counts of inhale, hold, exhale, and hold'
      },
      {
        name: 'Ocean Breath',
        description: 'Deep breathing with a slight constriction in the throat'
      }
    ]
  },
  {
    id: 'benefits',
    title: 'Benefits of Practice',
    icon: Heart,
    content: `Regular meditation practice has been scientifically proven to offer numerous 
    physical and mental health benefits.`,
    benefits: [
      'Reduced stress and anxiety',
      'Improved focus and concentration',
      'Better emotional regulation',
      'Enhanced self-awareness',
      'Better sleep quality',
      'Lower blood pressure',
      'Increased mindfulness'
    ]
  },
  {
    id: 'styles',
    title: 'Meditation Styles',
    icon: Sun,
    content: `There are many different meditation styles, each with its own focus and approach. 
    Finding the right style for you is part of the journey.`,
    styles: [
      {
        name: 'Mindfulness Meditation',
        description: 'Observing thoughts without judgment'
      },
      {
        name: 'Focused Meditation',
        description: 'Concentrating on a single point of focus'
      },
      {
        name: 'Loving-Kindness',
        description: 'Cultivating compassion for self and others'
      },
      {
        name: 'Body Scan',
        description: 'Progressive awareness through the body'
      }
    ]
  }
];

interface MeditationTheoryProps {
  onClose: () => void;
}

export default function MeditationTheory({ onClose }: MeditationTheoryProps) {
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
            <h2 className="text-xl font-semibold text-gray-900">Meditation Theory</h2>
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

                      {section.techniques && (
                        <div className="space-y-4 mt-6">
                          <h4 className="font-semibold text-gray-900">
                            Breathing Techniques
                          </h4>
                          {section.techniques.map((technique, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <h5 className="font-medium text-gray-900">
                                {technique.name}
                              </h5>
                              <p className="text-gray-600 text-sm mt-1">
                                {technique.description}
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
                              <Heart className="w-5 h-5" />
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {section.styles && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                          {section.styles.map((style, index) => (
                            <div
                              key={index}
                              className="bg-gray-50 rounded-lg p-4"
                            >
                              <h5 className="font-medium text-gray-900">
                                {style.name}
                              </h5>
                              <p className="text-gray-600 text-sm mt-1">
                                {style.description}
                              </p>
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