'use client';

import { MapPin, Home, Mountain, Users, Pencil } from 'lucide-react';
import {
  propertyTypeOptions,
  bedroomOptions,
  homeConditionOptions,
  settingsOptions,
  householdTypeOptions,
  useOptions,
} from '../types';
import type { UseFilterWizardReturn } from '../useFilterWizard';
import { cn } from '@/lib/utils';

interface ReviewStepProps {
  wizard: UseFilterWizardReturn;
}

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  items: string[];
  onEdit: () => void;
  emptyMessage: string;
}

function SummaryCard({ icon, title, items, onEdit, emptyMessage }: SummaryCardProps) {
  const hasItems = items.length > 0;

  return (
    <div
      className={cn(
        'p-4 rounded-lg border',
        hasItems ? 'bg-white border-gray-200' : 'bg-gray-50 border-gray-200'
      )}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              'p-1.5 rounded-md',
              hasItems ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-400'
            )}
          >
            {icon}
          </div>
          <h4 className="font-medium text-gray-900">{title}</h4>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-colors"
        >
          <Pencil className="h-3 w-3" />
          Edit
        </button>
      </div>

      {hasItems ? (
        <div className="flex flex-wrap gap-1.5">
          {items.map((item) => (
            <span
              key={item}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {item}
            </span>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500 italic">{emptyMessage}</p>
      )}
    </div>
  );
}

export function ReviewStep({ wizard }: ReviewStepProps) {
  const { filters, goToStep, hasActiveFilters, isRedirecting } = wizard;

  // Helper to get label from value
  const getLabels = (values: string[], options: { label: string; value: string }[]) => {
    return values.map((val) => options.find((opt) => opt.value === val)?.label || val);
  };

  // Build price string
  const getPriceString = (): string[] => {
    const [min, max] = filters.priceRange;
    if (min === 0 && max === 200) return [];
    if (min === 0) return [`Up to €${max}K`];
    if (max === 200) return [`From €${min}K+`];
    return [`€${min}K - €${max}K`];
  };

  // Combine property filters
  const propertyItems = [
    ...getPriceString(),
    ...getLabels(filters.propertyType, propertyTypeOptions),
    ...filters.bedrooms.map(
      (b) => `${bedroomOptions.find((opt) => opt.value === b)?.label || b} BR`
    ),
    ...getLabels(filters.homeCondition, homeConditionOptions),
  ];

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-2xl">✨</span>
          <h3 className="text-lg font-semibold text-gray-900">Review Your Preferences</h3>
        </div>
        <p className="text-sm text-gray-600">
          {hasActiveFilters
            ? "Here's a summary of your search criteria. Click Edit to make changes."
            : "You haven't selected any filters yet. Go back to customize your search."}
        </p>
      </div>

      {/* Summary Cards */}
      <div className="flex-1 overflow-y-auto space-y-3">
        <SummaryCard
          icon={<MapPin className="h-4 w-4" />}
          title="Location"
          items={filters.selectedCountry}
          onEdit={() => goToStep('location')}
          emptyMessage="Any country"
        />

        <SummaryCard
          icon={<Home className="h-4 w-4" />}
          title="Property Details"
          items={propertyItems}
          onEdit={() => goToStep('property')}
          emptyMessage="Any property type"
        />

        <SummaryCard
          icon={<Mountain className="h-4 w-4" />}
          title="Setting Preferences"
          items={getLabels(filters.selectedSettings, settingsOptions)}
          onEdit={() => goToStep('preferences')}
          emptyMessage="Any setting"
        />

        <SummaryCard
          icon={<Users className="h-4 w-4" />}
          title="Lifestyle"
          items={[
            ...getLabels(filters.householdType, householdTypeOptions),
            ...getLabels(filters.use, useOptions),
          ]}
          onEdit={() => goToStep('lifestyle')}
          emptyMessage="Any lifestyle"
        />
      </div>

      {/* Trust Signals */}
      <div className="mt-6 space-y-3">
        <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <span className="text-green-500">✓</span>
            <strong>AI-Powered</strong> Matching
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-500">✓</span>
            <strong>20+</strong> Countries
          </span>
          <span className="flex items-center gap-1">
            <span className="text-green-500">✓</span>
            <strong>Instant</strong> Results
          </span>
        </div>

        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
          <p className="text-sm text-center text-gray-700">
            Our AI system will customize and continuously update your matches based on your
            preferences.
          </p>
        </div>

        {isRedirecting && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium text-center text-sm">
              Preparing your personalized property matches...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
