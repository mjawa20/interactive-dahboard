import { create } from 'zustand';

interface DashboardState {
  totalProducts: number;
  totalRevenue: number;
  totalOrders: number;
  totalUsers: number;
  categoryData: any;
  revenueData: any;
  isLoading: boolean;
  error: string | null;
  
  fetchDashboardData: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  totalProducts: 0,
  totalRevenue: 0,
  totalOrders: 0,
  totalUsers: 0,
  categoryData: { labels: [], datasets: [] },
  revenueData: { labels: [], datasets: [] },
  isLoading: false,
  error: null,

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  fetchDashboardData: async () => {
    set({ isLoading: true, error: null });
    
    try {
     
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch dashboard data',
        isLoading: false 
      });
    }
  }
}));