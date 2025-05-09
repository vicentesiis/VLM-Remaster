// @/components/customs/table-data/table-body/reportes/reportes-ventas-por-agente-detail-table-body.js
import PropTypes from "prop-types"
import React, { useState } from "react"
import { ventasPorAgenteDetailRender } from "@/components/customs/table-data/renders/ventas-por-agente-detail-render"
import GenericTableBody from "@/components/customs/table-data/table-body/generic-table-body"

function ReportesVentasPorAgenteDetailTableBody({ data, filteredColumns, onRowClick }) {
  const [selectedRow, setSelectedRow] = useState(null)

  return (
    <GenericTableBody
      data={data}
      columns={filteredColumns}
      renderers={ventasPorAgenteDetailRender}
      getRowKey={(item) => item.date}
      renderRow={(row, isSelected) => ({
        className: isSelected ? "bg-gray-200" : "",
        onClick: () => {
          setSelectedRow(row.date)
          onRowClick(row)
        },
      })}
      selectedRowKey={selectedRow}
    />
  )
}

ReportesVentasPorAgenteDetailTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  filteredColumns: PropTypes.array.isRequired,
  onRowClick: PropTypes.func.isRequired,
}

export default ReportesVentasPorAgenteDetailTableBody