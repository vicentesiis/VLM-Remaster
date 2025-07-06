import PropTypes from "prop-types"
import React from "react"
import BigCalendar from "@/components/customs/big-calendar/big-calendar"

export const CalendarSection = ({
  filters,
  reportData,
  handleDayPressed,
  selectedDate,
}) => {
  if (!reportData?.agent_daily_sales) return null

  return (
    <div className="overflow-x-auto lg:overflow-visible">
      <div className="min-w-[700px]">
        <BigCalendar
          month={filters.month}
          year={filters.year}
          data={reportData.agent_daily_sales}
          onClick={handleDayPressed}
          selectedDate={selectedDate}
        />
      </div>
    </div>
  )
}

CalendarSection.propTypes = {
  filters: PropTypes.any,
  handleDayPressed: PropTypes.any,
  reportData: PropTypes.any,
  selectedDate: PropTypes.any,
}

export default CalendarSection
