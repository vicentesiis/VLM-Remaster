import React from "react"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import generateColumnTitle from "@/utils/columnTitleGenerator"

// Reusable TableHeader Component
export const TableHeaderComponent = ({ columns }) => (
  <TableHeader>
    <TableRow>
      {columns.map((column) => {
        const title = generateColumnTitle(column) // Extract title and align dynamically
        return (
          <TableHead key={column} >
            {title}
          </TableHead>
        )
      })}
    </TableRow>
  </TableHeader>
)

export default TableHeaderComponent
