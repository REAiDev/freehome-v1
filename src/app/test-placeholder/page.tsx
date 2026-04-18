'use client';

import Link from 'next/link';
import PropertyImage from '@/components/common/PropertyImage';

/**
 * Test page for PropertyImage placeholder functionality
 *
 * This page tests various error scenarios:
 * - 403 Forbidden (real S3 URL that fails)
 * - 404 Not Found
 * - Invalid URL
 * - Timeout/Network error
 * - Valid image (control)
 */
export default function TestPlaceholderPage() {
  const testImages = [
    {
      title: 'Valid Image (Control)',
      src: '/freehome-logo.png',
      description: 'Should display the FreeHome logo normally',
    },
    {
      title: '404 Not Found',
      src: '/images/nonexistent-image-12345.jpg',
      description: 'Should show placeholder (image does not exist)',
    },
    {
      title: 'Invalid URL',
      src: 'https://invalid-domain-that-does-not-exist-12345.com/image.jpg',
      description: 'Should show placeholder (invalid domain)',
    },
    {
      title: 'S3 403 Forbidden',
      src: 'https://freehome-media-dev.s3.us-east-1.amazonaws.com/media/immobiliare.it/property/113789159/1558176203.jpg',
      description: 'Should show placeholder (S3 access denied)',
    },
    {
      title: 'Empty String',
      src: '',
      description: 'Should show placeholder (empty src)',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">PropertyImage Placeholder Test</h1>
          <p className="text-gray-600">
            Testing various error scenarios for image loading failures
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testImages.map((test, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-64 w-full">
                <PropertyImage
                  src={test.src}
                  alt={test.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-2">{test.title}</h3>
                <p className="text-sm text-gray-600">{test.description}</p>
                <p className="text-xs text-gray-400 mt-2 break-all">src: {test.src || '(empty)'}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Results</h2>
          <div className="space-y-2 text-sm">
            <p className="text-gray-700">
              <span className="font-semibold">✅ Valid Image:</span> Should display normally
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">✅ All Error Cases:</span> Should display the
              placeholder with house icon and &quot;Image Not Available&quot; message
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">✅ Placeholder Design:</span> Should show simple house
              icon with clear messaging
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
