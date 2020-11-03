import React from 'react';
import Link from 'next/link';
import { useTable, usePagination } from 'react-table';
import Pagination from './Pagination';

interface IHeader {
  Header: React.ReactNode;
  accessor: string;
}

interface TableProps {
  headers: Array<IHeader>;
  content: Array<{
    [k: string]: any;
  }>;
  href?: string;
  as?: string;
  text?: string;
}

function Table({ headers, content, href, as, text }: TableProps) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    nextPage,
    previousPage,
    state: { pageIndex },
  } = useTable(
    {
      columns: headers,
      data: content,
      initialState: { pageIndex: 0 },
    },
    usePagination
  );
  if (content.length === 0 && href && as && text) {
    return (
      <section className="w-full h-full flex flex-col flex-wrap p-8 justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 512 512"
          version="1.1"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
          className="fill-current text-gray-500 w-16 h-16 mx-auto"
        >
          <path d="M492 236H276V20c0-11.046-8.954-20-20-20s-20 8.954-20 20v216H20c-11.046 0-20 8.954-20 20s8.954 20 20 20h216v216c0 11.046 8.954 20 20 20s20-8.954 20-20V276h216c11.046 0 20-8.954 20-20s-8.954-20-20-20z" />
        </svg>
        <Link href={href} as={as}>
          <a className="text-center text-lg text-indigo-700 mt-3">
            Crear {text}
          </a>
        </Link>
      </section>
    );
  }
  return (
    <>
      <div className="block overflow-x-auto w-full">
        <table
          className="w-full border-collapse mb-4 text-gray-600"
          {...getTableProps()}
        >
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((header) => (
                  <th
                    className="p-3 border-b border-gray-300 text-left text-gray-700"
                    {...header.getHeaderProps()}
                  >
                    {header.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr className="hover:bg-gray-300" {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td
                      className="p-3 align-top border-t border-gray-300 ellipsis"
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Pagination
        canPreviousPage={canPreviousPage}
        canNextPage={canNextPage}
        previousPage={previousPage}
        nextPage={nextPage}
        pageIndex={pageIndex}
        pageCount={pageCount}
        pageOptions={pageOptions}
      />
    </>
  );
}

export default Table;
