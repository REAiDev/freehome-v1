import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: process.env.BACKEND_API_URL ?? 'https://portal.reai.co/api',

  // All GraphQL operations (queries, mutations, subscriptions)
  documents: ['src/**/*.{ts,tsx}', 'src/graphql/queries/**/*.graphql'],

  // Generate TypeScript types and React hooks
  generates: {
    './src/graphql/generated/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        // Generate typed document nodes for better type safety
        gqlTagName: 'gql',
      },
      config: {
        // Use Apollo Client v4 compatible types
        // Avoid generating deprecated types like MutationFunction
        avoidOptionals: false,
        // Ensure compatibility with Apollo Client v4
        scalars: {
          DateTime: 'string',
          Date: 'string',
        },
      },
    },
  },

  // Ignore patterns
  ignoreNoDocuments: true,
};

export default config;
