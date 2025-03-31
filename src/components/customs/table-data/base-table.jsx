import PropTypes from "prop-types"
import React from "react"
import TaskTableBody from "@/components/customs/table-data/table-body/task-table-body"
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import { Table } from "@/components/ui/table"
import useFilteredColumns from "@/hooks/useFilteredColumns"

export function BaseTable({ data, tableType }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>
  }

  const allColumns = Object.keys(data[0])

  const filteredColumns = useFilteredColumns(tableType, allColumns)

  return (
    <div className="max-h-[calc(100vh_-_300px)] overflow-auto">
      <Table>
        <TableHeaderComponent columns={filteredColumns} />
        <TaskTableBody data={data} filteredColumns={filteredColumns} />
      </Table>
    </div>
  )
}

BaseTable.propTypes = {
  data: PropTypes.array.isRequired,
  tableType: PropTypes.string.isRequired,
}

export default BaseTable
