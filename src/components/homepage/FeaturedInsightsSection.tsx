'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Post, Media } from '@/types/cms-types';

interface InsightCardProps {
  title: string;
  excerpt: string;
  slug: string;
  publishedAt: string;
  heroImage?: Media | null;
}

function InsightCard({ title, excerpt, slug, publishedAt, heroImage }: InsightCardProps) {
  const imageUrl = heroImage?.sizes?.medium?.url || heroImage?.url || null;

  return (
    <Link
      href={`/insights/${slug}`}
      className="group block bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden"
    >
      {imageUrl && (
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={imageUrl}
            alt={heroImage?.alt || title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt && <p className="mt-2 text-sm text-gray-600 line-clamp-2">{excerpt}</p>}
        <time className="mt-3 block text-xs text-gray-400">
          {new Date(publishedAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </time>
      </div>
    </Link>
  );
}

/**
 * Helper to extract hero image from Post
 */
function getHeroImage(post: Post): Media | null {
  if (!post.heroImage) return null;
  if (typeof post.heroImage === 'number') return null;
  return post.heroImage;
}

/**
 * Loading skeleton for insight cards
 */
function InsightCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-gray-200" />
      <div className="p-6">
        <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-full mb-2" />
        <div className="h-4 bg-gray-200 rounded w-2/3 mb-3" />
        <div className="h-3 bg-gray-200 rounded w-1/4" />
      </div>
    </div>
  );
}

/**
 * Client component that fetches and displays featured insights
 * Placed after Featured Municipalities on homepage
 */
export function FeaturedInsightsSection() {
  const [insights, setInsights] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchInsights() {
      try {
        const response = await fetch('/api/cms/featured-insights');
        if (!response.ok) {
          throw new Error('Failed to fetch insights');
        }
        const data = await response.json();
        setInsights(data.insights || []);
      } catch (err) {
        console.error('Error fetching featured insights:', err);
        setError(err instanceof Error ? err.message : 'Failed to load insights');
      } finally {
        setIsLoading(false);
      }
    }

    fetchInsights();
  }, []);

  // Don't render the section at all if there's an error or no insights after loading
  if (error || (!isLoading && !insights.length)) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Insights</h2>
          <p className="mt-2 text-gray-600">
            Expert guides and resources for international property buyers
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {isLoading ? (
            <>
              <InsightCardSkeleton />
              <InsightCardSkeleton />
            </>
          ) : (
            insights.map((insight) => (
              <InsightCard
                key={insight.id}
                title={insight.title}
                excerpt={insight.meta?.description || ''}
                slug={insight.slug}
                publishedAt={insight.publishedAt || insight.createdAt}
                heroImage={getHeroImage(insight)}
              />
            ))
          )}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            View all insights
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
