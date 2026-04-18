'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterModal from '@/components/homepage/FilterModal';

export default function FilterModalWrapper() {
  const searchParams = useSearchParams();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  // Check for openFilters query parameter on mount
  useEffect(() => {
    const shouldOpenFilters = searchParams.get('openFilters') === 'true';
    if (shouldOpenFilters) {
      setIsFilterModalOpen(true);
      // Optional: Clean up URL by removing the query parameter
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, [searchParams]);

  return (
    <FilterModal
      open={isFilterModalOpen}
      onOpenChange={setIsFilterModalOpen}
      trigger={
        <button className="group relative inline-flex items-center gap-2 px-6 py-3 text-xl md:text-2xl font-bold text-gray-900 bg-white rounded-xl border-2 border-gray-200 shadow-sm hover:border-primary hover:shadow-lg transition-all duration-300">
          <span>Match to my dream home</span>
          <svg
            className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      }
    />
  );
}
