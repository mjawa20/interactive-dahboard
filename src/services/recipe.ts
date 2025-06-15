import { api } from "@/lib/http";


export const getRecipes = async (params: Record<string, string>) => {
  try {
    const response = await api.get('/recipes', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

export const searchRecipes = async (params: Record<string, string>) => {
  try {
    const response = await api.get('/recipes/search', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

export const getRecipesByTag = async (tag: string, params: Record<string, string>) => {
  try {
    const response = await api.get(`/recipes/tag/${tag}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

export const getAllRecipesTags = async (params: Record<string, string>) => {
  try {
    const response = await api.get(`/recipes/tags`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}


export const getRecipeByMealType = async (mealType: string, params: Record<string, string>) => {
  try {
    const response = await api.get(`/recipes/meal-type/${mealType}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
}

