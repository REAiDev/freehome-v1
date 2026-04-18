import { Home, Building2, Users, Map, FileText, Mail, Shield, ScrollText, BookOpen, Lightbulb } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavItemChild {
  name: string;
  href: string;
}

export interface NavItemBase {
  name: string;
  href: string;
  icon: LucideIcon;
}

export interface NavItemWithChildren extends Omit<NavItemBase, 'href'> {
  children: NavItemChild[];
}

export interface NavItemWithoutChildren extends NavItemBase {
  children?: never;
}

export type NavItem = NavItemWithChildren | NavItemWithoutChildren;

export const publicNavigation: NavItem[] = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: Users },
  { name: 'Contact', href: '/contact', icon: Mail },
  { name: 'Privacy', href: '/privacy', icon: Shield },
  { name: 'Terms', href: '/terms', icon: ScrollText },
  { name: 'How it works', href: '/how-it-works', icon: BookOpen },
  { name: 'Insights', href: '/insights', icon: Lightbulb },
];

export const adminNavigation: NavItem[] = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  {
    name: 'Manage',
    icon: Building2,
    children: [
      { name: 'Properties', href: '/admin/properties' },
      { name: 'Municipalities', href: '/admin/municipalities' },
      { name: 'Programs', href: '/admin/programs' },
      { name: 'Attractions', href: '/admin/attractions' },
      { name: 'Events', href: '/admin/events' },
      { name: 'Activities', href: '/admin/activities' },
      { name: 'Cities', href: '/admin/cities' },
      { name: 'Regions', href: '/admin/regions' },
      { name: 'Countries', href: '/admin/countries' },
    ],
  },
  {
    name: 'Scrape Sources',
    href: '/admin/scrape-sources',
    icon: FileText,
  },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Map },
];
