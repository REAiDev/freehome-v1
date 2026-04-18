import { NextResponse } from 'next/server';

export async function GET() {
  const manifest = {
    name: 'FreeHome.World',
    short_name: 'FreeHome',
    description: 'Discover 1 Euro Properties and Affordable Housing Programs Worldwide',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
      {
        src: '/favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
    ],
  };

  return new NextResponse(JSON.stringify(manifest), {
    headers: {
      'Content-Type': 'application/manifest+json',
    },
  });
}
