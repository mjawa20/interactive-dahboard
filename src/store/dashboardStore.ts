import { getDashboardData } from '@/services/dashboard';
import { create } from 'zustand';

interface DashboardState {
  totalProducts: number;
  totalPosts: number;
  totalOrders: number;
  totalRecipes: number;
  ratingData: any;
  revenueData: any;
  recipesDificultyData: any;
  isLoading: boolean;
  error: string | null;

  fetchDashboardData: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  totalProducts: 0,
  totalPosts: 0,
  totalOrders: 0,
  totalRecipes: 0,
  ratingData: { labels: [], datasets: [] },
  revenueData: { labels: [], datasets: [] },
  recipesDificultyData: { labels: [], datasets: [] },
  isLoading: false,
  error: null,

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });

    try {
      const { dataProducts, dataRecipes, dataCarts, dataPosts } = await getDashboardData();

      const mockData = {
        totalProducts: dataProducts.total,
        totalPosts: dataPosts.total,
        totalOrders: dataCarts.total,
        totalRecipes: dataRecipes.total,
        rating: ['1', '2', '3', '4', '5'],
        dificulty: ['Easy', 'Medium', 'Hard'],
        dificultyData: [0, 0, 0],
        ratingCounts: [0, 0, 0, 0, 0],
        months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        revenue: [5000, 7000, 8000, 9000, 10000, 11000],
      };

      dataRecipes.recipes.forEach((item: any) => {
        if (item.difficulty === 'Easy') {
          mockData.dificultyData[0]++;
        } else if (item.difficulty === 'Medium') {
          mockData.dificultyData[1]++;
        } else {
          mockData.dificultyData[2]++;
        }
      });

      dataProducts.products.forEach((item: any) => {
        const rating = Math.round(item.rating);
        if (rating === 1) {
          mockData.ratingCounts[0]++;
        } else if (rating === 2) {
          mockData.ratingCounts[1]++;
        } else if (rating === 3) {
          mockData.ratingCounts[2]++;
        } else if (rating === 4) {
          mockData.ratingCounts[3]++;
        } else {
          mockData.ratingCounts[4]++;
        }
      });

      set({
        totalProducts: mockData.totalProducts,
        totalPosts: mockData.totalPosts,
        totalOrders: mockData.totalOrders,
        totalRecipes: mockData.totalRecipes,
        ratingData: {
          labels: mockData.rating,
          datasets: [{
            label: 'Products by Rating',
            data: mockData.ratingCounts,
            backgroundColor: [
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)',
              'rgba(153, 102, 255, 0.6)',
            ],
          }],
        },
        revenueData: {
          labels: mockData.months,
          datasets: [{
            label: 'Monthly Revenue',
            data: mockData.revenue,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          }],
        },
        recipesDificultyData: {
          labels: mockData.dificulty,
          datasets: [{
            label: 'Difficulty of Recipes',
            data: mockData.dificultyData,
            backgroundColor: [
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(255, 99, 132, 0.6)',

            ],
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          }],
        },
        isLoading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Failed to fetch dashboard data',
        isLoading: false
      });
    }
  }
}));