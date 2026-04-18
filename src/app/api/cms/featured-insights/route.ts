import { NextResponse } from 'next/server';
import { getFeaturedInsights } from '@/lib/cms';

export async function GET() {
  try {
    const insights = await getFeaturedInsights();
    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error fetching featured insights:', error);
    return NextResponse.json(
      { error: 'Failed to fetch featured insights', insights: [] },
      { status: 500 }
    );
  }
}
