import * as React from "react"
import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80 dark:bg-primary dark:text-white",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:bg-secondary dark:text-white",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80 dark:bg-destructive dark:text-white",
        outline:
          "border border-gray-300 bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground dark:border-gray-600 dark:text-gray-100 dark:hover:bg-accent/40",
        success:
          "border-transparent bg-green-600 text-white shadow hover:bg-green-600/90 dark:bg-green-700 dark:hover:bg-green-600",
        neutral:
          "border border-gray-400 bg-gray-200 text-gray-700 hover:bg-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
        light:
          "border border-gray-200 bg-white text-gray-900 shadow-sm hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800",
        dark: "border border-gray-700 bg-gray-800 text-white shadow hover:bg-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600",
        error:
          "border-transparent bg-red-600 text-white shadow hover:bg-red-600/90 dark:bg-red-700 dark:hover:bg-red-600",
        warning:
          "border-transparent bg-yellow-500 text-white shadow hover:bg-yellow-500/90 dark:bg-yellow-600 dark:hover:bg-yellow-500",
        info: "border-transparent bg-blue-600 text-white shadow hover:bg-blue-600/90 dark:bg-blue-700 dark:hover:bg-blue-600",
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
