import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib/utils"

const SectionHeader = ({ title, extra, subtitle, actions, className }) => {
  return (
    <div className={cn("py-4 md:py-0 md:pb-4", className)}>
      <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between md:gap-4">
        <div className="flex-1 space-y-1.5">
          <div className="flex flex-wrap items-baseline gap-2.5">
            {title && (
              <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                {title}
              </h1>
            )}
            {extra && (
              <span className="text-lg font-medium text-muted-foreground/80 md:text-2xl">
                {extra}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="text-sm text-muted-foreground md:text-lg max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2 md:flex-nowrap md:gap-3">
            {actions}
          </div>
        )}
      </div>
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
