// src/components/molecules/RecipeCard.tsx
import Image from 'next/image';
import { Clock, Utensils, Users, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: {
    id: number;
    name: string;
    image: string;
    rating: number;
    prepTimeMinutes: number;
    cookTimeMinutes: number;
    servings: number;
    difficulty: string;
    cuisine: string;
    tags: string[];
  };
  className?: string;
}

export function RecipeCard({ recipe, className }: RecipeCardProps) {
  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div
      className={cn(
        'bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300',
        className
      )}
    >
      <div className="relative h-48 w-full">
        <Image
          src={recipe.image}
          alt={recipe.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 right-2 bg-primary-600 text-white text-xs px-2 py-1 rounded-full">
          {recipe.cuisine}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg line-clamp-1">{recipe.name}</h3>
          <div className="flex items-center text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="ml-1 text-sm font-medium text-gray-800">
              {recipe.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {recipe.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-2 text-xs text-gray-600">
          <div className="flex flex-col items-center">
            <Clock className="w-4 h-4 mb-1" />
            <span>{totalTime} min</span>
          </div>
          <div className="flex flex-col items-center">
            <Utensils className="w-4 h-4 mb-1" />
            <span>{recipe.difficulty}</span>
          </div>
          <div className="flex flex-col items-center">
            <Users className="w-4 h-4 mb-1" />
            <span>{recipe.servings} pax</span>
          </div>
        </div>
      </div>
    </div>
  );
}