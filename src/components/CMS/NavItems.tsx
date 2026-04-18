'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { Header } from '@/types/cms-types';

type NavItem = NonNullable<Header['navItems']>[number];

/**
 * Get the href for a nav item (handles both internal references and custom URLs)
 */
function getNavHref(item: NavItem): string {
  const { link } = item;

  if (link.type === 'custom' && link.url) {
    return link.url;
  }

  if (link.type === 'reference' && link.reference?.value) {
    const doc = link.reference.value;
    if (typeof doc === 'object' && 'slug' in doc) {
      return `/${doc.slug}`;
    }
  }

  return '#';
}

/**
 * Desktop navigation items - renders CMS-managed nav links
 * Styled to match FreeHome.world design system
 */
export function CMSNavItemsDesktop({ items }: { items: NavItem[] }) {
  const pathname = usePathname();

  if (!items?.length) return null;

  return (
    <>
      {items.map((item, index) => {
        const href = getNavHref(item);
        const isActive = pathname === href;

        return (
          <Link
            key={item.id || index}
            href={href}
            className={cn(
              'group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium leading-6 whitespace-nowrap transition-colors outline-none',
              isActive
                ? 'text-primary bg-transparent'
                : 'text-gray-600 hover:text-primary bg-transparent hover:bg-transparent'
            )}
            style={{
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            {item.link.label}
          </Link>
        );
      })}
    </>
  );
}

/**
 * Mobile navigation items - renders CMS-managed nav links for mobile menu
 * Styled to match FreeHome.world mobile navigation
 */
export function CMSNavItemsMobile({
  items,
  onItemClick,
}: {
  items: NavItem[];
  onItemClick: () => void;
}) {
  const pathname = usePathname();

  if (!items?.length) return null;

  return (
    <>
      {items.map((item, index) => {
        const href = getNavHref(item);
        const isActive = pathname === href;

        return (
          <Link
            key={item.id || index}
            href={href}
            className={cn(
              'flex items-center gap-2 py-2 text-sm font-medium',
              isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
            )}
            style={{
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
            onClick={onItemClick}
          >
            {item.link.label}
          </Link>
        );
      })}
    </>
  );
}
