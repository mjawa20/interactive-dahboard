import { Pagination } from "@/components/organisms/Pagination";
import { ProductCard } from "@/components/molecules/ProductCard";
import { useProductStore } from "@/store";
import { ShoppingCart } from "lucide-react";
import { Loading } from "@/components/atoms/Loading";

export function ProductList() {
  const { products, total, page, setPage, limit, loading } = useProductStore()

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <Loading />
    );
  }
  return (
    products.length === 0 ? (
      <div className="text-center py-12">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
      </div>
    ) : (
      <>
        <div className="grid md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))] grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-1 sm:gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            total={total}
            currentPage={page}
            totalPages={totalPages}
            limit={limit}
            paginate={setPage}
          />
        )}
      </>
    )

  );
}