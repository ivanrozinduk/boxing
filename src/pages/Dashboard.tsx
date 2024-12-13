import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from '../components/Header';
import DailyProgress from '../components/DailyProgress';
import WellnessPath from '../components/WellnessPath';
import MeditationTimer from '../components/meditation/MeditationTimer';
import SoundscapeSelector from '../components/meditation/SoundscapeSelector';
import JournalEditor from '../components/journal/JournalEditor';
import WorkoutPlayer from '../components/workouts/WorkoutPlayer';
import LeagueCard from '../components/social/LeagueCard';
import FriendsList from '../components/social/FriendsList';
import Leaderboard from '../components/social/Leaderboard';
import WeeklyChallenge from '../components/social/WeeklyChallenge';
import AdminDashboard from '../components/admin/AdminDashboard';
import AITutor from '../components/learn/AITutor';
import CommunitySupport from '../components/community/CommunitySupport';
import * as Tabs from '@radix-ui/react-tabs';
import { Brain, BookOpen, Dumbbell, Users, GraduationCap, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { id: 'meditation', label: 'Meditation', icon: Brain },
  { id: 'journal', label: 'Journal', icon: BookOpen },
  { id: 'workouts', label: 'Workouts', icon: Dumbbell },
  { id: 'learn', label: 'Learn', icon: GraduationCap },
  { id: 'community', label: 'Community', icon: Users },
];

export default function Dashboard() {
  const [showCommunitySupport, setShowCommunitySupport] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAdmin = true;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-16 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Routes>
            <Route
              path="admin/*"
              element={isAdmin ? <AdminDashboard /> : <Navigate to="/dashboard" />}
            />
            <Route
              path="*"
              element={
                <Tabs.Root defaultValue="meditation" className="space-y-6">
                  {/* Mobile Menu Button */}
                  <div className="lg:hidden flex justify-end pt-4">
                    <button
                      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                      className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100"
                    >
                      {isMobileMenuOpen ? (
                        <X className="w-6 h-6" />
                      ) : (
                        <Menu className="w-6 h-6" />
                      )}
                    </button>
                  </div>

                  {/* Mobile Menu */}
                  <AnimatePresence>
                    {isMobileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden"
                      >
                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                          {tabs.map(({ id, label, icon: Icon }) => (
                            <Tabs.Trigger
                              key={id}
                              value={id}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="w-full flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700"
                            >
                              <Icon className="w-5 h-5 mr-3" />
                              {label}
                            </Tabs.Trigger>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Desktop Navigation */}
                  <div className="hidden lg:block sticky top-16 z-10 bg-gray-50 pt-4 pb-2">
                    <Tabs.List className="flex gap-1 bg-white p-1 rounded-lg shadow-sm border border-gray-100 max-w-2xl mx-auto">
                      {tabs.map(({ id, label, icon: Icon }) => (
                        <Tabs.Trigger
                          key={id}
                          value={id}
                          className="flex-1 flex items-center justify-center px-3 py-2.5 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50 data-[state=active]:bg-purple-100 data-[state=active]:text-purple-700 transition-colors"
                        >
                          <Icon className="w-4 h-4 sm:mr-2" />
                          <span className="hidden sm:inline">{label}</span>
                        </Tabs.Trigger>
                      ))}
                    </Tabs.List>
                  </div>

                  <div className="mt-6">
                    <Tabs.Content value="meditation" className="space-y-6">
                      <div className="max-w-4xl mx-auto">
                        <MeditationTimer />
                        <div className="mt-6">
                          <SoundscapeSelector />
                        </div>
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="journal">
                      <div className="max-w-4xl mx-auto">
                        <JournalEditor />
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="workouts">
                      <div className="max-w-6xl mx-auto">
                        <WorkoutPlayer />
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="learn">
                      <div className="max-w-6xl mx-auto">
                        <AITutor />
                      </div>
                    </Tabs.Content>

                    <Tabs.Content value="community">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-4 sm:p-6 text-white">
                            <h2 className="text-xl font-semibold mb-2">Join Our Supportive Community</h2>
                            <p className="mb-4 text-sm sm:text-base">Connect with like-minded individuals on your wellness journey</p>
                            <button
                              onClick={() => setShowCommunitySupport(true)}
                              className="w-full sm:w-auto px-4 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100"
                            >
                              Join Community
                            </button>
                          </div>
                          <Leaderboard />
                          <WeeklyChallenge />
                        </div>
                        <div className="space-y-6">
                          <FriendsList />
                          <LeagueCard
                            league={{
                              id: '1',
                              name: 'Wellness Warriors',
                              users: [
                                { name: 'Sarah K.', points: 1250 },
                                { name: 'Mike R.', points: 1100 },
                                { name: 'Emma L.', points: 950 },
                              ],
                              startDate: new Date(),
                              endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                            }}
                            onJoin={() => {}}
                          />
                        </div>
                      </div>
                    </Tabs.Content>
                  </div>
                </Tabs.Root>
              }
            />
          </Routes>
        </div>
      </main>

      {showCommunitySupport && (
        <CommunitySupport onClose={() => setShowCommunitySupport(false)} />
      )}
    </div>
  );
}