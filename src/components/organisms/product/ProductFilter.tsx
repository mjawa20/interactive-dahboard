import { Input } from "@/components/atoms/Input";
import { Select } from "@/components/atoms/Select";
import { useProductStore } from "@/store";
import { Search, X } from "lucide-react";

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
  const { search, setSearch, sortBy, setSort } = useProductStore();

  return (
    <div className="bg-white shadow-sm p-2">
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
          options={SORT_OPTIONS}
          label="Sort by"
          className="w-full"
          value={sortBy}
          onChange={(e) => setSort(e.target.value)}
        />
      </div>
    </div>
  )
}