'use client';

import { useFilterWizard } from './useFilterWizard';
import { WizardProgress } from './components/WizardProgress';
import { WizardNavigation } from './components/WizardNavigation';
import { LocationStep, PropertyStep, PreferencesStep, LifestyleStep, ReviewStep } from './steps';
import { cn } from '@/lib/utils';

interface FilterWizardProps {
  className?: string;
}

export function FilterWizard({ className }: FilterWizardProps) {
  const wizard = useFilterWizard();
  const { currentStep } = wizard;

  // Render current step
  const renderStep = () => {
    switch (currentStep) {
      case 'location':
        return <LocationStep wizard={wizard} />;
      case 'property':
        return <PropertyStep wizard={wizard} />;
      case 'preferences':
        return <PreferencesStep wizard={wizard} />;
      case 'lifestyle':
        return <LifestyleStep wizard={wizard} />;
      case 'review':
        return <ReviewStep wizard={wizard} />;
      default:
        return <LocationStep wizard={wizard} />;
    }
  };

  return (
    <div className={cn('flex flex-col h-full max-h-[80vh] sm:max-h-[85vh]', className)}>
      {/* Header with Progress */}
      <div className="shrink-0 px-4 pt-4 pb-4 border-b border-gray-200 bg-white">
        <WizardProgress wizard={wizard} />
      </div>

      {/* Step Content */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 py-4">{renderStep()}</div>

      {/* Footer with Navigation */}
      <div className="shrink-0 px-4 py-4 border-t border-gray-200 bg-white">
        <WizardNavigation wizard={wizard} />
      </div>
    </div>
  );
}
