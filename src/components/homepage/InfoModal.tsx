'use client';

import { ReactNode } from 'react';
import { CircleX, Search } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';

type ModalVariant = 'properties' | 'municipalities';

interface InfoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOpenFilters: () => void;
  trigger?: ReactNode;
  variant: ModalVariant;
}

const modalContent: Record<
  ModalVariant,
  {
    title: string;
    description: string;
    ctaText: string;
  }
> = {
  properties: {
    title: 'Find Your Perfect Property',
    description:
      'To show you the most relevant properties that match your needs, we need a bit more information about your preferences. Tell us about your ideal home, budget, and preferred locations.',
    ctaText: 'Set My Preferences',
  },
  municipalities: {
    title: 'Discover Your Ideal Municipality',
    description:
      'To help you find the perfect municipality that matches your lifestyle, we need to understand your preferences. Share your interests, climate preferences, and what amenities matter most to you.',
    ctaText: 'Set My Preferences',
  },
};

export default function InfoModal({
  open,
  onOpenChange,
  onOpenFilters,
  trigger,
  variant,
}: InfoModalProps) {
  const content = modalContent[variant];

  const handleOpenFilters = () => {
    onOpenChange(false);
    // Small delay to allow the current modal to close before opening filters
    setTimeout(() => {
      onOpenFilters();
    }, 150);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[90vh] w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-xl bg-white p-8 shadow-xl z-50">
          <div className="text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600">
              <Search className="h-8 w-8 text-white" />
            </div>

            <Dialog.Title className="text-2xl font-bold text-gray-900 mb-3">
              {content.title}
            </Dialog.Title>

            <Dialog.Description className="text-gray-600 leading-relaxed mb-8">
              {content.description}
            </Dialog.Description>

            <Button
              onClick={handleOpenFilters}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
            >
              {content.ctaText}
            </Button>
          </div>

          <Dialog.Close asChild>
            <button
              type="button"
              className="text-gray-400 hover:text-gray-600 absolute top-4 right-4 transition-colors"
              aria-label="Close"
            >
              <CircleX className="h-6 w-6" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
