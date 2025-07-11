import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib/utils"

const SectionHeader = ({ title, extra, subtitle, actions, className }) => {
  return (
    <div className={cn("py-2 md:py-0 md:pb-4", className)}>
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
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
          <div className="flex flex-col gap-2 lg:gap-4">{actions}</div>
        )}
      </div>

      {subtitle && (
        <p className="text-sm text-muted-foreground md:text-base">{subtitle}</p>
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
