import React from "react"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import generateColumnTitle from "@/utils/columnTitleGenerator"

// Reusable TableHeader Component
export const TableHeaderComponent = ({ data }) => (
  <TableHeader>
    <TableRow>
      {Object.entries(data).map(([key, value]) => {
        const { title } = generateColumnTitle(key)
        return (
          <TableHead key={key} className={`text-${value.align}`}>
            {title}
          </TableHead>
        )
      })}
    </TableRow>
  </TableHeader>
)

export default TableHeaderComponent