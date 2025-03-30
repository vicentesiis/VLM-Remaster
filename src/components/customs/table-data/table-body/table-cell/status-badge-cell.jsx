import React from "react"
import StatusBadge from "@/components/customs/badge/status-badge"
import { TableCell } from "@/components/ui/table"
import { P } from "@/components/ui/typography"

export const StatusBadgeCell = ({ title }) => {
  return (
    <TableCell>
      <StatusBadge status={title} />
    </TableCell>
  )
}
export default StatusBadgeCell
