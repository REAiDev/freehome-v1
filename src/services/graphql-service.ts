import { NextResponse } from 'next/server';

/**
 * Proxy a GraphQL request to the backend server with conditional authentication
 * @param token Authentication token to include in the request (optional for public queries)
 * @param body Request body to forward to the backend
 * @returns NextResponse with the backend response
 */
export async function proxyGraphQLRequest(
  token: string | null,
  body: string
): Promise<NextResponse> {
  const backendUrl = process.env.BACKEND_API_URL || 'http://localhost:3000';

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Include authorization header when token is available
    // The backend will decide if authentication is required for the specific query
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${backendUrl}/graphql`, {
      method: 'POST',
      headers,
      body,
    });

    const responseBody = await response.text();
    return new NextResponse(responseBody, {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error proxying GraphQL request:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
