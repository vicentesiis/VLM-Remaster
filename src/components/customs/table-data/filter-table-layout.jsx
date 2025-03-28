import React from "react"

export function FilterTableLayout({ FilterComponent, TableComponent }) {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="flex flex-col gap-8 md:gap-12">
        {/* Filters Section */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-[240px_1fr]">
          {/* Filter Sidebar */}
          <div className="flex flex-col gap-6">
            <FilterComponent />
          </div>

          {/* Main Table Section */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Data Table */}
            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm dark:border-gray-700">
              <TableComponent />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterTableLayout
