import React from "react"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import MainCell from "@/components/customs/table-data/table-body/table-cell/main-cell"
import DropdownCell from "./table-cell/dropdown-cell"
import DefaultCell from "./table-cell/default-cell"
import StatusBadgeCell from "./table-cell/status-badge-cell"

export function TaskTableBody({ data }) {
  const columns = Object.keys(data[0]) // Dynamically get the column names from data

  const renderCell = (column, task) => {
    const align = task[column].align
    switch (column) {
      case "id":
        return (
          <MainCell
            key={`${task["id"].title}-${column}`}
            // key={column}
            path={"/clientes/"}
            title={task["name"].title} // Safely access task.name
            id={task["id"].title}
            align={align} // Pass alignment to the cell component
          />
        )
      case "actions":
        return (
          <DropdownCell
            key={`${task["id"].title}-${column}`}
            align={align} // Pass alignment to the cell component
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
        return <StatusBadgeCell title={task["status"].title} align={align}  />
      default:
        // Default rendering for other columns
        // Check if task[column] exists and has a title
        return (
          <DefaultCell
            key={`${task["id"].title}-${column}`}
            title={task[column]?.title || task[column] || "N/A"} // Fallback if title is undefined
            align={align}
          />
        )
    }
  }

  return (
    <TableBody>
      {data.map((task) => (
        <TableRow key={task.id.title}>
          {columns.map((column) => renderCell(column, task))}
        </TableRow>
      ))}
    </TableBody>
  )
}

export default TaskTableBody
