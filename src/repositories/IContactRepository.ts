/**
 * Contact Repository Interface
 * Responsibility: Define contract for contact message data access operations
 * Follows: ISP - Interface segregation with focused, minimal contract
 * Follows: DIP - High-level modules depend on this abstraction, not implementations
 */

import type {
  ContactMessage,
  CreateContactMessageDTO,
  UpdateContactMessageDTO,
  ContactMessageFilters,
  PaginationParams,
  PaginatedResult,
  AsyncContactResult,
} from '@/types/contact';

/**
 * Repository interface for contact message persistence
 * Implementations can use any data source (Supabase, MongoDB, Mock, etc.)
 */
export interface IContactRepository {
  /**
   * Create a new contact message
   * @param data - Contact message creation data
   * @returns Result containing the created message or error
   */
  create(data: CreateContactMessageDTO): AsyncContactResult<ContactMessage>;

  /**
   * Find a contact message by ID
   * @param id - Message ID
   * @returns Result containing the message or NotFoundError
   */
  findById(id: string): AsyncContactResult<ContactMessage>;

  /**
   * Find all contact messages matching filters with pagination
   * @param filters - Query filters
   * @param pagination - Pagination parameters
   * @returns Result containing paginated messages or error
   */
  findMany(
    filters?: ContactMessageFilters,
    pagination?: PaginationParams
  ): AsyncContactResult<PaginatedResult<ContactMessage>>;

  /**
   * Update an existing contact message
   * @param id - Message ID
   * @param data - Update data
   * @returns Result containing updated message or error
   */
  update(id: string, data: UpdateContactMessageDTO): AsyncContactResult<ContactMessage>;

  /**
   * Soft delete a contact message (sets deletedAt timestamp)
   * @param id - Message ID
   * @returns Result containing deleted message or error
   */
  delete(id: string): AsyncContactResult<ContactMessage>;

  /**
   * Count messages matching filters
   * @param filters - Query filters
   * @returns Result containing count or error
   */
  count(filters?: ContactMessageFilters): AsyncContactResult<number>;
}
