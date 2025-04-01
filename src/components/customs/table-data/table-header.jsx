import PropTypes from "prop-types"
import React from "react"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  generateColumnTitle,
  generateColumnAlign,
} from "@/utils/columnGenerator"

export const TableHeaderComponent = ({ columns, type }) => (
  <TableHeader>
    <TableRow>
      {columns.map((column) => {
        const title = generateColumnTitle(type, column)
        const align = generateColumnAlign(type, column)
        return (
          <TableHead key={column} className={`text-${align}`}>
            {title}
          </TableHead>
        )
      })}
    </TableRow>
  </TableHeader>
)

TableHeaderComponent.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
}

export default TableHeaderComponent
