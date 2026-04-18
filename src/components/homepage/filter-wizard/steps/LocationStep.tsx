'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin } from 'lucide-react';
import { FilterCheckbox } from '../components/FilterCheckbox';
import { countries } from '../types';
import type { UseFilterWizardReturn } from '../useFilterWizard';

interface LocationStepProps {
  wizard: UseFilterWizardReturn;
}

export function LocationStep({ wizard }: LocationStepProps) {
  const { filters, toggleArrayFilter } = wizard;
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    return countries.filter((country) => country.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const selectedCount = filters.selectedCountry.length;

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Where would you like to live?</h3>
        </div>
        <p className="text-sm text-gray-600">
          Select one or more countries you&apos;re interested in.
          {selectedCount > 0 && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {selectedCount} selected
            </span>
          )}
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search countries..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Country Grid */}
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filteredCountries.map((country) => (
            <FilterCheckbox
              key={country}
              label={country}
              checked={filters.selectedCountry.includes(country)}
              onCheckedChange={() => toggleArrayFilter('selectedCountry', country)}
            />
          ))}
        </div>

        {filteredCountries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No countries match your search.</p>
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="mt-2 text-blue-600 hover:underline text-sm"
            >
              Clear search
            </button>
          </div>
        )}
      </div>

      {/* Quick select */}
      {selectedCount > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedCount} {selectedCount === 1 ? 'country' : 'countries'} selected
            </span>
            <button
              type="button"
              onClick={() => {
                filters.selectedCountry.forEach((country) =>
                  toggleArrayFilter('selectedCountry', country)
                );
              }}
              className="text-sm text-red-600 hover:underline"
            >
              Clear selection
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
