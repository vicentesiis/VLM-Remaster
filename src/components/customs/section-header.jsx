import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib/utils"

const SectionHeader = ({ title, extra, subtitle, actions, className }) => {
  return (
    <div className={cn("pb-6", className)}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          {title && (
            <h1 className="text-xl font-semibold text-foreground">{title}</h1>
          )}
          {extra && (
            <span className="text-xl font-normal text-secondary-foreground">
              {extra}
            </span>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap gap-2 sm:gap-4">{actions}</div>
        )}
      </div>

      {subtitle && (
        <p className="text-sm text-muted-foreground sm:text-base">{subtitle}</p>
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
}

export default SectionHeader
