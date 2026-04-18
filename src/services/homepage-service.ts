/**
 * Homepage data service
 * Responsibility: Provide data fetching logic for homepage components
 * Follows SRP by focusing only on homepage data concerns
 * Follows DIP by depending on abstractions (GraphQL queries)
 * Follows ISP by providing specific interfaces for homepage needs
 */

import { publicApolloClient } from '@/lib/apollo-public-client';
import {
  GetPropertiesDocument,
  GetMunicipalitiesDocument,
  GetPropertyStatisticsDocument,
  type GetPropertiesQuery,
  type GetMunicipalitiesQuery,
  type GetPropertyStatisticsQuery,
} from '@/graphql/generated';
import { countriesService } from './countries-service';

export interface FeaturedProperty {
  readonly id: string;
  readonly title: string | null | undefined;
  readonly priceAmount: number | null | undefined;
  readonly currency: string;
  readonly renovationEstimate: number | null | undefined;
  readonly images: string[] | null | undefined;
  readonly cityName: string | null | undefined;
  readonly bedrooms: number | null | undefined;
  readonly bathrooms: number | null | undefined;
  readonly size: number | null | undefined;
  readonly unitSize: string | null | undefined;
  readonly city:
    | {
        readonly name: string;
        readonly region: {
          readonly name: string;
          readonly country: {
            readonly name: string;
            readonly code: string;
          };
        };
      }
    | null
    | undefined;
  readonly program:
    | {
        readonly id: string;
        readonly program_status: string | null | undefined;
      }
    | null
    | undefined;
}

export interface FeaturedMunicipality {
  readonly id: string;
  readonly name: string;
  readonly description: string | null | undefined;
  readonly population: number | null | undefined;
  readonly propertyCount: number;
  readonly imageUrl: string | null | undefined;
  readonly region: {
    readonly name: string;
    readonly country: {
      readonly name: string;
      readonly code: string;
    };
  };
}

export interface HomepageStatistics {
  readonly totalProperties: number;
  readonly totalMunicipalities: number;
  readonly averagePrice: number;
  readonly countriesCount: number;
}

export interface HomepageData {
  readonly featuredProperties: readonly FeaturedProperty[];
  readonly featuredMunicipalities: readonly FeaturedMunicipality[];
  readonly statistics: HomepageStatistics;
}

/**
 * Create Apollo client without authentication for public queries
 */
const createPublicApolloClient = () => {
  return publicApolloClient;
};

/**
 * Hardcoded featured properties for initial release
 * Per ticket #114: Updated with specific property info and images
 */
const HARDCODED_FEATURED_PROPERTIES: readonly FeaturedProperty[] = [
  {
    id: 'featured-1',
    title: 'Historical Stone House in Campania',
    priceAmount: 1,
    currency: 'EUR',
    renovationEstimate: 39000,
    images: ['/images/properties/zungoli-campania.jpg'],
    cityName: 'Zungoli',
    bedrooms: 3,
    bathrooms: 1,
    size: 75,
    unitSize: 'm²',
    city: {
      name: 'Zungoli',
      region: {
        name: 'Campania',
        country: {
          name: 'Italy',
          code: 'IT',
        },
      },
    },
    program: {
      id: 'prog-1',
      program_status: 'active',
    },
  },
  {
    id: 'featured-2',
    title: 'Charming Wooden House in Scenic Hokkaido',
    priceAmount: 0,
    currency: 'USD',
    renovationEstimate: 8500,
    images: ['/images/properties/hokkaido-wooden-house.jpg'],
    cityName: 'Hokkaido',
    bedrooms: 5,
    bathrooms: 1,
    size: 108,
    unitSize: 'm²',
    city: {
      name: 'Hokkaido',
      region: {
        name: 'Hokkaido',
        country: {
          name: 'Japan',
          code: 'JP',
        },
      },
    },
    program: {
      id: 'prog-japan',
      program_status: 'active',
    },
  },
  {
    id: 'featured-3',
    title: 'Beautiful Rural House in Andalusia with Walled Garden',
    priceAmount: 99000,
    currency: 'EUR',
    renovationEstimate: 0,
    images: ['/images/properties/andalusia-rural-house.webp'],
    cityName: 'Andalusia',
    bedrooms: 4,
    bathrooms: 2,
    size: 170,
    unitSize: 'm²',
    city: {
      name: 'Andalusia',
      region: {
        name: 'Andalusia',
        country: {
          name: 'Spain',
          code: 'ES',
        },
      },
    },
    program: null,
  },
];

/**
 * Hardcoded featured municipalities for initial release
 * Per ticket #95: Latronico first, then municipality with incentive program
 */
const HARDCODED_FEATURED_MUNICIPALITIES: readonly FeaturedMunicipality[] = [
  {
    id: 'muni-1',
    name: 'Latronico',
    description:
      'A picturesque town in Basilicata offering €1 homes to revitalize the community. Known for its thermal baths, medieval architecture, and stunning mountain views in the Pollino National Park.',
    population: 4200,
    propertyCount: 12,
    imageUrl: '/latronico-italy.jpg',
    region: {
      name: 'Basilicata',
      country: {
        name: 'Italy',
        code: 'IT',
      },
    },
  },
  {
    id: 'muni-2',
    name: 'Ponga',
    description:
      'A scenic municipality in Asturias with the "Pay with Your Life" program offering €2,971 to individuals who relocate, plus €2,971 for each baby born. Beautiful natural landscapes in the Picos de Europa.',
    population: 600,
    propertyCount: 5,
    imageUrl: '/ponga-spain.jpg',
    region: {
      name: 'Asturias',
      country: {
        name: 'Spain',
        code: 'ES',
      },
    },
  },
];

class HomepageService {
  /**
   * Returns hardcoded featured properties for homepage display
   * TODO: Connect to database for rotation (ticket #16)
   */
  async getFeaturedProperties(): Promise<readonly FeaturedProperty[]> {
    // Return hardcoded properties for initial release
    return HARDCODED_FEATURED_PROPERTIES;
  }

  /**
   * Returns hardcoded featured municipalities for homepage display
   * TODO: Connect to database for rotation (ticket #16)
   */
  async getFeaturedMunicipalities(): Promise<readonly FeaturedMunicipality[]> {
    // Return hardcoded municipalities for initial release
    return HARDCODED_FEATURED_MUNICIPALITIES;
  }

  /**
   * Fetches statistics for homepage display
   */
  async getHomepageStatistics(): Promise<HomepageStatistics> {
    try {
      const client = createPublicApolloClient();
      const [propertiesResult, municipalitiesResult, statsResult, countriesResult] =
        await Promise.allSettled([
          client.query<GetPropertiesQuery>({
            query: GetPropertiesDocument,
            variables: { page: 1, pageSize: 1 },
          }),
          client.query<GetMunicipalitiesQuery>({
            query: GetMunicipalitiesDocument,
            variables: { page: 1, pageSize: 1 },
          }),
          client.query<GetPropertyStatisticsQuery>({
            query: GetPropertyStatisticsDocument,
          }),
          countriesService.getCountriesCount(),
        ]);

      // Extract successful results or use defaults
      const totalProperties =
        propertiesResult.status === 'fulfilled'
          ? propertiesResult.value.data?.properties?.totalItems || 0
          : 0;

      const totalMunicipalities =
        municipalitiesResult.status === 'fulfilled'
          ? municipalitiesResult.value.data?.municipalities?.totalItems || 0
          : 0;

      // Get actual countries count from countries service
      const countriesCount =
        countriesResult.status === 'fulfilled' ? countriesResult.value || 0 : 0;

      // Safely extract average price from statistics
      let averagePrice = 0;
      if (statsResult.status === 'fulfilled' && statsResult.value.data) {
        const propertyStats = statsResult.value.data.propertyStatistics;
        if (propertyStats) {
          averagePrice = propertyStats.byPrice?.averagePrice || 0;
        }
      }

      return {
        totalProperties,
        totalMunicipalities,
        averagePrice,
        countriesCount,
      };
    } catch (error) {
      console.error('Error fetching homepage statistics:', error);
      // Return zeros instead of mock data
      return {
        totalProperties: 0,
        totalMunicipalities: 0,
        averagePrice: 0,
        countriesCount: 0,
      };
    }
  }

  /**
   * Fetches all homepage data in a single operation
   */
  async getHomepageData(): Promise<HomepageData> {
    try {
      const [featuredProperties, featuredMunicipalities, statistics] = await Promise.all([
        this.getFeaturedProperties(),
        this.getFeaturedMunicipalities(),
        this.getHomepageStatistics(),
      ]);

      return {
        featuredProperties,
        featuredMunicipalities,
        statistics,
      };
    } catch (error) {
      console.error('Error fetching homepage data:', error);
      throw error;
    }
  }
}

export const homepageService = new HomepageService();
