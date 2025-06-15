import { api } from "@/lib/http";

export const getProducts = async (params: Record<string, string>) => {
  try {
    const response = await api.get('/products/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export const getProductsByCategory = async (category: string, params: Record<string, string>) => {
  try {
    const response = await api.get(`/products/category/${category}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    throw error;
  }
}


export const getCategories = async () => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}