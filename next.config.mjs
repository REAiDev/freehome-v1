/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable standalone mode for development to avoid Windows symlink issues
  // Enable only for production deployment
  // output: 'standalone',

  // No asset prefix needed for clean URL deployment
  // All requests will be handled without stage prefixes

  // Ensure trailing slashes are disabled for Lambda Web Adapter compatibility
  trailingSlash: false,

  env: {
    NEXT_PUBLIC_GRAPHQL_ROUTE: '/api/graphql',
    NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'http://localhost:3000',
    MOCK_JWT_TOKEN: process.env.MOCK_JWT_TOKEN || 'mock-jwt-token',
  },

  images: {
    // Disable image optimization for Lambda
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      {
        protocol: 'https',
        hostname: 'freehome-media-dev.s3.us-east-1.amazonaws.com',
      },
    ],
  },

  // Minimal config for AWS Lambda compatibility
  poweredByHeader: false,

  // Optimize for Lambda deployment
  experimental: {
    // Disable features that don't work well with Lambda
    optimizeCss: false,
  },

  // External packages configuration (moved from experimental)
  serverExternalPackages: [],

  // Webpack configuration for Lambda compatibility
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = config.externals || [];
      config.externals.push('@aws-sdk/client-s3');
    }
    return config;
  },
};

export default nextConfig;
