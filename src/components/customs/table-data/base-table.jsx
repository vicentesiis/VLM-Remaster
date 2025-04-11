import PropTypes from "prop-types"
import React from "react"
import { tableBodyRegister } from "./table-body/tableBodyRegistry" // import the map
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import { ScrollArea } from "@/components/ui"
import { Table } from "@/components/ui/table"
import useFilteredColumns from "@/hooks/useFilteredColumns"

export function BaseTable({ data, tableType, onRowClick }) {
  if (!data || data.length === 0 || !tableType) {
    return <div>No hay Datos</div>
  }

  const allColumns = Object.keys(data[0])
  const filteredColumns = useFilteredColumns(tableType, allColumns)

  const TableBodyComponent = tableBodyRegister[tableType]

  if (!TableBodyComponent) {
    return <div>No se encontro la Tabla: {tableType}</div>
  }

  return (
    <ScrollArea className="h-[600px] overflow-y-visible sm:h-[540px] 2xl:h-[700px]">
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
    "tasks",
    "salesAgentReport",
    "salesReportDetailTableBody",
    "userSettingsTableBody",
  ]).isRequired,
  onRowClick: PropTypes.func,
}

export default BaseTable
