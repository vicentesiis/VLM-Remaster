import React from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen"

const FormFieldTooltip = ({
  children,
  fieldState,
  position = "auto",
  ...props
}) => {
  const isSmallScreen = useIsSmallScreen()

  let side = "right"
  if (position === "bottom" || (position === "auto" && isSmallScreen)) {
    side = "bottom"
  }

  return (
    <TooltipProvider>
      <Tooltip open={!!fieldState?.error}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        {fieldState?.error && (
          <TooltipContent
            side={side}
            align="start"
            sideOffset={8}
            avoidCollisions={false}
            className="z-50 rounded bg-red-500 px-3 py-1 text-sm text-white shadow"
          >
            {fieldState?.error?.message}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export default FormFieldTooltip
