import { TrendingUp } from "lucide-react"
import React from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"

export const GenericBarChart = ({ data, title, description, footerText }) => {
  const chartConfig = {
    desktop: {
      label: "AgenteV",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Agentepr",
      color: "hsl(var(--chart-2))",
    },
  }

  return (
    <Card >
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="h-[calc(100vh_-_470px)] overflow-auto w-full" config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />

            <Bar
              dataKey="agenteV"
              stackId="a"
              fill="var(--color-desktop)"
            />
            <Bar
              dataKey="adminV"
              stackId="a"
              fill="var(--color-mobile)"
            />
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
