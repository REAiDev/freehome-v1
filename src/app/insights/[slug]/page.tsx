import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getPostBySlug, getAllPosts } from '@/lib/cms';
import type { Post } from '@/types/cms-types';
import { PostContent } from './PostContent';

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

interface LexicalNode {
  type: string;
  tag?: string;
  children?: LexicalNode[];
  text?: string;
  format?: number;
  [key: string]: unknown;
}

/**
 * Generate static params for all published posts
 */
export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

/**
 * Generate metadata for SEO
 */
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Insights | FreeHome.world`,
    description: post.meta?.description,
    openGraph: {
      title: post.meta?.title || post.title,
      description: post.meta?.description || undefined,
    },
  };
}

/**
 * Extract text content from Lexical node children
 */
function extractText(children: LexicalNode[] | undefined): string {
  if (!children) return '';
  return children
    .map((child) => {
      if (child.type === 'text') return child.text || '';
      if (child.children) return extractText(child.children);
      return '';
    })
    .join('');
}

/**
 * Generate slug from text
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 50);
}

/**
 * Extract headings from Lexical content for TOC
 */
function extractHeadings(
  content: Post['content']
): Array<{ id: string; title: string; level: number }> {
  const headings: Array<{ id: string; title: string; level: number }> = [];

  if (!content?.root?.children) return headings;

  (content.root.children as LexicalNode[]).forEach((node) => {
    if (node.type === 'heading' && node.tag) {
      const text = extractText(node.children);
      if (text) {
        const level = parseInt(node.tag.replace('h', ''), 10);
        headings.push({
          id: slugify(text),
          title: text,
          level,
        });
      }
    }
  });

  return headings;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const headings = extractHeadings(post.content);
  const lastUpdated = post.updatedAt || post.publishedAt || undefined;

  return (
    <PostContent
      title={post.title}
      content={post.content}
      headings={headings}
      lastUpdated={lastUpdated}
    />
  );
}
