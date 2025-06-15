// src/store/cartStore.tsx
import { create } from 'zustand';
import axios from 'axios';
import { CartStore } from '@/types';
import { getCarts } from '@/services/cart';

export const useCartStore = create<CartStore>((set, get) => ({
  carts: [],
  loading: false,
  error: null,
  page: 1,
  limit: 10,
  total: 0,
  sortBy: 'id',
  sortOrder: 'asc',

  getParams: () => {
    const { page, limit } = get();

    let params: Record<string, string> = {
      skip: String((page - 1) * limit),
      limit: String(limit),
    }

    return params;
  },

  fetchCarts: async (params = {}) => {
    const { sortBy, sortOrder, getParams } = get()

    set({ loading: true, error: null, ...params });

    try {
      const params = getParams();
      const data = await getCarts(params);

      // Simulasi sorting di client side karena API tidak mendukung sorting
      let sortedCarts = [...data.carts];
      if (sortBy) {
        sortedCarts.sort((a, b) => {
          let valueA = a[sortBy];
          let valueB = b[sortBy];

          if (typeof valueA === 'string') valueA = valueA.toLowerCase();
          if (typeof valueB === 'string') valueB = valueB.toLowerCase();

          if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
          if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
          return 0;
        });
      }

      set({
        carts: sortedCarts,
        total: data.total,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch carts',
        loading: false
      });
    }
  },

  setPage: (page) => {
    set({ page });
    get().fetchCarts({ page });
  },

  setSort: (sortBy, sortOrder) => {
    set({ sortBy, sortOrder });
    get().fetchCarts({ sortBy, sortOrder });
  },

}));