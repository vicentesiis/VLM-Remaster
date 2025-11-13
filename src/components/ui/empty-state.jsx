import PropTypes from "prop-types"
import React from "react"
import { cx } from "@/lib/utils"

export const EmptyState = ({ message, className }) => {
  return (
    <div className={cx("absolute inset-0 flex items-center justify-center bg-background/30", className)}>
      <div className="bg-background border rounded-lg px-6 py-4 shadow-lg">
        <p className="text-muted-foreground font-medium">{message}</p>
      </div>
    </div>
  )
}

EmptyState.propTypes = {
  message: PropTypes.string.isRequired,
  className: PropTypes.string,
}

export default EmptyState
