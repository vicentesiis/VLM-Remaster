import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib/utils"

const SectionHeader = ({ title, extra, subtitle, actions, className, emptyMessage, highlightPositive }) => {
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
              <span className={cn(
                "text-lg font-medium md:text-2xl",
                highlightPositive ? "text-green-600 dark:text-green-500 font-semibold" : "text-muted-foreground/80"
              )}>
                {extra}
              </span>
            )}
          </div>

          {subtitle && (
            <p className="text-sm text-muted-foreground md:text-lg max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}

          {emptyMessage && (
            <p className="text-muted-foreground/80 italic">
              {emptyMessage}
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
  emptyMessage: PropTypes.string,
  highlightPositive: PropTypes.bool,
}

export default SectionHeader
