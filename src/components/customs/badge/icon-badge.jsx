import PropTypes from "prop-types"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { LabelStyle } from "@/components/ui/typography"

const IconBadge = ({ title, icon, variant, className = "" }) => {
  return (
    <Badge variant={variant} color="blue" className={`${className}`}>
      <div className="flex w-auto items-center space-x-2">
        {icon && <div className="inline-flex h-5 w-5 items-center">{icon}</div>}
        <LabelStyle>{title}</LabelStyle>
      </div>
    </Badge>
  )
}

IconBadge.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  variant: PropTypes.string,
  className: PropTypes.string,
}

export default IconBadge
