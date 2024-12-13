import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, Award } from 'lucide-react';

const QUIZ_QUESTIONS = [
  {
    question: "What is Progressive Overload?",
    options: [
      "Gradually increasing workout intensity over time",
      "Doing the same workout every day",
      "Taking longer rest periods",
      "Working out at maximum intensity always"
    ],
    correctAnswer: 0,
    explanation: "Progressive overload is the gradual increase of stress placed on the body during exercise training to stimulate muscle adaptation and prevent plateaus."
  },
  {
    question: "Which principle states that your body adapts specifically to the type of exercise you perform?",
    options: [
      "Progressive Overload",
      "SAID Principle",
      "F.I.T.T. Principle",
      "Energy Balance"
    ],
    correctAnswer: 1,
    explanation: "The Specific Adaptation to Imposed Demands (SAID) principle means your body adapts to the specific type of exercise you do consistently."
  },
  {
    question: "How long should you typically wait before training the same muscle group again?",
    options: [
      "12-24 hours",
      "24-36 hours",
      "48-72 hours",
      "1 week"
    ],
    correctAnswer: 2,
    explanation: "Most muscle groups need 48-72 hours to recover and rebuild after intense training, though this can vary based on training intensity and individual recovery capacity."
  }
];

interface FitnessQuizProps {
  onClose: () => void;
}

export default function FitnessQuiz({ onClose }: FitnessQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);
    
    if (answerIndex === QUIZ_QUESTIONS[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {!quizComplete ? (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900">Fitness Knowledge Quiz</h3>
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {QUIZ_QUESTIONS.length}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="text-lg font-medium text-gray-900">
                {QUIZ_QUESTIONS[currentQuestion].question}
              </h4>

              <div className="space-y-3">
                {QUIZ_QUESTIONS[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`w-full text-left p-4 rounded-lg transition-colors ${
                      selectedAnswer === null
                        ? 'hover:bg-purple-50 border border-gray-200'
                        : selectedAnswer === index
                        ? index === QUIZ_QUESTIONS[currentQuestion].correctAnswer
                          ? 'bg-green-100 border border-green-500'
                          : 'bg-red-100 border border-red-500'
                        : index === QUIZ_QUESTIONS[currentQuestion].correctAnswer
                        ? 'bg-green-100 border border-green-500'
                        : 'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-blue-50 rounded-lg border border-blue-100"
                >
                  <p className="text-blue-900">
                    {QUIZ_QUESTIONS[currentQuestion].explanation}
                  </p>
                </motion.div>
              )}

              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end"
                >
                  <button
                    onClick={handleNext}
                    className="flex items-center space-x-2 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <span>{currentQuestion === QUIZ_QUESTIONS.length - 1 ? 'Finish' : 'Next'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8"
          >
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h3>
            <p className="text-gray-600 mb-6">
              You scored {score} out of {QUIZ_QUESTIONS.length}
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Close
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}