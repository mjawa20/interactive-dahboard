import { api } from "@/lib/http";

export const getCarts = async (params: Record<string, string>) => {
  try {
    const response = await api.get('/carts', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching carts:', error);
    throw error;
  }
}
