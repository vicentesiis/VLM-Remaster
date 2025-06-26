import React from "react"
import { BarChart } from "@/components/ui/bar-chart"
import { useIsSmallScreen } from "@/hooks"

export const ChartRegistros = ({ data = [], onValueChange, formatAsCurrency = false }) => {
  const isSmallScreen = useIsSmallScreen()

  const valueFormatter = formatAsCurrency
  ? (number) =>
      new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN",
        maximumFractionDigits: 0,
      }).format(number / 100)
  : undefined

  const chartData = data.map((item) => ({
    date: item.title,
    Ventas: item.description ?? 0,
  }))

  return (
    <div className="overflow-x-auto mb-4 mr-4">
      <BarChart
        className="h-[900px] cursor-pointer sm:h-[350px]"
        data={chartData}
        index="date"
        categories={["Ventas"]}
        yAxisWidth={70}
        layout={isSmallScreen ? "vertical" : "horizontal"}
        onValueChange={onValueChange}
        valueFormatter={valueFormatter}
      />
    </div>
  )
}

export default ChartRegistros