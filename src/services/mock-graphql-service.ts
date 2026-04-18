import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

interface GraphQLRequest {
  operationName: string;
  variables?: Record<string, unknown>;
  query: string;
}

interface MockVariant {
  description: string;
  file: string;
  variables: Record<string, unknown>;
}

interface MockOperation {
  description: string;
  file?: string;
  variables?: Record<string, unknown>;
  variants?: MockVariant[];
}

/**
 * Mock GraphQL service that returns hardcoded responses instead of making upstream API requests
 * @param token Authentication token (ignored for mock service)
 * @param body Request body containing the GraphQL query
 * @returns NextResponse with mock data
 */
export async function mockGraphQLRequest(
  token: string | null,
  body: string
): Promise<NextResponse> {
  try {
    const request: GraphQLRequest = JSON.parse(body);
    const { operationName, variables = {} } = request;

    // Load operation mapping
    const mappingPath = path.join(process.cwd(), 'mock-data', 'graphql', 'operation-mapping.json');
    const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'));

    const operation: MockOperation = mapping[operationName];

    if (!operation) {
      return NextResponse.json(
        { error: `Mock data not found for operation: ${operationName}` },
        { status: 404 }
      );
    }

    let mockDataFile: string;

    // Handle operations with variants (different parameter combinations)
    if (operation.variants) {
      // Find the best matching variant based on variables
      const matchingVariant = operation.variants.find(variant => {
        return Object.keys(variant.variables).every(key => {
          return variables[key] === variant.variables[key];
        });
      });

      if (matchingVariant) {
        mockDataFile = matchingVariant.file;
      } else {
        // Fallback to first variant if no exact match
        mockDataFile = operation.variants[0].file;
        console.warn(`No exact variant match found for ${operationName}, using fallback: ${mockDataFile}`);
      }
    } else {
      // Simple operation without variants
      mockDataFile = operation.file!;
    }

    // Load and return mock data
    const mockDataPath = path.join(process.cwd(), 'mock-data', 'graphql', mockDataFile);
    const mockData = fs.readFileSync(mockDataPath, 'utf-8');

    return new NextResponse(mockData, {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in mock GraphQL service:', error);

    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}