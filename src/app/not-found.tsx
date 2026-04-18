import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          Page not found
        </h2>
        <p className="mt-6 text-lg leading-7 text-gray-600">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>
        <div className="mt-10">
          <Link href="/">
            <Button>Go back home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
