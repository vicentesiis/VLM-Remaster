import React from "react"
const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

export const BigCalendarHeader = () => (
  <div className="grid grid-cols-7 divide-x divide-border border-b bg-muted/30">
    {daysOfWeek.map((day, index) => (
      <div
        key={index}
        className="py-3 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground"
      >
        {day}
      </div>
    ))}
  </div>
)

export default BigCalendarHeader
