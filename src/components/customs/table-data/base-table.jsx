import React from "react"
import { Table } from "@/components/ui/table"
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import TaskTableBody from "@/components/customs/table-data/table-body/task-table-body"

export function BaseTable({ data }) {
  const columns = Object.keys(data[0])
  return (
    <Table>
      <TableHeaderComponent columns={columns} />
      <TaskTableBody data={data} />
    </Table>
  )
}

export default BaseTable
