import React from "react"
import { H3, PLead } from "@/components/ui/typography"
import { Separator } from "../ui/separator"

export function FilterTableLayout({
  FilterComponent,
  TableComponent,
  tableTitle,
  helperTitle,
}) {
  function TableContainer() {
    return (
      <div>
        <div className="mb-4 flex items-end gap-4">
          <H3>{tableTitle}</H3>
          <PLead>{helperTitle}</PLead>
        </div>
        <TableComponent />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-4 sm:py-8 md:px-6">
      <div className="flex flex-col gap-8 md:gap-12">
        {/* Filters Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          {/* Filter Sidebar */}
          <div className="flex flex-col gap-6">
            <FilterComponent />
          </div>
          {/* Main Table Section */}
          <TableContainer />
        </div>
      </div>
    </div>
  )
}

export default FilterTableLayout
