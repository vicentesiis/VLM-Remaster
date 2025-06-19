import PropTypes from "prop-types"
import React from "react"
import { H3 } from "@/components/ui/typography"
import { cn } from "@/lib/utils" // If you use Tailwind’s `clsx`-style utility

const SectionHeader = ({ title, extra, subtitle, actions, className }) => {
  return (
    <div className={cn(className)}>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          {title && <H3>{title}</H3>}
          {extra && (
            <span className="text-lg text-muted-foreground">{extra}</span>
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
