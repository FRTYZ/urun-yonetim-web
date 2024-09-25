import { useState, useEffect } from "react";

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    ColumnFiltersState,
    getFilteredRowModel,
    FilterFn,
    PaginationState,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";

import { rankItem } from "@tanstack/match-sorter-utils";

// FormElements
import XInput from "./FormElements/XInput";
import XButton from "./FormElements/XButton";

import { Link } from "react-router-dom";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    subHeader?: string;
    searchFilter?: boolean;
}

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);

    addMeta({ itemRank });

    return itemRank.passed;
};

function DebouncedInput({
    value: initialValue,
    onChange,
    debounce = 500,
}: {
    value: string | number;
    onChange: (value: string | number) => void;
    debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    useEffect(() => {
        const timeout = setTimeout(() => {
            onChange(value);
        }, debounce);

        return () => clearTimeout(timeout);
    }, [value]);

    return (
        <XInput
          type='text'
          value={String(value)}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search..."
          labelType="top"
          tabIndex={1}
          addStyle="!h-5 placeholder-gray-500"
        />
    );
}

export function DataTable<TData, TValue>({
    columns,
    data,
    subHeader,
    searchFilter = false,
}: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        getSortedRowModel: getSortedRowModel(),
        onSortingChange: setSorting,
        filterFns: {
            fuzzy: fuzzyFilter,
        },
        state: {
            sorting,
            columnFilters,
            rowSelection,
            globalFilter,
            pagination,
        },
    });

    const showDataText = `${
        table.getPrePaginationRowModel().rows.length
    } veriden ${
        table.getState().pagination.pageIndex + 1
    } - ${table.getPageCount()} arası gösteriliyor`;

    return (
        <>
            <div className="grid grid-cols-2 items-center pl-3 py-4">
                <p>{subHeader}</p>
                {searchFilter && (
                  <div className="flex gap-4 justify-end">
                    <DebouncedInput
                        value={globalFilter ?? ""}
                        onChange={(value) =>
                            setGlobalFilter(String(value))
                        }
                    />
                    <select
                        value={
                            table.getState().pagination.pageSize
                        }
                        className="block rounded-md border-gray-300 focus:!border-transparent focus:!ring-black focus:!outline-black float-right mr-3"
                        onChange={(e) => {
                            table.setPageSize(
                                Number(e.target.value)
                            );
                        }}
                    >
                        {[10, 20, 30, 40, 50].map(
                            (pageSize) => (
                                <option
                                    key={pageSize}
                                    value={pageSize}
                                >
                                    {pageSize}
                                </option>
                            )
                        )}
                    </select>
                  </div>
                )}
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                      {table.getHeaderGroups().map((headerGroup) => (
                          <tr key={headerGroup.id}>
                              {headerGroup.headers.map((header) => {
                                  return (
                                      <th className="p-2 whitespace-nowrap" key={header.id}>
                                          {header.isPlaceholder
                                              ? null
                                              : flexRender(
                                                    header.column
                                                        .columnDef
                                                        .header,
                                                    header.getContext()
                                                )}
                                      </th>
                                  );
                              })}
                          </tr>
                      ))}
                    </thead>
                    <tbody className="text-sm divide-y divide-gray-100">
                          {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <tr
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() &&
                                            "selected"
                                        }
                                    >
                                        {row
                                            .getVisibleCells()
                                            .map((cell) => (
                                                <td className="p-2 whitespace-nowrap" key={cell.id}>
                                                    {flexRender(
                                                        cell.column
                                                            .columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </td>
                                            ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="p-2 whitespace-nowrap h-24 text-center"
                                        colSpan={columns.length}
                                    >
                                        Kayıt yok
                                    </td>
                                </tr>
                            )}
                    </tbody>
                    <tfoot className="table-caption caption-bottom border-t border-gray-300">
                      <div className="grid grid-cols-2 gap-4 items-center my-2 mx-4">
                          <div className="flex-1 text-sm text-muted-foreground">
                              {showDataText}
                          </div>
                          <div className="flex items-center justify-end gap-2">
                              <XButton 
                                  label="Geri"
                                  disabled={!table.getCanPreviousPage()}
                                  onClick={() => table.previousPage()}
                                  textStyle='text-black text-[16px] font-[600]'
                                  padding='p-[5px]'
                                  radius='rounded-lg'
                                  addStyle="!w-fit border border-gray-400"
                              />
                              <XButton 
                                  label="İleri"
                                  disabled={!table.getCanNextPage()}
                                  onClick={() => table.nextPage()}
                                  textStyle='text-black text-[16px] font-[600]'
                                  padding='p-[5px]'
                                  radius='rounded-lg'
                                  addStyle="!w-fit border border-gray-400"
                              />
                          </div>
                      </div>
                    </tfoot>
                </table>
            </div>
        </>
    );
}

export default DataTable;
