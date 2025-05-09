import PropTypes from "prop-types"
import React, { useMemo } from "react"
import { tableBodyRegister } from "./table-body/tableBodyRegistry"
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import { ScrollArea } from "@/components/ui"
import { Table } from "@/components/ui/table"
import useFilteredColumns from "@/hooks/useFilteredColumns"

export function BaseTable({ data, tableType, onRowClick }) {
  if (!tableType) return <div>Tipo de tabla no especificado</div>
  if (!data?.length) return <div>No hay datos disponibles</div>

  const allColumns = useMemo(() => Object.keys(data[0] || {}), [data])
  const filteredColumns = useFilteredColumns(tableType, allColumns)

  const TableBodyComponent = tableBodyRegister[tableType]
  if (!TableBodyComponent) {
    return <div>No se encontró la tabla: {tableType}</div>
  }

  return (
    <ScrollArea className="rounded-md border sm:h-[calc(100vh-250px)] sm:rounded-none sm:rounded-t-lg sm:border-none">
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

export const TABLE_TYPES = [
  "Registros",
  "ReportesVentasPorAgente",
  "ReportesVentasPorAgenteDetalle",
  "AjustesUsuarios",
]

BaseTable.propTypes = {
  data: PropTypes.array.isRequired,
  tableType: PropTypes.oneOf(TABLE_TYPES).isRequired,
  onRowClick: PropTypes.func,
}

export default BaseTable
