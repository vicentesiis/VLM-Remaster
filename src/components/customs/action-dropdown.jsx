import { MoreHorizontalIcon } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

const ActionDropdown = ({ sections = [] }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-start mx-auto">
          <MoreHorizontalIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            {section.title && (
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                {section.title}
              </DropdownMenuLabel>
            )}
            {section.options.map((item, index) => (
              <DropdownMenuItem
                key={index}
                onClick={item.onSelect}
                className={item.danger ? "text-red-600" : ""}
              >
                {item.title}
              </DropdownMenuItem>
            ))}
            {sectionIndex < sections.length - 1 && <DropdownMenuSeparator />}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

ActionDropdown.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      options: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          onSelect: PropTypes.func.isRequired,
          danger: PropTypes.bool,
        })
      ).isRequired,
    })
  ).isRequired,
}

export default ActionDropdown
