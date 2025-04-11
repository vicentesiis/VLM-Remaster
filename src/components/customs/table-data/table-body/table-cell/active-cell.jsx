import { CheckIcon, XIcon } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { IconAvatar } from "@/components/ui/icon-avatar"
import { TableCell } from "@/components/ui/table"

export const ActiveCell = ({ isActive }) => {
  return (
    <TableCell className={"mt-2 flex items-center justify-center"}>
      <IconAvatar
        icon={isActive ? CheckIcon : XIcon}
        bgColor={isActive ? "bg-green-500" : "bg-red-500"}
        size="sm"
      />
    </TableCell>
  )
}

ActiveCell.propTypes = {
  isActive: PropTypes.any,
}

export default ActiveCell
