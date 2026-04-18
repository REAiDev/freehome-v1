/**
 * Contact API Route
 * Responsibility: Handle HTTP requests for contact form submissions
 * Follows: SRP - Single purpose of HTTP request/response handling
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient as createServerClient } from '@/lib/supabase/server';
import { createClient as createApiClient } from '@/lib/supabase/api';
import { SupabaseContactRepository } from '@/repositories/SupabaseContactRepository';
import { ContactService } from '@/services/ContactService';
import type { CreateContactMessageDTO } from '@/types/contact';

/**
 * Get client IP address from request headers
 */
function getClientIp(request: NextRequest): string | undefined {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  return undefined;
}

/**
 * Get authenticated user ID if available
 */
async function getUserId(): Promise<string | undefined> {
  try {
    const supabase = await createServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user?.id;
  } catch {
    // User not authenticated or error getting user - that's okay
    return undefined;
  }
}

/**
 * POST /api/contact
 * Submit a new contact message
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Get user context
    const userId = await getUserId();
    const ipAddress = getClientIp(request);

    // Prepare DTO with additional context
    const dto: CreateContactMessageDTO = {
      name: body.name,
      email: body.email,
      subject: body.subject,
      message: body.message,
      userId,
      userAgent: body.userAgent,
      ipAddress,
    };

    // Create service with Supabase repository
    // Use API client (no cookie handling) for public form submissions
    const supabase = createApiClient();
    const repository = new SupabaseContactRepository(supabase);
    const service = new ContactService(repository);

    // Submit message
    const result = await service.submitContactMessage(dto);

    // Handle result
    if (!result.success) {
      const { error } = result;

      switch (error.type) {
        case 'ValidationError':
          return NextResponse.json(
            {
              success: false,
              error: {
                type: 'ValidationError',
                errors: error.errors,
                message: 'Validation failed',
              },
            },
            { status: 400 }
          );

        case 'DatabaseError':
          console.error('Database error:', error.message);
          return NextResponse.json(
            {
              success: false,
              error: {
                type: 'DatabaseError',
                message: 'Failed to save message. Please try again later.',
              },
            },
            { status: 500 }
          );

        default:
          console.error('Unknown error:', result.error);
          return NextResponse.json(
            {
              success: false,
              error: {
                type: 'UnknownError',
                message: 'An unexpected error occurred. Please try again.',
              },
            },
            { status: 500 }
          );
      }
    }

    // Success response (don't expose internal IDs to client)
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been received. We will get back to you soon!',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          type: 'UnknownError',
          message: 'Failed to process request. Please try again.',
        },
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/contact
 * Retrieve contact messages (admin only - would need auth check)
 * For now, this is a placeholder for future admin functionality
 */
export async function GET() {
  // TODO: Add authentication check for admin access
  // For now, return 403 Forbidden
  return NextResponse.json(
    {
      success: false,
      error: {
        type: 'Forbidden',
        message: 'Admin authentication required',
      },
    },
    { status: 403 }
  );
}
