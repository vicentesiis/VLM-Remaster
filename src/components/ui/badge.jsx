import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
        outline:
          "border border-gray-300 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground",

        success:
          "border-transparent bg-green-600 text-white shadow hover:bg-green-600/90",
        neutral:
          "border border-gray-400 bg-gray-200 text-gray-700 hover:bg-gray-300",
        light:
          "border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50",
        dark: "border border-gray-700 bg-gray-800 text-white shadow hover:bg-gray-900",
        error:
          "border-transparent bg-red-600 text-white shadow hover:bg-red-600/90",
        warning:
          "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-500/90",
        info: "border-transparent bg-blue-600 text-white shadow hover:bg-blue-600/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
