'use client';

import { Home, BedDouble, Wrench } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { FilterCheckbox, FilterChip } from '../components/FilterCheckbox';
import { propertyTypeOptions, bedroomOptions, homeConditionOptions } from '../types';
import type { UseFilterWizardReturn } from '../useFilterWizard';

interface PropertyStepProps {
  wizard: UseFilterWizardReturn;
}

const MIN_PRICE = 0;
const MAX_PRICE = 200;

export function PropertyStep({ wizard }: PropertyStepProps) {
  const { filters, updateFilter, toggleArrayFilter } = wizard;

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Price Range Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💰</span>
          <h3 className="text-lg font-semibold text-gray-900">Budget Range (€K)</h3>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <Slider.Root
            value={filters.priceRange}
            onValueChange={(value) =>
              updateFilter('priceRange', [value[0], value[1]] as [number, number])
            }
            className="relative flex h-5 w-full touch-none select-none items-center"
            min={MIN_PRICE}
            max={MAX_PRICE}
            step={10}
          >
            <Slider.Track className="relative h-2 grow rounded-full bg-gray-200">
              <Slider.Range className="absolute h-full rounded-full bg-blue-600" />
            </Slider.Track>
            {[0, 1].map((index) => (
              <Slider.Thumb
                key={index}
                className="block h-5 w-5 rounded-full bg-white shadow-lg border-2 border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-transform hover:scale-110"
                aria-label={index === 0 ? 'Minimum price' : 'Maximum price'}
              />
            ))}
          </Slider.Root>

          <div className="flex items-center justify-between mt-4 gap-4">
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Min</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    updateFilter('priceRange', [Number(e.target.value), filters.priceRange[1]])
                  }
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={MIN_PRICE}
                  max={filters.priceRange[1]}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  K
                </span>
              </div>
            </div>
            <span className="text-gray-400 mt-5">—</span>
            <div className="flex-1">
              <label className="text-xs text-gray-500 mb-1 block">Max</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">€</span>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    updateFilter('priceRange', [filters.priceRange[0], Number(e.target.value)])
                  }
                  className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min={filters.priceRange[0]}
                  max={MAX_PRICE}
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                  K
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Property Type Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Home className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Property Type</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {propertyTypeOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={filters.propertyType.includes(option.value)}
              onCheckedChange={() => toggleArrayFilter('propertyType', option.value)}
            />
          ))}
        </div>
      </div>

      {/* Bedrooms Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <BedDouble className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Bedrooms</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {bedroomOptions.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              checked={filters.bedrooms.includes(option.value)}
              onCheckedChange={() => toggleArrayFilter('bedrooms', option.value)}
            />
          ))}
        </div>
      </div>

      {/* Home Condition Section */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Wrench className="h-5 w-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Home Condition</h3>
        </div>
        <div className="grid grid-cols-1 gap-2">
          {homeConditionOptions.map((option) => (
            <FilterCheckbox
              key={option.value}
              label={option.label}
              checked={filters.homeCondition.includes(option.value)}
              onCheckedChange={() => toggleArrayFilter('homeCondition', option.value)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
