'use client';

import { Users, Briefcase } from 'lucide-react';
import { FilterCheckbox } from '../components/FilterCheckbox';
import { householdTypeOptions, useOptions } from '../types';
import type { UseFilterWizardReturn } from '../useFilterWizard';

interface LifestyleStepProps {
  wizard: UseFilterWizardReturn;
}

export function LifestyleStep({ wizard }: LifestyleStepProps) {
  const { filters, toggleArrayFilter } = wizard;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Household Type Section */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Users className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Who will be living there?</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Help us understand your household to find the perfect fit.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {householdTypeOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={filters.householdType.includes(option.value)}
              onCheckedChange={() => toggleArrayFilter('householdType', option.value)}
            />
          ))}
        </div>
      </div>

      {/* Use Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Briefcase className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">How will you use this home?</h3>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Select all that apply to help us match properties with the right features.
        </p>
        <div className="grid grid-cols-1 gap-2">
          {useOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={filters.use.includes(option.value)}
              onCheckedChange={() => toggleArrayFilter('use', option.value)}
            />
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-auto p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          <strong>Why does this matter?</strong> Different uses have different requirements - a
          rental property needs different features than a retirement home. This helps us prioritize
          what matters most to you.
        </p>
      </div>
    </div>
  );
}
