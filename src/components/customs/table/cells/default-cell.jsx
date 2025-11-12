import PropTypes from "prop-types"
import React from "react"
import { TableCell } from "@/components/ui/table"

export const DefaultCell = ({ title, align }) => {
  return (
    <TableCell className={`text-${align}`}>
      <span>{title}</span>
    </TableCell>
  )
}

DefaultCell.propTypes = {
  title: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
}

export default DefaultCell