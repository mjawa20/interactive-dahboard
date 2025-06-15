
export interface CartProduct {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Cart {
  id: number;
  products: CartProduct[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export interface CartStore {
  carts: Cart[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  getParams: () => Record<string, string>;
  fetchCarts: (params?: {
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => Promise<void>;
  setPage: (page: number) => void;
  setSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
}