// src/components/organisms/recipe/RecipeFilter.tsx
'use client';

import { Input } from '@/components/atoms/Input';
import { Loading } from '@/components/atoms/Loading';
import { Select } from '@/components/atoms/Select';
import { useRecipeStore } from '@/store';
import { Search } from 'lucide-react';
import { useEffect } from 'react';

const MEAL_TYPES = [
  { value: '', label: 'All Meals' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'lunch', label: 'Lunch' },
  { value: 'dinner', label: 'Dinner' },
  { value: 'dessert', label: 'Dessert' },
  { value: 'snack', label: 'Snack' },
];

const SORT_OPTIONS = [
  { value: 'rating-desc', label: 'Highest Rating' },
  { value: 'rating-asc', label: 'Lowest Rating' },
  { value: 'time-asc', label: 'Quickest' },
  { value: 'time-desc', label: 'Longest' },
];

export function RecipeFilter() {
  const {
    search,
    setSearch,
    tags,
    selectedTag,
    tagsLoading,
    setTag,
    mealType,
    setMealType,
    sortBy,
    sortOrder,
    setSort,
    getAllTags,
  } = useRecipeStore();

  const handleSortChange = (value: string) => {
    const [sortBy, sortOrder] = value.split('-') as [string, 'asc' | 'desc'];
    setSort(sortBy, sortOrder);
  };

  useEffect(() => {
    getAllTags();
  }, []);

  if (tagsLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <div className="flex flex-wrap justify-end items-end md:items-center sm:gap-4 gap-2">
        <Input
          type="text"
          placeholder="Search recipes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='min-w-64'
          leftIcon={<Search className="w-4 h-4 text-gray-400" />}
        />

        <Select
          options={[
            { value: '', label: 'All Tags' },
            ...tags.map((tag) => ({
              value: tag,
              label: tag.charAt(0).toUpperCase() + tag.slice(1),
            })),
          ]}
          value={selectedTag}
          onChange={(e) => setTag(e.target.value)}
        />

        <Select
          options={MEAL_TYPES}
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        />

        <Select
          options={SORT_OPTIONS}
          value={`${sortBy}-${sortOrder}`}
          onChange={(e) => handleSortChange(e.target.value)}
        />
      </div>
    </div>
  );
}