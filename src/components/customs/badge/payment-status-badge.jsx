import PropTypes from "prop-types"
import React from "react"
import { Badge } from "@/components/ui/badge"
import {
  PAYMENT_STATUSES_LABEL,
  PAYMENT_STATUS_TO_VARIANT_MAP,
} from "@/constants/appConstants"

const PaymentStatusBadge = ({ status }) => {
  const label = PAYMENT_STATUSES_LABEL[status] || status
  const variant = PAYMENT_STATUS_TO_VARIANT_MAP[status] || "outline"

  return <Badge variant={variant}>{label}</Badge>
}

PaymentStatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
}

export default PaymentStatusBadge
