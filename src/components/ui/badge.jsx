import { cva } from "class-variance-authority"
import * as React from "react"
import { cn } from "@/lib/utils"

// Define the badge variants with specific styles
const badgeVariants = cva("rounded-md border", {
  variants: {
    variant: {
      // Icon badge variants
      iconBadgePrimary:
        "px-2 py-0.5 border-transparent border-green-500 text-green-500 shadow ",
      iconBadgeSecondary:
        "px-2 py-0.5 border-transparent border-blue-500 text-blue-500 ",

      // Account status badge variants
      Respaldo:
        "px-2 py-0 rounded-full border-transparent border-blue-500 text-blue-500 ",
      Inactiva:
        "px-2 py-0 rounded-full border-transparent border-red-500 text-red-500 ",
      Activa:
        "px-2 py-0 rounded-full border-transparent border-green-500 text-green-500 ",
      default: "",
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
