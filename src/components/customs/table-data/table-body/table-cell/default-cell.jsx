import React from "react"
import { TableCell } from "@/components/ui/table"
import { P } from "@/components/ui/typography"

export const DefaultCell = ({ title }) => {
  return (
    <TableCell>
      <P>{title}</P>
    </TableCell>
  )
}

export default DefaultCell
