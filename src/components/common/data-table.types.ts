/**
 * DataTable Types and Interfaces
 * Responsibility: Define contracts for reusable data table components
 * Follows ISP by providing focused, segregated interfaces
 * Follows DIP by defining abstractions rather than concrete implementations
 */

import { ReactNode } from 'react';
import { PaginatedResult } from '@/types/core';

// Column definition interface - follows ISP
export interface DataTableColumn<TData> {
  readonly key: string;
  readonly label: string;
  readonly accessor?: keyof TData | ((item: TData) => ReactNode);
  readonly render?: (item: TData) => ReactNode;
  readonly sortable?: boolean;
  readonly className?: string;
  readonly headerClassName?: string;
}

// Action interface - follows SRP
export interface DataTableAction<TData> {
  readonly label: string;
  readonly onClick: (item: TData) => void;
  readonly icon?: ReactNode;
  readonly variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  readonly disabled?: (item: TData) => boolean;
  readonly className?: string;
}

// Search configuration - follows ISP
export interface DataTableSearchConfig {
  readonly placeholder?: string;
  readonly searchableFields?: ReadonlyArray<string>;
  readonly debounceMs?: number;
}

// Loading and empty state configuration - follows SRP
export interface DataTableStateConfig {
  readonly loadingComponent?: ReactNode;
  readonly emptyComponent?: ReactNode;
  readonly errorComponent?: (error: Error) => ReactNode;
}

// Main DataTable props interface - follows ISP
export interface DataTableProps<TData> {
  // Data
  readonly data: ReadonlyArray<TData>;
  readonly columns: ReadonlyArray<DataTableColumn<TData>>;
  readonly keyExtractor: (item: TData) => string;

  // Pagination
  readonly paginationInfo: PaginatedResult<TData>;
  readonly onPageChange: (page: number) => void;

  // Search
  readonly searchConfig?: DataTableSearchConfig;
  readonly searchTerm?: string;
  readonly onSearchChange?: (searchTerm: string) => void;

  // Actions
  readonly actions?: ReadonlyArray<DataTableAction<TData>>;
  readonly bulkActions?: ReadonlyArray<DataTableAction<ReadonlyArray<TData>>>;

  // State
  readonly loading?: boolean;
  readonly error?: Error;
  readonly stateConfig?: DataTableStateConfig;

  // Styling
  readonly className?: string;
  readonly tableClassName?: string;
  readonly headerClassName?: string;
  readonly rowClassName?: string | ((item: TData) => string);

  // Selection
  readonly selectable?: boolean;
  readonly selectedItems?: ReadonlyArray<string>;
  readonly onSelectionChange?: (selectedIds: ReadonlyArray<string>) => void;

  // Toolbar
  readonly title?: string;
  readonly description?: string;
  readonly toolbarActions?: ReadonlyArray<{
    readonly label: string;
    readonly onClick: () => void;
    readonly icon?: ReactNode;
    readonly variant?: 'default' | 'destructive' | 'outline' | 'secondary';
  }>;
}

// Search props - follows ISP
export interface DataTableSearchProps {
  readonly searchTerm: string;
  readonly onSearchChange: (searchTerm: string) => void;
  readonly config: DataTableSearchConfig;
  readonly className?: string;
}

// Hook result interface - follows ISP
export interface UseDataTableResult {
  readonly searchTerm: string;
  readonly selectedItems: ReadonlyArray<string>;
  readonly isAllSelected: boolean;
  readonly isPartiallySelected: boolean;
  readonly handleSearchChange: (searchTerm: string) => void;
  readonly handleSelectionChange: (selectedIds: ReadonlyArray<string>) => void;
  readonly handleSelectAll: () => void;
  readonly handleSelectNone: () => void;
  readonly handleToggleSelection: (id: string) => void;
}
