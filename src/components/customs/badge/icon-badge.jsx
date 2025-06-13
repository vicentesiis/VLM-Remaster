import PropTypes from "prop-types"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const IconBadge = ({ title, icon: Icon, variant = "outline", className }) => {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      <Badge variant={variant} className="rounded-full pl-[3px] text-[13px]">
        <Icon className="mr-1 size-4" />
        {title}
      </Badge>
    </div>
  )
}

IconBadge.propTypes = {
  className: PropTypes.any,
  icon: PropTypes.any,
  title: PropTypes.any,
  variant: PropTypes.string
}

export default IconBadge
