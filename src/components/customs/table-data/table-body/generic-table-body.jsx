import PropTypes from "prop-types"
import React from "react"
import { DefaultCell } from "../../table/cells"
import { TableBody, TableRow } from "@/components/ui/table"

export function GenericTableBody({ data, columns, renderers, getRowKey }) {
  return (
    <TableBody>
      {data.map((item) => (
        <TableRow key={getRowKey(item)}>
          {columns.map((column, colIndex) => {
            const CellRenderer = renderers[column]
            const cellKey = `cell-${getRowKey(item)}-${column}-${colIndex}`

            if (CellRenderer) {
              return <CellRenderer key={cellKey} item={item} />
            }

            const value = item[column]
            const isObject = typeof value === "object" && value !== null

            if (isObject) return null

            return <DefaultCell key={cellKey} title={value || "N/A"} />
          })}
        </TableRow>
      ))}
    </TableBody>
  )
}

GenericTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  renderers: PropTypes.object,
  getRowKey: PropTypes.func,
}

GenericTableBody.defaultProps = {
  renderers: {},
  getRowKey: (item) => item.id,
}

export default GenericTableBody