import React from "react"
import { Table } from "@/components/ui/table"
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import TaskTableBody from "@/components/customs/table-data/table-body/task-table-body"

export function BaseTable({ data, excludedColumns = [] }) {
  if (!data || data.length === 0) {
    return <div>No data available</div> // Handle empty or null data
  }

  // Dynamically extract columns from the first item in the data array
  const allColumns = Object.keys(data[0])

  function filterColumns() {
    return allColumns.filter((column) => !excludedColumns.includes(column))
  }

  // TODO: - exclude elements by array
  const columns = Object.keys(filterColumns(allColumns))

  return (
    <Table>
      <TableHeaderComponent columns={allColumns} />{" "}
      {/* Pass columns dynamically */}
      <TaskTableBody data={data} />{" "}
      {/* Pass data to the body component */}
    </Table>
  )
}

export default BaseTable
