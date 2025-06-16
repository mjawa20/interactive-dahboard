// src/app/page.tsx
'use client';

import { useEffect } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement, ArcElement } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { SummaryCard } from '@/components/molecules/SummaryCard';
import { HeaderPage } from '@/components/molecules/HeaderPage';
import { useDashboardStore } from '@/store/dashboardStore';
import { ChartSkeleton } from '@/components/atoms/ChartSkeleton';
import { Newspaper, Package, ShoppingCart, Utensils } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Chart options
const barChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export default function Home() {
  const {
    totalProducts,
    totalPosts,
    totalOrders,
    totalRecipes,
    categoryData,
    revenueData,
    isLoading,
    error,
    fetchDashboardData,
    recipesDificultyData
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Error loading dashboard data: {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <HeaderPage
        title="Dashboard"
        description="Overview of your store performance"
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Products"
          value={totalProducts}
          icon={<Package className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <SummaryCard
          title="Total Posts"
          value={totalPosts}
          icon={<Newspaper className="w-6 h-6" />}
          color="bg-green-500"
        />
        <SummaryCard
          title="Total Carts"
          value={totalOrders}
          icon={<ShoppingCart className="w-6 h-6" />}
          color="bg-yellow-500"
        />
        <SummaryCard
          title="Total Recipes"
          value={totalRecipes}
          icon={<Utensils className="w-6 h-6" />}
          color="bg-red-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4">Products by Category</h3>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <Bar options={barChartOptions} data={categoryData} />
          )}
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <Line options={lineChartOptions} data={revenueData} />
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center flex flex-col items-center">
          <h3 className="text-lg font-medium mb-4">Difficulty of Recipes</h3>
          {isLoading ? (
            <ChartSkeleton />
          ) : (
            <Pie className="w-84! h-84!" data={recipesDificultyData} />
          )}
        </div>
      </div>
    </div>
  );
}