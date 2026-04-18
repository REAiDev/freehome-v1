/**
 * Deployment Configuration
 *
 * Single source of truth for all deployment-related constants.
 * This module provides centralized configuration to ensure consistency
 * across the application and eliminate configuration drift.
 *
 * DEPLOYMENT APPROACH: We use the API Gateway stage path approach.
 * This means URLs include the stage name (e.g., /development/) in AWS,
 * but local development works normally without stage paths.
 *
 * BUILD CONFIGURATION: The basePath is set during build time using
 * BUILD_TARGET=aws environment variable in the build:aws script.
 */

/**
 * API Gateway configuration constants
 */
export const API_GATEWAY_CONFIG = {
  /**
   * The API Gateway stage name used for all deployments.
   * This determines the base path for all API routes and static assets.
   */
  STAGE: process.env.API_GATEWAY_STAGE || 'development',

  /**
   * The base path for the Next.js application.
   * This must match the API Gateway stage to ensure proper routing.
   * Note: This is applied during build time, not runtime.
   */
  get BASE_PATH() {
    return `/${this.STAGE}`;
  },

  /**
   * Determines if the current build is for AWS deployment
   */
  get IS_AWS_BUILD() {
    return process.env.BUILD_TARGET === 'aws';
  },

  /**
   * The API Gateway URL (dynamically resolved from environment)
   * This is set by the CDK deployment process for client-side usage
   * Note: Lambda functions don't need to know their own API Gateway URL
   */
  get API_URL() {
    // If explicitly set via environment variable (e.g., for client builds)
    if (process.env.API_GATEWAY_URL) {
      return process.env.API_GATEWAY_URL;
    }

    // For local development
    if (
      process.env.NODE_ENV === 'development' &&
      !process.env.AWS_LAMBDA_FUNCTION_NAME
    ) {
      return 'http://localhost:3000';
    }

    // For Lambda runtime, we don't need the URL since we're serving requests, not making them
    if (process.env.AWS_LAMBDA_FUNCTION_NAME) {
      return null; // Lambda functions don't need their own URL
    }

    // For build-time or other scenarios, this should be provided externally
    console.warn(
      'API_GATEWAY_URL not available. This may be expected in Lambda runtime.'
    );
    return null;
  },

  /**
   * The API Gateway ID (for direct AWS SDK calls if needed)
   */
  get API_ID() {
    return process.env.API_GATEWAY_ID;
  },
};

/**
 * Custom Domain Configuration
 *
 * When configured, this eliminates the need for stage paths in URLs.
 * Instead of: https://api-id.execute-api.region.amazonaws.com/development/
 * You get: https://your-domain.com/
 */
export const CUSTOM_DOMAIN_CONFIG = {
  /**
   * Enable custom domain to remove stage path requirement
   * Set to false to use default API Gateway URLs with stage path
   */
  ENABLED: false,

  /**
   * Your custom domain name (requires ACM certificate and Route53 hosted zone)
   * Example: 'api.yourdomain.com' or 'app.yourdomain.com'
   */
  DOMAIN_NAME: 'app.freehome.world',

  /**
   * ACM Certificate ARN for the custom domain
   * Must be in us-east-1 for Edge-optimized endpoints
   * Example: 'arn:aws:acm:us-east-1:123456789012:certificate/abcd1234-...'
   */
  CERTIFICATE_ARN: '',

  /**
   * Route53 Hosted Zone ID (optional)
   * If provided, DNS records will be created automatically
   * Example: 'Z1D633PJN98FT9'
   */
  HOSTED_ZONE_ID: '',
};

/**
 * Deployment environment configuration
 */
export const DEPLOYMENT_CONFIG = {
  /**
   * Determines if the application is running in a production deployment
   */
  IS_PRODUCTION: process.env.NODE_ENV === 'production',

  /**
   * The current deployment stage
   */
  ENVIRONMENT: API_GATEWAY_CONFIG.STAGE,

  /**
   * The base path for the application
   */
  BASE_PATH: API_GATEWAY_CONFIG.BASE_PATH,

  /**
   * Lambda function configuration
   */
  LAMBDA: {
    MEMORY_SIZE: 512,
    TIMEOUT_SECONDS: 30,
    RUNTIME: 'nodejs20.x',
  },

  /**
   * Static asset serving configuration
   */
  STATIC_ASSETS: {
    /**
     * Binary media types for API Gateway
     * These ensure static assets are served correctly through Lambda
     */
    BINARY_MEDIA_TYPES: [
      'application/javascript',
      'application/octet-stream',
      'text/css',
      'text/javascript',
      'font/*',
      'image/*',
      'application/font-woff',
      'application/font-woff2',
      'application/vnd.ms-fontobject',
      'application/x-font-ttf',
      'application/x-font-opentype',
      'application/json',
      '*/*', // Catch-all for any other binary content
    ],
  },

  /**
   * Get the frontend URL based on configuration
   * Returns custom domain URL if enabled, otherwise API Gateway URL
   */
  getFrontendUrl(apiGatewayUrl) {
    if (CUSTOM_DOMAIN_CONFIG.ENABLED && CUSTOM_DOMAIN_CONFIG.DOMAIN_NAME) {
      return `https://${CUSTOM_DOMAIN_CONFIG.DOMAIN_NAME}`;
    }
    return apiGatewayUrl;
  },
};

/**
 * Environment Detection
 */
export const ENVIRONMENT = {
  /**
   * Determines if we're running in local development
   */
  isLocal() {
    return (
      process.env.NODE_ENV === 'development' &&
      !process.env.AWS_LAMBDA_FUNCTION_NAME
    );
  },

  /**
   * Determines if we're running in AWS Lambda
   */
  isAWS() {
    return !!process.env.AWS_LAMBDA_FUNCTION_NAME;
  },
};

/**
 * URL Configuration
 *
 * Provides correct URLs based on environment
 */
export const URL_CONFIG = {
  /**
   * Gets the correct base URL for API calls
   * Note: This is primarily for client-side usage, not Lambda runtime
   */
  getApiBaseUrl() {
    const apiUrl = API_GATEWAY_CONFIG.API_URL;

    if (apiUrl === null && process.env.AWS_LAMBDA_FUNCTION_NAME) {
      throw new Error(
        'API base URL is not available in Lambda runtime. Use this method only in client-side code.'
      );
    }

    if (apiUrl === null) {
      throw new Error(
        'API_GATEWAY_URL not configured. Ensure environment variables are set correctly.'
      );
    }

    return apiUrl;
  },

  /**
   * Gets the correct base path for routing
   */
  getBasePath() {
    if (ENVIRONMENT.isLocal()) {
      // Local development - no base path
      return '';
    }
    // AWS deployment - include stage path
    return API_GATEWAY_CONFIG.BASE_PATH;
  },
};
