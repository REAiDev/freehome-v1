/**
 * Mock Contact Repository Implementation
 * Responsibility: Provide in-memory implementation for testing and development
 * Follows: LSP - Fully substitutable for IContactRepository
 * Follows: SRP - Single purpose of mock data access
 */

import type { IContactRepository } from './IContactRepository';
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
 * Default pagination values
 */
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

/**
 * Helper to create success result
 */
function success<T>(data: T): AsyncContactResult<T> {
  return Promise.resolve({ success: true, data });
}

/**
 * Helper to match message against filters
 */
function matchesFilters(message: ContactMessage, filters?: ContactMessageFilters): boolean {
  if (!filters) return true;

  if (filters.status && message.status !== filters.status) return false;
  if (filters.userId && message.userId !== filters.userId) return false;
  if (filters.email && message.email !== filters.email) return false;
  if (filters.startDate && message.createdAt < filters.startDate) return false;
  if (filters.endDate && message.createdAt > filters.endDate) return false;
  if (filters.searchTerm) {
    const term = filters.searchTerm.toLowerCase();
    const searchable = [message.name, message.email, message.subject, message.message]
      .join(' ')
      .toLowerCase();
    if (!searchable.includes(term)) return false;
  }

  return true;
}

/**
 * In-memory implementation of contact repository for testing
 */
export class MockContactRepository implements IContactRepository {
  private messages: Map<string, ContactMessage> = new Map();
  private currentId = 1;

  /**
   * Clear all stored messages (useful for test cleanup)
   */
  clear(): void {
    this.messages.clear();
    this.currentId = 1;
  }

  /**
   * Seed with initial data (useful for testing)
   */
  seed(messages: ContactMessage[]): void {
    messages.forEach((message) => {
      this.messages.set(message.id, message);
    });
  }

  async create(data: CreateContactMessageDTO): AsyncContactResult<ContactMessage> {
    const id = `msg_${this.currentId++}`;
    const now = new Date();

    const message: ContactMessage = {
      id,
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      status: 'new',
      userId: data.userId,
      userAgent: data.userAgent,
      ipAddress: data.ipAddress,
      createdAt: now,
      updatedAt: now,
      deletedAt: undefined,
    };

    this.messages.set(id, message);
    return success(message);
  }

  async findById(id: string): AsyncContactResult<ContactMessage> {
    const message = this.messages.get(id);

    if (!message || message.deletedAt) {
      return Promise.resolve({
        success: false,
        error: {
          type: 'NotFoundError',
          id,
        },
      });
    }

    return success(message);
  }

  async findMany(
    filters?: ContactMessageFilters,
    pagination?: PaginationParams
  ): AsyncContactResult<PaginatedResult<ContactMessage>> {
    const page = pagination?.page ?? DEFAULT_PAGE;
    const pageSize = pagination?.pageSize ?? DEFAULT_PAGE_SIZE;

    // Filter out deleted messages and apply filters
    const allMessages = Array.from(this.messages.values())
      .filter((msg) => !msg.deletedAt)
      .filter((msg) => matchesFilters(msg, filters))
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()); // Newest first

    const total = allMessages.length;
    const totalPages = Math.ceil(total / pageSize);
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    const data = allMessages.slice(from, to);

    return success({
      data,
      total,
      page,
      pageSize,
      totalPages,
    });
  }

  async update(id: string, data: UpdateContactMessageDTO): AsyncContactResult<ContactMessage> {
    const message = this.messages.get(id);

    if (!message || message.deletedAt) {
      return Promise.resolve({
        success: false,
        error: {
          type: 'NotFoundError',
          id,
        },
      });
    }

    const updated: ContactMessage = {
      ...message,
      status: data.status ?? message.status,
      deletedAt: data.deletedAt ?? message.deletedAt,
      updatedAt: new Date(),
    };

    this.messages.set(id, updated);
    return success(updated);
  }

  async delete(id: string): AsyncContactResult<ContactMessage> {
    const message = this.messages.get(id);

    if (!message || message.deletedAt) {
      return Promise.resolve({
        success: false,
        error: {
          type: 'NotFoundError',
          id,
        },
      });
    }

    const deleted: ContactMessage = {
      ...message,
      deletedAt: new Date(),
      updatedAt: new Date(),
    };

    this.messages.set(id, deleted);
    return success(deleted);
  }

  async count(filters?: ContactMessageFilters): AsyncContactResult<number> {
    const count = Array.from(this.messages.values())
      .filter((msg) => !msg.deletedAt)
      .filter((msg) => matchesFilters(msg, filters)).length;

    return success(count);
  }
}
