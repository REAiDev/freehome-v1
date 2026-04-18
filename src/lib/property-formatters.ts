import {
  PriceFormatter,
  SizeFormatter,
  DateFormatter,
  StatusFormatter,
  StatusColorMap,
} from '@/types/property';

// Status color mapping - centralized constants
export const STATUS_COLORS: StatusColorMap = {
  FOR_SALE: 'bg-green-100 text-green-800',
  FOR_RENT: 'bg-blue-100 text-blue-800',
  SOLD: 'bg-red-100 text-red-800',
  RESERVED: 'bg-yellow-100 text-yellow-800',
  PENDING: 'bg-orange-100 text-orange-800',
  DEFAULT: 'bg-gray-100 text-gray-800',
} as const;

// Price formatting implementation - Single Responsibility
export class DefaultPriceFormatter implements PriceFormatter {
  formatPrice(amount?: number, currency?: string): string {
    if (!amount) return 'Price not specified';

    try {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency || 'EUR',
      }).format(amount);
    } catch {
      // Fallback for invalid currency codes
      return `${amount.toLocaleString()} ${currency || 'EUR'}`;
    }
  }
}

// Size formatting implementation - Single Responsibility
export class DefaultSizeFormatter implements SizeFormatter {
  formatSize(size?: number, unit?: string): string {
    if (!size) return 'Size not specified';
    return `${size.toLocaleString()} ${unit || 'sqm'}`;
  }
}

// Date formatting implementation - Single Responsibility
export class DefaultDateFormatter implements DateFormatter {
  formatDate(date?: string): string {
    if (!date) return 'Not specified';

    try {
      return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return date; // Return original string if parsing fails
    }
  }

  formatDateTime(date?: string): string {
    if (!date) return 'Not specified';

    try {
      return new Date(date).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return date; // Return original string if parsing fails
    }
  }
}

// Status formatting implementation - Single Responsibility
export class DefaultStatusFormatter implements StatusFormatter {
  getStatusColor(status?: string): string {
    if (!status) return STATUS_COLORS.DEFAULT;
    return (
      STATUS_COLORS[status as keyof typeof STATUS_COLORS] ||
      STATUS_COLORS.DEFAULT
    );
  }

  formatStatusText(status?: string): string {
    if (!status) return 'Unknown';
    return status
      .replace('_', ' ')
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  }
}

// Factory pattern for creating formatters - Following DIP
export interface FormatterFactory {
  createPriceFormatter(): PriceFormatter;
  createSizeFormatter(): SizeFormatter;
  createDateFormatter(): DateFormatter;
  createStatusFormatter(): StatusFormatter;
}

export class DefaultFormatterFactory implements FormatterFactory {
  createPriceFormatter(): PriceFormatter {
    return new DefaultPriceFormatter();
  }

  createSizeFormatter(): SizeFormatter {
    return new DefaultSizeFormatter();
  }

  createDateFormatter(): DateFormatter {
    return new DefaultDateFormatter();
  }

  createStatusFormatter(): StatusFormatter {
    return new DefaultStatusFormatter();
  }
}

// Singleton instances for performance
export const priceFormatter = new DefaultPriceFormatter();
export const sizeFormatter = new DefaultSizeFormatter();
export const dateFormatter = new DefaultDateFormatter();
export const statusFormatter = new DefaultStatusFormatter();

// Helper functions for direct use (maintaining backward compatibility)
export const formatPrice = (amount?: number, currency?: string): string =>
  priceFormatter.formatPrice(amount, currency);

export const formatSize = (size?: number, unit?: string): string =>
  sizeFormatter.formatSize(size, unit);

export const formatDate = (date?: string): string =>
  dateFormatter.formatDate(date);

export const formatDateTime = (date?: string): string =>
  dateFormatter.formatDateTime(date);

export const getStatusColor = (status?: string): string =>
  statusFormatter.getStatusColor(status);

export const formatStatusText = (status?: string): string =>
  statusFormatter.formatStatusText(status);
