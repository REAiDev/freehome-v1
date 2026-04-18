import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/cms';

export const metadata: Metadata = {
  title: 'Insights | FreeHome.world',
  description:
    'Expert guides and resources for international property buyers. Learn about buying real estate overseas.',
};

// Revalidate every 5 minutes
export const revalidate = 300;

const FEATURED_POST_ID = 1; // "How to Buy Real Estate Overseas" - featured at top

export default async function InsightsPage() {
  const allPosts = await getAllPosts();

  // Separate featured post from others
  const featuredPost = allPosts.find((p) => p.id === FEATURED_POST_ID);
  const otherPosts = allPosts.filter((p) => p.id !== FEATURED_POST_ID);

  return (
    <div className="min-h-screen bg-white">
      <div className="pt-8 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
          {/* Page Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 text-center">
            Insights & Guides
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Expert resources to help you navigate international property buying with confidence.
          </p>

          {/* Featured Post */}
          {featuredPost && (
            <div className="mb-12">
              <Link
                href={`/insights/${featuredPost.slug}`}
                className="group block bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all"
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                    Featured Guide
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                  A comprehensive guide covering country-specific property laws, ownership rules,
                  taxes, financing options, and transaction processes for international buyers.
                </p>
                <span className="inline-flex items-center gap-2 text-blue-600 font-semibold">
                  Read the full guide
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          )}

          {/* Other Posts */}
          {otherPosts.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-6">More Insights</h2>
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                {otherPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/insights/${post.slug}`}
                    className="group block bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-200 transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <span className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 font-medium">
                          Read more
                          <svg
                            className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {allPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No insights available yet. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
