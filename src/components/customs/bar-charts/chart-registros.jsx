import React from "react"
import { BarChart } from "@/components/ui/bar-chart"
import { useIsSmallScreen } from "@/hooks"
import { formatCurrency } from "@/utils"

export const ChartRegistros = ({
  data = [],
  onValueChange,
  formatAsCurrency = false,
  categoryName = "Registros", 
  secondCategory = "Contactados"
}) => {
  const isSmallScreen = useIsSmallScreen()

  const chartData = data.map((item) => ({
    date: item.title,
    [categoryName]: item.registrations ?? 0,
    [secondCategory]: item.contacted ?? 0, 
  }))

  return (
    <div className="overflow-x-auto mb-4 mr-4">
      <BarChart
        className="h-[900px] cursor-pointer sm:h-[350px]"
        data={chartData}
        index="date"
        categories={[categoryName]} 
        yAxisWidth={70}
        layout={isSmallScreen ? "vertical" : "horizontal"}
        onValueChange={onValueChange}
        valueFormatter={
          formatAsCurrency ? formatCurrency : (val) => String(val)
        }
        customTooltip={({ payload }) => {
          if (!payload?.length) return null;
          const data = payload[0].payload;
          return (
            <div className="rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-xl text-sm text-gray-800 space-y-1">
            <div className="font-semibold text-gray-900">{data.date}</div>
          
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              <span className="text-gray-600">{categoryName}:</span>
              <span className="font-medium text-gray-900">
                {formatAsCurrency ? formatCurrency(data[categoryName]) : data[categoryName]}
              </span>
            </div>
          
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="text-gray-600">{secondCategory}:</span>
              <span className="font-medium text-gray-900">
                {formatAsCurrency ? formatCurrency(data[secondCategory]) : data[secondCategory]}
              </span>
            </div>
          </div>
          );
        }}
      />
    </div>
  )
}

export default ChartRegistros