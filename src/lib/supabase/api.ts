/**
 * Supabase API Client
 * Responsibility: Create Supabase client for API routes (no cookie handling)
 * Follows: SRP - Single purpose of API client creation
 * Use this for API routes that don't need authentication/session management
 */

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

/**
 * Create a simple Supabase client for API routes
 * Uses anon key - suitable for public operations
 */
export function createClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
