import PropTypes from "prop-types"
import React, { useState } from "react"
import DefaultCell from "../table-cell/default-cell"
import StatusBadgeCell from "../table-cell/status-badge-cell"
import { TableBody, TableRow } from "@/components/ui/table"

export function SalesReportDetailTableBody({
  data,
  filteredColumns,
  onRowClick,
}) {
  const [selectedRow, setSelectedRow] = useState(null) // Track selected row

  const handleRowSelect = (daySaleReport) => {
    setSelectedRow(daySaleReport.id) // Set selected row by its id or unique identifier
    onRowClick(daySaleReport) // Trigger the callback passed from BaseTable
  }

  const RenderCell = (column, daySaleReport, columnIndex) => {
    switch (column) {
      case "status":
        return (
          <StatusBadgeCell
            key={`${daySaleReport["id"]}-${column}-${columnIndex}`}
            title={daySaleReport["status"] || "N/A"}
          />
        )
      case "quantity":
      case "total":
        return (
          <DefaultCell
            key={`${daySaleReport["id"]}-${column}-${columnIndex}`}
            title={daySaleReport[column] || "N/A"}
            align={"center"}
          />
        )
      default:
        return (
          <DefaultCell
            key={`${daySaleReport["id"]}-${column}-${columnIndex}`}
            title={daySaleReport[column] || "N/A"}
          />
        )
    }
  }

  return (
    <TableBody>
      {data.map((daySaleReport) => (
        <TableRow
          key={daySaleReport.id}
          onClick={() => handleRowSelect(daySaleReport)}
          className={daySaleReport.id === selectedRow ? "bg-gray-200" : ""}
        >
          {filteredColumns.map((column, columnIndex) =>
            RenderCell(column, daySaleReport, columnIndex)
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}

SalesReportDetailTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  filteredColumns: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
}

export default SalesReportDetailTableBody
