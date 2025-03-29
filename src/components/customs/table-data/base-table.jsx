import React from "react"
import { Table } from "@/components/ui/table"
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import TaskTableBody from "@/components/customs/table-data/table-body/task-table-body"

export function BaseTable({ data }) {
  return (
    <Table>
      {/* TODO: - Handle when is null */}
      <TableHeaderComponent data={data[0]} />
      <TaskTableBody data={data} />
    </Table>
  )
}

export default BaseTable
