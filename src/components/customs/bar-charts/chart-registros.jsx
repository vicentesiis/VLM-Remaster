import React from "react"
import { BarChart } from "@/components/ui/bar-chart"
import { useIsSmallScreen } from "@/hooks"

export const ChartRegistros = ({ data = [], onValueChange }) => {
  const isSmallScreen = useIsSmallScreen()
  const chartData = data.map((item) => ({
    date: item.title,
    Sales: item.description ?? 0,
  }))

  return (
    <div className="overflow-x-auto">
    <div style={{ minWidth: isSmallScreen ? "400px" : "1600px" }}>
      <BarChart
        className="h-[900px] cursor-pointer sm:h-[350px]"
        data={chartData}
        index="date"
        categories={["Sales"]}
        yAxisWidth={70}
        layout={isSmallScreen ? "vertical" : "horizontal"}
        onValueChange={onValueChange}
      />
    </div>
  </div>
  )
}
  
  export default ChartRegistros