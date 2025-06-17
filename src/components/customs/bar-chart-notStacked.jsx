import React from "react"
import { BarChart } from "@/components/ui/bar-chart"
import { useIsSmallScreen } from "@/hooks"

export const BarChartNotStacked = ({ data = [], onValueChange }) => {
  const isSmallScreen = useIsSmallScreen()
  const chartData = data.map((item) => ({
    date: item.title,
    Sales: item.description ?? 0,
  }))

  return (
    <div className="p-4">
      <h2 className="mb-4 text-lg font-semibold">Ventas por Mes</h2>
      <BarChart
        className="h-[500px] cursor-pointer sm:h-[350px]"
        data={chartData}
        index="date"
        categories={["Sales"]}
        yAxisWidth={70}
        layout={isSmallScreen ? "vertical" : "horizontal"}
        onValueChange={onValueChange}
      />
    </div>
  )
}

export default BarChartNotStacked
