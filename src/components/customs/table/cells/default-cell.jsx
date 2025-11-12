import PropTypes from "prop-types"
import React from "react"
import { TableCell } from "@/components/ui/table"
import { ListStyle } from "@/components/ui/typography"

export const DefaultCell = ({ title, align }) => {
  return (
    <TableCell className={`text-${align}`}>
      <ListStyle>{title}</ListStyle>
    </TableCell>
  )
}

DefaultCell.propTypes = {
  title: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
}

export default DefaultCell