import PropTypes from "prop-types"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"

export const DayCell = ({ date, data, onClick }) => {
  const day = date.getDate()

  return (
    <Card onClick={onClick} className="w-full rounded-none">
      <CardContent></CardContent>
    </Card>
  )
}

DayCell.propTypes = {
  date: PropTypes.any,
  onClick: PropTypes.any,
  data: PropTypes.any,
}

export default DayCell
