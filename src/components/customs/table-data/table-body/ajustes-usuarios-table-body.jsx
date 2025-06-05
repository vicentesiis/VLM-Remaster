import PropTypes from "prop-types"
import React from "react"
import { ActiveCell } from "../../table/cells"
import { ButtonCell } from "../../table/cells"
import { DefaultCell } from "../../table/cells"
import { UserTypeBadgeCell } from "../../table/cells"
import { TableBody, TableRow } from "@/components/ui/table"

export function AjustesUsuariosTableBody({ data, filteredColumns }) {
  const RenderCell = (column, user, columnIndex) => {
    switch (column) {
      case "username":
        return (
          <DefaultCell
            key={`${user[column]}-${column}-${columnIndex}`}
            title={user[column] || "N/A"}
          />
        )
      case "role":
        return (
          <UserTypeBadgeCell
            key={`${user[column]}-${column}-${columnIndex}`}
            title={user[column] || "N/A"}
          />
        )
      case "type":
        return (
          <UserTypeBadgeCell
            key={`${user[column]}-${column}-${columnIndex}`}
            title={user[column] || "N/A"}
          />
        )
      case "active":
        return (
          <ActiveCell
            key={`${user[column]}-${column}-${columnIndex}`}
            isActive={user[column] || false}
          />
        )
      case "actions":
        return <ButtonCell title={"Editar"} />
      default:
        return (
          <DefaultCell
            key={`${user[column]}-${column}-${columnIndex}`}
            title={user[column] || "N/A"}
          />
        )
    }
  }

  return (
    <TableBody>
      {data.map((user) => (
        <TableRow key={user.date}>
          {filteredColumns.map((column, columnIndex) =>
            RenderCell(column, user, columnIndex)
          )}
        </TableRow>
      ))}
    </TableBody>
  )
}

AjustesUsuariosTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  filteredColumns: PropTypes.array.isRequired,
}

export default AjustesUsuariosTableBody
