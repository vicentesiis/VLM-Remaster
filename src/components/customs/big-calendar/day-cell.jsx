import { ShoppingBag } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib"
import { formatCurrency } from "@/utils"

export const DayCell = ({
  date,
  data,
  onClick,
  isOutsideMonth,
  isSelected,
}) => {
  const day = date.getDate()
  const sales = data?.total_day_sales ?? 0
  const numberOfOrders = data?.total_day_orders ?? 0

  const hasOrders = numberOfOrders > 0
  const hasNoSales = !isOutsideMonth && !hasOrders

  return (
    <div
      onClick={!isOutsideMonth && hasOrders ? () => onClick?.({ date, data }) : undefined}
      className={cn(
        "group relative min-h-[80px] p-2 transition-all duration-200",
        isOutsideMonth && "cursor-not-allowed bg-muted/60",
        hasNoSales && "cursor-default bg-background opacity-60",
        hasOrders && !isOutsideMonth && "cursor-pointer hover:bg-accent/50 hover:shadow-inner",
        isSelected && hasOrders && "bg-primary/10 ring-2 ring-primary ring-inset"
      )}
    >
      {/* Day Number */}
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium transition-colors",
            hasOrders && "bg-primary text-primary-foreground shadow-sm",
            hasNoSales && "text-muted-foreground/80",
            isOutsideMonth && "text-muted-foreground"
          )}
        >
          {day}
        </span>

        {/* Orders Badge */}
        {hasOrders && (
          <div className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
            <ShoppingBag className="h-3 w-3" />
            <span>{numberOfOrders}</span>
          </div>
        )}
      </div>

      {/* Sales Amount */}
      {sales > 0 && (
        <span className="my-2 block border-l-4 border-emerald-500 pl-2 text-lg font-semibold text-green-600 dark:text-green-500">
          {formatCurrency(sales, "USD")}
        </span>
      )}

      {/* Hover Effect Indicator */}
      {hasOrders && !isOutsideMonth && (
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-200 group-hover:w-full" />
      )}
    </div>
  )
}

DayCell.propTypes = {
  date: PropTypes.any,
  onClick: PropTypes.any,
  data: PropTypes.any,
  isOutsideMonth: PropTypes.any,
  isSelected: PropTypes.any,
}

export default DayCell