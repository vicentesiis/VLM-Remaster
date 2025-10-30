import React from "react"
import { useHoverEffects } from "@/hooks/use-hover-effects"
import { cn } from "@/lib/utils"

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  className,
  hoverVariant = "medium",
  withGradient = true,
}) {
  const hover = useHoverEffects(hoverVariant, withGradient, true)

  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-xl border bg-gradient-to-br from-background to-muted/20 p-5 md:p-6",
        "transition-all duration-200",
        hover.container,
        className
      )}
    >
      {/* Header (Title + Icon) */}
      <div className="flex items-center justify-between mb-3">
        <p className="font-medium text-muted-foreground tracking-tight line-clamp-2 leading-snug">
          {title}
        </p>
        {Icon && (
          <Icon className={cn("w-5 h-5 text-primary", hover.icon)} />
        )}
      </div>

      {/* Value (alone on its line) */}
      <div className="mb-1">
        <h3 className="text-2xl font-bold text-foreground leading-none tracking-tight">
          {value}
        </h3>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 text-xs text-muted-foreground leading-relaxed line-clamp-2 font-medium">
          {subtitle}
        </p>
      )}
    </div>
  )
}