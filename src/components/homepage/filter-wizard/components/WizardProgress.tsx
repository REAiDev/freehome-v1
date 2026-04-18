'use client';

import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WIZARD_STEPS } from '../types';
import type { UseFilterWizardReturn } from '../useFilterWizard';

interface WizardProgressProps {
  wizard: UseFilterWizardReturn;
}

export function WizardProgress({ wizard }: WizardProgressProps) {
  const { currentStep, currentStepIndex, goToStep, getStepFilterCount } = wizard;

  return (
    <div className="w-full">
      {/* Mobile: Simple progress bar */}
      <div className="sm:hidden">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-900">
            Step {currentStepIndex + 1} of {WIZARD_STEPS.length}
          </span>
          <span className="text-sm text-gray-600">{WIZARD_STEPS[currentStepIndex].title}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-300 ease-out"
            style={{
              width: `${((currentStepIndex + 1) / WIZARD_STEPS.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Desktop: Full step indicator */}
      <div className="hidden sm:block">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {WIZARD_STEPS.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = step.id === currentStep;
              const filterCount = getStepFilterCount(step.id);

              return (
                <li key={step.id} className="flex-1 relative">
                  {/* Connector line */}
                  {index < WIZARD_STEPS.length - 1 && (
                    <div className="absolute top-5 left-1/2 w-full h-0.5" aria-hidden="true">
                      <div
                        className={cn(
                          'h-full transition-colors duration-200',
                          index < currentStepIndex ? 'bg-blue-600' : 'bg-gray-200'
                        )}
                      />
                    </div>
                  )}

                  {/* Step button */}
                  <button
                    type="button"
                    onClick={() => goToStep(step.id)}
                    className="relative flex flex-col items-center group cursor-pointer"
                  >
                    {/* Circle */}
                    <span
                      className={cn(
                        'flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 relative',
                        isCompleted
                          ? 'bg-blue-600 border-blue-600 group-hover:bg-blue-700'
                          : isCurrent
                            ? 'bg-white border-blue-600 ring-4 ring-blue-100'
                            : 'bg-white border-gray-300 group-hover:border-blue-400 group-hover:bg-blue-50'
                      )}
                    >
                      {isCompleted ? (
                        <Check className="w-5 h-5 text-white" strokeWidth={3} />
                      ) : (
                        <span
                          className={cn(
                            'text-sm font-semibold',
                            isCurrent ? 'text-blue-600' : 'text-gray-500'
                          )}
                        >
                          {step.icon}
                        </span>
                      )}

                      {/* Filter count badge */}
                      {filterCount > 0 && (
                        <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-blue-600 text-white text-xs font-bold rounded-full">
                          {filterCount}
                        </span>
                      )}
                    </span>

                    {/* Label */}
                    <span
                      className={cn(
                        'mt-2 text-xs font-medium transition-colors',
                        isCurrent
                          ? 'text-blue-600'
                          : isCompleted
                            ? 'text-gray-900 group-hover:text-blue-600'
                            : 'text-gray-500 group-hover:text-blue-600'
                      )}
                    >
                      {step.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
