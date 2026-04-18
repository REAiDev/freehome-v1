/**
 * GraphQL URL construction utilities following SOLID principles
 */

/**
 * Environment configuration interface for URL construction
 */
interface UrlEnvironment {
  readonly graphqlRoute: string;
  readonly nodeEnv: string;
  readonly vercelUrl?: string;
  readonly nextAuthUrl?: string;
}

/**
 * Browser environment interface for client-side URL construction
 */
interface BrowserEnvironment {
  readonly origin: string;
}

/**
 * Gets the GraphQL route from environment configuration
 * @returns The GraphQL route path
 */
export function getGraphQLRoute(): string {
  return process.env.NEXT_PUBLIC_GRAPHQL_ROUTE ?? '/api/graphql';
}

/**
 * Constructs base URL for server-side operations
 * @param env Environment configuration
 * @returns Base URL for the application
 */
function constructServerBaseUrl(env: UrlEnvironment): string {
  if (env.vercelUrl) {
    return `https://${env.vercelUrl}`;
  }

  if (env.nextAuthUrl) {
    return env.nextAuthUrl;
  }

  const protocol = env.nodeEnv === 'production' ? 'https' : 'http';
  return `${protocol}://localhost:3000`;
}

/**
 * Creates environment configuration from process.env
 * @returns Environment configuration object
 */
function createEnvironmentConfig(): UrlEnvironment {
  return {
    graphqlRoute: getGraphQLRoute(),
    nodeEnv: process.env.NODE_ENV ?? 'development',
    vercelUrl: process.env.VERCEL_URL,
    nextAuthUrl: process.env.NEXTAUTH_URL,
  };
}

/**
 * Constructs GraphQL URL for client-side operations
 * @param browserEnv Browser environment
 * @param route GraphQL route
 * @returns Complete GraphQL URL for client-side usage
 */
function constructClientGraphQLUrl(
  browserEnv: BrowserEnvironment,
  route: string
): string {
  return `${browserEnv.origin}${route}`;
}

/**
 * Constructs GraphQL URL for server-side operations
 * @param env Environment configuration
 * @returns Complete GraphQL URL for server-side usage
 */
function constructServerGraphQLUrl(env: UrlEnvironment): string {
  const baseUrl = constructServerBaseUrl(env);
  return `${baseUrl}${env.graphqlRoute}`;
}

/**
 * Gets the GraphQL URL for client-side operations
 * Uses browser origin when available, falls back to server construction
 * @returns The GraphQL URL for client-side usage
 */
export function getClientGraphQLUrl(): string {
  const route = getGraphQLRoute();

  // Client-side: use browser origin
  if (typeof window !== 'undefined') {
    return constructClientGraphQLUrl({ origin: window.location.origin }, route);
  }

  // Server-side fallback during SSR
  const env = createEnvironmentConfig();
  return constructServerGraphQLUrl(env);
}

/**
 * Gets the GraphQL URL for server-side operations
 * Uses relative path for internal routing when possible
 * @returns The GraphQL URL for server-side usage
 */
export function getServerGraphQLUrl(): string {
  // For internal server-side operations, use relative path for better performance
  return getGraphQLRoute();
}
