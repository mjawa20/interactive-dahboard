'use client';

import { useEffect } from 'react';
import { useRecipeStore } from '@/store';
import { RecipeFilter } from '@/components/organisms/recipe/RecipeFilter';
import { RecipeList } from '@/components/organisms/recipe/RecipeList';
import { HeaderPage } from '@/components/molecules/HeaderPage';

export default function RecipesPage() {
  const {
    fetchRecipes,
  } = useRecipeStore();

  useEffect(() => {
    fetchRecipes();
  }, []);

  return (
    <div className="space-y-3">
      <HeaderPage title="Recipes" description="Discover delicious recipes for every occasion" />
      <RecipeFilter />
      <RecipeList />
    </div>
  );
}