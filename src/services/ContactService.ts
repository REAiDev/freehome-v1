/**
 * Contact Service
 * Responsibility: Encapsulate business logic and validation for contact operations
 * Follows: SRP - Single purpose of contact business logic
 * Follows: DIP - Depends on IContactRepository abstraction, not implementation
 * Follows: OCP - Open for extension (add new validation rules), closed for modification
 */

import type { IContactRepository } from '@/repositories/IContactRepository';
import type {
  ContactMessage,
  CreateContactMessageDTO,
  ContactMessageFilters,
  PaginationParams,
  PaginatedResult,
  AsyncContactResult,
  ValidationError,
} from '@/types/contact';

/**
 * Validation constants
 */
const VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
  SUBJECT_MIN_LENGTH: 5,
  SUBJECT_MAX_LENGTH: 200,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 5000,
} as const;

/**
 * Email validation regex (RFC 5322 simplified)
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Helper to create validation error result
 */
function validationError<T>(errors: ValidationError[]): AsyncContactResult<T> {
  return Promise.resolve({
    success: false,
    error: {
      type: 'ValidationError',
      errors,
    },
  });
}

/**
 * Sanitize string input (trim and normalize whitespace)
 */
function sanitize(input: string): string {
  return input.trim().replace(/\s+/g, ' ');
}

/**
 * Service layer for contact message operations
 * Encapsulates validation and business logic
 */
export class ContactService {
  constructor(private readonly repository: IContactRepository) {}

  /**
   * Validate contact message data
   * @param data - Data to validate
   * @returns Array of validation errors (empty if valid)
   */
  private validateContactData(data: CreateContactMessageDTO): ValidationError[] {
    const errors: ValidationError[] = [];

    // Name validation
    const name = sanitize(data.name);
    if (name.length < VALIDATION.NAME_MIN_LENGTH) {
      errors.push({
        field: 'name',
        message: `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters`,
      });
    }
    if (name.length > VALIDATION.NAME_MAX_LENGTH) {
      errors.push({
        field: 'name',
        message: `Name must not exceed ${VALIDATION.NAME_MAX_LENGTH} characters`,
      });
    }

    // Email validation
    const email = sanitize(data.email);
    if (!EMAIL_REGEX.test(email)) {
      errors.push({
        field: 'email',
        message: 'Please provide a valid email address',
      });
    }
    if (email.length > VALIDATION.EMAIL_MAX_LENGTH) {
      errors.push({
        field: 'email',
        message: `Email must not exceed ${VALIDATION.EMAIL_MAX_LENGTH} characters`,
      });
    }

    // Subject validation
    const subject = sanitize(data.subject);
    if (subject.length < VALIDATION.SUBJECT_MIN_LENGTH) {
      errors.push({
        field: 'subject',
        message: `Subject must be at least ${VALIDATION.SUBJECT_MIN_LENGTH} characters`,
      });
    }
    if (subject.length > VALIDATION.SUBJECT_MAX_LENGTH) {
      errors.push({
        field: 'subject',
        message: `Subject must not exceed ${VALIDATION.SUBJECT_MAX_LENGTH} characters`,
      });
    }

    // Message validation
    const message = sanitize(data.message);
    if (message.length < VALIDATION.MESSAGE_MIN_LENGTH) {
      errors.push({
        field: 'message',
        message: `Message must be at least ${VALIDATION.MESSAGE_MIN_LENGTH} characters`,
      });
    }
    if (message.length > VALIDATION.MESSAGE_MAX_LENGTH) {
      errors.push({
        field: 'message',
        message: `Message must not exceed ${VALIDATION.MESSAGE_MAX_LENGTH} characters`,
      });
    }

    return errors;
  }

  /**
   * Submit a new contact message
   * Validates input and delegates to repository
   */
  async submitContactMessage(data: CreateContactMessageDTO): AsyncContactResult<ContactMessage> {
    // Validate input
    const validationErrors = this.validateContactData(data);
    if (validationErrors.length > 0) {
      return validationError(validationErrors);
    }

    // Sanitize all text fields
    const sanitizedData: CreateContactMessageDTO = {
      name: sanitize(data.name),
      email: sanitize(data.email).toLowerCase(), // Normalize email to lowercase
      subject: sanitize(data.subject),
      message: sanitize(data.message),
      userId: data.userId,
      userAgent: data.userAgent,
      ipAddress: data.ipAddress,
    };

    // Delegate to repository
    return this.repository.create(sanitizedData);
  }

  /**
   * Get a contact message by ID
   */
  async getMessageById(id: string): AsyncContactResult<ContactMessage> {
    if (!id || id.trim().length === 0) {
      return validationError([
        {
          field: 'id',
          message: 'Message ID is required',
        },
      ]);
    }

    return this.repository.findById(id);
  }

  /**
   * Get paginated list of contact messages
   */
  async getMessages(
    filters?: ContactMessageFilters,
    pagination?: PaginationParams
  ): AsyncContactResult<PaginatedResult<ContactMessage>> {
    // Validate pagination if provided
    if (pagination) {
      const errors: ValidationError[] = [];

      if (pagination.page < 1) {
        errors.push({
          field: 'page',
          message: 'Page must be greater than 0',
        });
      }

      if (pagination.pageSize < 1 || pagination.pageSize > 100) {
        errors.push({
          field: 'pageSize',
          message: 'Page size must be between 1 and 100',
        });
      }

      if (errors.length > 0) {
        return validationError(errors);
      }
    }

    // Sanitize search term if provided
    const sanitizedFilters = filters?.searchTerm
      ? { ...filters, searchTerm: sanitize(filters.searchTerm) }
      : filters;

    return this.repository.findMany(sanitizedFilters, pagination);
  }

  /**
   * Mark a message as read
   */
  async markAsRead(id: string): AsyncContactResult<ContactMessage> {
    return this.repository.update(id, { status: 'read' });
  }

  /**
   * Mark a message as replied
   */
  async markAsReplied(id: string): AsyncContactResult<ContactMessage> {
    return this.repository.update(id, { status: 'replied' });
  }

  /**
   * Archive a message
   */
  async archiveMessage(id: string): AsyncContactResult<ContactMessage> {
    return this.repository.update(id, { status: 'archived' });
  }

  /**
   * Delete a message (soft delete)
   */
  async deleteMessage(id: string): AsyncContactResult<ContactMessage> {
    return this.repository.delete(id);
  }

  /**
   * Get count of messages matching filters
   */
  async getMessageCount(filters?: ContactMessageFilters): AsyncContactResult<number> {
    return this.repository.count(filters);
  }

  /**
   * Get unread message count
   */
  async getUnreadCount(): AsyncContactResult<number> {
    return this.repository.count({ status: 'new' });
  }
}
