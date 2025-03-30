import React from "react"
import { LabelStyle } from "../../ui/typography"
import { Badge } from "@/components/ui/badge"

const IconBadge = ({ title, icon, variant, className = "" }) => {
  return (
    <Badge variant={variant} color="blue" className={`${className}`}>
      <div className="flex w-auto items-center space-x-2">
        {icon && <div>{icon}</div>}
        <LabelStyle>{title}</LabelStyle>
      </div>
    </Badge>
  )
}

export default IconBadge
