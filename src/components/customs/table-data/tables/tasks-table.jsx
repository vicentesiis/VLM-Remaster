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
import { Card } from "@/components/ui/card"
import { MoreHorizontal } from "lucide-react"
import { Link } from "react-router-dom"
import tasksTableData from "@/data/tasks-table-data"
import TableHeaderComponent from "@/components/customs/table-data/table-header"

export function TasksTable() {
  const columns = Object.keys(tasksTableData[0])
  return (
    <Table>
      {/* Table Header */}
      <TableHeaderComponent columns={columns} />

      {/* Table Body */}
      <TableBody>
        {tasksTableData.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Link
                to={`/clientes/${task.id}`}
                className="text-blue-600 hover:underline"
              >
                {task.id}
              </Link>
            </TableCell>
            <TableCell>{task.name}</TableCell>
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onClick={() => alert(`Viewing details for ${task.name}`)}
                  >
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => alert(`Editing ${task.name}`)}
                  >
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => alert(`Deleting ${task.name}`)}
                    className="text-red-600"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default TasksTable
