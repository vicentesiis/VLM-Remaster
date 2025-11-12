import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib/utils"

/**
 * A small rounded avatar-like icon badge with customizable bg and icon color
 */
export const IconAvatar = ({
  icon: Icon,
  bgColor = "bg-primary",
  iconColor = "text-white",
  size = "md",
}) => {
  const sizeClasses = {
    sm: "h-6 w-6 text-sm",
    md: "h-10 w-10 text-base",
    lg: "h-12 w-12 text-lg",
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full",
        bgColor,
        sizeClasses[size]
      )}
    >
      <Icon className={cn("h-4 w-4", iconColor)} />
    </div>
  )
}

IconAvatar.propTypes = {
  icon: PropTypes.elementType,
  bgColor: PropTypes.string,
  iconColor: PropTypes.string,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
}

export default IconAvatar
