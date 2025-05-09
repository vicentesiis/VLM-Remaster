import PropTypes from "prop-types"
import React, { useState } from "react"
import DefaultCell from "@/components/customs/table-data/table-body/table-cell/default-cell"
import StatusBadgeCell from "@/components/customs/table-data/table-body/table-cell/status-badge-cell"
import { TableBody, TableRow } from "@/components/ui/table"

export function ReportesVentasPorAgenteTableBody({
  data,
  filteredColumns,
  onRowClick,
}) {
  const [selectedRow, setSelectedRow] = useState(null)

  const handleRowSelect = (daySaleReport) => {
    setSelectedRow(daySaleReport.id)
    onRowClick(daySaleReport)
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

ReportesVentasPorAgenteTableBody.propTypes = {
  data: PropTypes.shape({
    map: PropTypes.func
  }),
  filteredColumns: PropTypes.shape({
    map: PropTypes.func
  }),
  onRowClick: PropTypes.func
}


export default ReportesVentasPorAgenteTableBody
