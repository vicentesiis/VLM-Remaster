import React from "react"
import TaskTableBody from "@/components/customs/table-data/table-body/task-table-body"
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import { Table } from "@/components/ui/table"
import useFilteredColumns from "@/hooks/useFilteredColumns" // Import the hook

export function BaseTable({ data, tableType }) {
  if (!data || data.length === 0) {
    return <div>No data available</div> // Handle empty or null data
  }

  const allColumns = Object.keys(data[0]) // Get the keys from the first item in data

  // Get filtered columns based on table type and screen size
  const filteredColumns = useFilteredColumns(tableType, allColumns)

  return (
    <Table>
      <TableHeaderComponent columns={filteredColumns} />
      <TaskTableBody data={data} filteredColumns={filteredColumns} />
    </Table>
  )
}

export default BaseTable
