import { EllipsisVertical } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

export const DownloadDropdown = ({ items }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        {items.map((item, index) => (
          <div key={index}>
            <DropdownMenuLabel>{item.label}</DropdownMenuLabel>
            {item.childs.map((childItem, childIndex) => (
              <DropdownMenuItem
                key={childIndex}
                onClick={childItem.onClick}
                disabled={childItem.disabled}
              >
                {childItem.label}
              </DropdownMenuItem>
            ))}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

DownloadDropdown.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      childs: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          onClick: PropTypes.func.isRequired,
          disabled: PropTypes.bool,
        })
      ).isRequired,
    })
  ).isRequired,
}

export default DownloadDropdown
