// src/store/recipeStore.ts
import { create } from 'zustand';
import { RecipeStore } from '@/types';
import { getAllRecipesTags, getRecipeByMealType, getRecipes, getRecipesByTag, searchRecipes } from '@/services/recipe';

export const useRecipeStore = create<RecipeStore>((set, get) => ({
  recipes: [],
  loading: false,
  tagsLoading: false,
  error: null,
  page: 1,
  limit: 9,
  total: 0,
  type: 'all',
  search: '',
  tags: [],
  selectedTag: '',
  mealType: '',
  sortBy: 'rating',
  sortOrder: 'desc',

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

  getAllTags: async () => {
    set({ tagsLoading: true, error: null });
    try {
      const data = await getAllRecipesTags(get().getParams());
      set({ tags: data, tagsLoading: false });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch tags', tagsLoading: false });
    }
  },

  fetchRecipes: async () => {
    set({ loading: true, error: null });
    try {
      const { selectedTag, getParams, type, mealType } = get();
      const params = getParams();

      let data = null;

      switch (type) {
        case 'search':
          data = await searchRecipes(params);
          break;
        case 'tag':
          data = await getRecipesByTag(selectedTag, params);
          break;
        case 'mealType':
          data = await getRecipeByMealType(mealType, params);
          break;
        case 'all':
        default:
          data = await getRecipes(params);
          break;
      }

      set({
        recipes: data.recipes,
        total: data.total,
        loading: false
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch recipes',
        loading: false
      });
    }
  },

  setPage: (page) => {
    set({ page });
    get().fetchRecipes();
  },

  setSearch: (search) => {
    set({ search, page: 1, type: 'search' });
    get().fetchRecipes();
  },

  setTag: (selectedTag) => {
    set({ selectedTag, page: 1, type: 'tag', search: '', mealType: '' });
    get().fetchRecipes();
  },

  setMealType: (mealType) => {
    set({ mealType, page: 1, type: 'mealType', search: '', selectedTag: '' });
    get().fetchRecipes();
  },

  setSort: (sortBy, sortOrder) => {
    set({ sortBy, sortOrder, page: 1 });
    get().fetchRecipes();
  }
}));