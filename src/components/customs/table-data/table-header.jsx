import React from "react"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import generateColumnTitle from "@/utils/columnTitleGenerator"

// Reusable TableHeader Component
export const TableHeaderComponent = ({ columns }) => (
  <TableHeader>
    <TableRow>
      {columns.map((column) => {
        const { title, align } = generateColumnTitle(column)
        return (
          <TableHead key={column} className={`text-${align}`}>
            {title}
          </TableHead>
        )
      })}
    </TableRow>
  </TableHeader>
)

export default TableHeaderComponent
