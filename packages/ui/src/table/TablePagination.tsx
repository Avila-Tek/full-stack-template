import React from 'react';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useTable } from './Table';

export default function TablePagination({
  className = '',
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  const table = useTable();
  if (table.options.meta.lengthOfData <= 10) {
    return null;
  }
  return (
    <div className={`py-2 ${className}`} {...props}>
      <nav className="block">
        <ul className="flex pl-0 rounded list-none flex-wrap">
          <li className="">
            <button
              type="button"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500 bg-white text-slate-500"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronDoubleLeftIcon className="w-6 h-6" />
            </button>
          </li>
          <li className="">
            <button
              type="button"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500 bg-white text-slate-500"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
          </li>
          {table.getPageOptions().map((page) => (
            <li className="" key={page}>
              <button
                type="button"
                className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500 bg-white text-slate-500"
                onClick={() => table.setPageIndex(page)}
              >
                {page + 1}
              </button>
            </li>
          ))}
          <li className="">
            <button
              type="button"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500 bg-white text-slate-500"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </li>
          <li className="">
            <button
              type="button"
              className="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-slate-500 bg-white text-slate-500"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <ChevronDoubleRightIcon className="w-6 h-6" />
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
