import { api } from "@/lib/http";

export const getDashboardData = async () => {
  const [productsRes, recipesRes, cartsRes, postsRes] = await Promise.all([
    api.get('products?limit=0'),
    api.get('recipes?limit=0'),
    api.get('carts?limit=0'),
    api.get('posts?limit=0'),
  ]);

  return {
    dataProducts: productsRes.data,
    dataRecipes: recipesRes.data,
    dataCarts: cartsRes.data,
    dataPosts: postsRes.data,
  };
} 