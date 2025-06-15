'use client';

import { formatCurrency } from "@/lib/utils";
import { Pagination } from "../Pagination";
import { Table } from "../Table";
import { useCartStore } from "@/store";
import { Column } from "@/types/tableTypes";
import { Loading } from "@/components/atoms/Loading";

export default function CartList() {
  const {
    carts,
    page,
    limit,
    total,
    sortBy,
    sortOrder,
    loading,
    error,
    setPage,
    setSort,
  } = useCartStore();

  const totalPages = Math.ceil(total / limit);

  const handleSort = (column: string) => {
    const newOrder = sortBy === column && sortOrder === 'asc' ? 'desc' : 'asc';
    setSort(column, newOrder);
  };

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
  );
}