import PropTypes from "prop-types"
import React from "react"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  generateColumnTitle,
  generateColumnAlign,
} from "@/utils/columnTitleGenerator"

export const TableHeaderComponent = ({ columns }) => (
  <TableHeader>
    <TableRow>
      {columns.map((column) => {
        const title = generateColumnTitle(column)
        const align = generateColumnAlign(column)
        return (
          <TableHead key={column} align={align}>
            {title}
          </TableHead>
        )
      })}
    </TableRow>
  </TableHeader>
)

TableHeaderComponent.propTypes = {
  columns: PropTypes.array.isRequired,
}

export default TableHeaderComponent
