import { Pagination } from "@/components/molecules/Pagination";
import { ProductCard } from "@/components/molecules/ProductCard";
import { useProductStore } from "@/store";
import { ShoppingCart } from "lucide-react";

export function ProductList() {
  const { products, total, page, setPage, limit, loading } = useProductStore()

  const totalPages = Math.ceil(total / limit);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
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
        <div className="grid md:grid-cols-[repeat(auto-fit,minmax(220px,1fr))] grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-1 sm:gap-3">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            paginate={setPage}
          />
        )}
      </>
    )

  );
}