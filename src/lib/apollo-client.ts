import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { getClientGraphQLUrl } from './graphql-url';

const httpLink = createHttpLink({
  uri: getClientGraphQLUrl(),
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  let token = null;
  if (typeof window !== 'undefined') {
    token = localStorage.getItem('token');
  }

  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Define field policies for pagination, etc.
          programs: {
            keyArgs: ['status', 'municipalityId', 'categoryId', 'search'],
            merge(existing, incoming) {
              // For standard pagination, always return the incoming data
              // Don't merge items as this is not infinite scroll
              return incoming;
            },
          },
        },
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});
