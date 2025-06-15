'use client';

import { useEffect } from 'react';
import { Search, X, ShoppingCart, Menu } from 'lucide-react';
import { ProductCard } from '@/components/molecules/ProductCard';
import { Pagination } from '@/components/molecules/Pagination';
import { useProductStore } from '@/store';
import { ProductList } from '@/components/organisms/product/ProductList';
import { ProductFilter } from '@/components/organisms/product/ProductFilter';


export default function ProductsPage() {
  const {
    products,
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    total,
    loading,
    fetchProducts,
    setPage,
    setSearch,
    setSort
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [page, limit, search, sortBy, sortOrder]);


  return (
    <div className='space-y-3'>
      <ProductFilter />
      <ProductList />
    </div>
  );
}