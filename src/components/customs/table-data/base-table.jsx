import React from "react"
import { Table } from "@/components/ui/table"
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import TaskTableBody from "@/components/customs/table-data/table-body/task-table-body"

export function BaseTable({ data }) {
  if (!data || data.length === 0) {
    return <div>No data available</div> // Handle empty or null data
  }

  const columns = Object.keys(data[0]) // Get keys from the first task object

  return (
    <Table>
      <TableHeaderComponent columns={columns} />
      <TaskTableBody data={data} />
    </Table>
  )
}

export default BaseTable
