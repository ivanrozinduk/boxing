import React from 'react';
import { Bell } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';
import * as Slider from '@radix-ui/react-slider';

interface BellSettingsProps {
  intervalBells: boolean;
  setIntervalBells: (value: boolean) => void;
  intervalMinutes: number;
  setIntervalMinutes: (value: number) => void;
  startingBell: boolean;
  setStartingBell: (value: boolean) => void;
}

export default function BellSettings({
  intervalBells,
  setIntervalBells,
  intervalMinutes,
  setIntervalMinutes,
  startingBell,
  setStartingBell,
}: BellSettingsProps) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Bell className="w-5 h-5 mr-2 text-purple-600" />
        Bell Settings
      </h3>
      
      <div className="space-y-4">
        {/* Starting Bell */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Starting Bell
          </label>
          <Switch.Root
            checked={startingBell}
            onCheckedChange={setStartingBell}
            className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-purple-600 transition-colors"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
          </Switch.Root>
        </div>

        {/* Interval Bells */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-700">
            Interval Bells
          </label>
          <Switch.Root
            checked={intervalBells}
            onCheckedChange={setIntervalBells}
            className="w-11 h-6 bg-gray-200 rounded-full relative data-[state=checked]:bg-purple-600 transition-colors"
          >
            <Switch.Thumb className="block w-4 h-4 bg-white rounded-full transition-transform duration-100 translate-x-1 data-[state=checked]:translate-x-6" />
          </Switch.Root>
        </div>

        {/* Interval Minutes Slider */}
        {intervalBells && (
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Ring every {intervalMinutes} minute{intervalMinutes > 1 ? 's' : ''}
            </label>
            <Slider.Root
              className="relative flex items-center select-none touch-none w-full h-5"
              value={[intervalMinutes]}
              onValueChange={([value]) => setIntervalMinutes(value)}
              max={10}
              min={1}
              step={1}
            >
              <Slider.Track className="bg-gray-200 relative grow rounded-full h-2">
                <Slider.Range className="absolute bg-purple-600 rounded-full h-full" />
              </Slider.Track>
              <Slider.Thumb
                className="block w-5 h-5 bg-white shadow-lg rounded-full hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Interval minutes"
              />
            </Slider.Root>
          </div>
        )}
      </div>
    </div>
  );
}