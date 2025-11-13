import PropTypes from "prop-types"
import React from "react"

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { toTitleCase } from "@/utils/utils"

export const InfoSection = ({ title, icon: Icon, items, getStatusVariant }) => {
  return (
    <div className="space-y-3 rounded-xl border bg-card/60 p-4 shadow-sm md:p-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="text-base font-semibold tracking-tight md:text-lg">
          {title}
        </h3>
      </div>

      <Separator className="mt-1" />

      {/* Content grid */}
      <div className="grid grid-cols-1 gap-4 pt-3 md:grid-cols-2 xl:grid-cols-3">
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
      className={`group flex gap-3 rounded-lg border bg-background/40 p-3 transition-colors hover:border-primary/30 hover:bg-accent/60 ${
        item.fullWidth ? "md:col-span-2 xl:col-span-3" : ""
      }`}
    >
      {/* Icon */}
      <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-md bg-muted/70">
        <ItemIcon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-foreground" />
      </div>

      {/* Text */}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
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
          <span className="break-words text-sm font-medium leading-relaxed text-foreground">
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
