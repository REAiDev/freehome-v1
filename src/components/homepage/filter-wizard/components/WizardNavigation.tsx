'use client';

import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UseFilterWizardReturn } from '../useFilterWizard';

interface WizardNavigationProps {
  wizard: UseFilterWizardReturn;
}

export function WizardNavigation({ wizard }: WizardNavigationProps) {
  const {
    goBack,
    goNext,
    canGoBack,
    isLastStep,
    isFirstStep,
    isRedirecting,
    handleSubmit,
    hasActiveFilters,
    clearAllFilters,
  } = wizard;

  return (
    <div className="flex flex-col gap-3">
      {/* Primary buttons */}
      <div className="flex gap-3">
        {/* Back button */}
        <button
          type="button"
          onClick={goBack}
          disabled={!canGoBack || isRedirecting}
          className={cn(
            'flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-200',
            'min-w-[100px]',
            canGoBack && !isRedirecting
              ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 active:scale-[0.98]'
              : 'bg-gray-50 text-gray-400 cursor-not-allowed'
          )}
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Next/Submit button */}
        {isLastStep ? (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isRedirecting}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-all duration-200',
              isRedirecting
                ? 'bg-green-500 cursor-wait'
                : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl active:scale-[0.98]'
            )}
          >
            {isRedirecting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Finding Matches...</span>
              </>
            ) : (
              <>
                <span>See My Dream Home</span>
                <ChevronRight className="h-5 w-5" />
              </>
            )}
          </button>
        ) : (
          <button
            type="button"
            onClick={goNext}
            disabled={isRedirecting}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-200',
              'bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg active:scale-[0.98]'
            )}
          >
            <span>{isFirstStep ? 'Get Started' : 'Continue'}</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Secondary actions */}
      <div className="flex items-center justify-between">
        {hasActiveFilters && !isLastStep && (
          <button
            type="button"
            onClick={clearAllFilters}
            disabled={isRedirecting}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            Clear all filters
          </button>
        )}

        {!isLastStep && (
          <button
            type="button"
            onClick={goNext}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors ml-auto"
          >
            Skip this step
          </button>
        )}
      </div>
    </div>
  );
}
