// src/components/organisms/Table/types.ts
export type SortDirection = 'asc' | 'desc' | null;

export interface Column<T> {
  key: string;
  header: string;
  render?: (value: any, row: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  sortBy?: string;
  sortOrder?: SortDirection;
  onSort?: (key: keyof T) => void;
  className?: string;
  rowKey: (row: T) => string | number;
  loading?: boolean;
  emptyState?: React.ReactNode;
}