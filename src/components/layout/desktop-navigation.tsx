'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
// import { ThemeToggle } from '@/components/ui/theme-toggle';
import { cn } from '@/lib/utils';
import { NavItem } from './navigation-items';
import { CMSNavItemsDesktop } from '@/components/CMS/NavItems';
import type { Header } from '@/types/cms-types';

type CMSNavItem = NonNullable<Header['navItems']>[number];

interface DesktopNavigationProps {
  navigation: NavItem[];
  cmsNavItems?: CMSNavItem[];
  isAdmin?: boolean;
}

export function DesktopNavigation({
  navigation,
  cmsNavItems = [],
  isAdmin = false,
}: DesktopNavigationProps) {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex lg:items-center lg:justify-between lg:flex-1 lg:gap-6">
      <NavigationMenu>
        <NavigationMenuList>
          {navigation.map((item) => (
            <NavigationMenuItem key={item.name}>
              {item.children ? (
                <>
                  <NavigationMenuTrigger
                    className="text-sm font-medium leading-6 whitespace-nowrap h-10"
                    style={{
                      color: 'hsl(71.4 13.1% 40%)',
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    {item.name}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4">
                      {item.children.map((child) => (
                        <NavigationMenuLink key={child.name} asChild>
                          <Link
                            href={child.href}
                            className={cn(
                              'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-blue-50 hover:text-primary focus:bg-blue-50 focus:text-primary',
                              pathname === child.href && 'bg-blue-50 text-primary'
                            )}
                          >
                            <div className="text-sm font-medium leading-none">{child.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      'group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium leading-6 whitespace-nowrap transition-colors outline-none',
                      pathname === item.href
                        ? 'text-primary bg-transparent'
                        : 'text-gray-600 hover:text-primary bg-transparent hover:bg-transparent'
                    )}
                    style={{
                      fontFamily:
                        'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    }}
                  >
                    {item.name}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
          {/* CMS-managed navigation items */}
          <CMSNavItemsDesktop items={cmsNavItems} />
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-4 flex-shrink-0 min-w-max">
        {/* <ThemeToggle /> */}
        {isAdmin ? (
          <Link
            href="/"
            className="text-sm font-medium leading-6 hover:text-primary whitespace-nowrap px-2 py-1 h-10 flex items-center text-gray-600"
            style={{
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            View Public Site <span aria-hidden="true">&rarr;</span>
          </Link>
        ) : (
          <a
            href="https://www.reai.co/login"
            className="text-sm font-medium leading-6 whitespace-nowrap px-4 py-2 h-10 flex items-center rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200"
            style={{
              fontFamily:
                'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
          >
            Log in <span aria-hidden="true">&rarr;</span>
          </a>
        )}
      </div>
    </div>
  );
}
