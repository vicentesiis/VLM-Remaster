import React from "react"
import { BarChart } from "@/components/ui/bar-chart"
import { useIsSmallScreen } from "@/hooks"

const formatCurrencyUSD = (value) => {
  if (isNaN(value)) return "-"
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value/ 100)
  return `${formatted} USD`
}

export const ChartVentas = ({
  data = [],
  onValueChange,
  formatAsCurrency = false,
  categoryName = "Registros",
}) => {
  const isSmallScreen = useIsSmallScreen()

  const chartData = data.map((item) => ({
    date: item.title,
    [categoryName]: item.description ?? 0,
  }))

  return (
    <div className="overflow-x-auto mb-4 mr-4">
      <BarChart
        className="h-[900px] cursor-pointer sm:h-[350px]"
        data={chartData}
        index="date"
        categories={[categoryName]}
        yAxisWidth={80}
        layout={isSmallScreen ? "vertical" : "horizontal"}
        onValueChange={onValueChange}
        valueFormatter={
          formatAsCurrency
            ? formatCurrencyUSD
            : (val) => String(val)
        }
      />
    </div>
  )
}

export default ChartVentas