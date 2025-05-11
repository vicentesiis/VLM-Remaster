import PropTypes from "prop-types"
import React from "react"
import { TableCell } from "@/components/ui/table"
import { ListStyle } from "@/components/ui/typography"

const formatDate = (isoString) => {
  const date = new Date(isoString)
  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

export const DateCell = ({ value }) => {
  return (
    <TableCell className="text-center">
      <ListStyle>{formatDate(value)}</ListStyle>
    </TableCell>
  )
}

DateCell.propTypes = {
  value: PropTypes.string.isRequired,
}

export default DateCell
