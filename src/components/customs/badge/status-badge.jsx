import PropTypes from "prop-types"
import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  recordStatusesLabel,
  statusToVariantMap,
} from "@/constants/appConstants"

const StatusBadge = ({ status }) => {
  const label = recordStatusesLabel[status] || status
  const variant = statusToVariantMap[status] || "outline"

  return <Badge variant={variant}>{label}</Badge>
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
}

export default StatusBadge
