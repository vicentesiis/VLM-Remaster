import PropTypes from "prop-types"
import React from "react"
import DefaultCell from "@/components/customs/table-data/table-body/table-cell/default-cell"
import UserTypeBadgeCell from "@/components/customs/table-data/table-body/table-cell/user-type-badge-cell"
import { TableBody, TableCell, TableRow } from "@/components/ui/table"
import ActiveCell from "./table-cell/active-cell"
import { DropdownCell } from "./table-cell"
import ButtonCell from "./table-cell/button-cell"

export function UserSettingsTableBody({ data, filteredColumns }) {
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
        return (
          <ButtonCell title={"Editar"} />
        )
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

UserSettingsTableBody.propTypes = {
  data: PropTypes.array.isRequired,
  filteredColumns: PropTypes.array.isRequired,
}

export default UserSettingsTableBody
