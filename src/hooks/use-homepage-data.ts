/**
 * Homepage data hook
 * Responsibility: Provide homepage data with loading and error handling
 * Follows SRP by focusing only on homepage data fetching
 * Follows DIP by depending on the homepage service abstraction
 */

import { useState, useEffect } from 'react';
import {
  homepageService,
  type HomepageData,
  type FeaturedProperty,
  type FeaturedMunicipality,
  type HomepageStatistics,
} from '@/services/homepage-service';

export interface UseHomepageDataResult {
  readonly data: HomepageData | null;
  readonly featuredProperties: readonly FeaturedProperty[];
  readonly featuredMunicipalities: readonly FeaturedMunicipality[];
  readonly statistics: HomepageStatistics | null;
  readonly isLoading: boolean;
  readonly error: string | null;
  readonly refetch: () => Promise<void>;
}

export function useHomepageData(): UseHomepageDataResult {
  const [data, setData] = useState<HomepageData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      const homepageData = await homepageService.getHomepageData();
      setData(homepageData);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to fetch homepage data';
      setError(errorMessage);
      console.error('Error fetching homepage data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    featuredProperties: data?.featuredProperties || [],
    featuredMunicipalities: data?.featuredMunicipalities || [],
    statistics: data?.statistics || null,
    isLoading,
    error,
    refetch: fetchData,
  };
}
