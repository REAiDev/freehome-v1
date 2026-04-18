'use client';

import { ReactNode } from 'react';
import { X } from 'lucide-react';
import * as Dialog from '@radix-ui/react-dialog';
import { FilterWizard } from '@/components/homepage/filter-wizard';
import { cn } from '@/lib/utils';

interface FilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: ReactNode;
}

export default function FilterModal({ open, onOpenChange, trigger }: FilterModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          className={cn(
            'fixed z-50 bg-white shadow-xl',
            'data-[state=open]:animate-in data-[state=closed]:animate-out',
            // Mobile: Full screen
            'inset-0 rounded-none',
            'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
            // Desktop: Centered modal
            'sm:inset-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2',
            'sm:max-h-[90vh] sm:w-[90vw] sm:max-w-2xl sm:rounded-2xl',
            'sm:data-[state=closed]:zoom-out-95 sm:data-[state=open]:zoom-in-95',
            'sm:data-[state=closed]:slide-out-to-left-1/2 sm:data-[state=closed]:slide-out-to-top-[48%]',
            'sm:data-[state=open]:slide-in-from-left-1/2 sm:data-[state=open]:slide-in-from-top-[48%]',
            'duration-200'
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white sm:rounded-t-2xl">
            <div>
              <Dialog.Title className="text-lg font-bold text-gray-900">
                Find Your Dream Home
              </Dialog.Title>
              <Dialog.Description className="text-sm text-gray-600 hidden sm:block">
                Customize your search preferences
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                type="button"
                className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Close"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </Dialog.Close>
          </div>

          {/* Wizard Content */}
          <div className="h-[calc(100vh-60px)] sm:h-auto sm:max-h-[calc(90vh-60px)]">
            <FilterWizard />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
