import React from "react"
import { TableCell } from "@/components/ui/table"
import { P } from "@/components/ui/typography"
import StatusBadge from "@/components/customs/badge/status-badge"

export const StatusBadgeCell = ({ title }) => {
  return (
    <TableCell>
      <StatusBadge status={title} />
    </TableCell>
  )
}
export default StatusBadgeCell
