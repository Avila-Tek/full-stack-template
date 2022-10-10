import React, { useContext } from 'react';
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
  PaginationState,
  OnChangeFn,
  RowData,
} from '@tanstack/react-table';

import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';

declare module '@tanstack/table-core' {
  // eslint-disable-next-line no-shadow
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
  interface TableMeta<TData extends RowData> {
    lengthOfData: number;
  }
}

type TTableContext<T> = {
  hook: Table<T>;
  globalFilter: string;
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>;
};

function generateContext<T>() {
  return React.createContext<TTableContext<T>>({
    hook: null,
    globalFilter: '',
    setGlobalFilter: () => {},
  });
}

interface TableContextProviderProps<T> {
  children: React.ReactNode;
  data: Array<T>;
  columns: Array<ColumnDef<T, any>>;
}

let TableContext: React.Context<any> | null = null;

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function TableContextProvider<T>({
  children,
  data,
  columns,
}: TableContextProviderProps<T>) {
  TableContext = generateContext<T>();
  const [globalFilter, setGlobalFilter] = React.useState('');
  const hook = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      // columnFilters,
      globalFilter,
    },
    meta: {
      lengthOfData: data?.length ?? 0,
    },
    // onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  const value = React.useMemo(
    () => ({
      hook,
      globalFilter,
      setGlobalFilter,
    }),
    [globalFilter, hook]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
}

interface TableProps<T> {
  href: string;
  children: React.ReactNode;
  data: Array<T>;
  columns: Array<ColumnDef<T, any>>;
}

export function useTable<T>() {
  const { hook } = useContext(TableContext as React.Context<TTableContext<T>>);
  return hook;
}

export function useGlobalFilter() {
  const { globalFilter, setGlobalFilter } = useContext(
    TableContext as React.Context<TTableContext<any>>
  );
  return [globalFilter, setGlobalFilter] as const;
}

export default function TableComponent<T>({
  href,
  children,
  data,
  columns,
}: TableProps<T>) {
  if (data.length === 0) {
    return null;
  }
  return (
    <TableContextProvider<T> data={data} columns={columns}>
      {children}
    </TableContextProvider>
  );
}
