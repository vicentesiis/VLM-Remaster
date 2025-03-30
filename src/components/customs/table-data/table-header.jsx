import React from "react"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  generateColumnTitle,
  generateColumnAlign,
} from "@/utils/columnTitleGenerator"

// Reusable TableHeader Component
export const TableHeaderComponent = ({ columns }) => (
  <TableHeader>
    <TableRow>
      {columns.map((column) => {
        const title = generateColumnTitle(column) // Extract title and align dynamically
        const align = generateColumnAlign(column)
        return (
          <TableHead key={column} align={align} >
            {title}
          </TableHead>
        )
      })}
    </TableRow>
  </TableHeader>
)

export default TableHeaderComponent
