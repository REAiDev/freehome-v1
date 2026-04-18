# CMS Integration Plan for FreeHome.world

## Overview

This plan covers integrating the Payload CMS with frontend-home (FreeHome.world) to support:

1. **Insight pages** - Articles and blog content (Tickets #144, #145)
2. **How FreeHome Works** - FAQ/documentation page (Ticket #146)
3. **Dynamic navigation** - Menu items managed from CMS
4. **Featured Insights** - Homepage section displaying featured articles

**Architecture Decision**: Similar to reai.co, the CMS renders its own pages. frontend-home needs to:

1. Fetch navigation items from CMS for the header
2. Route CMS-managed paths to the CMS via reverse proxy
3. Display "Featured Insights" section on homepage (fetched from CMS API)

---

## Architecture

```
User Request
     │
     ▼
┌─────────────────┐
│ FreeHome.world  │
│   (Nginx/CDN)   │
└────────┬────────┘
         │
         ├─── /, /about, /contact, /privacy ──► frontend-home (Next.js)
         │
         └─── /insights, /how-it-works ───────► CMS (Payload + Next.js)
                                                (renders with data-tenant="freehome")
```

### Key Points

- **CMS renders pages**: CMS handles all rendering for CMS-managed content (Insights, FAQ)
- **Multi-tenant**: CMS uses `@payloadcms/plugin-multi-tenant` to scope content by tenant
- **CSS targeting**: CMS pages have `data-tenant="freehome"` attribute for styling overrides
- **Nav integration**: frontend-home fetches nav items from CMS API
- **Featured Insights**: Homepage fetches featured articles from CMS API

---

## Related Redmine Tickets

| Ticket | Priority | Description                                                                    |
| ------ | -------- | ------------------------------------------------------------------------------ |
| #144   | Urgent   | Add Insight tab in menu, Insight page with articles, Featured Insights section |
| #145   | Urgent   | Add more articles to Insight section                                           |
| #146   | Normal   | Add "How FreeHome Works" menu item and FAQ page, minor filter rewording        |

---

## Prerequisites (From CMS Team)

Before starting frontend-home integration, confirm with CMS team that:

- [ ] Multi-tenant plugin is configured (see `cms/MULTI_TENANT_IMPLEMENTATION.md`)
- [ ] "freehome" tenant is created with domains: freehome.world, www.freehome.world, localhost
- [ ] CORS is configured to allow `https://freehome.world` and `http://localhost:3001`
- [ ] CMS is accessible at `https://cms.reai-int.net` (VPN required)
- [ ] Header global has nav items configured for freehome tenant
- [ ] Posts collection is set up for Insight articles

---

## Phase 1: Core Setup

### 1.1 Install Dependencies

```bash
cd /Users/trucupei/Projects/freehome/flow/frontend-home
npm install @payloadcms/sdk
```

### 1.2 Copy CMS Types

Copy the auto-generated types from CMS project:

```bash
cp /Users/trucupei/Projects/freehome/cms/src/payload-types.ts \
   /Users/trucupei/Projects/freehome/flow/frontend-home/src/types/cms-types.ts
```

**Note**: Re-copy whenever CMS schema changes (especially after multi-tenant plugin is added).

### 1.3 Create CMS SDK Client

**File**: `src/lib/cms.ts`

Following the exact pattern from reai_website:

```typescript
import { PayloadSDK } from '@payloadcms/sdk';
import { cache } from 'react';
import type { Config, Page, Post, Header, Footer } from '@/types/cms-types';

/**
 * CMS SDK client configured for Payload CMS
 * Uses the PayloadSDK for type-safe API calls
 */
export const cms = new PayloadSDK<Config>({
  baseURL: process.env.CMS_API_URL || 'https://cms.reai-int.net/api',
});

/**
 * Fetch a page by slug, scoped to freehome tenant
 * Uses React cache() for request deduplication within a single render
 */
export const getPage = cache(async (slug: string): Promise<Page | null> => {
  try {
    const result = await cms.find({
      collection: 'pages',
      where: {
        slug: { equals: slug },
        'tenant.slug': { equals: 'freehome' },
        _status: { equals: 'published' },
      },
      depth: 2,
      limit: 1,
    });
    return result.docs[0] ?? null;
  } catch (error) {
    console.error(`Failed to fetch page: ${slug}`, error);
    return null;
  }
});

/**
 * Fetch CMS navigation items from Header global
 * Cached for request deduplication
 */
export const getCMSNavItems = cache(async (): Promise<NonNullable<Header['navItems']>> => {
  try {
    const header = await cms.findGlobal({ slug: 'header', depth: 1 });
    return header?.navItems ?? [];
  } catch (error) {
    console.error('Failed to fetch CMS nav items:', error);
    return [];
  }
});

/**
 * Fetch Footer global
 */
export const getFooter = cache(async (): Promise<Footer | null> => {
  try {
    return await cms.findGlobal({ slug: 'footer', depth: 1 });
  } catch (error) {
    console.error('Failed to fetch footer:', error);
    return null;
  }
});

/**
 * Fetch featured posts/insights for homepage
 * Scoped to freehome tenant, limited to 2 featured articles
 * Uses React cache() for request deduplication within a single render
 */
export const getFeaturedInsights = cache(async (): Promise<Post[]> => {
  try {
    const result = await cms.find({
      collection: 'posts',
      where: {
        'tenant.slug': { equals: 'freehome' },
        _status: { equals: 'published' },
      },
      depth: 1,
      limit: 2,
      sort: '-publishedAt',
    });
    return result.docs;
  } catch (error) {
    console.error('Failed to fetch featured insights:', error);
    return [];
  }
});
```

### 1.4 Add Environment Variables

**File**: `.env.local` (add these)

```bash
# CMS Integration
CMS_API_URL=https://cms.reai-int.net/api
```

---

## Phase 2: CMS Nav Items Components

### 2.1 Create CMS Nav Items Components

**File**: `src/components/CMS/NavItems.tsx`

Following the exact pattern from reai_website:

```typescript
'use client'

import Link from 'next/link'
import type { Header } from '@/types/cms-types'

type NavItem = NonNullable<Header['navItems']>[number]

/**
 * Get the href for a nav item (handles both internal references and custom URLs)
 */
function getNavHref(item: NavItem): string {
  const { link } = item

  if (link.type === 'custom' && link.url) {
    return link.url
  }

  if (link.type === 'reference' && link.reference?.value) {
    const doc = link.reference.value
    if (typeof doc === 'object' && 'slug' in doc) {
      return `/${doc.slug}`
    }
  }

  return '#'
}

/**
 * Desktop navigation items - renders CMS-managed nav links
 * Styled to match FreeHome.world design system
 */
export function CMSNavItemsDesktop({ items }: { items: NavItem[] }) {
  if (!items?.length) return null

  return (
    <>
      {items.map((item, index) => (
        <Link
          key={item.id || index}
          href={getNavHref(item)}
          className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
        >
          {item.link.label}
        </Link>
      ))}
    </>
  )
}

/**
 * Mobile navigation items - renders CMS-managed nav links for mobile menu
 * Styled to match FreeHome.world mobile navigation
 */
export function CMSNavItemsMobile({
  items,
  onItemClick,
}: {
  items: NavItem[]
  onItemClick: () => void
}) {
  if (!items?.length) return null

  return (
    <>
      {items.map((item, index) => (
        <Link
          key={item.id || index}
          href={getNavHref(item)}
          className="block py-2 text-base font-medium text-gray-900 hover:text-primary transition-colors"
          onClick={onItemClick}
        >
          {item.link.label}
        </Link>
      ))}
    </>
  )
}
```

---

## Phase 3: Navigation Integration

### 3.1 Create Navigation Wrapper (Server Component)

**File**: `src/components/layout/NavigationWrapper.tsx`

Following the HeaderWrapper pattern from reai_website:

```typescript
import { getCMSNavItems } from '@/lib/cms'
import { Navigation } from './navigation'

/**
 * Server component wrapper that fetches CMS nav items
 * and passes them to the client Navigation component
 */
export default async function NavigationWrapper() {
  const cmsNavItems = await getCMSNavItems()
  return <Navigation cmsNavItems={cmsNavItems} />
}
```

### 3.2 Update Navigation Component

**File**: `src/components/layout/navigation.tsx`

Update to accept and render CMS nav items:

```typescript
// Add to imports
import type { Header as HeaderType } from '@/types/cms-types'
import { CMSNavItemsDesktop, CMSNavItemsMobile } from '@/components/CMS/NavItems'

type NavItem = NonNullable<HeaderType['navItems']>[number]

interface NavigationProps {
  cmsNavItems?: NavItem[]
}

export function Navigation({ cmsNavItems = [] }: NavigationProps) {
  // ... existing code ...

  // In desktop nav, after existing items:
  <CMSNavItemsDesktop items={cmsNavItems} />

  // In mobile nav, after existing items:
  <CMSNavItemsMobile items={cmsNavItems} onItemClick={() => setOpen(false)} />
}
```

### 3.3 Update Root Layout

**File**: `src/app/layout.tsx`

Replace `<Navigation />` with `<NavigationWrapper />`:

```typescript
import NavigationWrapper from '@/components/layout/NavigationWrapper'

// In the layout JSX:
<NavigationWrapper />
```

---

## Phase 4: Featured Insights Section (Homepage)

### 4.1 Create Featured Insights Component

**File**: `src/components/homepage/FeaturedInsightsSection.tsx`

```typescript
import Link from 'next/link'
import { getFeaturedInsights } from '@/lib/cms'
import type { Post } from '@/types/cms-types'

interface InsightCardProps {
  title: string
  excerpt: string
  slug: string
  publishedAt: string
}

function InsightCard({ title, excerpt, slug, publishedAt }: InsightCardProps) {
  return (
    <Link
      href={`/insights/${slug}`}
      className="group block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100"
    >
      <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-600 line-clamp-2">{excerpt}</p>
      <time className="mt-3 block text-xs text-gray-400">
        {new Date(publishedAt).toLocaleDateString()}
      </time>
    </Link>
  )
}

/**
 * Server component that fetches and displays featured insights
 * Placed after Featured Municipalities on homepage
 */
export async function FeaturedInsightsSection() {
  const insights = await getFeaturedInsights()

  if (!insights.length) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Insights</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {insights.map((insight) => (
            <InsightCard
              key={insight.id}
              title={insight.title}
              excerpt={insight.meta?.description || ''}
              slug={insight.slug}
              publishedAt={insight.publishedAt || insight.createdAt}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/insights"
            className="text-primary hover:text-primary/80 font-medium"
          >
            View all insights →
          </Link>
        </div>
      </div>
    </section>
  )
}
```

### 4.2 Add to Homepage

**File**: `src/app/page.tsx`

Add the Featured Insights section after Featured Municipalities:

```typescript
import { FeaturedInsightsSection } from '@/components/homepage/FeaturedInsightsSection'

// In the homepage JSX, after <FeaturedMunicipalities />:
<FeaturedInsightsSection />
```

---

## Phase 5: Reverse Proxy Configuration (DevOps)

Configure nginx to route CMS-managed paths to the CMS server.

**File**: Nginx config (on production server)

```nginx
server {
    listen 443 ssl;
    server_name freehome.world www.freehome.world;

    # CMS-managed pages (rendered by CMS)
    location ~ ^/(insights|how-it-works)(/|$) {
        proxy_pass http://cms-server:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # All other routes go to frontend-home
    location / {
        proxy_pass http://frontend-home:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

---

## Phase 6: CMS Content Setup (CMS Team)

The CMS team needs to create:

### 6.1 Create "freehome" Tenant

In CMS Admin Panel > Tenants:

- **Name**: FreeHome.world
- **Slug**: `freehome`
- **Domains**: freehome.world, www.freehome.world, localhost:3001
- **CSS Class**: `freehome-cms-page`

### 6.2 Create Pillar Article

**Title**: "How to Buy Real Estate Overseas: A Complete Guide for International Buyers"
**Slug**: `how-to-buy-real-estate-overseas`
**Tenant**: freehome

### 6.3 Create Supporting Article

**Title**: "Overseas Property Buyer's Guide: Step-by-Step Process, Risks, and Best Practices"
**Slug**: `overseas-property-buyers-guide`
**Tenant**: freehome

### 6.4 Create "How It Works" Page

**Title**: "How FreeHome Works"
**Slug**: `how-it-works`
**Tenant**: freehome
**Content**: FAQ format explaining the FreeHome process

### 6.5 Update Header Navigation for freehome tenant

Add nav items:

- Insight → /insights
- How It Works → /how-it-works

---

## Phase 7: Additional Changes (Ticket #146)

### 7.1 Update Family Structure Options

**File**: Filter wizard component

Change family structure options to:

1. Single
2. Couple with no kids
3. Couple with kids
4. Empty Nester (couple w/kids already left home)

### 7.2 Update Review Button Text

Change "Find my dream home" to "See My Dream Home" on the review step.

---

## File Structure Summary

```
src/
├── components/
│   ├── layout/
│   │   ├── navigation.tsx           # MODIFIED: Accept cmsNavItems prop
│   │   └── NavigationWrapper.tsx    # NEW: Server component wrapper
│   ├── homepage/
│   │   └── FeaturedInsightsSection.tsx  # NEW: Featured Insights
│   └── CMS/
│       └── NavItems.tsx             # NEW: CMS nav item components
├── lib/
│   └── cms.ts                       # NEW: CMS SDK client
└── types/
    └── cms-types.ts                 # COPIED from CMS
```

---

## Implementation Checklist

### Phase 1: Core Setup

- [ ] Install `@payloadcms/sdk`
- [ ] Copy `payload-types.ts` to `src/types/cms-types.ts`
- [ ] Create `src/lib/cms.ts` with SDK client (using React `cache()`)
- [ ] Add `CMS_API_URL` to `.env.local`

### Phase 2: CMS Nav Components

- [ ] Create `src/components/CMS/NavItems.tsx` with Desktop and Mobile components
- [ ] Follow exact pattern from reai_website (getNavHref helper, Link component)

### Phase 3: Navigation Integration

- [ ] Create `src/components/layout/NavigationWrapper.tsx` (server component)
- [ ] Update `src/components/layout/navigation.tsx` to accept `cmsNavItems` prop
- [ ] Update `src/app/layout.tsx` to use `NavigationWrapper`

### Phase 4: Featured Insights Section

- [ ] Create `src/components/homepage/FeaturedInsightsSection.tsx`
- [ ] Add FeaturedInsightsSection to homepage (after Featured Municipalities)

### Phase 5: Reverse Proxy (DevOps)

- [ ] Configure nginx routing for `/insights` and `/how-it-works`
- [ ] Test CMS pages render at correct URLs
- [ ] Verify `data-tenant="freehome"` attribute is present

### Phase 6: CMS Content (CMS Team)

- [ ] Create "freehome" tenant in CMS
- [ ] Create pillar article: "How to Buy Real Estate Overseas"
- [ ] Create supporting article: "Overseas Property Buyer's Guide"
- [ ] Create additional cluster articles (from Ticket #145)
- [ ] Create "How FreeHome Works" page
- [ ] Configure header nav items for freehome tenant

### Phase 7: Minor Updates (Ticket #146)

- [ ] Update family structure options in filter wizard
- [ ] Change review button text to "See My Dream Home"

---

## Coordination with CMS Team

| frontend-home Task      | Depends On CMS                        |
| ----------------------- | ------------------------------------- |
| Fetch featured insights | Posts collection + freehome tenant    |
| Fetch nav items         | Header global configured for freehome |
| CSS targeting           | `data-tenant` attribute in layout     |
| Reverse proxy           | CMS deployed and accessible           |

**Communication Points:**

1. Confirm CMS is accessible at expected URL
2. Confirm "freehome" tenant is created
3. Share article content (Word docs from tickets #144, #145)
4. Coordinate on article slugs/URLs

---

## CSS Overrides for CMS Pages

**File**: `src/app/globals.css` (add at end)

```css
/* CMS Page Overrides */
/* These styles apply when CMS pages are displayed within FreeHome.world context */

[data-tenant='freehome'] {
  /* Global overrides for CMS pages */
}

.freehome-cms-page {
  /* Alternative class-based targeting */
}

/* Ensure CMS pages use FreeHome color scheme */
[data-tenant='freehome'] a {
  color: var(--primary);
}
```

---

## Pattern Reference (from reai_website)

This integration follows the exact patterns established in reai_website:

| Component      | reai_website                              | frontend-home                                 |
| -------------- | ----------------------------------------- | --------------------------------------------- |
| CMS Client     | `src/lib/cms.ts`                          | `src/lib/cms.ts`                              |
| Types          | `src/types/cms-types.ts`                  | `src/types/cms-types.ts`                      |
| Nav Components | `src/components/CMS/NavItems.tsx`         | `src/components/CMS/NavItems.tsx`             |
| Server Wrapper | `src/components/layout/HeaderWrapper.tsx` | `src/components/layout/NavigationWrapper.tsx` |
| Tenant Slug    | `reai`                                    | `freehome`                                    |

**Key patterns to maintain:**

1. Use React `cache()` for all CMS fetch functions
2. Use `PayloadSDK` with proper type generics
3. Tenant-scoped queries with `'tenant.slug': { equals: 'freehome' }`
4. Separate Desktop/Mobile nav components with shared `getNavHref` helper
5. Server component wrappers for data fetching, client components for interactivity

---

## Future: Shared CMS Package

To reduce code duplication across repos in `/Users/trucupei/Projects/freehome/`, consider creating a shared package.

### Candidates for Shared Package (`@freehome/cms-client`)

| Code                        | Shareable? | Notes                             |
| --------------------------- | ---------- | --------------------------------- |
| `PayloadSDK` initialization | ✅ Yes     | Same pattern, different env var   |
| `getNavHref()` helper       | ✅ Yes     | Identical logic                   |
| `getCMSNavItems()`          | ✅ Yes     | Identical, tenant passed as param |
| `getFooter()`               | ✅ Yes     | Identical logic                   |
| `cms-types.ts`              | ✅ Yes     | Same types from CMS               |
| `CMSNavItemsDesktop`        | ⚠️ Partial | Logic same, styles differ per app |
| `CMSNavItemsMobile`         | ⚠️ Partial | Logic same, styles differ per app |
| Server Wrappers             | ❌ No      | App-specific component imports    |

### Proposed Package Structure

```
packages/
└── cms-client/
    ├── src/
    │   ├── index.ts           # Main exports
    │   ├── client.ts          # PayloadSDK factory
    │   ├── queries.ts         # Cached query functions
    │   ├── utils.ts           # getNavHref and helpers
    │   └── types.ts           # Re-export CMS types
    ├── package.json
    └── tsconfig.json
```

### Example Usage (After Package Creation)

```typescript
// In reai_website or frontend-home
import { createCMSClient, getCMSNavItems, getNavHref } from '@freehome/cms-client';
import type { Header, Post } from '@freehome/cms-client/types';

const cms = createCMSClient({
  baseURL: process.env.CMS_API_URL,
  tenantSlug: 'freehome', // or 'reai'
});

const navItems = await getCMSNavItems(cms);
```

### When to Create the Package

Create the shared package when:

1. ✅ Both reai_website and frontend-home CMS integrations are working
2. ✅ Patterns are proven stable in production
3. ✅ A third app needs CMS integration (diminishing duplication)

**For now**: Copy the patterns manually to maintain flexibility during initial development.

---

**Last Updated:** 2026-02-02
**Version:** 1.2.0
**Related Tickets:** #144, #145, #146
