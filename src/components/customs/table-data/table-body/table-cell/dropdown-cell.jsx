import PropTypes from "prop-types"
import React from "react"
import ActionDropdown from "@/components/customs/action-dropdown"
import { TableCell } from "@/components/ui/table"

export const DropdownCell = ({ items }) => {
  return (
    <TableCell>
      <ActionDropdown items={items} />
    </TableCell>
  )
}

DropdownCell.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default DropdownCell