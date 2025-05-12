import PropTypes from "prop-types"
import React from "react"
import { Badge } from "@/components/ui/badge"
import { LabelStyle } from "@/components/ui/typography"
import { translateStatus, getStatusColor } from "@/config/statusConfig"

const StatusBadge = ({ status }) => {
  const label = translateStatus(status)
  const { bgColor, textColor, borderColor } = getStatusColor(status)

  return (
    <Badge
      className={`inline-flex items-center rounded-full p-1.5 ${bgColor} ${textColor} ${borderColor} shadow-none hover:${bgColor} dark:${bgColor}`}
    >
      <LabelStyle className="text-center font-extrabold sm:text-start">
        {label}
      </LabelStyle>
    </Badge>
  )
}

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
}

export default StatusBadge
