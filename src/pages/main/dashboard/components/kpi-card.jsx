import React from "react"
import { cn } from "@/lib/utils"

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  className,
}) {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border p-4 md:p-5 bg-background",
        "transition-all duration-200 hover:shadow-md hover:-translate-y-[1px] hover:border-accent/60",
        "focus-within:ring-2 focus-within:ring-accent/40",
        className
      )}
    >
      {/* Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col justify-between flex-1 min-h-[4.25rem]">
          {/* Title (allow up to 2 lines without pushing value) */}
          <p className="text-sm font-medium text-muted-foreground tracking-tight line-clamp-2 leading-snug h-[2.25rem]">
            {title}
          </p>

          {/* Value region locked to consistent height */}
          <div className="h-[2rem] flex items-end">
            <h3 className="text-2xl font-semibold text-foreground leading-tight truncate">
              {value}
            </h3>
          </div>
        </div>

        {Icon && (
          <div className={`px-2 rounded-lg`}>
            <Icon className="!size-5 text-primary" />
          </div>
        )}
      </div>

      {/* Subtitle / Footer */}
      {subtitle && (
        <p className="mt-3 text-xs text-muted-foreground leading-snug line-clamp-2">
          {subtitle}
        </p>
      )}
    </div>
  )
}