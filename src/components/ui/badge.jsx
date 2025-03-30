import * as React from "react"
import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define the badge variants with specific styles
const badgeVariants = cva("rounded-md border px-2.5 py-0.5 ", {
  variants: {
    variant: {
      primary:
        "border-transparent border-green-500 text-green-500 shadow hover:bg-green-50",
      secondary:
        "border-transparent border-blue-500 text-blue-500 hover:bg-secondary/80",
    },
  },
  defaultVariants: {
    variant: "default", // Default variant is "default"
  },
})

// Badge component that takes the variant prop to conditionally style the badge
function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
