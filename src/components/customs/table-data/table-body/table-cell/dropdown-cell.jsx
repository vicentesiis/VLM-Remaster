import React from "react"
import ActionDropdown from "@/components/customs/action-dropdown"
import { TableCell } from "@/components/ui/table"

export const DropdownCell = ({ items }) => {
  return (
    <TableCell >
      <ActionDropdown items={items} />
    </TableCell>
  )
}

export default DropdownCell
