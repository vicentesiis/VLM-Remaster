import React from "react"
import { cn } from "@/lib/utils"
import { useFormField } from "@/components/ui/form"

const Input = React.forwardRef(
  ({ className, type, autoComplete = "off", ...props }, ref) => {
    let error
    try {
      error = useFormField()?.error
    } catch {
      error = null // fallback if not inside a form
    }

    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          error
            ? "border-red-500 focus-visible:ring-red-500"
            : "border-input focus-visible:ring-ring",
          className
        )}
        ref={ref}
        autoComplete={autoComplete}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input }
