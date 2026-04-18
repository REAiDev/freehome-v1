import { NextRequest } from 'next/server';
import { proxyGraphQLRequest } from '@/services/graphql-service';
import { mockGraphQLRequest } from '@/services/mock-graphql-service';

/**
 * Proxy GraphQL requests to the backend GraphQL server or return mock data.
 * Handles authentication via NextAuth.
 */
export async function POST(request: NextRequest) {
  // Forward the request body
  const body = await request.text();

  // Use mock data if GRAPHQL_MOCK_MODE is enabled
  const useMockData = process.env.GRAPHQL_MOCK_MODE === 'true';

  if (useMockData) {
    return mockGraphQLRequest(null, body);
  }

  // Handle the proxy request with proper error handling
  return proxyGraphQLRequest(null, body);
}

/**
 * Handle GET requests for GraphQL endpoint (e.g., introspection or health check)
 */
export async function GET() {
  return Response.json({ message: 'GraphQL endpoint is up' });
}
