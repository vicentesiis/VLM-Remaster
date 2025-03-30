import React from "react"
import DefaultCell from "./table-cell/default-cell"
import DropdownCell from "./table-cell/dropdown-cell"
import StatusBadgeCell from "./table-cell/status-badge-cell"
import MainCell from "@/components/customs/table-data/table-body/table-cell/main-cell"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"

export function TaskTableBody({ data, filteredColumns }) {
  const renderCell = (column, task, columnIndex) => {
    switch (column) {
      case "id":
        return (
          <MainCell
            key={`${task["id"]}-${column}-${columnIndex}`} // Add columnIndex to ensure uniqueness
            path={"/clientes"}
            title={task["name"] || "N/A"} // Safely access task.name and provide fallback
            id={task["id"].toUpperCase()}
          />
        )
      case "actions":
        return (
          <DropdownCell
            key={`${task["id"]}-${column}-${columnIndex}`} // Add columnIndex to ensure uniqueness
            items={[
              { title: "View Details", onSelect: () => alert("View") },
              { title: "Edit", onSelect: () => alert("Edit") },
              {
                title: "Delete",
                onSelect: () => alert("Delete"),
                danger: true,
              },
            ]}
          />
        )
      case "status":
        return (
          <StatusBadgeCell
            key={`${task["id"]}-${column}-${columnIndex}`}
            title={task["status"] || "N/A"}
          />
        )

      case "type":
        return (
          <DefaultCell
            key={`${task["id"]}-${column}-${columnIndex}`} // Add columnIndex to ensure uniqueness
            title={task[column] || "N/A"} // Fallback if value is undefined
            align={"center"}
          />
        )
      default:
        // Default rendering for other columns
        return (
          <DefaultCell
            key={`${task["id"]}-${column}-${columnIndex}`} // Add columnIndex to ensure uniqueness
            title={task[column] || "N/A"} // Fallback if value is undefined
          />
        )
    }
  }

  return (
    <TableBody>
      {data.map((task) => (
        <TableRow key={task.id}>
          {filteredColumns.map((column, columnIndex) =>
            renderCell(column, task, columnIndex)
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TaskTableBody
