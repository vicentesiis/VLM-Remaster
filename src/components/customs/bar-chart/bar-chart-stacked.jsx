import React from "react"
import { BarChart } from "@/components/ui/bar-chart"
import { logChartData } from "@/constants/utils-contants"
import { useIsSmallScreen } from "@/hooks/useIsSmallScreen"

export const BarChartStacked = () => {
  const isSmallScreen = useIsSmallScreen()

  return (
    <BarChart
      index={"day"}
      data={logChartData}
      type="stacked"
      xAxisLabel="Día del Mes"
      yAxisWidth={120}
      legendPosition={isSmallScreen ? "right" : "center"}
      className="-ml-16 w-[400px] h-[1000px] sm:-ml-24 sm:h-[500px] sm:w-[1500px]"
      categories={["agenteA", "agenteB", "agenteC"]}
    />
  )
}

export default BarChartStacked
