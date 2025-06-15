import { create } from 'zustand';
import { Product } from '@/components/types';

interface ProductStore {
  products: Product[];
  loading: boolean;
  total: number;

  page: number;
  limit: number;
  search: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';

  setSearch: (q: string) => void;
  setPage: (p: number) => void;
  setSort: (meta: string) => void;

  fetchProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  total: 0,
  loading: false,

  page: 1,
  limit: 10,
  search: '',
  sortBy: 'price',
  sortOrder: 'asc',

  setSearch: (search) => set({ search, page: 1 }),
  setPage: (page) => set({ page }),
  setSort: (meta: string) => {
    let [sortBy, sortOrder] = meta.split('-');
    sortOrder = sortOrder || 'asc';
    sortBy = sortBy || 'price';

    set({ sortBy, sortOrder: sortOrder as 'asc' | 'desc', page: 1 })
  },

  fetchProducts: async () => {
    const { page, limit, search, sortBy, sortOrder } = get();
    const skip = (page - 1) * limit;

    set({ loading: true });

    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: skip.toString(),
      sortBy: sortBy,
      order: sortOrder,
      ...(search ? { q: search } : {})
    });

    try {
      const res = await fetch(`https://dummyjson.com/products/search?${params.toString()}`);
      const data = await res.json();

      set({
        products: data.products,
        total: data.total,
        loading: false,
      });
    } catch (err) {
      console.error('Fetch failed:', err);
      set({ loading: false });
    }
  }
}));
