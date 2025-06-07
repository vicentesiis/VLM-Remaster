import PropTypes from "prop-types"
import React from "react"
import StatusBadge from "@/components/customs/badge/status-badge"

export const StatusBadgeCell = ({ title }) => {
  return <StatusBadge status={title} />
}

StatusBadgeCell.propTypes = {
  title: PropTypes.string.isRequired,
}

export default StatusBadgeCell
