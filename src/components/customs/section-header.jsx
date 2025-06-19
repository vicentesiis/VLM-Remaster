import PropTypes from "prop-types"
import React from "react"
import { H3, P } from "@/components/ui/typography"

const SectionHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="mb-6 -space-y-2">
      <div className="flex justify-between">
        {title && <H3>{title}</H3>}
        {actions && (
          <div className="flex flex-wrap gap-2 sm:gap-4">{actions}</div>
        )}
      </div>

      {subtitle && (
        <P className="text-sm text-muted-foreground sm:text-base">{subtitle}</P>
      )}
    </div>
  )
}

SectionHeader.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  actions: PropTypes.node,
}

export default SectionHeader
