"use client"
import { X } from "lucide-react"
import * as React from "react"

import { DataTableDateFilter } from "@/components/data-table/data-table-date-filter"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import { DataTableSliderFilter } from "@/components/data-table/data-table-slider-filter"
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function DataTableToolbar({ table, className, ...props }) {
  const [pendingFilters, setPendingFilters] = React.useState({})

  const setPendingFilterValue = (columnId, value) => {
    setPendingFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }))
  }

  const applyFilters = () => {
    Object.entries(pendingFilters).forEach(([columnId, value]) => {
      const column = table.getColumn(columnId)
      column?.setFilterValue(value)
    })
  }

  const resetFilters = () => {
    setPendingFilters({})
    table.resetColumnFilters()
  }

  const columns = table.getAllColumns().filter((col) => col.getCanFilter())

  return (
    <div
      className={cn(
        "flex w-full items-start justify-between gap-2 p-1",
        className
      )}
      {...props}
    >
      <div className="flex flex-1 flex-wrap items-center gap-2">
        {columns.map((column) => (
          <DataTableToolbarFilter
            key={column.id}
            column={column}
            pendingValue={pendingFilters[column.id]}
            onPendingChange={(value) => setPendingFilterValue(column.id, value)}
          />
        ))}
        <Button size="sm" onClick={applyFilters}>
          Search
        </Button>
        <Button
          aria-label="Reset filters"
          variant="outline"
          size="sm"
          className="border-dashed"
          onClick={resetFilters}
        >
          <X />
          Reset
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  )
}

function DataTableToolbarFilter({ column, pendingValue, onPendingChange }) {
  const columnMeta = column.columnDef.meta

  switch (columnMeta?.variant) {
    case "multiSelect":
    case "select":
      return (
        <DataTableFacetedFilter
          column={column}
          title={columnMeta.label ?? column.id}
          options={columnMeta.options ?? []}
          multiple={columnMeta.variant === "multiSelect"}
          value={pendingValue ?? []}
          onChange={(val) => onPendingChange(val)}
        />
      )

    case "range":
      return (
        <DataTableSliderFilter
          column={column}
          title={columnMeta.label ?? column.id}
          value={pendingValue}
          onChange={(val) => onPendingChange(val)}
        />
      )

    case "date":
    case "dateRange":
      return (
        <DataTableDateFilter
          column={column}
          title={columnMeta.label ?? column.id}
          multiple={columnMeta.variant === "dateRange"}
          value={pendingValue}
          onChange={(val) => onPendingChange(val)}
        />
      )

    default:
      return null
  }
}
