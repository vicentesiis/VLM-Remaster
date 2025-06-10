import React from "react"
import { H4 } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export const SectionDivider = ({ title, className, ...props }) => {
  return (
    <div className={cn("mb-2 flex items-center gap-8", className)} {...props}>
      <div className="h-px flex-1 bg-border" />
      <H4 className="whitespace-nowrap text-lg uppercase">
        {title}
      </H4>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

export default SectionDivider
