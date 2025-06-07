import { flexRender } from "@tanstack/react-table"
import React from "react"

import { DataTableBodySkeleton } from "@/components/data-table/data-table-body-skeleton"
import { DataTablePagination } from "@/components/data-table/data-table-pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getCommonPinningStyles } from "@/lib/data-table"
import { cn } from "@/lib/utils"

export function DataTable({
  table,
  actionBar,
  children,
  className,
  isLoading = false,
  isError = false,
  ...props
}) {
  return (
    <div
      className={cn("flex w-full flex-col gap-2.5 overflow-auto", className)}
      {...props}
    >
      {children}
      <div className="overflow-hidden rounded-md border">
        <Table className>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta || {}
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      className={meta.headerClassName}
                      style={{
                        textAlign: meta.align,
                        width: meta.width,
                        minWidth: meta.minWidth,
                        maxWidth: meta.maxWidth,
                        ...getCommonPinningStyles({ column: header.column }),
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <DataTableBodySkeleton
                columnCount={table.getAllLeafColumns().length}
                rowCount={10}
              />
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center text-destructive"
                >
                  {"Error :("}
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => {
                    const meta = cell.column.columnDef.meta || {}
                    return (
                      <TableCell
                        key={cell.id}
                        className={meta.className}
                        style={{
                          textAlign: meta.align,
                          width: meta.width,
                          minWidth: meta.minWidth,
                          maxWidth: meta.maxWidth,
                          ...getCommonPinningStyles({ column: cell.column }),
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  {"Sin Resultados"}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-2.5">
        <DataTablePagination table={table} />
        {actionBar &&
          table.getFilteredSelectedRowModel().rows.length > 0 &&
          actionBar}
      </div>
    </div>
  )
}
