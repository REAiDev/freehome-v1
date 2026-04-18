// Filter wizard types

export interface FilterSettings {
  priceRange: [number, number];
  selectedCountry: string[];
  householdType: string[];
  selectedSettings: string[];
  homeCondition: string[];
  propertyType: string[];
  bedrooms: string[];
  use: string[];
}

export type WizardStep = 'location' | 'property' | 'preferences' | 'lifestyle' | 'review';

export interface WizardStepConfig {
  id: WizardStep;
  title: string;
  description: string;
  icon: string;
}

export const WIZARD_STEPS: WizardStepConfig[] = [
  {
    id: 'location',
    title: 'Location',
    description: 'Where do you want to live?',
    icon: '🌍',
  },
  {
    id: 'property',
    title: 'Property',
    description: 'What type of home?',
    icon: '🏠',
  },
  {
    id: 'preferences',
    title: 'Preferences',
    description: 'Your ideal setting',
    icon: '⚙️',
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle',
    description: 'How will you use it?',
    icon: '🎯',
  },
  {
    id: 'review',
    title: 'Review',
    description: 'Confirm your choices',
    icon: '✅',
  },
];

export const DEFAULT_FILTER_SETTINGS: FilterSettings = {
  priceRange: [0, 200],
  selectedCountry: [],
  householdType: [],
  selectedSettings: [],
  homeCondition: [],
  propertyType: [],
  bedrooms: [],
  use: [],
};

// Filter options data
export const countries = [
  'Italy',
  'Spain',
  'France',
  'Portugal',
  'Greece',
  'Croatia',
  'Turkey',
  'Cyprus',
  'Malta',
  'Germany',
  'Netherlands',
  'Belgium',
  'Switzerland',
  'Austria',
  'Poland',
  'Czech Republic',
  'Hungary',
  'Slovakia',
  'Slovenia',
  'Romania',
  'Bulgaria',
];

export const householdTypeOptions = [
  { label: 'Single', value: 'single' },
  { label: 'Couple with no kids', value: 'couple_no_kids' },
  { label: 'Couple with kids', value: 'couple_with_kids' },
  { label: 'Empty Nester (couple w/kids already left home)', value: 'empty_nester' },
];

export const settingsOptions = [
  { label: 'Ocean View', value: 'ocean' },
  { label: 'Mountain View', value: 'mountain' },
  { label: 'Country Living', value: 'country' },
  { label: 'City Life', value: 'city' },
];

export const homeConditionOptions = [
  { label: 'New Build', value: 'new' },
  { label: 'Excellent Condition (Move-in Ready)', value: 'excellent' },
  { label: 'Good Condition (Minor Renovation Needed)', value: 'good' },
  { label: 'Fair Condition (Moderate Renovation Needed)', value: 'fair' },
  { label: 'Heritage/Historical Property', value: 'heritage' },
  { label: 'Poor Condition (Major Renovation Needed)', value: 'poor' },
  { label: 'Rebuild Required', value: 'rebuild' },
];

export const propertyTypeOptions = [
  { label: 'Detached', value: 'detached' },
  { label: 'Semi-Detached/Duplex', value: 'semi_detached' },
  { label: 'Townhouse', value: 'townhouse' },
  { label: 'Condominium', value: 'condo' },
  { label: 'Villa/Bungalow', value: 'villa' },
  { label: 'Cottage', value: 'cottage' },
  { label: 'Multi-Family/Apartment Building', value: 'multi_family' },
];

export const bedroomOptions = [
  { label: '1', value: '1' },
  { label: '1.5', value: '1.5' },
  { label: '2', value: '2' },
  { label: '2.5', value: '2.5' },
  { label: '3', value: '3' },
  { label: '3+', value: '3plus' },
];

export const useOptions = [
  { label: 'Remote Working', value: 'remote' },
  { label: 'Expat Living', value: 'expat' },
  { label: 'Primary Residence', value: 'primary' },
  { label: 'Rental Property', value: 'rental' },
  { label: 'Retirement Home', value: 'retirement' },
  { label: 'Vacation Home', value: 'vacation' },
  { label: 'Entrepreneurship / Overseas Home', value: 'entrepreneurship' },
];
