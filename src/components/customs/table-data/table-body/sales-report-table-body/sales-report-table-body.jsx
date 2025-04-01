import PropTypes from "prop-types"
import React, { useState } from "react"
import DefaultCell from "../table-cell/default-cell"
import StatusBadgeCell from "../table-cell/status-badge-cell"
import { TableBody, TableRow } from "@/components/ui/table"

export function SalesReportTableBody({ data, filteredColumns, onRowClick }) {
  const [selectedRow, setSelectedRow] = useState(null) // Track selected row

  const handleRowSelect = (saleReport) => {
    setSelectedRow(saleReport.date) // Set selected row by its date or unique identifier
    onRowClick(saleReport) // Trigger the callback passed from BaseTable
  }

  const RenderCell = (column, saleReport, columnIndex) => {
    switch (column) {
      case "status":
        return (
          <StatusBadgeCell
            key={`${saleReport["date"]}-${column}-${columnIndex}`}
            title={saleReport["status"] || "N/A"}
          />
        )
      case "quantity":
      case "total":
        return (
          <DefaultCell
            key={`${saleReport["date"]}-${column}-${columnIndex}`}
            title={saleReport[column] || "N/A"}
            align={"center"}
          />
        )
      default:
        return (
          <DefaultCell
            key={`${saleReport["date"]}-${column}-${columnIndex}`}
            title={saleReport[column] || "N/A"}
          />
        )
    }
  }

  return (
    <TableBody>
      {data.map((saleReport) => (
        <TableRow
          key={saleReport.date}
          onClick={() => handleRowSelect(saleReport)}
          className={saleReport.date === selectedRow ? "bg-gray-200" : ""}
        >
          {filteredColumns.map((column, columnIndex) =>
            RenderCell(column, saleReport, columnIndex)
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}

SalesReportTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  filteredColumns: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
}

export default SalesReportTableBody
