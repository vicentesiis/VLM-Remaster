import PropTypes from "prop-types"
import React from "react"
import { Button } from "@/components/ui/button"
import { TableCell } from "@/components/ui/table"

export const ButtonCell = ({ title, onClick }) => {
  return (
    <TableCell className="text-center">
      <Button variant="outline" onClick={onClick}>
        {title}
      </Button>
    </TableCell>
  )
}

ButtonCell.propTypes = {
  onClick: PropTypes.any,
  title: PropTypes.any,
}

export default ButtonCell
