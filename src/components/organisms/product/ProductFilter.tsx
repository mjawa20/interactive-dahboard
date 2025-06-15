import { Input } from "@/components/atoms/Input";
import { Loading } from "@/components/atoms/Loading";
import { Select } from "@/components/atoms/Select";
import { useProductStore } from "@/store";
import { Category } from "@/types";
import { Search, X } from "lucide-react";
import { useEffect } from "react";

type Option = {
  label: string;
  value: string;
};

const SORT_OPTIONS: Option[] = [
  {
    label: 'Best Rating',
    value: 'rating-desc',
  },
  {
    label: 'Price: Low to High',
    value: 'price-asc',
  },
  {
    label: 'Price: High to Low',
    value: 'price-desc',
  },
  {
    label: 'Newest',
    value: 'createdAt-desc',
  },
];

export function ProductFilter() {
  const { search, setSearch, sort, setSort, categories, selectedCategory, setSelectedCategory, loadingCategory, getCategories } = useProductStore();

  useEffect(() => {
    getCategories();
  }, []);

  if (loadingCategory) {
    return <Loading />;
  }



  return (
    <div className="bg-white shadow-sm p-4 rounded">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center sm:gap-4 gap-2">
        <Input
          type="text"
          placeholder="Search products..."
          className="md:max-w-64"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="h-4 w-4 " />}
        />

        <Select
          options={[
            { value: '', label: 'All category' },
            ...categories.map((category: Category) => ({
              value: category.slug,
              label: category.name,
            })),
          ]}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        />

        <Select
          options={SORT_OPTIONS}
          className="w-full min-w-max"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>
    </div>
  )
}