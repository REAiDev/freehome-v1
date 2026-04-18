import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { RichTextRenderer } from '@/components/CMS/RichTextRenderer';
import { getPage } from '@/lib/cms';
import type { Page, Media, CallToActionBlock, ContentBlock, MediaBlock } from '@/types/cms-types';

interface CMSPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: CMSPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    return {
      title: 'Page Not Found',
    };
  }

  const heroMedia = getHeroMedia(page);

  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description,
    openGraph: {
      title: page.meta?.title || page.title,
      description: page.meta?.description || undefined,
      images: heroMedia?.url ? [heroMedia.url] : undefined,
    },
  };
}

/**
 * Helper to extract hero media from Page
 */
function getHeroMedia(page: Page): Media | null {
  if (!page.hero?.media) return null;
  if (typeof page.hero.media === 'number') return null;
  return page.hero.media;
}

/**
 * Render a ContentBlock
 */
function RenderContentBlock({ block }: { block: ContentBlock }) {
  return (
    <div className="py-8">
      <div className="grid gap-8 md:grid-cols-12">
        {block.columns?.map((column) => {
          const sizeClasses = {
            oneThird: 'md:col-span-4',
            half: 'md:col-span-6',
            twoThirds: 'md:col-span-8',
            full: 'md:col-span-12',
          };
          const colSize = column.size || 'full';

          return (
            <div key={column.id} className={sizeClasses[colSize]}>
              {column.richText && (
                <div className="prose prose-lg max-w-none">
                  <RichTextRenderer data={column.richText} />
                </div>
              )}
              {column.enableLink && column.link?.label && (
                <div className="mt-4">
                  <Link
                    href={column.link.url || '#'}
                    className={`inline-flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                      column.link.appearance === 'outline'
                        ? 'border border-primary text-primary hover:bg-primary/10'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                    target={column.link.newTab ? '_blank' : undefined}
                    rel={column.link.newTab ? 'noopener noreferrer' : undefined}
                  >
                    {column.link.label}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Render a CallToActionBlock
 */
function RenderCTABlock({ block }: { block: CallToActionBlock }) {
  return (
    <div className="py-12 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl my-8">
      <div className="text-center px-6">
        {block.richText && (
          <div className="prose prose-lg max-w-none mx-auto">
            <RichTextRenderer data={block.richText} />
          </div>
        )}
        {block.links && block.links.length > 0 && (
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {block.links.map((linkItem) => (
              <Link
                key={linkItem.id}
                href={linkItem.link.url || '#'}
                className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                  linkItem.link.appearance === 'outline'
                    ? 'border border-primary text-primary hover:bg-primary/10'
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
                target={linkItem.link.newTab ? '_blank' : undefined}
                rel={linkItem.link.newTab ? 'noopener noreferrer' : undefined}
              >
                {linkItem.link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Render a MediaBlock
 */
function RenderMediaBlock({ block }: { block: MediaBlock }) {
  const media = typeof block.media === 'object' ? block.media : null;
  if (!media?.url) return null;

  return (
    <div className="py-8">
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <Image src={media.url} alt={media.alt || ''} fill className="object-cover" />
      </div>
      {media.caption && (
        <div className="mt-2 text-sm text-gray-500 text-center prose max-w-none">
          <RichTextRenderer data={media.caption} />
        </div>
      )}
    </div>
  );
}

/**
 * Render a single layout block
 */
function RenderBlock({ block }: { block: Page['layout'][number] }) {
  switch (block.blockType) {
    case 'content':
      return <RenderContentBlock block={block} />;
    case 'cta':
      return <RenderCTABlock block={block} />;
    case 'mediaBlock':
      return <RenderMediaBlock block={block} />;
    case 'archive':
    case 'formBlock':
      // Not implemented yet
      return null;
    default:
      return null;
  }
}

export default async function CMSPage({ params }: CMSPageProps) {
  const { slug } = await params;
  const page = await getPage(slug);

  if (!page) {
    notFound();
  }

  const heroMedia = getHeroMedia(page);
  const hasHighImpactHero = page.hero?.type === 'highImpact';

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - High Impact with background image */}
      {hasHighImpactHero && heroMedia?.url && (
        <header className="relative min-h-[60vh] flex items-center">
          <Image
            src={heroMedia.url}
            alt={heroMedia.alt || page.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                {page.title}
              </h1>
              {page.hero?.richText && (
                <div className="mt-4 prose prose-lg max-w-none prose-invert mx-auto">
                  <RichTextRenderer data={page.hero.richText} />
                </div>
              )}
              {page.hero?.links && page.hero.links.length > 0 && (
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  {page.hero.links.map((linkItem) => (
                    <Link
                      key={linkItem.id}
                      href={linkItem.link.url || '#'}
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                        linkItem.link.appearance === 'outline'
                          ? 'border border-white text-white hover:bg-white/10'
                          : 'bg-primary text-white hover:bg-primary/90'
                      }`}
                      target={linkItem.link.newTab ? '_blank' : undefined}
                      rel={linkItem.link.newTab ? 'noopener noreferrer' : undefined}
                    >
                      {linkItem.link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </header>
      )}

      {/* Standard layout - matches Terms page pattern */}
      {!hasHighImpactHero && (
        <div className="pt-8 pb-12 sm:pb-16 md:pb-20">
          <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
            {/* Centered Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 sm:mb-8 md:mb-12 text-center">
              {page.title}
            </h1>

            {/* Hero rich text and links if present */}
            {page.hero?.richText && (
              <div className="prose prose-lg max-w-none mx-auto text-center mb-8">
                <RichTextRenderer data={page.hero.richText} />
              </div>
            )}
            {page.hero?.links && page.hero.links.length > 0 && (
              <div className="mb-12 flex flex-wrap justify-center gap-4">
                {page.hero.links.map((linkItem) => (
                  <Link
                    key={linkItem.id}
                    href={linkItem.link.url || '#'}
                    className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-colors ${
                      linkItem.link.appearance === 'outline'
                        ? 'border border-primary text-primary hover:bg-primary/10'
                        : 'bg-primary text-white hover:bg-primary/90'
                    }`}
                    target={linkItem.link.newTab ? '_blank' : undefined}
                    rel={linkItem.link.newTab ? 'noopener noreferrer' : undefined}
                  >
                    {linkItem.link.label}
                  </Link>
                ))}
              </div>
            )}

            {/* Layout Blocks */}
            <div className="max-w-4xl mx-auto">
              {page.layout?.map((block, index) => (
                <RenderBlock key={block.id || index} block={block} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Layout Blocks for high impact hero */}
      {hasHighImpactHero && page.layout && page.layout.length > 0 && (
        <main className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {page.layout.map((block, index) => (
              <RenderBlock key={block.id || index} block={block} />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}
