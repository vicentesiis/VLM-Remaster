import PropTypes from "prop-types"
import React from "react"
import { Badge } from "@/components/ui"
import { TableCell } from "@/components/ui"
import { P } from "@/components/ui"

const getRoleColorClass = (role) => {
  switch (role.toUpperCase()) {
    case "SISTEMA":
      return "bg-gray-300 text-gray-800"
    case "ADMIN":
      return "bg-primary text-white"
    case "AGENTE":
      return "bg-primary-hover text-white"
    case "NO APLICA":
      return "bg-gray-200 text-gray-800"
    default:
      return "bg-green-600 text-white"
  }
}

export const UserTypeBadgeCell = ({ title }) => {
  const badgeClass = `rounded-full border-none ${getRoleColorClass(title)}`
  return (
    <TableCell className="text-center">
      <Badge className={badgeClass}>
        <P className="text-[12px] font-semibold">{title}</P>
      </Badge>
    </TableCell>
  )
}

UserTypeBadgeCell.propTypes = {
  title: PropTypes.string,
}

export default UserTypeBadgeCell
