import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Input.displayName = "Input"

const InputWithIcon = React.forwardRef(
  ({ className, icon: Icon, ...props }, ref) => {
    return (
      <div className="flex w-full max-w-sm items-center rounded-md border border-input px-2.5 py-1.5">
        {Icon && <Icon className="mr-2.5 h-4 w-4" />}
        {/* Render the icon if provided */}
        <Input
          className={cn("border-0 shadow-none", className)} // Apply custom className to Input
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

InputWithIcon.displayName = "InputWithIcon"

export { Input, InputWithIcon }
