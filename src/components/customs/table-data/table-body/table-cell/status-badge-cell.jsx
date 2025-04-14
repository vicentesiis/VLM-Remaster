import PropTypes from "prop-types"
import React from "react"
import StatusBadge from "@/components/customs/badge/status-badge"
import { TableCell } from "@/components/ui/table"

export const StatusBadgeCell = ({ title, align }) => {
  return (
    <TableCell className={`text-${align}`}>
      <StatusBadge status={title} />
    </TableCell>
  )
}

StatusBadgeCell.propTypes = {
  title: PropTypes.string.isRequired,
}

export default StatusBadgeCell
