import PropTypes from "prop-types"
import React from "react"

import StatusBadge from "@/components/customs/badge/status-badge"
import { SectionTitle } from "@/components/customs/section-title"
import { Badge } from "@/components/ui/badge"
import { getRecordTypeConfig } from "@/constants"
import { useHoverEffects } from "@/hooks/use-hover-effects"
import { toTitleCase } from "@/utils/utils"

export const InfoSection = ({ title, items, getStatusVariant }) => {
  return (
    <div className="space-y-5">
      <SectionTitle title={title} />

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
        {items.map((item) => (
          <InfoItem
            key={item.label}
            item={item}
            getStatusVariant={getStatusVariant}
          />
        ))}
      </div>
    </div>
  )
}

const InfoItem = ({ item, getStatusVariant }) => {
  const ItemIcon = item.icon
  const hoverEffects = useHoverEffects('subtle', true, true)

  // Check if this is a status badge
  const isStatusBadge = item.isBadge && item.label.toLowerCase().includes('estatus')

  // Check if this is a record type badge
  const isRecordTypeBadge = item.isBadge && item.label.toLowerCase().includes('tipo de registro')

  // Get record type config if needed
  const recordTypeConfig = isRecordTypeBadge ? getRecordTypeConfig(item.value) : null
  const RecordTypeIcon = recordTypeConfig?.icon

  return (
    <div
      className={`
        flex items-center gap-4 rounded-lg border border-border bg-background/40 p-2
        ${hoverEffects.container}
        ${item.fullWidth ? "md:col-span-2 xl:col-span-2" : ""}
      `}
    >
      {/* Icon */}
      <div className="flex pl-2 flex-shrink-0 items-center justify-center rounded-md">
        <ItemIcon
          className={`
            size-6 text-muted-foreground transition-colors group-hover:text-foreground
            ${hoverEffects.icon}
          `}
        />
      </div>

      {/* Text */}
      <div className="relative z-10 flex min-w-0 flex-1 flex-col justify-center gap-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/90">
          {item.label}
        </p>

        {isStatusBadge ? (
          <StatusBadge status={item.value} />
        ) : isRecordTypeBadge && RecordTypeIcon ? (
          <Badge
            variant={recordTypeConfig.variant}
            className="w-fit"
          >
            <RecordTypeIcon className="h-4 w-4 mr-1" />
            {toTitleCase(item.value) || "-"}
          </Badge>
        ) : item.isBadge ? (
          <Badge
            variant={getStatusVariant?.(item.value)}
            className="w-fit px-2.5 py-0.5 text-xs"
          >
            {toTitleCase(item.value) || "-"}
          </Badge>
        ) : (
          <span className="break-words text-[0.95rem] font-medium leading-relaxed text-foreground">
            {item.value || "-"}
          </span>
        )}
      </div>
    </div>
  )
}

InfoSection.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any,
      icon: PropTypes.elementType.isRequired,
      isBadge: PropTypes.bool,
      fullWidth: PropTypes.bool,
    })
  ).isRequired,
  getStatusVariant: PropTypes.func,
}

InfoItem.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.any,
    icon: PropTypes.elementType.isRequired,
    isBadge: PropTypes.bool,
    fullWidth: PropTypes.bool,
  }).isRequired,
  getStatusVariant: PropTypes.func,
}

export default InfoSection
