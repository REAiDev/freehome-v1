/**
 * Core types and interfaces
 * Responsibility: Define fundamental contracts and base types
 * Follows SRP by containing only core, reusable types
 */

// Base Entity Interface - follows ISP by providing minimal contract
export interface BaseEntity {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// Pagination contracts - follows ISP by separating concerns
export interface PaginationRequest {
  readonly page: number;
  readonly pageSize: number;
}

export interface PaginationResponse {
  readonly totalItems: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

export interface PaginatedResult<T> extends PaginationResponse {
  readonly items: ReadonlyArray<T>;
}

// Search contracts - follows SRP
export interface SearchRequest {
  readonly search?: string;
}

// Filter contracts - follows OCP by being extensible
export interface FilterRequest<T = Record<string, unknown>> {
  readonly filters?: T;
}

// API Response contracts - follows ISP
export interface ApiResponse<T> {
  readonly data: T;
  readonly message?: string;
  readonly success: boolean;
}

export interface ApiError {
  readonly message: string;
  readonly code?: string;
  readonly details?: Record<string, unknown>;
}

// Result pattern for error handling - follows SRP
export type Result<T, E = ApiError> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: E };

// Status enums - follows SRP by grouping related constants
export enum EntityStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  SUSPENDED = 'SUSPENDED',
  ARCHIVED = 'ARCHIVED',
}

// User roles - follows SRP
export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  MODERATOR = 'MODERATOR',
}

// Subscription status - follows SRP
export enum SubscriptionStatus {
  NONE = 'NONE',
  TRIAL = 'TRIAL',
  BASIC = 'BASIC',
  PREMIUM = 'PREMIUM',
  EXPIRED = 'EXPIRED',
}

// Location coordinates - follows SRP
export interface Coordinates {
  readonly latitude: number;
  readonly longitude: number;
}

// Contact information - follows SRP
export interface ContactInfo {
  readonly phone?: ReadonlyArray<string>;
  readonly email?: ReadonlyArray<string>;
  readonly website?: string;
}

// Address information - follows SRP
export interface AddressInfo {
  readonly street?: string;
  readonly postalCode?: string;
  readonly addressFull?: string;
}
