/**
 * Countries Service
 * Responsibility: Handle countries data fetching and transformations
 * Follows SRP by focusing solely on countries operations
 * Follows DIP by depending on GraphQL abstractions
 */

import { publicApolloClient } from '@/lib/apollo-public-client';
import {
  GetCountriesDocument,
  GetCountryDocument,
  type GetCountriesQuery,
  type GetCountryQuery,
  type GetCountryQueryVariables,
} from '@/graphql/generated';

export interface Country {
  readonly id: string;
  readonly name: string;
  readonly code: string;
  readonly currency: string;
  readonly regions?: ReadonlyArray<{
    readonly id: string;
    readonly name: string;
  }>;
}

export interface CountriesStatistics {
  readonly totalCountries: number;
  readonly totalRegions: number;
}

/**
 * Create Apollo client without authentication for public queries
 */
const createPublicApolloClient = () => {
  return publicApolloClient;
};

class CountriesService {
  /**
   * Fetches all countries from the backend
   */
  async getCountries(): Promise<readonly Country[]> {
    try {
      const client = createPublicApolloClient();
      const result = await client.query<GetCountriesQuery>({
        query: GetCountriesDocument,
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      });

      if (!result.data) {
        return [];
      }

      return result.data.countries.map((country) => ({
        id: country.id,
        name: country.name,
        code: country.code,
        currency: country.currency,
      }));
    } catch (error) {
      console.error('Error fetching countries:', error);
      return [];
    }
  }

  /**
   * Fetches a single country with its regions
   */
  async getCountry(id: string): Promise<Country | null> {
    try {
      const client = createPublicApolloClient();
      const result = await client.query<GetCountryQuery>({
        query: GetCountryDocument,
        variables: { id } as GetCountryQueryVariables,
        errorPolicy: 'all',
        fetchPolicy: 'no-cache',
      });

      if (!result.data || !result.data.country) {
        return null;
      }

      const country = result.data.country;
      return {
        id: country.id,
        name: country.name,
        code: country.code,
        currency: country.currency,
        regions: country.regions?.map((region) => ({
          id: region.id,
          name: region.name,
        })),
      };
    } catch (error) {
      console.error('Error fetching country:', error);
      return null;
    }
  }

  /**
   * Gets statistics about countries and regions
   */
  async getCountriesStatistics(): Promise<CountriesStatistics> {
    try {
      const countries = await this.getCountries();
      const totalRegions = countries.reduce(
        (sum, country) => sum + (country.regions?.length || 0),
        0
      );

      return {
        totalCountries: countries.length,
        totalRegions,
      };
    } catch (error) {
      console.error('Error fetching countries statistics:', error);
      return {
        totalCountries: 0,
        totalRegions: 0,
      };
    }
  }

  /**
   * Gets the total count of countries
   */
  async getCountriesCount(): Promise<number> {
    try {
      const countries = await this.getCountries();
      return countries.length;
    } catch (error) {
      console.error('Error fetching countries count:', error);
      return 0;
    }
  }
}

export const countriesService = new CountriesService();
