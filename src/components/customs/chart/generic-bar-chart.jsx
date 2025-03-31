import React from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  XAxis,
  YAxis,
  LabelList,
  Tooltip as ChartTooltip,
} from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

const ChartTooltipContent = ({ labelKey, payload }) => {
  const day = payload?.[0]?.payload?.day // Extract the day from the payload

  return (
    <div className="rounded bg-white p-2 shadow-lg">
      {day && (
        <div className="mb-2 font-bold text-gray-800">
          <span>Día: </span>
          <span className="text-blue-500">{day}</span>
        </div>
      )}
      {payload?.map((entry) => (
        <div
          key={entry.dataKey}
          className="mb-1 flex items-center text-sm text-gray-700"
        >
          <div
            className="mr-2 h-3 w-3 rounded"
            style={{ backgroundColor: entry.color }} // Set square color to the entry's color
          ></div>
          <strong>{entry.dataKey}: </strong>
          <span>{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

export const GenericBarChart = ({ data, title, description, footerText }) => {
  const dataWithTotal = data.map((item) => ({
    ...item,
    total: Object.entries(item)
      .filter(([key]) => key !== "day")
      .reduce((sum, [, value]) => sum + value, 0),
  }))

  const generateChartConfig = (data) => {
    const firstItem = data[0] || {}
    return Object.keys(firstItem)
      .filter((key) => key !== "day")
      .reduce((acc, key, index) => {
        acc[key] = {
          label: key,
          color: `hsl(var(--chart-${index + 1}))`,
        }
        return acc
      }, {})
  }

  const chartConfig = generateChartConfig(data)
  const dataKeys = Object.keys(chartConfig)
  const lastKey = dataKeys[dataKeys.length - 1]

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart layout="vertical" data={dataWithTotal} barSize={18}>
            <CartesianGrid vertical={true} />
            <YAxis
              dataKey="day"
              type="category"
              tickMargin={10}
              axisLine={false}
            >
              <Label
                value="Día"
                angle={270}
                position="insideLeft"
                style={{ textAnchor: "middle", fontSize: "20px" }}
              />
            </YAxis>
            <XAxis type="number">
              <Label
                value="Cantidad"
                position="bottom"
                style={{ fontSize: "20px" }}
              />
            </XAxis>

            <ChartTooltip content={<ChartTooltipContent labelKey="day" />} />

            {dataKeys.map((key) => (
              <Bar
                key={key}
                dataKey={key}
                stackId="a"
                fill={chartConfig[key].color}
              >
                {key === lastKey && (
                  <LabelList
                    dataKey="total"
                    position="right"
                    offset={8}
                    className="fill-[--color-label]"
                    fontSize={12}
                  />
                )}
              </Bar>
            ))}
            <ChartLegend layout="vertical" content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="leading-none text-muted-foreground">{footerText}</div>
      </CardFooter>
    </Card>
  )
}

export default GenericBarChart
