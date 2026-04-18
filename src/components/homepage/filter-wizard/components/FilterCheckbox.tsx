'use client';

import * as Checkbox from '@radix-ui/react-checkbox';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterCheckboxProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function FilterCheckbox({
  label,
  checked,
  onCheckedChange,
  className,
}: FilterCheckboxProps) {
  return (
    <label
      className={cn(
        'flex items-center gap-3 p-3 rounded-lg border border-gray-200 cursor-pointer transition-all duration-200',
        'hover:border-blue-300 hover:bg-blue-50/50',
        'active:scale-[0.98]',
        checked && 'border-blue-500 bg-blue-50',
        className
      )}
    >
      <Checkbox.Root
        checked={checked}
        onCheckedChange={(value) => onCheckedChange(value === true)}
        className={cn(
          'flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
          checked ? 'border-blue-600 bg-blue-600' : 'border-gray-300 bg-white'
        )}
      >
        <Checkbox.Indicator>
          <Check className="h-4 w-4 text-white" strokeWidth={3} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      <span
        className={cn(
          'text-sm font-medium select-none',
          checked ? 'text-blue-900' : 'text-gray-700'
        )}
      >
        {label}
      </span>
    </label>
  );
}

interface FilterChipProps {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
}

export function FilterChip({ label, checked, onCheckedChange, className }: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        'px-4 py-2 rounded-full border-2 text-sm font-medium transition-all duration-200',
        'active:scale-[0.95]',
        checked
          ? 'border-blue-600 bg-blue-600 text-white'
          : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50',
        className
      )}
    >
      {label}
    </button>
  );
}
