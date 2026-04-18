/**
 * Centralized type definitions
 * Contains only types not available from GraphQL schema
 * Follows DRY principle by avoiding duplication with GraphQL types
 */

// Re-export core types
export { UserRole } from "./core";

// Re-export property types
export type { Property } from "./property";

// Re-export globe types
export type {
  ArcData,
  LinesData,
  CityCoordinate,
  MapData,
  GeoJsonFeature,
  CountriesGeoJson,
  GlobeConfig,
  ArcConfig,
  LabelConfig,
} from "./globe";

// Base entity interface for consistent structure
export interface BaseEntity {
  readonly id: string;
  readonly createdAt: string;
  readonly updatedAt: string;
}

// Pagination interfaces (following SRP)
export interface IPaginationParams {
  readonly page: number;
  readonly pageSize: number;
}

export interface IPaginatedResponse<T> {
  readonly items: T[];
  readonly totalItems: number;
  readonly page: number;
  readonly pageSize: number;
  readonly totalPages: number;
}

// API Response interfaces (following SRP)
export interface ApiResponse<T> {
  readonly data: T;
  readonly message?: string;
  readonly success: boolean;
}

export interface PaginatedResponse<T> {
  readonly data: T[];
  readonly pagination: {
    readonly page: number;
    readonly limit: number;
    readonly total: number;
    readonly totalPages: number;
  };
}

// Form interfaces (following ISP)
export interface FormField<T = Record<string, unknown>> {
  readonly name: keyof T;
  readonly label: string;
  readonly type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "select"
    | "textarea"
    | "checkbox";
  readonly required?: boolean;
  readonly placeholder?: string;
  readonly options?: ReadonlyArray<{ value: string; label: string }>;
}

export interface FormConfig<T> {
  readonly fields: FormField<T>[];
  readonly validationSchema?: object;
  readonly defaultValues?: Partial<T>;
}

// Component prop interfaces (following ISP)
export interface LoadingProps {
  readonly isLoading: boolean;
  readonly message?: string;
}

export interface ErrorProps {
  readonly error: string | null;
  readonly onRetry?: () => void;
}

export interface PaginationProps {
  readonly currentPage: number;
  readonly totalPages: number;
  readonly onPageChange: (page: number) => void;
  readonly itemsPerPage?: number;
}

export interface SearchProps {
  readonly query: string;
  readonly onSearch: (query: string) => void;
  readonly placeholder?: string;
}

export interface FilterProps<T> {
  readonly filters: T;
  readonly onFilterChange: (filters: T) => void;
}

// Navigation interfaces (following SRP)
export interface NavigationItem {
  readonly name: string;
  readonly href: string;
  readonly icon?: React.ComponentType<{ className?: string }>;
  readonly children?: NavigationItem[];
}

// Statistics interfaces (following SRP and derived from GraphQL types)
export interface PropertyStatistics {
  readonly byStatus: {
    readonly statusCounts: ReadonlyArray<{
      readonly status: string;
      readonly count: number;
    }>;
    readonly total: number;
  };
  readonly byPrice: {
    readonly priceRanges: ReadonlyArray<{
      readonly range: string;
      readonly count: number;
    }>;
    readonly total: number;
    readonly averagePrice: number;
    readonly minPrice: number;
    readonly maxPrice: number;
  };
  readonly byLocation: {
    readonly byCountry: ReadonlyArray<{
      readonly country: string;
      readonly count: number;
    }>;
    readonly byRegion: ReadonlyArray<{
      readonly region: string;
      readonly count: number;
    }>;
    readonly total: number;
  };
}
