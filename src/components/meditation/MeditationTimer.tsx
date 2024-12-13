import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import useSound from 'use-sound';
import BellSettings from './BellSettings';
import { useSoundStore } from '../../stores/soundStore';
import * as Slider from '@radix-ui/react-slider';
import MeditationTheory from './MeditationTheory';

const BELL_SOUNDS = {
  start: '/tingsha.wav', 
  interval: '/tingsha.wav', 
  end: '/tingsha_end.wav', 
};

export default function MeditationTimer() {
  const [duration, setDuration] = useState(600);
  const [timeLeft, setTimeLeft] = useState(duration);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalBells, setIntervalBells] = useState(false);
  const [intervalMinutes, setIntervalMinutes] = useState(5);
  const [startingBell, setStartingBell] = useState(true);
  const [lastBellTime, setLastBellTime] = useState(0);
  const [showTheory, setShowTheory] = useState(false);

  const { isMuted, volume, setMuted, setVolume } = useSoundStore();

  const [playStartBell] = useSound(BELL_SOUNDS.start, { volume: isMuted ? 0 : volume });
  const [playIntervalBell] = useSound(BELL_SOUNDS.interval, { volume: isMuted ? 0 : volume });
  const [playEndBell] = useSound(BELL_SOUNDS.end, { volume: isMuted ? 0 : volume });

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      if (startingBell && timeLeft === duration) {
        playStartBell();
      }

      interval = window.setInterval(() => {
        setTimeLeft((time) => {
          // Play interval bell
          if (intervalBells) {
            const currentMinute = Math.floor((duration - time) / 60);
            if (currentMinute > lastBellTime && currentMinute % intervalMinutes === 0) {
              playIntervalBell();
              setLastBellTime(currentMinute);
            }
          }
          
          // Play end bell
          if (time === 1) {
            playEndBell();
          }
          
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [
    isRunning, timeLeft, duration, intervalBells, intervalMinutes,
    startingBell, lastBellTime, playStartBell, playIntervalBell, playEndBell
  ]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((duration - timeLeft) / duration) * 100;

  const handleReset = () => {
    setTimeLeft(duration);
    setIsRunning(false);
    setLastBellTime(0);
  };

  const presetTimes = [
    { label: '5 min', value: 300 },
    { label: '10 min', value: 600 },
    { label: '15 min', value: 900 },
    { label: '20 min', value: 1200 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">Meditation Timer</h2>
            <p className="text-gray-600">Find your inner peace</p>
          </div>
          <button
            onClick={() => setShowTheory(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            <BookOpen className="w-4 h-4" />
            <span>Learn Theory</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <motion.div 
              className="w-64 h-64 mx-auto mb-8 relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-semibold text-gray-900">
                  {formatTime(timeLeft)}
                </div>
              </div>
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#E5E7EB"
                  strokeWidth="8"
                  fill="none"
                  className="w-full h-full"
                  style={{ transform: 'scale(3.8)' }}
                />
                <circle
                  cx="32"
                  cy="32"
                  r="28"
                  stroke="#8B5CF6"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - progress / 100)}`}
                  className="w-full h-full transition-all duration-200"
                  style={{ transform: 'scale(3.8)' }}
                />
              </svg>
            </motion.div>

            <div className="flex justify-center space-x-4 mb-8">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className="p-4 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
              >
                {isRunning ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>
              <button
                onClick={handleReset}
                className="p-4 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
              <button
                onClick={() => setMuted(!isMuted)}
                className="p-4 bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors"
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              </button>
            </div>

            {!isMuted && (
              <div className="mb-8 flex items-center space-x-4">
                <Volume2 className="w-4 h-4 text-gray-500" />
                <Slider.Root
                  className="relative flex items-center select-none touch-none w-32 h-5"
                  value={[volume * 100]}
                  onValueChange={([value]) => setVolume(value / 100)}
                  max={100}
                  step={1}
                >
                  <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                    <Slider.Range className="absolute bg-purple-600 rounded-full h-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-4 h-4 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    aria-label="Volume"
                  />
                </Slider.Root>
              </div>
            )}

            <div className="grid grid-cols-4 gap-3">
              {presetTimes.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => {
                    setDuration(preset.value);
                    setTimeLeft(preset.value);
                    setIsRunning(false);
                    setLastBellTime(0);
                  }}
                  className={`py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                    duration === preset.value
                      ? 'bg-purple-100 text-purple-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-1">
            <BellSettings
              intervalBells={intervalBells}
              setIntervalBells={setIntervalBells}
              intervalMinutes={intervalMinutes}
              setIntervalMinutes={setIntervalMinutes}
              startingBell={startingBell}
              setStartingBell={setStartingBell}
            />
          </div>
        </div>
      </div>

      {showTheory && <MeditationTheory onClose={() => setShowTheory(false)} />}
    </div>
  );
}