'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
// import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { NavItem } from './navigation-items';
import { CMSNavItemsMobile } from '@/components/CMS/NavItems';
import type { Header } from '@/types/cms-types';

type CMSNavItem = NonNullable<Header['navItems']>[number];

interface MobileNavigationProps {
  navigation: NavItem[];
  cmsNavItems?: CMSNavItem[];
  isAdmin?: boolean;
}

export function MobileNavigation({
  navigation,
  cmsNavItems = [],
  isAdmin = false,
}: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden h-10 w-10">
          <Menu className="h-5 w-5 text-gray-600" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle
            style={{
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              color: 'hsl(221.2 83.2% 53.3%)',
            }}
          >
            <Link href="/" onClick={handleLinkClick}>
              FreeHome.World
            </Link>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col space-y-4 mt-8">
          {navigation.map((item) => (
            <div key={item.name}>
              {item.children ? (
                <div className="space-y-2">
                  <div
                    className="flex items-center gap-2 font-medium text-gray-900"
                    style={{
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </div>
                  <div className="ml-7 space-y-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={handleLinkClick}
                        className={cn(
                          'block py-2 text-sm',
                          pathname === child.href
                            ? 'text-primary font-medium'
                            : 'text-gray-600 hover:text-primary'
                        )}
                        style={{
                          fontFamily:
                            'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        }}
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={handleLinkClick}
                  className={cn(
                    'flex items-center gap-2 py-2 text-sm font-medium',
                    pathname === item.href ? 'text-primary' : 'text-gray-600 hover:text-primary'
                  )}
                  style={{
                    fontFamily:
                      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )}
            </div>
          ))}
          {/* CMS-managed navigation items */}
          <CMSNavItemsMobile items={cmsNavItems} onItemClick={handleLinkClick} />
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <span
                className="text-sm font-medium text-gray-900"
                style={{
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Theme
              </span>
              {/* <ThemeToggle /> */}
            </div>
            {isAdmin ? (
              <Link
                href="/"
                onClick={handleLinkClick}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-primary"
                style={{
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                View Public Site
              </Link>
            ) : (
              <a
                href="https://www.reai.co/login"
                onClick={handleLinkClick}
                className="flex items-center text-sm font-medium text-gray-600 hover:text-primary"
                style={{
                  fontFamily:
                    'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
              >
                Log in
              </a>
            )}
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
