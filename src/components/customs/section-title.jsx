import PropTypes from "prop-types"
import React from "react"

export const SectionTitle = ({ title }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-px w-6 bg-border"></div>
      <h3 className="font-bold text-muted-foreground uppercase tracking-wide">
        {title}
      </h3>
      <div className="h-px flex-1 bg-border"></div>
    </div>
  )
}

SectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
}

export default SectionTitle
