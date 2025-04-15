import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { useFormField } from "@/components/ui/form"
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen"

const FormFieldTooltip = ({ children, fieldState, position = "auto", ...props }) => {
  const isSmallScreen = useIsSmallScreen()

  let side = "right"
  if (position === "bottom" || (position === "auto" && isSmallScreen)) {
    side = "bottom"
  }

  return (
    <TooltipProvider>
      <Tooltip open={!!fieldState?.error}>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        {fieldState?.error && (
          <TooltipContent
            side={side}
            align="start"
            sideOffset={8}
            avoidCollisions={false}
            className="bg-red-500 text-white text-sm px-3 py-1 rounded shadow z-50"
          >
            {fieldState?.error?.message}
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  )
}

export default FormFieldTooltip
