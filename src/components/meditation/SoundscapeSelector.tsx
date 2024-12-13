import React, { useCallback } from 'react';
import { Volume2, Music } from 'lucide-react';
import useSound from 'use-sound';
import { useSoundStore } from '../../stores/soundStore';

const SOUNDSCAPES = [
  { id: 'rain', label: 'Rainfall', url: '/rain.wav' }, // Assuming rain.wav is in the public folder
  { id: 'waves', label: 'Ocean Waves', url: '/waves.wav' }, // Assuming waves.wav is in the public folder
  { id: 'forest', label: 'Forest Birds', url: '/forest.wav' }, // Assuming forest.wav is in the public folder
];


export default function SoundscapeSelector() {
  const [activeSound, setActiveSound] = React.useState<string | null>(null);
  const { isMuted, volume } = useSoundStore();
  
  const [play, { stop }] = useSound(activeSound || SOUNDSCAPES[0].url, {
    volume: isMuted ? 0 : volume,
  });

  const handleSoundToggle = useCallback((soundId: string) => {
    if (activeSound === soundId) {
      stop();
      setActiveSound(null);
    } else {
      stop();
      setActiveSound(soundId);
      play();
    }
  }, [activeSound, play, stop]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center space-x-2 mb-4">
        <Music className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Ambient Soundscapes</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {SOUNDSCAPES.map((sound) => (
          <button
            key={sound.id}
            onClick={() => handleSoundToggle(sound.url)}
            className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-lg transition-colors ${
              activeSound === sound.url
                ? 'bg-purple-100 text-purple-700 ring-2 ring-purple-500 ring-opacity-50'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Volume2 className="w-4 h-4" />
            <span className="font-medium">{sound.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}