import PropTypes from "prop-types"
import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  RECORD_STATUSES_LABEL,
  STATUS_TO_VARIANT_MAP,
} from "@/constants/appConstants"

const StatusBadge = ({ status }) => {
  const label = RECORD_STATUSES_LABEL[status] || status
  const variant = STATUS_TO_VARIANT_MAP[status] || "outline"

  return <Badge variant={variant}>{label}</Badge>
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
}

export default StatusBadge
