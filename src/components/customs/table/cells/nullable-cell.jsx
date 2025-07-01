import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib"

export const NullableCell = ({ value, className }) => (
  <div
    className={cn(
      "flex h-full w-full items-center justify-center text-sm text-muted-foreground",
      className
    )}
  >
    {value ? value : "-"}
  </div>
)

NullableCell.propTypes = {
  className: PropTypes.any,
  value: PropTypes.any,
}

export default NullableCell
