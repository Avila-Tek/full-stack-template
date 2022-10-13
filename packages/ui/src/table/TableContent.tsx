import React from 'react';
import { flexRender } from '@tanstack/react-table';
import { useTable } from './Table';

export interface MongooseModel {
  _id?: string;
  active?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

interface TableContentProps {
  onClickRow?: (event: React.MouseEvent<HTMLTableRowElement>) => void;
  onKeyDownOrUpRow?: (event: React.KeyboardEvent<HTMLTableRowElement>) => void;
}

/**
 *
 * @example ```js
 *   const onClick = (e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    e.preventDefault();
    const { id } = e.currentTarget.dataset;
    if (!id) {
      return;
    }
    if (path) {
      router.push(href, `${path}/${id}`);
    }
  };
  const onKeyDownOrUp = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    const { id } = e.currentTarget.dataset;
    if (!id) {
      return;
    }
    if (path) {
      router.push(href, `${path}/${id}`);
    }
  };
 *
 * ```
 */

export default function TableContent<T extends MongooseModel>({
  onClickRow: onClick,
  onKeyDownOrUpRow: onKeyDownOrUp,
}: TableContentProps) {
  const table = useTable<T>();
  return (
    <div className="block w-full overflow-x-auto">
      <table className="items-center w-full bg-transparent border-collapse">
        <thead className="">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-slate-50 text-slate-500 border-slate-100 dark:bg-slate-700 dark:text-slate-100 dark:border-slate-600"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              role="button"
              tabIndex={0}
              className="cursor-pointer dark:hover:bg-slate-600"
              data-id={row.original._id}
              onClick={onClick}
              onKeyDown={onKeyDownOrUp}
              onKeyUp={onKeyDownOrUp}
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 dark:text-slate-100"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
