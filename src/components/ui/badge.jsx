import { cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

// Define the badge variants with specific styles
const badgeVariants = cva("rounded-md border", {
  variants: {
    variant: {
      iconBadgePrimary:
        "px-2 py-0.5 border-transparent border-green-500 text-green-500 shadow ",
      iconBadgeSecondary:
        "px-2 py-0.5 border-transparent border-blue-500 text-blue-500 ",
      default: "p-0",
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
