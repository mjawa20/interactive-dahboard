import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';

type ProductCardProps = {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand: string;
  category: string;
  thumbnail: string;
};

export function ProductCard({
  title,
  price,
  rating,
  brand,
  category,
  thumbnail
}: ProductCardProps) {

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100">
      <div className="relative">
        <div className="aspect-square relative bg-slate-50">
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      </div>
      <div className="p-2 sm:p-4 space-y-1 shadow border border-slate-100">
        <h3 className="text-sm sm:text-base font-medium text-gray-900 line-clamp-2">{title}</h3>
        <div className="flex items-center">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`sm:w-4 sm:h-4 w-3 h-3 ${i < Math.round(rating) ? 'fill-current' : ''}`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500 ml-1">({rating.toFixed(1)})</span>
        </div>
        <p className="text-xs text-gray-500 mt-1">{brand} • {category}</p>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <span className="sm:text-lg font-semibold">${price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
