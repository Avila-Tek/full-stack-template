import React from 'react';

interface PaginationProps {
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
  pageIndex: number;
  pageCount: number;
  pageOptions: Array<number>;
}

export default function Pagination({
  canPreviousPage,
  canNextPage,
  previousPage,
  nextPage,
  pageIndex,
  pageCount,
  pageOptions,
}: PaginationProps) {
  return (
    <div className="bg-transparent px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            previousPage();
          }}
          disabled={!canPreviousPage}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Previous
        </button>
        <button
          type="button"
          disabled={!canNextPage}
          onClick={(e) => {
            e.preventDefault();
            nextPage();
          }}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm leading-5 text-gray-700">
            Pagina <span className="font-medium">{pageIndex + 1}</span> de{' '}
            <span className="font-medium">{pageCount}</span>
          </p>
        </div>
        <div>
          <nav className="relative z-0 inline-flex shadow-sm">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                previousPage();
              }}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Previous"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                nextPage();
              }}
              disabled={!canNextPage}
              className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-400 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-500 transition ease-in-out duration-150"
              aria-label="Next"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
