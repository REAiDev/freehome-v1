import { NextRequest, NextResponse } from 'next/server';
import { buildSignedRedirectUrl } from '@/utils/hmac';

export async function POST(request: NextRequest) {
  try {
    // Parse preferences from request body
    const preferences = await request.json();

    // Build query parameters
    const params: Record<string, string> = {};

    if (preferences.price_min) params.price_min = String(preferences.price_min);
    if (preferences.price_max) params.price_max = String(preferences.price_max);
    if (preferences.countries?.length) params.countries = preferences.countries.join(',');
    if (preferences.household_type?.length) params.household_type = preferences.household_type.join(',');
    if (preferences.settings?.length) params.settings = preferences.settings.join(',');
    if (preferences.home_condition?.length) params.home_condition = preferences.home_condition.join(',');
    if (preferences.property_type?.length) params.property_type = preferences.property_type.join(',');
    if (preferences.bedrooms?.length) params.bedrooms = preferences.bedrooms.join(',');
    if (preferences.use?.length) params.use = preferences.use.join(',');

    // Generate signed URL
    const signedUrl = buildSignedRedirectUrl(params);

    // Return URL to client
    return NextResponse.json({ redirectUrl: signedUrl });

  } catch (error) {
    console.error('Error generating signed redirect:', error);
    return NextResponse.json(
      { error: 'Failed to generate redirect URL' },
      { status: 500 }
    );
  }
}
