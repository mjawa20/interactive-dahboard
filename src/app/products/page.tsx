'use client';

import { useEffect } from 'react';
import { useProductStore } from '@/store';
import { ProductList } from '@/components/organisms/product/ProductList';
import { ProductFilter } from '@/components/organisms/product/ProductFilter';
import { HeaderPage } from '@/components/molecules/HeaderPage';


export default function ProductsPage() {
  const {
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    fetchProducts,
  } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className='space-y-3'>
      <HeaderPage title="Products" description="Discover fresh groceries and daily essentials to complete your meals" />
      <ProductFilter />
      <ProductList />
    </div>
  );
}