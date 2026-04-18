import { PayloadSDK } from '@payloadcms/sdk';
import { cache } from 'react';
import type { Config, Page, Post, Header, Footer } from '@/types/cms-types';

const CMS_BASE_URL = process.env.CMS_API_URL || 'https://cms.reai-int.net/api';

// Revalidation times (in seconds)
const REVALIDATE_GLOBALS = 600; // Header/Footer: revalidate every 10 minutes
const REVALIDATE_POSTS = 300; // Posts: revalidate every 5 minutes
const REVALIDATE_PAGES = 300; // Pages: revalidate every 5 minutes

/**
 * CMS SDK client configured for Payload CMS
 * Uses the PayloadSDK for type-safe API calls
 */
export const cms = new PayloadSDK<Config>({
  baseURL: CMS_BASE_URL,
});

/**
 * Fetch a page by slug, scoped to freehome tenant
 * Uses native fetch with revalidation
 */
export const getPage = cache(async (slug: string): Promise<Page | null> => {
  try {
    const params = new URLSearchParams({
      'where[slug][equals]': slug,
      'where[tenant.slug][equals]': 'freehome',
      'where[_status][equals]': 'published',
      depth: '2',
      limit: '1',
    });
    const res = await fetch(`${CMS_BASE_URL}/pages?${params}`, {
      next: { revalidate: REVALIDATE_PAGES },
    });
    if (!res.ok) throw new Error(`Failed to fetch page: ${res.status}`);
    const result = await res.json();
    return result.docs[0] ?? null;
  } catch (error) {
    console.error(`Failed to fetch page: ${slug}`, error);
    return null;
  }
});

/**
 * Fetch CMS navigation items from Header global
 * Uses native fetch with revalidation for automatic updates
 */
export const getCMSNavItems = cache(async (): Promise<NonNullable<Header['navItems']>> => {
  try {
    const res = await fetch(`${CMS_BASE_URL}/globals/header?depth=1`, {
      next: { revalidate: REVALIDATE_GLOBALS },
    });
    if (!res.ok) throw new Error(`Failed to fetch header: ${res.status}`);
    const header: Header = await res.json();
    return header?.navItems ?? [];
  } catch (error) {
    console.error('Failed to fetch CMS nav items:', error);
    return [];
  }
});

/**
 * Fetch Footer global
 * Uses native fetch with revalidation for automatic updates
 */
export const getFooter = cache(async (): Promise<Footer | null> => {
  try {
    const res = await fetch(`${CMS_BASE_URL}/globals/footer?depth=1`, {
      next: { revalidate: REVALIDATE_GLOBALS },
    });
    if (!res.ok) throw new Error(`Failed to fetch footer: ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch footer:', error);
    return null;
  }
});

/**
 * Fetch featured posts/insights for homepage
 * Scoped to freehome tenant, limited to 2 featured articles
 */
export const getFeaturedInsights = cache(async (): Promise<Post[]> => {
  try {
    const params = new URLSearchParams({
      'where[tenant.slug][equals]': 'freehome',
      'where[_status][equals]': 'published',
      depth: '1',
      limit: '2',
      sort: '-publishedAt',
    });
    const res = await fetch(`${CMS_BASE_URL}/posts?${params}`, {
      next: { revalidate: REVALIDATE_POSTS },
    });
    if (!res.ok) throw new Error(`Failed to fetch featured insights: ${res.status}`);
    const result = await res.json();
    return result.docs;
  } catch (error) {
    console.error('Failed to fetch featured insights:', error);
    return [];
  }
});

/**
 * Fetch all published posts for the insights listing page
 * Scoped to freehome tenant
 */
export const getAllPosts = cache(async (): Promise<Post[]> => {
  try {
    const params = new URLSearchParams({
      'where[tenant.slug][equals]': 'freehome',
      'where[_status][equals]': 'published',
      depth: '1',
      limit: '100',
      sort: '-publishedAt',
    });
    const res = await fetch(`${CMS_BASE_URL}/posts?${params}`, {
      next: { revalidate: REVALIDATE_POSTS },
    });
    if (!res.ok) throw new Error(`Failed to fetch all posts: ${res.status}`);
    const result = await res.json();
    return result.docs;
  } catch (error) {
    console.error('Failed to fetch all posts:', error);
    return [];
  }
});

/**
 * Fetch a single post by slug
 * Scoped to freehome tenant
 */
export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  try {
    const params = new URLSearchParams({
      'where[slug][equals]': slug,
      'where[tenant.slug][equals]': 'freehome',
      'where[_status][equals]': 'published',
      depth: '2',
      limit: '1',
    });
    const res = await fetch(`${CMS_BASE_URL}/posts?${params}`, {
      next: { revalidate: REVALIDATE_POSTS },
    });
    if (!res.ok) throw new Error(`Failed to fetch post: ${res.status}`);
    const result = await res.json();
    return result.docs[0] ?? null;
  } catch (error) {
    console.error(`Failed to fetch post: ${slug}`, error);
    return null;
  }
});
