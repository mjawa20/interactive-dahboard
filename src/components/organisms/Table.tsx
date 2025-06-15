import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { Column, SortDirection } from "@/types/tableTypes";
import { cn } from "@/lib/utils";

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  sortBy: string;
  sortOrder: SortDirection;
  handleSort: (key: string) => void;
};

export function Table<T extends { id: number;[key: string]: any }>({
  data,
  columns,
  sortBy,
  sortOrder,
  handleSort,
}: TableProps<T>) {
  const SortIcon = ({ column }: { column: string }) => {
    if (sortBy !== column) return null;
    return sortOrder === "asc" ? (
      <ArrowUpIcon className="ml-1 h-4 w-4 inline" />
    ) : (
      <ArrowDownIcon className="ml-1 h-4 w-4 inline" />
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort(column.key as string)}
              >
                {column.header}
                <SortIcon column={column.key as string} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {columns.map((column) => {
                let value = row[column.key];
                if (typeof value === "number" && column.key.includes("total")) {
                  value = `$${value.toFixed(2)}`;
                }

                return (
                  <td
                    key={column.key as string}
                    className={cn("px-6 py-4 whitespace-nowrap text-sm text-gray-700", column.className)}
                  >
                    {column.render ? column.render(value, row) : value}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
