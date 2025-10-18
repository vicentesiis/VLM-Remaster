import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib/utils"

const InfoCard = ({ 
  icon: Icon, 
  label, 
  value, 
  iconColor, 
  valueColor, 
  variant = "default",
  className,
  ...props 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case "success":
        return "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800"
      case "warning":
        return "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/20 dark:border-yellow-800"
      case "destructive":
        return "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-800"
      case "info":
        return "bg-blue-50 border-blue-200 dark:bg-blue-950/20 dark:border-blue-800"
      default:
        return "bg-muted/30 border-border/50"
    }
  }

  return (
    <div 
      className={cn(
        "flex items-center gap-3 p-4 rounded-lg border",
        getVariantStyles(),
        className
      )}
      {...props}
    >
      {Icon && (
        <div className="flex-shrink-0">
          <Icon 
            className={cn(
              "h-5 w-5",
              iconColor || "text-muted-foreground"
            )} 
          />
        </div>
      )}
      
      <div className="flex flex-col min-w-0 flex-1">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          {label}
        </span>
        <span 
          className={cn(
            "text-sm font-semibold truncate",
            valueColor || "text-foreground"
          )}
          title={value}
        >
          {value}
        </span>
      </div>
    </div>
  )
}

InfoCard.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  iconColor: PropTypes.string,
  valueColor: PropTypes.string,
  variant: PropTypes.oneOf(["default", "success", "warning", "destructive", "info"]),
  className: PropTypes.string,
}

export default InfoCard