'use client';

import Link from 'next/link';
import { publicNavigation } from './navigation-items';
import { DesktopNavigation } from './desktop-navigation';
import { MobileNavigation } from './mobile-navigation';
import Image from 'next/image';
import type { Header } from '@/types/cms-types';

type CMSNavItem = NonNullable<Header['navItems']>[number];

interface NavigationProps {
  cmsNavItems?: CMSNavItem[];
}

export function Navigation({ cmsNavItems = [] }: NavigationProps) {
  // Auto-detect admin routes if isAdmin is not explicitly provided
  const isAdminRoute = false;
  const navigation = publicNavigation;

  return (
    <header className="bg-white border-b border-gray-200 reai-header">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 lg:px-8 h-full"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/">
            <Image src="/freehome-logo.png" alt="Logo" width={90} height={40} />
            <p className="text-gray-500 text-sm">Part of REAi.co Global Home Services</p>
          </Link>
        </div>

        <DesktopNavigation
          navigation={navigation}
          cmsNavItems={cmsNavItems}
          isAdmin={isAdminRoute}
        />
        <MobileNavigation
          navigation={navigation}
          cmsNavItems={cmsNavItems}
          isAdmin={isAdminRoute}
        />
      </nav>
    </header>
  );
}
