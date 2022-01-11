/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useAsyncDebounce,
  Row,
  useFilters,
} from 'react-table';
import { useRouter } from 'next/router';
import { matchSorter } from 'match-sorter';
import ArrowIcon from '../icons/ArrowIcon';
import RightArrowIcon from '../icons/RightArrowIcon';
import LeftArrowIcon from '../icons/LeftArrowIcon';
import SearchIcon from '../icons/SearchIcon';

interface GlobalFilterProps {
  // eslint-disable-next-line @typescript-eslint/ban-types
  preGlobalFilteredRows: Row<object>[];
  globalFilter: any;
  setGlobalFilter: (filterValue: any) => void;
}

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
}: GlobalFilterProps) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce((_value) => {
    setGlobalFilter(_value || undefined);
  }, 100);

  return (
    <div className="w-48 h-8 lg:ml-6 bg-neutral-200 rounded-full flex flex-row justify-center items-center pl-2">
      <SearchIcon className="w-4 h-4" />
      <input
        className="appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 focus:ring-0 focus:outline-none text-xs md:text-sm leading-normal text-black"
        id="search"
        name="search"
        type="search"
        value={value || ''}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Buscador"
      />
    </div>
  );
}

interface IHeader {
  Header: React.ReactNode;
  accessor: string;
  filterColumn?: boolean;
  disableFilters?: boolean;
  disableSortBy?: boolean;
}

interface TableProps {
  headers: Array<IHeader>;
  content: Array<Record<string, any>>;
  noFilter?: boolean;
  type?: string;
  title: any;
  length?: number;
  data?: any;
  disabled?: boolean;
}

function getValue(obj: { [k: string]: any }, key: string): any {
  return key
    .split('.')
    .reduce((itemObj, nestedKey) => (itemObj ? itemObj[nestedKey] : null), obj);
}

function match<T>(
  values: Array<T> = [],
  compareAt: string = '',
  { keys = [] } = {}
) {
  return values.filter((val) => {
    const objectValues = keys
      .map((key) => {
        if (key?.includes('.')) {
          return getValue(val, key);
        }
        return val[key];
      })
      .filter((value) => typeof value !== 'function');
    return (
      objectValues.filter((objVal) =>
        String(objVal).toLowerCase()?.includes(String(compareAt).toLowerCase())
      ).length > 0
    );
  });
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  return <p />;
}

function fuzzyTextFilterFn(rows: any[], id: any, filterValue: any): any[] {
  return matchSorter(rows, filterValue, {
    keys: [(row) => (row as any).values[id]],
  });
}

export default function Table({
  headers,
  content,
  noFilter,
  type,
  title,
  length,
  disabled,
}: //   updateAllies,
TableProps) {
  const router = useRouter();
  const columns = React.useMemo(() => [...headers], [headers]);
  const data = React.useMemo(() => [...content], [content]);
  const [rowCount, setRowCount] = React.useState(5);
  const [activated, setActivated] = React.useState(false);

  const filterTypes = React.useMemo(
    () => ({
      // Add a new fuzzyTextFilterFn filter type.
      fuzzyText: fuzzyTextFilterFn,
      // Or, override the default text filter to use
      // "startWith"
      text: (rows: any[], id: any, filterValue: any) =>
        rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        }),
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

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
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex, globalFilter },
    preGlobalFilteredRows,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: rowCount,
      },
      filterTypes,
      defaultColumn,
    },
    useGlobalFilter,
    useFilters,
    useSortBy,
    usePagination
  );

  const changePage = (url: string) => {
    router.push(url);
  };

  //   const exportExcel = (filename: string, sheet: string) => (
  //     <ReactHTMLTableToExcel
  //       id="exportExcelButton"
  //       className="bebas w-48 h-8 bg-primary-500 hover:bg-blue-500 text-white text-xs md:text-sm leading-normal rounded-full uppercase ml-4"
  //       table="infoTable"
  //       filename={filename}
  //       sheet={sheet}
  //       buttonText="Exportar Excel"
  //     />
  //   );

  //   const generateButton = (_type) => {
  //     if (_type === 'payment') {
  //       return exportExcel('Historial-de-pagos', 'Historial de Pagos');
  //     }
  //     if (_type === 'ally') {
  //       return <CreateAllyButton allies={content} updateAllies={updateAllies} />;
  //     }
  //     if (_type === 'client') {
  //       return exportExcel('Clientes', 'Tabla de clientes');
  //     }
  //     if (_type === 'product') {
  //       return <CreateProductButton />;
  //     }
  //     if (_type === 'roles-privileges') {
  //       return <CreateRoleButton users={content} updateUsers={updateAllies} />;
  //     }
  //     if (_type === 'subscription') {
  //       return <CreateSubscriptionButton />;
  //     }
  //     return '';
  //   };

  const onClickTable = (index: number) => {
    if (type === 'payment') {
      router.push(`/payments/${content[index].id}`);
    }
    if (type === 'product') {
      router.push(`/products/${content[index]?.id}`);
    }
    if (type === 'order') {
      router.push(`/orders/${content[index]?.id}`);
    }
    if (type === 'roles-privileges') {
      router.push(`/app/users/${content[index]?.id}`);
    }
    if (type === 'client') {
      router.push(`/app/clients/${content[index]?.id}`);
    }
    if (type === 'user') {
      router.push(`/users/${content[index]?.id}`);
    }
  };

  return (
    <div className="flex flex-col items-center h-auto w-full">
      <div
        className={
          pageOptions.length <= 1
            ? 'w-full h-auto flex flex-col items-center'
            : 'w-full md:hbig flex flex-col items-center'
        }
      >
        <div
          className={
            noFilter ? 'hidden' : 'h-20 w-11/12 flex flex-col md:flex-row'
          }
        >
          <div className="w-0 flex-grow" />
          <div className="flex flex-row items-center justify-start mb-3 md:mb-0 w-full md:w-1/2">
            <h1 className="text-base md:text-2xl font-bold text-primary-500 uppercase">
              {title}
            </h1>
          </div>
          <div className="flex flex-row items-center justify-center md:justify-end w-full md:w-1/2">
            <GlobalFilter
              globalFilter={globalFilter}
              preGlobalFilteredRows={preGlobalFilteredRows}
              setGlobalFilter={setGlobalFilter}
            />
            {/* {generateButton(type)} */}
          </div>
        </div>
        <div className="flex flex-wrap justify-start md:justify-center overflow-hidden w-full h-auto">
          <table
            className="justify-center md:table-fixed w-full projecttable"
            {...getTableProps()}
            id="infoTable"
          >
            <thead className="border-b border-neutral-300 w-full justify-between">
              {headerGroups?.map((headerGroup) => (
                <tr
                  className="bg-transparent h-12 bebas text-sm lg:text-base leading-normal justify-between text-primary-500"
                  {...headerGroup.getHeaderGroupProps()}
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      {...header.getHeaderProps(header.getSortByToggleProps())}
                    >
                      <div className="flex flex-row justify-center items-center">
                        <div
                          className={
                            type === 'product'
                              ? 'truncate w-14 md:w-max font-bold'
                              : 'truncate w-32 md:w-max font-bold'
                          }
                        >
                          {header.render('Header')}
                        </div>

                        <div>
                          {header.canFilter ? (
                            activated ? (
                              header?.render('Filter')
                            ) : (
                              <div className="ml-1 bg-neutral-500">
                                <ArrowIcon />
                              </div>
                            )
                          ) : null}
                        </div>
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page?.map((row, index) => {
                prepareRow(row);
                return (
                  <tr
                    className={`${
                      type === 'product' ? 'h-max' : 'h-14'
                    } bg-transparent bebas text-sm leading-normal justify-between text-neutral-800 hover:bg-neutral-200 w-full border-b border-neutral-300 font-normal cursor-pointer`}
                    onClick={(e) => {
                      e.preventDefault();
                      onClickTable(Number(row.id));
                    }}
                    {...row.getRowProps()}
                  >
                    {row.cells.map((cell) => (
                      <td
                        className="truncate px-2 md:px-3 h-8 md:h-12"
                        {...cell.getCellProps()}
                      >
                        <div className="flex flex-row justify-center items-center">
                          <div
                            className={
                              type === 'product'
                                ? 'truncate w-28 md:w-max'
                                : 'truncate w-max'
                            }
                          >
                            {cell.render('Cell')}
                          </div>

                          <div>
                            {/* {header.canFilter ? (
                              activated ? (
                                header?.render('Filter')
                              ) : (
                                <div className="ml-1">
                                  <BsArrowDown />
                                </div>
                              )
                            ) : null} */}
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full h-12 flex flex-row justify-end items-center text-xs lg:text-sm text-secondary-500">
        <div className="flex flex-row items-center lg:mr-10">
          <p>Filas por página: </p>
          <select
            className="border-none bg-transparent outline-none text-xs lg:text-sm"
            value={rowCount}
            onChange={(e) => setRowCount(Number(e.target.value))}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </select>
        </div>
        <div className="mr-7 md:mr-9">
          {pageIndex + 1 === pageCount ? (
            <p>{`${
              rowCount * (pageIndex + 1) - (rowCount - 1)
            } - ${length} of ${length}`}</p>
          ) : (
            <p>{`${rowCount * (pageIndex + 1) - (rowCount - 1)} - ${
              length === 0 ? `${length}` : `${rowCount * (pageIndex + 1)}`
            } of ${length}`}</p>
          )}
        </div>
        <div
          className={
            pageOptions.length <= 1
              ? 'hidden'
              : 'w-10 h-10 flex flex-row justify-center items-center mr-4'
          }
        >
          <button
            type="button"
            className="cursor-pointer mr-7"
            onClick={(e) => {
              e.preventDefault();
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            <LeftArrowIcon className="w-3 h-3" />
          </button>
          <button
            type="button"
            className="cursor-pointer "
            onClick={(e) => {
              e.preventDefault();
              nextPage();
            }}
            disabled={!canNextPage}
          >
            <RightArrowIcon className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
