/**
 * Public Apollo Client Configuration
 * Responsibility: Provide GraphQL client for public (non-authenticated) queries
 * Follows SRP by focusing only on public data access
 */

import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { getClientGraphQLUrl } from './graphql-url';

const httpLink = createHttpLink({
  uri: getClientGraphQLUrl(),
});

// Public client without authentication - uses Next.js API route
export const publicApolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Define field policies for pagination, etc.
          properties: {
            keyArgs: [
              'priceMin',
              'priceMax',
              'search',
              'programId',
              'municipalityId',
              'cityId',
            ],
            merge(existing, incoming, { args }) {
              if (args?.page === 1) {
                return incoming;
              }
              return {
                ...incoming,
                items: [...(existing?.items || []), ...(incoming?.items || [])],
              };
            },
          },
          municipalities: {
            keyArgs: ['search', 'regionId'],
            merge(existing, incoming, { args }) {
              if (args?.page === 1) {
                return incoming;
              }
              return {
                ...incoming,
                items: [...(existing?.items || []), ...(incoming?.items || [])],
              };
            },
          },
          programs: {
            keyArgs: ['status', 'municipalityId', 'categoryId', 'search'],
            merge(existing, incoming, { args }) {
              if (args?.page === 1) {
                return incoming;
              }
              return {
                ...incoming,
                items: [...(existing?.items || []), ...(incoming?.items || [])],
              };
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'cache-first',
      errorPolicy: 'all',
    },
  },
});
