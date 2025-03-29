import React from "react"
import { TableCell } from "@/components/ui/table"
import ActionDropdown from "@/components/customs/action-dropdown"

export const DropdownCell = ({ items }) => {
  return (
    <TableCell >
      <ActionDropdown items={items} />
    </TableCell>
  )
}

export default DropdownCell
