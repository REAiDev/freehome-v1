'use client';

import { Mountain, Waves, Building2, Trees } from 'lucide-react';
import { settingsOptions } from '../types';
import type { UseFilterWizardReturn } from '../useFilterWizard';
import { cn } from '@/lib/utils';

interface PreferencesStepProps {
  wizard: UseFilterWizardReturn;
}

const settingIcons: Record<string, React.ReactNode> = {
  ocean: <Waves className="h-8 w-8" />,
  mountain: <Mountain className="h-8 w-8" />,
  country: <Trees className="h-8 w-8" />,
  city: <Building2 className="h-8 w-8" />,
};

const settingDescriptions: Record<string, string> = {
  ocean: 'Beach access, sea breeze, coastal lifestyle',
  mountain: 'Scenic views, fresh air, nature trails',
  country: 'Rural tranquility, open spaces, privacy',
  city: 'Urban amenities, culture, convenience',
};

export function PreferencesStep({ wizard }: PreferencesStepProps) {
  const { filters, toggleArrayFilter } = wizard;

  const selectedCount = filters.selectedSettings.length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">🏞️</span>
          <h3 className="text-lg font-semibold text-gray-900">What&apos;s your ideal setting?</h3>
        </div>
        <p className="text-sm text-gray-600">
          Choose the environment that suits your lifestyle. Select all that appeal to you.
          {selectedCount > 0 && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {selectedCount} selected
            </span>
          )}
        </p>
      </div>

      {/* Settings Grid - Large Cards */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {settingsOptions.map((option) => {
            const isSelected = filters.selectedSettings.includes(option.value);
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => toggleArrayFilter('selectedSettings', option.value)}
                className={cn(
                  'flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 text-center',
                  'hover:shadow-md active:scale-[0.98]',
                  isSelected
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                )}
              >
                <div
                  className={cn(
                    'mb-3 p-3 rounded-full transition-colors',
                    isSelected ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                  )}
                >
                  {settingIcons[option.value]}
                </div>
                <h4
                  className={cn(
                    'font-semibold mb-1',
                    isSelected ? 'text-blue-900' : 'text-gray-900'
                  )}
                >
                  {option.label}
                </h4>
                <p className="text-xs text-gray-500">{settingDescriptions[option.value]}</p>
                {isSelected && (
                  <div className="mt-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                    Selected
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tip */}
      <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <p className="text-sm text-amber-800">
          <strong>Tip:</strong> Selecting multiple settings helps us find properties that match any
          of your preferences, giving you more options.
        </p>
      </div>
    </div>
  );
}
