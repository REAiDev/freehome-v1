/**
 * Supabase Contact Repository Implementation
 * Responsibility: Implement IContactRepository using Supabase as data source
 * Follows: SRP - Single purpose of Supabase-specific data access
 * Follows: LSP - Can be substituted anywhere IContactRepository is used
 */

import type { SupabaseClient } from '@supabase/supabase-js';
import type { IContactRepository } from './IContactRepository';
import type {
  ContactMessage,
  CreateContactMessageDTO,
  UpdateContactMessageDTO,
  ContactMessageFilters,
  PaginationParams,
  PaginatedResult,
  AsyncContactResult,
  ContactError,
} from '@/types/contact';

/**
 * Database table name - centralized for easy changes
 */
const CONTACT_MESSAGES_TABLE = 'contact_messages';

/**
 * Default pagination values
 */
const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;

/**
 * Database row type
 */
interface ContactMessageRow {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  user_id: string | null;
  user_agent: string | null;
  ip_address: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

/**
 * Maps database row to domain ContactMessage
 */
function mapRowToContactMessage(row: ContactMessageRow): ContactMessage {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    subject: row.subject,
    message: row.message,
    status: row.status,
    userId: row.user_id ?? undefined,
    userAgent: row.user_agent ?? undefined,
    ipAddress: row.ip_address ?? undefined,
    createdAt: new Date(row.created_at),
    updatedAt: new Date(row.updated_at),
    deletedAt: row.deleted_at ? new Date(row.deleted_at) : undefined,
  };
}

/**
 * Maps CreateContactMessageDTO to database insert payload
 */
function mapDtoToInsert(dto: CreateContactMessageDTO) {
  return {
    name: dto.name,
    email: dto.email,
    subject: dto.subject,
    message: dto.message,
    user_id: dto.userId ?? null,
    user_agent: dto.userAgent ?? null,
    ip_address: dto.ipAddress ?? null,
    status: 'new' as const,
  };
}

/**
 * Creates a success result
 */
function success<T>(data: T): AsyncContactResult<T> {
  return Promise.resolve({ success: true, data });
}

/**
 * Creates an error result
 */
function failure<T>(error: ContactError): AsyncContactResult<T> {
  return Promise.resolve({ success: false, error });
}

/**
 * Supabase implementation of contact repository
 */
export class SupabaseContactRepository implements IContactRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async create(data: CreateContactMessageDTO): AsyncContactResult<ContactMessage> {
    try {
      const insertData = mapDtoToInsert(data);

      const { data: row, error } = await this.supabase
        .from(CONTACT_MESSAGES_TABLE)
        .insert(insertData)
        .select()
        .single();

      if (error) {
        return failure({
          type: 'DatabaseError',
          message: error.message,
        });
      }

      if (!row) {
        return failure({
          type: 'DatabaseError',
          message: 'Insert succeeded but no data returned',
        });
      }

      return success(mapRowToContactMessage(row));
    } catch (error) {
      return failure({
        type: 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  async findById(id: string): AsyncContactResult<ContactMessage> {
    try {
      const { data: row, error } = await this.supabase
        .from(CONTACT_MESSAGES_TABLE)
        .select('*')
        .eq('id', id)
        .is('deleted_at', null) // Exclude soft-deleted records
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows returned
          return failure({
            type: 'NotFoundError',
            id,
          });
        }
        return failure({
          type: 'DatabaseError',
          message: error.message,
        });
      }

      return success(mapRowToContactMessage(row));
    } catch (error) {
      return failure({
        type: 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  async findMany(
    filters?: ContactMessageFilters,
    pagination?: PaginationParams
  ): AsyncContactResult<PaginatedResult<ContactMessage>> {
    try {
      const page = pagination?.page ?? DEFAULT_PAGE;
      const pageSize = pagination?.pageSize ?? DEFAULT_PAGE_SIZE;
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      let query = this.supabase
        .from(CONTACT_MESSAGES_TABLE)
        .select('*', { count: 'exact' })
        .is('deleted_at', null); // Exclude soft-deleted

      // Apply filters
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.userId) {
        query = query.eq('user_id', filters.userId);
      }
      if (filters?.email) {
        query = query.eq('email', filters.email);
      }
      if (filters?.startDate) {
        query = query.gte('created_at', filters.startDate.toISOString());
      }
      if (filters?.endDate) {
        query = query.lte('created_at', filters.endDate.toISOString());
      }
      if (filters?.searchTerm) {
        // Full-text search on name, email, subject, and message
        query = query.or(
          `name.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%,subject.ilike.%${filters.searchTerm}%,message.ilike.%${filters.searchTerm}%`
        );
      }

      // Apply pagination and ordering
      query = query.order('created_at', { ascending: false }).range(from, to);

      const { data: rows, error, count } = await query;

      if (error) {
        return failure({
          type: 'DatabaseError',
          message: error.message,
        });
      }

      const total = count ?? 0;
      const totalPages = Math.ceil(total / pageSize);
      const data = rows?.map(mapRowToContactMessage) ?? [];

      return success({
        data,
        total,
        page,
        pageSize,
        totalPages,
      });
    } catch (error) {
      return failure({
        type: 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  async update(id: string, data: UpdateContactMessageDTO): AsyncContactResult<ContactMessage> {
    try {
      const updateData: Partial<Pick<ContactMessageRow, 'status' | 'deleted_at'>> = {};
      if (data.status !== undefined) {
        updateData.status = data.status;
      }
      if (data.deletedAt !== undefined) {
        updateData.deleted_at = data.deletedAt?.toISOString() ?? null;
      }

      const { data: row, error } = await this.supabase
        .from(CONTACT_MESSAGES_TABLE)
        .update(updateData)
        .eq('id', id)
        .is('deleted_at', null) // Only update non-deleted records
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return failure({
            type: 'NotFoundError',
            id,
          });
        }
        return failure({
          type: 'DatabaseError',
          message: error.message,
        });
      }

      return success(mapRowToContactMessage(row));
    } catch (error) {
      return failure({
        type: 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  async delete(id: string): AsyncContactResult<ContactMessage> {
    try {
      const now = new Date();

      const { data: row, error } = await this.supabase
        .from(CONTACT_MESSAGES_TABLE)
        .update({ deleted_at: now.toISOString() })
        .eq('id', id)
        .is('deleted_at', null) // Only delete non-deleted records
        .select()
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return failure({
            type: 'NotFoundError',
            id,
          });
        }
        return failure({
          type: 'DatabaseError',
          message: error.message,
        });
      }

      return success(mapRowToContactMessage(row));
    } catch (error) {
      return failure({
        type: 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }

  async count(filters?: ContactMessageFilters): AsyncContactResult<number> {
    try {
      let query = this.supabase
        .from(CONTACT_MESSAGES_TABLE)
        .select('*', { count: 'exact', head: true })
        .is('deleted_at', null);

      // Apply filters (same as findMany)
      if (filters?.status) {
        query = query.eq('status', filters.status);
      }
      if (filters?.userId) {
        query = query.eq('user_id', filters.userId);
      }
      if (filters?.email) {
        query = query.eq('email', filters.email);
      }
      if (filters?.startDate) {
        query = query.gte('created_at', filters.startDate.toISOString());
      }
      if (filters?.endDate) {
        query = query.lte('created_at', filters.endDate.toISOString());
      }
      if (filters?.searchTerm) {
        query = query.or(
          `name.ilike.%${filters.searchTerm}%,email.ilike.%${filters.searchTerm}%,subject.ilike.%${filters.searchTerm}%,message.ilike.%${filters.searchTerm}%`
        );
      }

      const { count, error } = await query;

      if (error) {
        return failure({
          type: 'DatabaseError',
          message: error.message,
        });
      }

      return success(count ?? 0);
    } catch (error) {
      return failure({
        type: 'UnknownError',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    }
  }
}
