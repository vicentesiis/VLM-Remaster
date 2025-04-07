import PropTypes from "prop-types"
import React from "react"
import SalesReportDetailTableBody from "./table-body/sales-report-table-body/sales-report-detail-table-body"
import SalesReportTableBody from "@/components/customs/table-data/table-body/sales-report-table-body/sales-report-table-body"
import TaskTableBody from "@/components/customs/table-data/table-body/task-table-body"
import { TableHeaderComponent } from "@/components/customs/table-data/table-header"
import { H4, ScrollArea } from "@/components/ui"
import { Table } from "@/components/ui/table"
import useFilteredColumns from "@/hooks/useFilteredColumns"

export function BaseTable({ data, tableType, onRowClick }) {
  if (!data || data.length === 0 || !tableType) {
    return <div>No data available</div>
  }

  const allColumns = Object.keys(data[0])

  const filteredColumns = useFilteredColumns(tableType, allColumns)

  const TableFooter = ({ label, value }) => {
    return (
      <div className="flex items-center justify-between p-4">
        <H4 className="font-medium text-gray-600">{label}</H4>
        <H4 className="font-semibold text-gray-900">${value}</H4>
      </div>
    )
  }

  const TableBody = () => {
    switch (tableType) {
      case "tasks":
        return <TaskTableBody data={data} filteredColumns={filteredColumns} />
      case "salesAgentReport":
        return (
          <SalesReportTableBody
            data={data}
            filteredColumns={filteredColumns}
            onRowClick={onRowClick} // Pass the onRowClick prop here
          />
        )
      case "salesReportDetailTableBody":
        return (
          <SalesReportDetailTableBody
            data={data}
            filteredColumns={filteredColumns}
          />
        )
      default:
        return null
    }
  }

  return (
    <ScrollArea className="overflow-y-visible h-[600px] sm:h-[540px] 2xl:h-[700px]">
      <Table>
        <TableHeaderComponent columns={filteredColumns} type={tableType} />
        <TableBody />
      </Table>
      {/* {tableType === "SalesReportTableBody" ?? (
        <TableFooter label={"Total"} value={"23030"} />
      )} */}
    </ScrollArea>
  )
}

BaseTable.propTypes = {
  data: PropTypes.array.isRequired,
  tableType: PropTypes.string.isRequired,
  onRowClick: PropTypes.func,
}

export default BaseTable
