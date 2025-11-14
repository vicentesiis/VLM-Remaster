import PropTypes from "prop-types"
import React from "react"

import { Badge } from "@/components/ui/badge"
import { toTitleCase } from "@/utils/utils"

export const InfoSection = ({ title, items, getStatusVariant }) => {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <div className="h-px w-6 bg-border"></div>
        <h3 className="font-bold text-muted-foreground uppercase tracking-wide">
          {title}
        </h3>
        <div className="h-px flex-1 bg-border"></div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
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

  return (
    <div
      className={`
        group flex gap-4 rounded-lg border border-border bg-background/40 p-4
        transition-colors hover:border-primary/40 hover:bg-accent/50
        ${item.fullWidth ? "md:col-span-2 xl:col-span-3" : ""}
      `}
    >
      {/* Icon */}
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md bg-muted/60">
        <ItemIcon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground/90">
          {item.label}
        </p>

        {item.isBadge ? (
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
