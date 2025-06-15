'use client';

import { useEffect } from 'react';
import { useCartStore } from '@/store';
import { HeaderPage } from '@/components/molecules/HeaderPage';
import CartList from '@/components/organisms/cart/cartList';

export default function CartsPage() {
  const {
    fetchCarts,
  } = useCartStore();


  useEffect(() => {
    fetchCarts();
  }, []);

  return (
    <div className='space-y-3'>
      <HeaderPage title="Carts" description="Discover fresh groceries and daily essentials to complete your meals" />
      <CartList />
    </div>
  );
}