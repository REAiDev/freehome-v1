'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import Cookies from 'js-cookie';
import { FilterSettings, WizardStep, WIZARD_STEPS, DEFAULT_FILTER_SETTINGS } from './types';

const FILTER_COOKIE_KEY = 'filterSettings';
const MIN_PRICE = 0;
const MAX_PRICE = 200;

// Cookie management helpers
const saveFiltersToCookie = (filters: FilterSettings) => {
  try {
    const filterString = JSON.stringify(filters);
    Cookies.set(FILTER_COOKIE_KEY, filterString, {
      expires: 30,
      sameSite: 'strict',
      secure: false,
    });
  } catch (error) {
    console.error('Error saving filters to cookie:', error);
  }
};

const loadFiltersFromCookie = (): Partial<FilterSettings> => {
  try {
    const savedFilters = Cookies.get(FILTER_COOKIE_KEY);
    if (savedFilters) {
      return JSON.parse(savedFilters);
    }
    return {};
  } catch (error) {
    console.error('Error loading filters from cookie:', error);
    Cookies.remove(FILTER_COOKIE_KEY);
    return {};
  }
};

export function useFilterWizard() {
  // Load saved filters from cookie
  const savedFilters = useMemo(() => loadFiltersFromCookie(), []);

  // Wizard navigation state
  const [currentStep, setCurrentStep] = useState<WizardStep>('location');

  // Filter state
  const [filters, setFilters] = useState<FilterSettings>({
    ...DEFAULT_FILTER_SETTINGS,
    ...savedFilters,
  });

  // Redirect state
  const [isRedirecting, setIsRedirecting] = useState(false);

  // Track initial render to avoid saving on mount
  const isInitialRender = useRef(true);

  // Save filters to cookie when they change (debounced)
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }

    const saveTimeout = setTimeout(() => {
      saveFiltersToCookie(filters);
    }, 100);

    return () => clearTimeout(saveTimeout);
  }, [filters]);

  // Navigation helpers
  const currentStepIndex = useMemo(
    () => WIZARD_STEPS.findIndex((step) => step.id === currentStep),
    [currentStep]
  );

  const canGoNext = currentStepIndex < WIZARD_STEPS.length - 1;
  const canGoBack = currentStepIndex > 0;
  const isLastStep = currentStepIndex === WIZARD_STEPS.length - 1;
  const isFirstStep = currentStepIndex === 0;

  const goToStep = useCallback((step: WizardStep) => {
    setCurrentStep(step);
  }, []);

  const goNext = useCallback(() => {
    if (canGoNext) {
      setCurrentStep(WIZARD_STEPS[currentStepIndex + 1].id);
    }
  }, [canGoNext, currentStepIndex]);

  const goBack = useCallback(() => {
    if (canGoBack) {
      setCurrentStep(WIZARD_STEPS[currentStepIndex - 1].id);
    }
  }, [canGoBack, currentStepIndex]);

  // Filter update helpers
  const updateFilter = useCallback(
    <K extends keyof FilterSettings>(key: K, value: FilterSettings[K]) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const toggleArrayFilter = useCallback(<K extends keyof FilterSettings>(key: K, value: string) => {
    setFilters((prev) => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  }, []);

  const clearAllFilters = useCallback(() => {
    setFilters(DEFAULT_FILTER_SETTINGS);
    setCurrentStep('location');
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return (
      filters.priceRange[0] > MIN_PRICE ||
      filters.priceRange[1] < MAX_PRICE ||
      filters.selectedCountry.length > 0 ||
      filters.householdType.length > 0 ||
      filters.selectedSettings.length > 0 ||
      filters.homeCondition.length > 0 ||
      filters.propertyType.length > 0 ||
      filters.bedrooms.length > 0 ||
      filters.use.length > 0
    );
  }, [filters]);

  // Count active filters for progress indicator
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.priceRange[0] > MIN_PRICE || filters.priceRange[1] < MAX_PRICE) count++;
    if (filters.selectedCountry.length > 0) count++;
    if (filters.householdType.length > 0) count++;
    if (filters.selectedSettings.length > 0) count++;
    if (filters.homeCondition.length > 0) count++;
    if (filters.propertyType.length > 0) count++;
    if (filters.bedrooms.length > 0) count++;
    if (filters.use.length > 0) count++;
    return count;
  }, [filters]);

  // Get count per step for badges
  const getStepFilterCount = useCallback(
    (step: WizardStep): number => {
      switch (step) {
        case 'location':
          return filters.selectedCountry.length;
        case 'property':
          let propertyCount = 0;
          if (filters.priceRange[0] > MIN_PRICE || filters.priceRange[1] < MAX_PRICE)
            propertyCount++;
          propertyCount += filters.propertyType.length;
          propertyCount += filters.bedrooms.length;
          propertyCount += filters.homeCondition.length;
          return propertyCount;
        case 'preferences':
          return filters.selectedSettings.length;
        case 'lifestyle':
          return filters.householdType.length + filters.use.length;
        case 'review':
          return 0;
        default:
          return 0;
      }
    },
    [filters]
  );

  // Submit handler
  const handleSubmit = useCallback(async () => {
    setIsRedirecting(true);

    const preferences: Record<string, string | number | string[]> = {};

    if (filters.priceRange[0] > MIN_PRICE) preferences.price_min = filters.priceRange[0];
    if (filters.priceRange[1] < MAX_PRICE) preferences.price_max = filters.priceRange[1];
    if (filters.selectedCountry.length) preferences.countries = filters.selectedCountry;
    if (filters.householdType.length) preferences.household_type = filters.householdType;
    if (filters.selectedSettings.length) preferences.settings = filters.selectedSettings;
    if (filters.homeCondition.length) preferences.home_condition = filters.homeCondition;
    if (filters.propertyType.length) preferences.property_type = filters.propertyType;
    if (filters.bedrooms.length) preferences.bedrooms = filters.bedrooms;
    if (filters.use.length) preferences.use = filters.use;

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const response = await fetch('/api/redirect-to-reai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error('Failed to generate redirect URL');
      }

      const { redirectUrl } = await response.json();
      window.location.assign(redirectUrl);
    } catch (error) {
      console.error('Error redirecting:', error);
      setIsRedirecting(false);
      alert('Failed to redirect. Please try again.');
    }
  }, [filters]);

  return {
    // Navigation
    currentStep,
    currentStepIndex,
    goToStep,
    goNext,
    goBack,
    canGoNext,
    canGoBack,
    isFirstStep,
    isLastStep,

    // Filters
    filters,
    updateFilter,
    toggleArrayFilter,
    clearAllFilters,
    hasActiveFilters,
    activeFilterCount,
    getStepFilterCount,

    // Submit
    isRedirecting,
    handleSubmit,

    // Constants
    steps: WIZARD_STEPS,
  };
}

export type UseFilterWizardReturn = ReturnType<typeof useFilterWizard>;
