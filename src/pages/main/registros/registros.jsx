import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import React, { useState } from "react"
import DataLoader from "@/components/customs/data-loader"
import PageLayout from "@/components/customs/layout/page-layout"
import { registrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { useDisplayStatus } from "@/hooks/useDisplayStatus"
import { useRecordsParams } from "@/hooks/useRecordsParams"

export const Registros = () => {
  const [dateRange, setDateRange] = useState({ from: null, to: null })
  const [selectedValues, setSelectedValues] = useState([])

  const filters = useRecordsParams({ dateRange, selectedValues })
  const { data: records, status, isFetching, refetch } = useGetRecords(filters)
  const displayStatus = useDisplayStatus(status, records?.data, isFetching)

  const table = useReactTable({
    data: records?.data || [],
    columns: registrosColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const handleApplyFilters = async () => {
    await refetch()
    setIsCollapsed(true)
  }

  return (
    <PageLayout title="Registros">
      <Card>
        <CardContent className="pt-4">
          {displayStatus === "success" ? (
            <DataTable table={table}>
              <DataTableToolbar table={table}>
                <Button
                  size="sm"
                  variant="default"
                  onClick={handleApplyFilters}
                >
                  Buscar
                </Button>
              </DataTableToolbar>
            </DataTable>
          ) : (
            <DataLoader status={displayStatus} />
          )}
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Registros
