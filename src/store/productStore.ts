import { create } from 'zustand';
import { ProductStore } from '@/types';
import { getCategories, getProducts, getProductsByCategory } from '@/services/product';

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],
  total: 0,
  loading: false,
  loadingCategory: false,

  page: 1,
  limit: 10,
  search: '',
  sortBy: 'price',
  sortOrder: 'asc',
  sort: 'rating-desc',
  selectedCategory: '',
  categories: [],
  type: 'all',

  setSearch: (search) => {
    set({ search, page: 1, selectedCategory: '', type: 'search' });
    get().fetchProducts();
  },
  setPage: (page) => {
    set({ page });
    get().fetchProducts();
  },
  setSelectedCategory: (category) => {
    set({ selectedCategory: category, type: 'category', page: 1, search: '' });
    get().fetchProducts();
  },
  setSort: (meta: string) => {
    let [sortBy, sortOrder] = meta.split('-');
    sortOrder = sortOrder || 'asc';
    sortBy = sortBy || 'price';

    set({ sort: meta, sortBy, sortOrder: sortOrder as 'asc' | 'desc', page: 1 })
    get().fetchProducts();
  },

  getCategories: async () => {
    set({ loadingCategory: true });
    try {
      const data = await getCategories();
      set({ categories: data, loadingCategory: false });
    } catch (err) {
      console.error('Fetch failed:', err);
      set({ loadingCategory: false });
    }
  },

  getParams: () => {
    const { page, limit, search, sortBy, sortOrder } = get();

    let params: Record<string, string> = {
      skip: String((page - 1) * limit),
      limit: String(limit),
    }

    if (search) params['q'] = search;
    if (sortBy) params['sortBy'] = sortBy;
    if (sortOrder) params['order'] = sortOrder;

    return params;
  },

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const { getParams, type, selectedCategory } = get();

      const params = getParams();

      let data = null;

      switch (type) {
        case 'category':
          data = await getProductsByCategory(selectedCategory, params);
          break;
        default:
          data = await getProducts(params);
          break;
      }

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
