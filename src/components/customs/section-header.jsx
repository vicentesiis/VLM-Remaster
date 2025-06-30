import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib/utils"
import { Separator } from "../ui"

const SectionHeader = ({
  title,
  extra,
  subtitle,
  actions,
  className,
  titleColor = "text-foreground",
  extraColor = "text-muted-foreground",
  subtitleColor = "text-muted-foreground",
}) => {
  return (
    <div className={cn(className)}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {title && (
            <h1 className={cn("text-xl font-semibold", titleColor)}>{title}</h1>
          )}
          {extra && (
            <span className={cn("text-xl font-semibold", extraColor)}>
              {extra}
            </span>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap gap-2 sm:gap-4">{actions}</div>
        )}
      </div>

      {subtitle && (
        <p className={cn("text-sm sm:text-base", subtitleColor)}>{subtitle}</p>
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  title: PropTypes.node,
  extra: PropTypes.node,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
  className: PropTypes.string,
  titleColor: PropTypes.string,
  extraColor: PropTypes.string,
  subtitleColor: PropTypes.string,
}

export default SectionHeader
