// components/bar-chart-not-stacked.jsx
import React from "react"
import { BarChart } from "@/components/ui/bar-chart"
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen"

const BarChartnotStacked = ({ chartData = [] }) => {
  const isSmallScreen = useIsSmallScreen()


  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Ventas por Mes</h2>
      <BarChart
        className="h-64 cursor-pointer"
        data={chartData}
        index="date"
        categories={["Sales"]}
        yAxisWidth={60}
        onValueClick={handleBarClick} 
      />
    </div>
  )
}

export default BarChartnotStacked