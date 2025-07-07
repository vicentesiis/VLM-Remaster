import React from "react"
import { BarChart } from "@/components/ui/bar-chart"
import { useIsSmallScreen } from "@/hooks"
import { formatCurrency } from "@/utils"

export const ChartRegistros = ({ data = [], onValueChange, formatAsCurrency = false }) => {
  const isSmallScreen = useIsSmallScreen()

  const chartData = data.map((item) => ({
    date: item.title,
    Registros: item.description ?? 0,
  }))

  return (
    <div className="overflow-x-auto mb-4 mr-4">
      <BarChart
        className="h-[900px] cursor-pointer sm:h-[350px]"
        data={chartData}
        index="date"
        categories={["Registros"]}
        yAxisWidth={70}
        layout={isSmallScreen ? "vertical" : "horizontal"}
        onValueChange={onValueChange}
        valueFormatter={
          formatAsCurrency
            ? formatCurrency 
            : (val) => String(val)
        }
      />
    </div>
  )
}
export default ChartRegistros