import React from "react"
import { TableCell } from "@/components/ui/table"
import ActionDropdown from "@/components/customs/action-dropdown"

export const DropdownCell = ({ items }) => {
  return (
    <TableCell className="">
      <ActionDropdown items={items} />
    </TableCell>
  )
}

export default DropdownCell
