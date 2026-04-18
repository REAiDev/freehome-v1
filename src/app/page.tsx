'use client';

import { Suspense, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Search, Home, Building, Globe, LoaderCircle } from 'lucide-react';
import { useHomepageData } from '@/hooks/use-homepage-data';
import {
  FeaturedPropertyCard,
  FeaturedMunicipalityCard,
  LoadingGrid,
  ErrorState,
} from '@/components/homepage';
import { FeaturedInsightsSection } from '@/components/homepage/FeaturedInsightsSection';
import { Hero } from '@/components/common';
import dynamic from 'next/dynamic';
import FilterModalWrapper from '@/components/homepage/FilterModalWrapper';
import InfoModal from '@/components/homepage/InfoModal';
import FilterModal from '@/components/homepage/FilterModal';

// Dynamically import GlobeSection to avoid SSR issues
const GlobeSection = dynamic(() => import('@/components/common/GlobeSection'), {
  ssr: false,
  loading: () => (
    <div className="h-[40rem] bg-gradient-to-b from-blue-200 via-blue-100 to-blue-50 flex items-center justify-center">
      <div className="text-blue-600 text-lg">
        <LoaderCircle className="h-12 w-12 text-blue-600 animate-spin" />
      </div>
    </div>
  ),
});
// import FlatMap from '@/components/common/map';

export default function HomePage() {
  const { featuredProperties, featuredMunicipalities, statistics, isLoading, error, refetch } =
    useHomepageData();

  const canViewAddressDetails = false; // Simplified for homepage-only mode

  // Modal states
  const [isPropertiesInfoModalOpen, setIsPropertiesInfoModalOpen] = useState(false);
  const [isMunicipalitiesInfoModalOpen, setIsMunicipalitiesInfoModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const formatStatistics = () => {
    // Check if we should use hardcoded values
    const useHardcodedStats = process.env.NEXT_PUBLIC_USE_HARDCODED_STATS === 'true';

    if (useHardcodedStats) {
      return {
        properties: '>1M',
        municipalities: '176',
        countries: '40+',
      };
    }

    if (
      !statistics ||
      (statistics.totalProperties === 0 &&
        statistics.totalMunicipalities === 0 &&
        statistics.countriesCount === 0)
    ) {
      return null;
    }
    return {
      properties: statistics.totalProperties.toLocaleString(),
      municipalities: statistics.totalMunicipalities.toLocaleString(),
      countries: statistics.countriesCount.toLocaleString(),
    };
  };

  const stats = formatStatistics();

  const statisticsData = [
    {
      icon: <Home className="h-6 w-6" />,
      value: stats?.properties || '0',
      label: 'Properties',
      color: 'text-blue-100',
    },
    {
      icon: <Building className="h-6 w-6" />,
      value: stats?.municipalities || '0',
      label: 'Municipalities',
      color: 'text-blue-100',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      value: stats?.countries || '0',
      label: 'Countries',
      color: 'text-blue-100',
    },
  ];

  return (
    <div>
      <Hero
        variant="primary"
        size="default"
        title={
          <div className="space-y-2">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Land Your Dream Home Overseas
            </div>
            <div className="text-2xl md:text-3xl lg:text-4xl font-semibold text-blue-100">
              - with Special Deals
            </div>
          </div>
        }
        subtitle={
          <div className="space-y-6">
            <p className="text-lg md:text-xl">
              Explore exclusive overseas homes with special pricing and incentive programs. Our
              patented AiMatch® technology matches you with the best international properties,
              whether you&apos;re dreaming of
            </p>
            <ul className="list-none space-y-3 max-w-md mx-auto">
              <li className="flex items-center gap-3 justify-center">
                <span className="w-2 h-2 rounded-full bg-yellow-300 flex-shrink-0"></span>
                <span className="text-white font-medium">a mountain home in Italy</span>
              </li>
              <li className="flex items-center gap-3 justify-center">
                <span className="w-2 h-2 rounded-full bg-yellow-300 flex-shrink-0"></span>
                <span className="text-white font-medium">a seaside escape on the Adriatic</span>
              </li>
              <li className="flex items-center gap-3 justify-center">
                <span className="w-2 h-2 rounded-full bg-yellow-300 flex-shrink-0"></span>
                <span className="text-white font-medium">a peaceful Japanese garden retreat</span>
              </li>
            </ul>
            <p className="text-base text-blue-200 italic pt-2">
              Looking to work remotely, retire abroad, or buy a vacation home overseas?
              <br />
              Sit back, relax, and start your new life abroad.
            </p>
          </div>
        }
      >
        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto">
            {statisticsData.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm md:text-base text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </Hero>
      <GlobeSection />
      {/* <FlatMap />       */}
      {/* Search Section */}
      <div className="bg-gradient-to-b from-white to-gray-50 py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Suspense
              fallback={
                <button className="inline-flex items-center gap-2 px-6 py-3 text-xl md:text-2xl font-bold text-gray-900 bg-white rounded-xl border-2 border-gray-200 shadow-sm">
                  <span>Match to my dream home</span>
                  <svg
                    className="w-5 h-5 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              }
            >
              <FilterModalWrapper />
            </Suspense>
          </div>

          {/* Intent Chips */}
          <div className="mt-8 flex justify-center">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {[
                { label: 'Remote working', icon: <Home className="h-4 w-4" /> },
                { label: 'Expat living', icon: <Home className="h-4 w-4" /> },
                { label: 'Vacation home', icon: <Home className="h-4 w-4" /> },
                { label: 'Investment home', icon: <Home className="h-4 w-4" /> },
                { label: 'Retirement home', icon: <Home className="h-4 w-4" /> },
                { label: 'Rental home', icon: <Home className="h-4 w-4" /> },
                { label: 'Entrepreneurship overseas', icon: <Home className="h-4 w-4" /> },
              ].map((filter, index) => (
                <div
                  key={index}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm text-gray-400 shadow-sm"
                >
                  {filter.icon}
                  {filter.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Section Divider */}
      <div className="bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px"></div>

      {/* Featured Properties */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-reai-heading">Featured Properties</h2>
            <p className="mt-2 text-reai-body">
              Handpicked properties from our most popular locations.
            </p>
          </div>

          {error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : isLoading ? (
            <LoadingGrid type="property" count={3} />
          ) : featuredProperties.length > 0 ? (
            <>
              <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {featuredProperties.map((property) => (
                  <FeaturedPropertyCard
                    key={property.id}
                    property={property}
                    canViewAddressDetails={canViewAddressDetails}
                  />
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsPropertiesInfoModalOpen(true)}
                >
                  View All Properties
                </Button>
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-2xl py-16 text-center">
              <p className="text-gray-500">No featured properties available at the moment.</p>
              <div className="mt-4 inline-block">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsPropertiesInfoModalOpen(true)}
                >
                  Browse All Properties
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Divider */}
      <div className="bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px"></div>

      {/* Featured Municipalities */}
      <div className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-reai-heading">Featured Municipalities</h2>
            <p className="mt-2 text-reai-body">
              Discover charming towns and villages with active housing programs.
            </p>
          </div>

          {error ? (
            <ErrorState message={error} onRetry={refetch} />
          ) : isLoading ? (
            <LoadingGrid type="municipality" count={3} />
          ) : featuredMunicipalities.length > 0 ? (
            <>
              <div className="mx-auto mt-10 flex flex-wrap justify-center gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16">
                {featuredMunicipalities.map((municipality) => (
                  <div key={municipality.id} className="w-full max-w-sm">
                    <FeaturedMunicipalityCard municipality={municipality} />
                  </div>
                ))}
              </div>
              <div className="mt-12 text-center">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMunicipalitiesInfoModalOpen(true)}
                >
                  View All Municipalities
                </Button>
              </div>
            </>
          ) : (
            <div className="mx-auto max-w-2xl py-16 text-center">
              <p className="text-gray-500">No featured municipalities available at the moment.</p>
              <div className="mt-4 inline-block">
                <Button
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all duration-200"
                  onClick={() => setIsMunicipalitiesInfoModalOpen(true)}
                >
                  Browse All Municipalities
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Section Divider */}
      <div className="bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px"></div>

      {/* Featured Insights */}
      <FeaturedInsightsSection />

      {/* Section Divider */}
      <div className="bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px"></div>

      {/* How It Works */}
      <div className="bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-reai-heading">How It Works</h2>
            <p className="mt-4 text-reai-body text-lg">
              The simple process of landing overseas property deals in our unique AI system.
            </p>
          </div>
          <div className="mx-auto mt-20 max-w-2xl sm:mt-24 lg:mt-32 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-12 gap-y-20 lg:max-w-none lg:grid-cols-3">
              {[
                {
                  title: 'Understand the Process',
                  description:
                    'Tell us your needs, dreams, and ideal overseas destination to live. Our AI system analyzes your current needs, project your future needs & trends for dream home overseas',
                  step: '01',
                  icon: <Search className="h-6 w-6" />,
                },
                {
                  title: 'See Your Best Matching Home',
                  description:
                    'See the best matching overseas home that our patented AI picks especially for you. Our advanced algorithms consider all your needs including current as well as projected future needs to find your perfect match.',
                  step: '02',
                  icon: <Building className="h-6 w-6" />,
                },
                {
                  title: 'Other Steps for Your Home Journey',
                  description:
                    'You can get deep analysis, projection or report on this property, ask to see other matches, or you can enjoy the journey and let our system guide you through the transaction for the purchase.',
                  step: '03',
                  icon: <Home className="h-6 w-6" />,
                },
              ].map((item, index) => (
                <div key={item.step} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="relative mb-8">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-blue-600 shadow-lg">
                        <div className="text-white">{item.icon}</div>
                      </div>
                      <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white border-2 border-primary text-sm font-bold text-primary shadow-md">
                        {item.step}
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>

                  {/* Connection Arrow */}
                  {index < 2 && (
                    <div className="hidden lg:block absolute top-8 left-full w-16 h-1 transform translate-x-0">
                      <div className="relative w-full h-full bg-primary/40">
                        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                          <div className="w-0 h-0 border-l-[10px] border-l-primary border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent drop-shadow-sm"></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </dl>
          </div>

          {/* Call to Action */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-full shadow-lg border border-gray-200">
              <span className="text-gray-700 font-medium">Ready to get started?</span>
              <Button
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-full"
                onClick={() => setIsPropertiesInfoModalOpen(true)}
              >
                Browse Properties
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Info Modals */}
      <InfoModal
        open={isPropertiesInfoModalOpen}
        onOpenChange={setIsPropertiesInfoModalOpen}
        onOpenFilters={() => setIsFilterModalOpen(true)}
        variant="properties"
      />

      <InfoModal
        open={isMunicipalitiesInfoModalOpen}
        onOpenChange={setIsMunicipalitiesInfoModalOpen}
        onOpenFilters={() => setIsFilterModalOpen(true)}
        variant="municipalities"
      />

      {/* Filter Modal (opened from Info Modals) */}
      <FilterModal open={isFilterModalOpen} onOpenChange={setIsFilterModalOpen} />
    </div>
  );
}
