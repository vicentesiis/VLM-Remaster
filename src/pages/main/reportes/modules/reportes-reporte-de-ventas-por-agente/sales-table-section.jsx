import PropTypes from "prop-types"
import React from "react"
import SectionHeader from "@/components/customs/section-header"
import { DataTable } from "@/components/data-table"
import { formatCurrency } from "@/utils"
import { formatIfExists, formatLongMonthAndDay } from "@/utils/reportFormatters"

export const SalesTableSection = ({ selectedDate, selectedDayData, table }) => {
  if (!selectedDate) return null

  const totalSales = formatIfExists(
    selectedDayData?.total_day_sales,
    formatCurrency
  )

  const totalOrders = formatIfExists(
    selectedDayData?.total_day_orders,
    (n) => `${n} Órdenes`
  )

  const formattedDate = formatLongMonthAndDay(selectedDate)

  return (
    <div>
      <SectionHeader
        title={formattedDate}
        extra={totalSales}
        subtitle={totalOrders}
        className="mt-4"
        highlightPositive={(selectedDayData?.total_day_sales || 0) > 0}
      />

      <DataTable table={table} showPagination={false} hasFetched />
    </div>
  )
}

SalesTableSection.propTypes = {
  selectedDate: PropTypes.any,
  selectedDayData: PropTypes.any,
  table: PropTypes.any,
}

export default SalesTableSection
