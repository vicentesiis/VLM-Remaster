import PropTypes from "prop-types"
import React from "react"
import { TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getTitle, getAlignment } from "@/config/tableConfig"

export const TableHeaderComponent = ({ columns, type }) => (
  <TableHeader>
    <TableRow>
      {columns.map((column) => {
        const title = getTitle(type, column)
        const align = getAlignment(type, column)
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
