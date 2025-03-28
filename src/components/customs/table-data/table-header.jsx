import React from "react"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { generateTitle } from "@/utils/columnTitleGenerator"

// Reusable TableHeader Component
const TableHeaderComponent = ({ columns }) => (
  <TableHeader>
    <TableRow>
      {columns.map((column) => (
        <TableHead key={column}>{column}</TableHead>
      ))}
    </TableRow>
  </TableHeader>
)

export default TableHeaderComponent
