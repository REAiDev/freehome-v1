/**
 * Loading Skeleton Components
 * Responsibility: Provide loading state UI for homepage sections
 * Follows SRP by focusing only on loading state display
 */

import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden animate-pulse border border-gray-200 bg-white">
      <div className="relative h-56 w-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-br from-gray-200 to-gray-300 animate-shimmer" />
        <div className="absolute top-3 left-3 w-20 h-6 bg-gray-300 rounded-md" />
      </div>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div>
            <Skeleton className="h-6 w-3/4 mb-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-gray-100">
            <Skeleton className="h-8 w-16" />
            <div className="text-right space-y-1">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>

          <div className="flex items-center gap-4 py-2 border-t border-gray-100">
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-16" />
            </div>
            <div className="flex items-center gap-1">
              <Skeleton className="h-4 w-4" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

export function MunicipalityCardSkeleton() {
  return (
    <Card className="group overflow-hidden animate-pulse border-0 shadow-lg bg-white">
      {/* Header Section */}
      <div className="relative h-56 w-full overflow-hidden">
        <div className="h-full w-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 animate-shimmer" />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative h-full flex flex-col justify-center items-center text-center p-6">
          <Skeleton className="h-8 w-32 mb-3 bg-white/20" />
          <Skeleton className="h-4 w-24 bg-white/15" />
        </div>
      </div>

      {/* Content Section */}
      <CardContent className="p-6">
        <div className="space-y-5">
          {/* Description */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Stats Section */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-6 w-8 rounded-full" />
          </div>

          {/* Property Count */}
          <div>
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Button */}
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </CardContent>
    </Card>
  );
}

export interface LoadingGridProps {
  readonly count?: number;
  readonly type: 'property' | 'municipality';
}

export function LoadingGrid({ count = 3, type }: LoadingGridProps) {
  const SkeletonComponent =
    type === 'property' ? PropertyCardSkeleton : MunicipalityCardSkeleton;

  return (
    <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-12 pt-12 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <SkeletonComponent />
        </div>
      ))}
    </div>
  );
}
