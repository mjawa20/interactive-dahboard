'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ShoppingCart, 
  Utensils, 
  FileText, 
  Package,
  DollarSign,
  Users,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type SummaryData = {
  totalProducts: number;
  totalRecipes: number;
  totalCarts: number;
  totalPosts: number;
  totalRevenue: number;
};

type ChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string | string[];
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
};

export default function Home() {
  const [summary, setSummary] = useState<SummaryData>({
    totalProducts: 0,
    totalRecipes: 0,
    totalCarts: 0,
    totalPosts: 0,
    totalRevenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<ChartData | null>(null);
  const [revenueData, setRevenueData] = useState<ChartData | null>(null);
  const [categoryData, setCategoryData] = useState<ChartData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all data in parallel
        const [productsRes, recipesRes, cartsRes, postsRes] = await Promise.all([
          axios.get('https://dummyjson.com/products?limit=0'),
          axios.get('https://dummyjson.com/recipes?limit=0'),
          axios.get('https://dummyjson.com/carts?limit=0'),
          axios.get('https://dummyjson.com/posts?limit=0'),
        ]);

        // Calculate total revenue from carts
        const totalRevenue = cartsRes.data.carts.reduce((acc: number, cart: any) => {
          return acc + cart.discountedTotal;
        }, 0);

        // Process product data for charts
        const categories = Array.from(
          new Set(productsRes.data.products.map((p: any) => p.category as string))
        );
        
        const categoryCounts = categories.map((category) => {
          return productsRes.data.products.filter(
            (p: any) => p.category === category
          ).length;
        });

        // Set summary data
        setSummary({
          totalProducts: productsRes.data.total,
          totalRecipes: recipesRes.data.total,
          totalCarts: cartsRes.data.total,
          totalPosts: postsRes.data.total,
          totalRevenue,
        });

        // Set chart data
        setProductData({
          labels: ['Products', 'Recipes', 'Carts', 'Posts'],
          datasets: [
            {
              label: 'Total Count',
              data: [
                productsRes.data.total,
                recipesRes.data.total,
                cartsRes.data.total,
                postsRes.data.total,
              ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
              ],
              borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
              ],
              borderWidth: 1,
            },
          ],
        });

        setCategoryData({
          labels: categories as string[],
          datasets: [
            {
              label: 'Products by Category',
              data: categoryCounts,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
            },
          ],
        });

        // Sample revenue data (in a real app, you'd fetch this from your backend)
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
        const revenue = months.map(() => Math.floor(Math.random() * 10000) + 5000);
        
        setRevenueData({
          labels: months,
          datasets: [
            {
              label: 'Monthly Revenue',
              data: revenue,
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderWidth: 2,
              fill: true,
              tension: 0.3 as any, // Add type assertion for tension
            },
          ],
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }


  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard Overview</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard 
          title="Total Products" 
          value={summary.totalProducts} 
          icon={<Package className="w-6 h-6" />}
          color="bg-blue-500"
        />
        <SummaryCard 
          title="Total Recipes" 
          value={summary.totalRecipes} 
          icon={<Utensils className="w-6 h-6" />}
          color="bg-green-500"
        />
        <SummaryCard 
          title="Total Carts" 
          value={summary.totalCarts} 
          icon={<ShoppingCart className="w-6 h-6" />}
          color="bg-yellow-500"
        />
        <SummaryCard 
          title="Total Revenue" 
          value={`$${summary.totalRevenue.toLocaleString()}`} 
          icon={<DollarSign className="w-6 h-6" />}
          color="bg-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Data Overview</h3>
          <div className="h-80">
            {productData && <Bar data={productData} options={{ responsive: true, maintainAspectRatio: false }} />}
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Products by Category</h3>
          <div className="h-80">
            {categoryData && <Pie data={categoryData} options={{ responsive: true, maintainAspectRatio: false }} />}
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue</h3>
        <div className="h-96">
          {revenueData && <Line data={revenueData} options={{ responsive: true, maintainAspectRatio: false }} />}
        </div>
      </div>
    </div>
  );
}

type SummaryCardProps = {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  color: string;
};

function SummaryCard({ title, value, icon, color }: SummaryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className={`${color} p-3 rounded-full text-white mr-4`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}
