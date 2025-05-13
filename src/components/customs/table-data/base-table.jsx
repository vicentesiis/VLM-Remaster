import PropTypes from "prop-types"
import React from "react"
import { tableBodyRegister } from "./table-body/tableBodyRegistry"
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import { ScrollArea } from "@/components/ui"
import { Table } from "@/components/ui/table"
import useFilteredColumns from "@/hooks/useFilteredColumns"

export function BaseTable({ data, tableType, onRowClick }) {
  if (!tableType) return <div>Tipo de tabla no especificado</div>
  if (!data?.length) return <div>No hay datos disponibles</div>

  const filteredColumns = useFilteredColumns(tableType)

  const TableBodyComponent = tableBodyRegister[tableType]
  if (!TableBodyComponent) {
    return <div>No se encontró la tabla: {tableType}</div>
  }

  return (
    <ScrollArea className="rounded-md border">
      <Table>
        <TableHeaderComponent columns={filteredColumns} type={tableType} />
        <TableBodyComponent
          data={data}
          filteredColumns={filteredColumns}
          onRowClick={onRowClick}
        />
      </Table>
    </ScrollArea>
  )
}

BaseTable.propTypes = {
  data: PropTypes.array.isRequired,
  tableType: PropTypes.oneOf([
    "Registros",
    "ReportesVentasPorAgente",
    "ReportesVentasPorAgenteDetalle",
    "AjustesUsuarios",
  ]).isRequired,
  onRowClick: PropTypes.func,
}

export default BaseTable
