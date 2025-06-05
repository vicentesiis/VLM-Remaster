import PropTypes from "prop-types"
import React from "react"
import ActionDropdown from "@/components/customs/action-dropdown"
import { TableCell } from "@/components/ui/table"

export const DropdownCell = ({ sections }) => {
  return (
    <TableCell>
      <ActionDropdown sections={sections} />
    </TableCell>
  )
}

DropdownCell.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default DropdownCell
