import { Wallet } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import IconBadge from "../badge/icon-badge"
import { Card, CardContent } from "@/components/ui/card"
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

  return (
    <Card
      onClick={!isOutsideMonth ? () => onClick?.({ date, data }) : undefined}
      className={cn(
        "w-full rounded-none transition-colors",
        isOutsideMonth && "cursor-not-allowed bg-black/10",
        !isOutsideMonth && "cursor-pointer hover:bg-muted/50",
        isSelected && !isOutsideMonth && "border-primary bg-primary/10"
      )}
    >
      <CardContent className="relative flex h-20 items-center justify-center !p-0">
        <span
          className={cn(
            "absolute right-2 top-2 rounded-full px-1 py-0.5 text-xs font-semibold",
            hasOrders ? "bg-primary text-white" : "text-muted-foreground"
          )}
        >
          {day}
        </span>

        {hasOrders && (
          <div className="absolute left-2 top-2">
            <IconBadge title={numberOfOrders} icon={Wallet} variant="ghost" />
          </div>
        )}

        {sales > 0 && (
          <div className="text-md mt-1 text-center font-semibold text-green-600">
            {formatCurrency(sales)}
          </div>
        )}
      </CardContent>
    </Card>
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
