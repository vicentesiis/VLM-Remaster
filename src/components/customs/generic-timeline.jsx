import React from "react"
import { useNavigate } from "react-router-dom"
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
} from "@/components/ui/timeline"

export const GenericTimeline = ({ data = [] }) => {
  const navigate = useNavigate()

  const handleClick = (item) => {
    // Navigate to the MonthlySalesReport route with the selected month and year
    navigate({
      pathname: "/reportes/ventas-mensuales", // Updated to match the correct path
      state: { year: item.title, group: item.description }, // Pass data through state
    })
  }

  return (
    <Timeline>
      {data.map((item, index) => (
        <TimelineItem
          key={index}
          className="w-[100px] min-w-[40px]"
          onClick={() => handleClick(item)}
        >
          <TimelineSeparator>
            <TimelineDot className="empty:after:size-3.5" />
            {index < data.length - 1 && (
              <TimelineConnector className="my-2 w-0.5 bg-border" />
            )}
          </TimelineSeparator>
          <TimelineContent className="flex min-h-[64px] flex-col justify-center">
            <TimelineTitle className="text-sm font-medium text-muted-foreground">
              {item.title}
            </TimelineTitle>
            {item.description && (
              <TimelineDescription className="text-sm font-semibold text-foreground">
                {item.description}
              </TimelineDescription>
            )}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  )
}

export default GenericTimeline
