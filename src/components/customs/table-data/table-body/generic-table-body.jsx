import PropTypes from "prop-types"
import React from "react"
import DefaultCell from "@/components/customs/table-data/table-body/table-cell/default-cell"
import { TableBody, TableRow } from "@/components/ui/table"

export function GenericTableBody({ data, columns, renderers, getRowKey }) {
  return (
    <TableBody>
      {data.map((item) => (
        <TableRow key={getRowKey(item)}>
          {columns.map((column, colIndex) => {
            const CellRenderer = renderers[column]

            return CellRenderer ? (
              <CellRenderer
                key={`cell-${getRowKey(item)}-${column}-${colIndex}`}
                item={item}
              />
            ) : (
              <DefaultCell
                key={`cell-${getRowKey(item)}-${column}-${colIndex}`}
                title={item[column] || "N/A"}
              />
            )
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
