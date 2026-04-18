import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, parseISO } from 'date-fns';

/**
 * Combines class names with tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date string
 */
export function formatDate(
  date: string | Date | null | undefined,
  formatString = 'PPP'
) {
  if (!date) return '';

  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatString);
}

/**
 * Format currency values
 */
export function formatCurrency(
  amount: number | string | null | undefined,
  currency = 'EUR',
  locale = 'en-US'
) {
  if (amount === null || amount === undefined) return '';

  const numericAmount =
    typeof amount === 'string' ? parseFloat(amount) : amount;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(numericAmount);
}

/**
 * Truncates text to a specific length
 */
export function truncateText(text: string, maxLength: number): string {
  if (!text) return '';
  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}...`;
}

/**
 * Converts a string to title case
 */
export function toTitleCase(str: string): string {
  if (!str) return '';

  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Creates a slug from a string
 */
export function slugify(text: string): string {
  if (!text) return '';

  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}
