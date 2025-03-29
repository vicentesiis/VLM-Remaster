import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import tasksTableData from "@/data/tasks-table-data"
import TableHeaderComponent from "@/components/customs/table-data/table-header"
import ActionDropdown from "@/components/customs/action-dropdown"
import { P } from "@/components/ui/typography"
import MainCell from "@/components/customs/table-data/table-body/table-cell/main-cell"

export function TaskTableBody({ data }) {
  const columns = Object.keys(tasksTableData[0])
  return (
    <TableBody>
      {data.map((task) => (
        <TableRow key={task.id}>
          <MainCell path={"/clientes/"} title={task.name} id={task.id} />
          <TableCell>{task.type}</TableCell>
          <TableCell>
            <span
              className={`rounded-md px-2 py-1 text-xs ${
                task.status === "Contrato Generado"
                  ? "bg-green-200 text-green-700"
                  : "bg-yellow-200 text-yellow-700"
              }`}
            >
              {task.status}
            </span>
          </TableCell>
          <TableCell>{task.comments}</TableCell>
          <TableCell>{task.phone}</TableCell>
          <TableCell className="text-right">
            {/* Dropdown Actions Menu */}
            <ActionDropdown
              items={[
                {
                  title: "View Details",
                  onSelect: () => alert("View"),
                },
                {
                  title: "Edit",
                  onSelect: () => alert("Edit"),
                },
                {
                  title: "Delete",
                  onSelect: () => alert("Delete"),
                  danger: true,
                },
              ]}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TaskTableBody
