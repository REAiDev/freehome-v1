/**
 * Deployment Configuration
 *
 * Single source of truth for all deployment-related constants.
 * This module provides centralized configuration to ensure consistency
 * across the application and eliminate configuration drift.
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
   */
  get BASE_PATH(): string {
    return `/${this.STAGE}`;
  },

  /**
   * Determines if the current build is for AWS deployment
   */
  get IS_AWS_BUILD(): boolean {
    return process.env.BUILD_TARGET === 'aws';
  },
} as const;

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
  STAGE: API_GATEWAY_CONFIG.STAGE,

  /**
   * The base path for the application
   */
  BASE_PATH: API_GATEWAY_CONFIG.BASE_PATH,

  /**
   * Determines if this is an AWS build
   */
  IS_AWS_BUILD: API_GATEWAY_CONFIG.IS_AWS_BUILD,
} as const;

/**
 * Type definitions for deployment configuration
 */
export type DeploymentStage = typeof API_GATEWAY_CONFIG.STAGE;
export type BasePath = typeof API_GATEWAY_CONFIG.BASE_PATH;
