import PropTypes from "prop-types"
import React from "react"
import DefaultCell from "@/components/customs/table-data/table-body/table-cell/default-cell"
import DropdownCell from "@/components/customs/table-data/table-body/table-cell/dropdown-cell"
import MainCell from "@/components/customs/table-data/table-body/table-cell/main-cell"
import StatusBadgeCell from "@/components/customs/table-data/table-body/table-cell/status-badge-cell"
import { TableBody, TableRow } from "@/components/ui/table"

export function TaskTableBody({ data, filteredColumns }) {
  const renderCell = (column, task, columnIndex) => {
    switch (column) {
      case "id":
        return (
          <MainCell
            key={`${task["id"]}-${column}-${columnIndex}`}
            path={"/clientes"}
            title={task["name"] || "N/A"}
            id={task["id"].toUpperCase()}
          />
        )
      case "actions":
        return (
          <DropdownCell
            key={`${task["id"]}-${column}-${columnIndex}`}
            sections={[
              {
                title: "Cliente",
                options: [
                  {
                    title: "Detalle del Cliente",
                    onSelect: () => alert("Detalle del Cliente"),
                  },
                  {
                    title: "Ordenes del Cliente",
                    onSelect: () => alert("Ordenes del Cliente"),
                  },
                ],
              },
              {
                title: "Extras",
                options: [
                  {
                    title: "Generar Contrato",
                    onSelect: () => alert("Generar Contrato"),
                  },
                ],
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
            key={`${task["id"]}-${column}-${columnIndex}`}
            title={task[column] || "N/A"}
            align={"center"}
          />
        )
      default:
        return (
          <DefaultCell
            key={`${task["id"]}-${column}-${columnIndex}`}
            title={task[column] || "N/A"}
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

TaskTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  filteredColumns: PropTypes.array.isRequired,
}

export default TaskTableBody
