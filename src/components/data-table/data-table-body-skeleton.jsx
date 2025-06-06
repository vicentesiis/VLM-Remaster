import React from "react"
import { Skeleton } from "@/components/ui/skeleton"
import { TableRow, TableCell } from "@/components/ui/table"

export function DataTableBodySkeleton({
  columnCount,
  rowCount = 10,
  cellWidths = ["auto"],
  shrinkZero = false,
}) {
  const cozyCellWidths = Array.from(
    { length: columnCount },
    (_, index) => cellWidths[index % cellWidths.length] ?? "auto"
  )

  return (
    <>
      {Array.from({ length: rowCount }).map((_, rowIdx) => (
        <TableRow key={rowIdx} className="hover:bg-transparent">
          {Array.from({ length: columnCount }).map((_, colIdx) => (
            <TableCell
              key={colIdx}
              style={{
                width: cozyCellWidths[colIdx],
                minWidth: shrinkZero ? cozyCellWidths[colIdx] : "auto",
              }}
            >
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  )
}
