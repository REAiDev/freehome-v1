/**
 * Contact Domain Types
 * Responsibility: Define core domain models for contact form system
 * Follows: SRP - Single source of truth for contact-related types
 */

/**
 * Status of a contact message in the system
 */
export type ContactMessageStatus = 'new' | 'read' | 'replied' | 'archived';

/**
 * Core domain entity representing a contact message
 * Immutable - all fields are readonly
 */
export interface ContactMessage {
  readonly id: string;
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly status: ContactMessageStatus;
  readonly userId?: string; // Optional - links to authenticated user
  readonly userAgent?: string; // Browser/device info
  readonly ipAddress?: string; // For security/analytics
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date; // Soft delete support
}

/**
 * Data Transfer Object for creating a new contact message
 * Only includes fields that can be set during creation
 */
export interface CreateContactMessageDTO {
  readonly name: string;
  readonly email: string;
  readonly subject: string;
  readonly message: string;
  readonly userId?: string;
  readonly userAgent?: string;
  readonly ipAddress?: string;
}

/**
 * Data Transfer Object for updating an existing contact message
 * All fields are optional (partial updates)
 */
export interface UpdateContactMessageDTO {
  readonly status?: ContactMessageStatus;
  readonly deletedAt?: Date;
}

/**
 * Query filters for retrieving contact messages
 */
export interface ContactMessageFilters {
  readonly status?: ContactMessageStatus;
  readonly userId?: string;
  readonly email?: string;
  readonly startDate?: Date;
  readonly endDate?: Date;
  readonly searchTerm?: string; // For full-text search
}

/**
 * Pagination parameters for list queries
 */
export interface PaginationParams {
  readonly page: number; // 1-indexed
  readonly pageSize: number;
}

/**
 * Generic paginated result wrapper
 */
export interface PaginatedResult<T> {
  readonly data: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

/**
 * Discriminated union type for operation results
 * Enables type-safe error handling without exceptions
 */
export type Result<T, E = Error> =
  | { readonly success: true; readonly data: T }
  | { readonly success: false; readonly error: E };

/**
 * Helper type for async operations returning Results
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * Validation error type with field-specific messages
 */
export interface ValidationError {
  readonly field: string;
  readonly message: string;
}

/**
 * Domain-specific error types
 */
export type ContactError =
  | { readonly type: 'ValidationError'; readonly errors: readonly ValidationError[] }
  | { readonly type: 'NotFoundError'; readonly id: string }
  | { readonly type: 'DatabaseError'; readonly message: string }
  | { readonly type: 'UnknownError'; readonly message: string };

/**
 * Typed result specifically for contact operations
 */
export type ContactResult<T> = Result<T, ContactError>;
export type AsyncContactResult<T> = AsyncResult<T, ContactError>;
