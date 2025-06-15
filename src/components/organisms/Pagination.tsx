import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../atoms/Button";

export function Pagination({
  currentPage,
  totalPages,
  limit,
  total,
  paginate,
}: {
  currentPage: number;
  totalPages: number;
  limit: number;
  total: number;
  paginate: (page: number) => void;
}) {
  return (
    <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <Button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          size="sm"
          variant="outline"
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          size="sm"
          variant="outline"
        >
          Next
        </Button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * limit + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * limit, total)}
            </span>{' '}
            of <span className="font-medium">{total}</span> results
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <Button
              onClick={() => paginate(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              size="sm"
              variant="outline"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </Button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
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
                <Button
                  key={pageNum}
                  onClick={() => paginate(pageNum)}
                  size="sm"
                  variant="outline"
                  className={` w-8! ${currentPage === pageNum && 'z-10  bg-primary-500! border-primary-500 text-white'}`}
                >
                  {pageNum}
                </Button>
              );
            })}

            <Button
              onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              size="sm"
              variant="outline"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Button>
          </nav>
        </div>
      </div>
    </div>
  );
}