// src/app/carts/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useCartStore } from '@/store';
import { Loading } from '@/components/atoms/Loading';
import { Pagination } from '@/components/organisms/Pagination';
import { Table } from '@/components/organisms/Table';
import { formatCurrency } from '@/lib/utils';
import { Column } from '@/types/tableTypes';
import { HeaderPage } from '@/components/molecules/HeaderPage';

export default function CartsPage() {
  const {
    carts,
    loading,
    error,
    page,
    limit,
    total,
    sortBy,
    sortOrder,
    fetchCarts,
    setPage,
    setSort,
  } = useCartStore();

  const columns: Column<any>[] = [
    {
      key: 'id',
      header: 'Cart ID',
      sortable: true,
    },
    {
      key: 'totalProducts',
      header: 'Products',
      sortable: true,
    },
    {
      key: 'totalQuantity',
      header: 'Quantity',
      sortable: true,
    },
    {
      key: 'total',
      header: 'Total',
      sortable: true,
      render: (value: string) => formatCurrency(Number(value?.replace('$', ''))),
    },
    {
      key: 'discountedTotal',
      header: 'Discounted Total',
      sortable: true,
      className: 'text-green-600 font-medium',
      render: (value: string) => formatCurrency(Number(value)),
    },
  ];


  useEffect(() => {
    fetchCarts();
  }, []);

  const totalPages = Math.ceil(total / limit);

  const handleSort = (column: string) => {
    const newOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSort(column, newOrder);
  };


  if (loading && !carts.length) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className='space-y-3'>
      <HeaderPage title="Carts" description="Discover fresh groceries and daily essentials to complete your meals" />

      <div>
        <Table data={carts} columns={columns} sortBy={sortBy} sortOrder={sortOrder} handleSort={handleSort} />
        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            paginate={setPage}
          />
        )}
      </div>
    </div>
  );
}