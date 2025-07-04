import React from "react"
const daysOfWeek = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]

export const BigCalendarHeader = () => (
  <div className="grid grid-cols-7 rounded-t-md py-1 border bg-secondary-foreground/5 dark:bg-secondary-foreground/0">
    {daysOfWeek.map((day, index) => (
      <div
        key={index}
        className="w-full text-center font-semibold text-muted-foreground"
      >
        {day}
      </div>
    ))}
  </div>
)

export default BigCalendarHeader
