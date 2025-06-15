
export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

export interface RecipeStore {
  recipes: Recipe[];
  loading: boolean;
  tagsLoading: boolean;
  error: string | null;
  page: number;
  limit: number;
  total: number;
  search: string;
  tags: string[];
  type: 'all' | 'search' | 'tag' | 'mealType';
  selectedTag: string;
  mealType: string;
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  fetchRecipes: () => Promise<void>;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setTag: (tag: string) => void;
  setMealType: (mealType: string) => void;
  setSort: (sortBy: string, sortOrder: 'asc' | 'desc') => void;
  getParams: () => Record<string, string>;
  getAllTags: () => void;
}