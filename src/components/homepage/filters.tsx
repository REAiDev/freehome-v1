import React from 'react';
import * as Slider from '@radix-ui/react-slider';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Separator from '@radix-ui/react-separator';
import Cookies from 'js-cookie';

const countries = [
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
const householdTypeOptions = [
  {
    label: 'Single Person',
    value: 'single',
  },
  {
    label: 'Young Couple',
    value: 'young_couple',
  },
  {
    label: 'Family with Kids',
    value: 'family_with_kids',
  },
  { label: 'Empty Nester (No kids home)', value: 'empty_nester' },
];
const settingsOptions = [
  { label: 'Ocean View', value: 'ocean' },
  { label: 'Mountain View', value: 'mountain' },
  { label: 'Country Living', value: 'country' },
  { label: 'City Life', value: 'city' },
];
const homeConditionOptions = [
  { label: 'New Build', value: 'new' },
  { label: 'Excellent Condition (Move-in Ready)', value: 'excellent' },
  { label: 'Good Condition (Minor Renovation Needed)', value: 'good' },
  { label: 'Fair Condition (Moderate Renovation Needed)', value: 'fair' },
  { label: 'Heritage/Historical Property', value: 'heritage' },
  { label: 'Poor Condition (Major Renovation Needed)', value: 'poor' },
  { label: 'Rebuild Required', value: 'rebuild' },
];
const propertyTypeOptions = [
  { label: 'Detached', value: 'detached' },
  { label: 'Semi-Detached/Duplex', value: 'semi_detached' },
  { label: 'Townhouse', value: 'townhouse' },
  { label: 'Condominium', value: 'condo' },
  { label: 'Villa/Bungalow', value: 'villa' },
  { label: 'Cottage', value: 'cottage' },
  { label: 'Multi-Family/Apartment Building', value: 'multi_family' },
];
const bedroomOptions = [
  { label: '1', value: '1' },
  { label: '1.5', value: '1.5' },
  { label: '2', value: '2' },
  { label: '2.5', value: '2.5' },
  { label: '3', value: '3' },
  { label: '3+', value: '3plus' },
];
const useOptions = [
  { label: 'Remote Working', value: 'remote' },
  { label: 'Expat Living', value: 'expat' },
  { label: 'Primary Residence', value: 'primary' },
  { label: 'Rental Property', value: 'rental' },
  { label: 'Retirement Home', value: 'retirement' },
  { label: 'Vacation Home', value: 'vacation' },
  { label: 'Entrepreneurship / Overseas Home', value: 'entrepreneurship' },
];

// Type for filter settings
interface FilterSettings {
  priceRange: [number, number];
  selectedCountry: string[];
  householdType: string[];
  selectedSettings: string[];
  homeCondition: string[];
  propertyType: string[];
  bedrooms: string[];
  use: string[];
}

// Cookie key for storing filter settings
const FILTER_COOKIE_KEY = 'filterSettings';

// Helper functions for cookie management
const saveFiltersToCookie = (filters: FilterSettings) => {
  try {
    const filterString = JSON.stringify(filters);
    Cookies.set(FILTER_COOKIE_KEY, filterString, {
      expires: 30, // 30 days expiry
      sameSite: 'strict',
      secure: false, // Set to true in production with HTTPS
    });
    console.log(`✅ Filters saved to cookie (${filterString.length} chars)`);
  } catch (error) {
    console.error('❌ Error saving filters to cookie:', error);
  }
};

const loadFiltersFromCookie = (): Partial<FilterSettings> => {
  try {
    const savedFilters = Cookies.get(FILTER_COOKIE_KEY);
    if (savedFilters) {
      const parsed = JSON.parse(savedFilters);
      console.log('🍪 Filters loaded from cookie:', parsed);
      return parsed;
    }
    console.log('🍪 No saved filters found');
    return {};
  } catch (error) {
    console.error('❌ Error loading filters from cookie:', error);
    // Clear corrupted cookie
    Cookies.remove(FILTER_COOKIE_KEY);
    return {};
  }
};

const Filters = () => {
  // Load saved filters from cookie
  const savedFilters = React.useMemo(() => loadFiltersFromCookie(), []);

  const [priceRange, setPriceRange] = React.useState<[number, number]>(
    savedFilters.priceRange || [0, 200]
  );
  const [filteredCountries, setFilteredCountries] = React.useState(countries);
  const filterCountries = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    setFilteredCountries(
      countries.filter((country) => country.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    return filteredCountries;
  };

  const [selectedCountry, setSelectedCountry] = React.useState<string[]>(
    savedFilters.selectedCountry || []
  );
  const [householdType, sethouseholdType] = React.useState<string[]>(
    savedFilters.householdType || []
  );
  const [selectedSettings, setSelectedSettings] = React.useState<string[]>(
    savedFilters.selectedSettings || []
  );
  const [homeCondition, setHomeCondition] = React.useState<string[]>(
    savedFilters.homeCondition || []
  );
  const [propertyType, setPropertyType] = React.useState<string[]>(savedFilters.propertyType || []);
  const [bedrooms, setBedrooms] = React.useState<string[]>(savedFilters.bedrooms || []);
  const [use, setUse] = React.useState<string[]>(savedFilters.use || []);

  const maxPrice = 200;
  const minPrice = 0;

  // Save filters to cookie whenever they change (but not on initial render)
  const isInitialRender = React.useRef(true);

  React.useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return; // Skip saving on initial render to avoid overwriting loaded data
    }

    const currentFilters: FilterSettings = {
      priceRange,
      selectedCountry,
      householdType,
      selectedSettings,
      homeCondition,
      propertyType,
      bedrooms,
      use,
    };

    // Add a small delay to debounce rapid changes
    const saveTimeout = setTimeout(() => {
      saveFiltersToCookie(currentFilters);
      console.log('Filters saved to cookie:', currentFilters); // Debug log
    }, 100);

    return () => clearTimeout(saveTimeout);
  }, [
    priceRange,
    selectedCountry,
    householdType,
    selectedSettings,
    homeCondition,
    propertyType,
    bedrooms,
    use,
  ]);

  // Clear all filters function
  const clearAllFilters = () => {
    setPriceRange([0, 200]);
    setSelectedCountry([]);
    sethouseholdType([]);
    setSelectedSettings([]);
    setHomeCondition([]);
    setPropertyType([]);
    setBedrooms([]);
    setUse([]);
    // This will trigger the useEffect and save empty filters to cookie
  };

  // Check if any filters are active
  const hasActiveFilters = React.useMemo(() => {
    return (
      priceRange[0] > minPrice ||
      priceRange[1] < maxPrice ||
      selectedCountry.length > 0 ||
      householdType.length > 0 ||
      selectedSettings.length > 0 ||
      homeCondition.length > 0 ||
      propertyType.length > 0 ||
      bedrooms.length > 0 ||
      use.length > 0
    );
  }, [
    priceRange,
    selectedCountry,
    householdType,
    selectedSettings,
    homeCondition,
    propertyType,
    bedrooms,
    use,
  ]);

  // State for handling redirect UX
  const [isRedirecting, setIsRedirecting] = React.useState(false);

  const filterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Start loading state
    setIsRedirecting(true);

    // Build preferences object
    const preferences: Record<string, string | number | string[]> = {};

    if (priceRange[0] > minPrice) preferences.price_min = priceRange[0];
    if (priceRange[1] < maxPrice) preferences.price_max = priceRange[1];
    if (selectedCountry.length) preferences.countries = selectedCountry;
    if (householdType.length) preferences.household_type = householdType;
    if (selectedSettings.length) preferences.settings = selectedSettings;
    if (homeCondition.length) preferences.home_condition = homeCondition;
    if (propertyType.length) preferences.property_type = propertyType;
    if (bedrooms.length) preferences.bedrooms = bedrooms;
    if (use.length) preferences.use = use;

    try {
      // Give user visual feedback before API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Call API route to get signed URL
      const response = await fetch('/api/redirect-to-reai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error('Failed to generate redirect URL');
      }

      const { redirectUrl } = await response.json();

      // Redirect to signed URL
      window.location.assign(redirectUrl);
    } catch (error) {
      console.error('Error redirecting:', error);
      setIsRedirecting(false);
      alert('Failed to redirect. Please try again.');
    }
  };

  return (
    <form className="mt-4 space-y-4" onSubmit={(e) => filterSubmit(e)}>
      <div className="flex">
        <div className="flex-1 pr-4">
          {/* Price Range Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price Range (€)</label>
          </div>
          <Slider.Root
            value={priceRange}
            onValueChange={(value: [number, number]) =>
              setPriceRange([value[0], value[1]] as [number, number])
            }
            className="w-full relative flex h-5 touch-none select-none items-center"
            min={minPrice}
            max={maxPrice}
            step={10}
          >
            <Slider.Track className="relative h-[3px] grow rounded-full bg-blackA7">
              <Slider.Range className="absolute h-full rounded-full bg-blue-900" />
            </Slider.Track>
            {[0, 1].map((index) => (
              <Slider.Thumb
                key={index}
                className="block size-5 rounded-[10px] bg-white shadow-[0_2px_10px] shadow-blackA4 focus:scale-110"
                aria-label="Volume"
              />
            ))}
          </Slider.Root>
          <div className="flex items-center justify-between mt-2 gap-2">
            {[0, 1].map((index) => (
              <input
                key={index}
                className="w-16 p-1 border border-gray-300 rounded text-sm text-center appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                type="number"
                value={priceRange[index]}
                onChange={(e) => {
                  const newValue = Number(e.target.value);
                  if (index === 0) {
                    setPriceRange([newValue, priceRange[1]]);
                  } else {
                    setPriceRange([priceRange[0], newValue]);
                  }
                }}
                inputMode="numeric"
              />
            ))}
          </div>

          {/* Settings (Checkbox Group) */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              My Home Setting Preference
            </label>
            <div className="grid grid-cols-2 gap-4 mb-2">
              {settingsOptions.map((option) => (
                <div key={option.value} className="flex items-center gap-2">
                  <Checkbox.Root
                    className="flex flex-wrap gap-4"
                    checked={selectedSettings.includes(option.value)}
                    onCheckedChange={() => {
                      if (selectedSettings.includes(option.value)) {
                        setSelectedSettings(
                          selectedSettings.filter((item) => item !== option.value)
                        );
                      } else {
                        setSelectedSettings([...selectedSettings, option.value]);
                      }
                    }}
                  >
                    <div className="bg-gray-200 w-6 h-6 rounded-sm flex justify-center items-center">
                      <Checkbox.Indicator>
                        <div className="w-4 h-4 bg-blue-800 rounded-[6px]" />
                      </Checkbox.Indicator>
                    </div>
                  </Checkbox.Root>
                  <label htmlFor={option.value}>{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Household Preferences (Checkbox Group) */}
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              My Household Type
            </label>
            <div className="grid grid-cols-2 gap-2 mb-2">
              {householdTypeOptions.map((preference) => (
                <div key={preference.value} className="flex items-center gap-2">
                  <Checkbox.Root
                    className="flex flex-wrap gap-4"
                    checked={householdType.includes(preference.value)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        sethouseholdType([...householdType, preference.value]);
                      } else {
                        sethouseholdType(householdType.filter((item) => item !== preference.value));
                      }
                    }}
                  >
                    <div className="bg-gray-200 w-6 h-6 rounded-sm flex justify-center items-center">
                      <Checkbox.Indicator>
                        <div className="w-4 h-4 bg-blue-800 rounded-[6px]" />
                      </Checkbox.Indicator>
                    </div>
                  </Checkbox.Root>
                  <label htmlFor={preference.value}>{preference.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Multi-select Countries */}
        <div className="flex-2 min-h-[18rem]">
          <input
            onChange={filterCountries}
            type="text"
            className="block text-sm font-medium text-gray-700 w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="My Preference Country"
          />
          <div className="overflow-y-auto max-h-[16rem] overflow-x-clip">
            {filteredCountries.map((country) => (
              <Checkbox.Root
                className="w-full flex flex-col min-w-[220px] max-h-60 bg-white border border-gray-200 rounded shadow-lg p-2"
                checked={selectedCountry.includes(country)}
                onCheckedChange={() => {
                  if (selectedCountry.includes(country)) {
                    setSelectedCountry(selectedCountry.filter((item) => item !== country));
                  } else {
                    setSelectedCountry([...selectedCountry, country]);
                  }
                }}
                key={country}
              >
                <div className="w-full mt-2.5 pl-2 border-t border-t-mauve6 pt-2.5 text-[13px] leading-[18px] text-mauve12 cursor-pointer select-none outline-none hover:bg-mauve3 data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-mauve3 data-[highlighted]:text-mauve12 first:mt-0 first:pt-0 first:border-t-0 flex align-center">
                  <div className="bg-gray-200 w-6 h-6 rounded-sm flex justify-center items-center">
                    <Checkbox.Indicator>
                      <div className="w-4 h-4 bg-blue-800 rounded-[6px]" />
                    </Checkbox.Indicator>
                  </div>
                  <label className="pl-[15px] text-[15px] leading-none flex items-center">
                    {country}
                  </label>
                </div>
              </Checkbox.Root>
            ))}
          </div>
        </div>
      </div>

      <Separator.Root className="mx-auto w-11/12 bg-slate-200 h-[1px]" decorative />

      {/* Home Condition (Checkbox Group) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Home Condition</label>
        <div className="grid grid-cols-3 gap-4 mb-2">
          {homeConditionOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox.Root
                className="flex flex-wrap gap-4"
                checked={homeCondition.includes(option.value)}
                onCheckedChange={() => {
                  if (homeCondition.includes(option.value)) {
                    setHomeCondition(homeCondition.filter((item) => item !== option.value));
                  } else {
                    setHomeCondition([...homeCondition, option.value]);
                  }
                }}
              >
                <div className="bg-gray-200 w-6 h-6 rounded-sm flex justify-center items-center">
                  <Checkbox.Indicator>
                    <div className="w-4 h-4 bg-blue-800 rounded-[6px]" />
                  </Checkbox.Indicator>
                </div>
              </Checkbox.Root>
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Property Type (Checkbox Group) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
        <div className="grid grid-cols-3 gap-4 mb-2">
          {propertyTypeOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox.Root
                className="flex flex-wrap gap-4"
                checked={propertyType.includes(option.value)}
                onCheckedChange={() => {
                  if (propertyType.includes(option.value)) {
                    setPropertyType(propertyType.filter((item) => item !== option.value));
                  } else {
                    setPropertyType([...propertyType, option.value]);
                  }
                }}
              >
                <div className="bg-gray-200 w-6 h-6 rounded-sm flex justify-center items-center">
                  <Checkbox.Indicator>
                    <div className="w-4 h-4 bg-blue-800 rounded-[6px]" />
                  </Checkbox.Indicator>
                </div>
              </Checkbox.Root>
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Bedrooms (Checkbox Group) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
        <div className="grid grid-cols-3 gap-4 mb-2">
          {bedroomOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox.Root
                className="flex flex-wrap gap-4"
                checked={bedrooms.includes(option.value)}
                onCheckedChange={() => {
                  if (bedrooms.includes(option.value)) {
                    setBedrooms(bedrooms.filter((item) => item !== option.value));
                  } else {
                    setBedrooms([...bedrooms, option.value]);
                  }
                }}
              >
                <div className="bg-gray-200 w-6 h-6 rounded-sm flex justify-center items-center">
                  <Checkbox.Indicator>
                    <div className="w-4 h-4 bg-blue-800 rounded-[6px]" />
                  </Checkbox.Indicator>
                </div>
              </Checkbox.Root>
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      {/* Use (Checkbox Group) */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">My Use of the Home</label>
        <div className="grid grid-cols-3 gap-4 mb-2">
          {useOptions.map((option) => (
            <div key={option.value} className="flex items-center gap-2">
              <Checkbox.Root
                className="flex flex-wrap gap-4"
                checked={use.includes(option.value)}
                onCheckedChange={() => {
                  if (use.includes(option.value)) {
                    setUse(use.filter((item) => item !== option.value));
                  } else {
                    setUse([...use, option.value]);
                  }
                }}
              >
                <div className="bg-gray-200 w-6 h-6 rounded-sm flex justify-center items-center">
                  <Checkbox.Indicator>
                    <div className="w-4 h-4 bg-blue-800 rounded-[6px]" />
                  </Checkbox.Indicator>
                </div>
              </Checkbox.Root>
              <label htmlFor={option.value}>{option.label}</label>
            </div>
          ))}
        </div>
      </div>

      <Separator.Root className="mx-auto w-11/12 bg-slate-200 h-[1px]" decorative />

      {/* Value Proposition & Trust Signals */}
      <div className="text-center space-y-3 py-4">
        <div className="flex justify-center items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            ✅ <strong>AI-Powered</strong> Matching
          </span>
          <span className="flex items-center gap-1">
            🌍 <strong>20+</strong> Countries
          </span>
          <span className="flex items-center gap-1">
            ⚡ <strong>Instant</strong> Results
          </span>
        </div>

        <p className="text-sm text-gray-500 px-4 bg-gradient-to-r from-blue-50 to-purple-50 py-3 rounded-xl font-medium border border-blue-100">
          🤖 Our AI system will customize and continuously update your matches based on your
          preferences and future needs
        </p>

        {isRedirecting && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <p className="text-green-700 font-medium">
              🚀 Preparing your personalized property matches...
            </p>
          </div>
        )}
      </div>

      <Separator.Root className="mx-auto w-11/12 bg-slate-200 h-[1px]" decorative />

      {/* Primary CTA */}
      <div className="space-y-3">
        <button
          type="submit"
          disabled={isRedirecting}
          className={`w-full rounded-xl py-4 font-bold transition-all duration-300 text-lg relative overflow-hidden ${
            isRedirecting
              ? 'bg-green-500 text-white cursor-wait'
              : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
          }`}
        >
          <span
            className={`transition-opacity duration-300 ${
              isRedirecting ? 'opacity-0' : 'opacity-100'
            }`}
          >
            🏡 Land Your Dream Home Overseas Now →
          </span>
          {isRedirecting && (
            <span className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Finding Your Perfect Match...</span>
              </div>
            </span>
          )}
        </button>

        {/* Secondary Actions */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={clearAllFilters}
            disabled={!hasActiveFilters || isRedirecting}
            className={`flex-1 rounded-lg py-2 font-medium transition-colors ${
              hasActiveFilters && !isRedirecting
                ? 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            🗑️ Clear All
          </button>

          <button
            type="button"
            onClick={() => {
              const currentFilters: FilterSettings = {
                priceRange,
                selectedCountry,
                householdType,
                selectedSettings,
                homeCondition,
                propertyType,
                bedrooms,
                use,
              };
              saveFiltersToCookie(currentFilters);
              // Better UX feedback
              const button = document.activeElement as HTMLButtonElement;
              const originalText = button.textContent;
              button.textContent = '✅ Saved!';
              setTimeout(() => {
                button.textContent = originalText;
              }, 1500);
            }}
            disabled={isRedirecting}
            className={`flex-1 rounded-lg py-2 font-medium transition-colors ${
              !isRedirecting
                ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-300'
                : 'bg-gray-50 text-gray-400 cursor-not-allowed border border-gray-200'
            }`}
          >
            💾 Save Preferences
          </button>
        </div>
      </div>
      {hasActiveFilters && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          🍪 Your filter preferences are automatically saved
        </p>
      )}
    </form>
  );
};

export default Filters;
