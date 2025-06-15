import { useRecipeStore } from '@/store';
import { RecipeCard } from '@/components/molecules/RecipeCard';
import { Pagination } from '@/components/organisms/Pagination';
import { Loading } from '@/components/atoms/Loading';

export function RecipeList() {
  const {
    recipes,
    page,
    total,
    limit,
    loading,
    setPage,
  } = useRecipeStore();

  const totalPages = Math.ceil(total / limit);


  if (loading && !recipes.length) {
    return <Loading />;
  }


  return (recipes.length === 0 ? (
    <div className="text-center py-12">
      <p className="text-gray-500">No recipes found. Try adjusting your filters.</p>
    </div>
  ) : (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            total={total}
            limit={limit}
            paginate={setPage}
          />
        </div>
      )}
    </>
  )
  )
}
