import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Scale, Calendar, TrendingUp, Plus, Edit2, Trash2, BookOpen, Target, ChevronDown } from 'lucide-react';
import { format } from 'date-fns';
import WorkoutTheory from './WorkoutTheory';

interface WeightEntry {
  id: string;
  date: Date;
  weight: number;
  bodyFat?: number;
  notes?: string;
}

interface ExerciseSet {
  id: string;
  weight: number;
  reps: number;
  rpe?: number; // Rate of Perceived Exertion
}

interface ExerciseEntry {
  id: string;
  name: string;
  sets: ExerciseSet[];
  notes?: string;
}

interface WorkoutEntry {
  id: string;
  date: Date;
  exercises: ExerciseEntry[];
  duration: number;
  type: string;
  notes?: string;
}

interface Goal {
  id: string;
  type: 'weight' | 'strength' | 'endurance';
  target: number;
  deadline: Date;
  achieved?: boolean;
  description: string;
}

export default function RecordBook() {
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [workoutEntries, setWorkoutEntries] = useState<WorkoutEntry[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [showWeightForm, setShowWeightForm] = useState(false);
  const [showWorkoutForm, setShowWorkoutForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);
  const [showTheory, setShowTheory] = useState(false);
  const [newWeight, setNewWeight] = useState('');
  const [newBodyFat, setNewBodyFat] = useState('');
  const [weightNotes, setWeightNotes] = useState('');
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);

  const handleAddWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const weight = parseFloat(newWeight);
    const bodyFat = newBodyFat ? parseFloat(newBodyFat) : undefined;
    if (isNaN(weight)) return;

    const newEntry: WeightEntry = {
      id: crypto.randomUUID(),
      date: new Date(),
      weight,
      bodyFat,
      notes: weightNotes,
    };

    setWeightEntries(prev => [...prev, newEntry].sort((a, b) => b.date.getTime() - a.date.getTime()));
    setNewWeight('');
    setNewBodyFat('');
    setWeightNotes('');
    setShowWeightForm(false);
  };

  const handleAddGoal = (goal: Goal) => {
    setGoals(prev => [...prev, goal]);
    setShowGoalForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Record Book</h2>
        <button
          onClick={() => setShowTheory(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
        >
          <BookOpen className="w-4 h-4" />
          <span>Learn Theory</span>
        </button>
      </div>

      {/* Goals Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold text-gray-900">Fitness Goals</h3>
          </div>
          <button
            onClick={() => setShowGoalForm(true)}
            className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Goal</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {goals.map(goal => (
            <div
              key={goal.id}
              className={`p-4 rounded-lg border ${
                goal.achieved
                  ? 'bg-green-50 border-green-200'
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    {goal.type.charAt(0).toUpperCase() + goal.type.slice(1)}
                  </span>
                  <p className="font-medium text-gray-900 mt-1">{goal.description}</p>
                </div>
                {goal.achieved && (
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                    Achieved
                  </span>
                )}
              </div>
              <div className="mt-4 text-sm text-gray-600">
                Target: {goal.target}
                <br />
                Deadline: {format(goal.deadline, 'MMM d, yyyy')}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weight Tracking */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Scale className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Weight & Body Composition</h3>
            </div>
            <button
              onClick={() => setShowWeightForm(true)}
              className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Entry</span>
            </button>
          </div>

          {showWeightForm && (
            <motion.form
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-4 bg-purple-50 rounded-lg"
              onSubmit={handleAddWeight}
            >
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Body Fat %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newBodyFat}
                    onChange={(e) => setNewBodyFat(e.target.value)}
                    className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes
                </label>
                <input
                  type="text"
                  value={weightNotes}
                  onChange={(e) => setWeightNotes(e.target.value)}
                  className="w-full rounded-lg border-gray-300 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="How are you feeling today?"
                />
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowWeightForm(false)}
                  className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  Save Entry
                </button>
              </div>
            </motion.form>
          )}

          <div className="space-y-3">
            {weightEntries.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <div className="font-medium text-gray-900">{entry.weight} kg</div>
                  {entry.bodyFat && (
                    <div className="text-sm text-gray-600">
                      Body Fat: {entry.bodyFat}%
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    {format(entry.date, 'MMM d, yyyy')}
                  </div>
                  {entry.notes && (
                    <div className="text-sm text-gray-500 mt-1">{entry.notes}</div>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-gray-400 hover:text-gray-600">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {weightEntries.length === 0 && (
              <div className="text-center py-6 text-gray-500">
                No weight entries yet. Start tracking your progress!
              </div>
            )}
          </div>
        </div>

        {/* Exercise Tracking */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold text-gray-900">Exercise Log</h3>
            </div>
            <button
              onClick={() => setShowWorkoutForm(true)}
              className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-700"
            >
              <Plus className="w-4 h-4" />
              <span>Add Workout</span>
            </button>
          </div>

          {workoutEntries.length === 0 ? (
            <div className="text-center py-6 text-gray-500">
              No workout entries yet. Start logging your exercises!
            </div>
          ) : (
            <div className="space-y-4">
              {workoutEntries.map(entry => (
                <div key={entry.id} className="border border-gray-200 rounded-lg">
                  <div
                    className="p-4 flex items-center justify-between cursor-pointer"
                    onClick={() => setSelectedExercise(selectedExercise === entry.id ? null : entry.id)}
                  >
                    <div>
                      <div className="font-medium text-gray-900">
                        {format(entry.date, 'MMM d, yyyy')}
                      </div>
                      <div className="text-sm text-gray-600">
                        {entry.type} • {entry.duration} min
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        selectedExercise === entry.id ? 'transform rotate-180' : ''
                      }`}
                    />
                  </div>

                  {selectedExercise === entry.id && (
                    <div className="border-t border-gray-200 p-4 space-y-4">
                      {entry.exercises.map((exercise, index) => (
                        <div key={index}>
                          <h4 className="font-medium text-gray-900">{exercise.name}</h4>
                          <div className="mt-2 space-y-2">
                            {exercise.sets.map((set, setIndex) => (
                              <div
                                key={setIndex}
                                className="flex items-center space-x-4 text-sm text-gray-600"
                              >
                                <span>Set {setIndex + 1}</span>
                                <span>{set.weight} kg</span>
                                <span>{set.reps} reps</span>
                                {set.rpe && <span>RPE: {set.rpe}</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      {entry.notes && (
                        <div className="text-sm text-gray-600 mt-4">
                          Notes: {entry.notes}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showTheory && <WorkoutTheory onClose={() => setShowTheory(false)} />}
    </div>
  );
}