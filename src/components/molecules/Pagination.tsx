import { ChevronDown } from "lucide-react";

export function Pagination({
  currentPage,
  totalPages,
  paginate,
}: {
  currentPage: number;
  totalPages: number;
  paginate: (page: number) => void;
}) {
  return (
    <div className="mt-8 flex justify-center">
      <nav className="flex items-center space-x-1">
        <button
          onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md text-gray-400 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Previous</span>
          <ChevronDown className="h-5 w-5 transform rotate-90" />
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          // Show first page, last page, current page, and pages around current page
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => paginate(pageNum)}
              className={`px-4 py-2 text-sm font-medium rounded-md ${currentPage === pageNum
                ? 'bg-primary-800 text-white'
                : 'text-gray-700 hover:bg-gray-100'
                }`}
            >
              {pageNum}
            </button>
          );
        })}

        <button
          onClick={() =>
            paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
          }
          disabled={currentPage === totalPages}
          className="p-2 rounded-md text-gray-400 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="sr-only">Next</span>
          <ChevronDown className="h-5 w-5 transform -rotate-90" />
        </button>
      </nav>
    </div>
  );
}