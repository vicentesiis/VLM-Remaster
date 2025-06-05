import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import React, { useState } from "react"
import CheckboxList from "@/components/customs/checkbox-list"
import CollapsibleComponentGroup from "@/components/customs/collapsible/collapsible-component-group"
import DataLoader from "@/components/customs/data-loader"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import PageLayout from "@/components/customs/layout/page-layout"
import SplitPane from "@/components/customs/layout/split-pane/split-pane"
import { registrosColumns } from "@/components/customs/table/columns/registrosColumns"
import { DataTable } from "@/components/data-table/data-table"
import { Card, CardContent } from "@/components/ui/card"
import { RegistrosOptions } from "@/constants/utils-contants"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { useDisplayStatus } from "@/hooks/useDisplayStatus"
import { useRecordsParams } from "@/hooks/useRecordsParams"

export const Registros = () => {

  const [isCollapsed, setIsCollapsed] = useState(false)
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

  const TaskFilter = () => (
    <CollapsibleComponentGroup
      title="Filtro"
      onApply={handleApplyFilters}
      loading={isFetching}
    >
      {/* <InputIcon
        title="Buscar"
        alwaysOpen
        placeholder="Buscar"
        icon={SearchIcon}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      /> */}
      <DateRangePicker
        title="Rango de Fechas"
        locale="es-MX"
        showCompare={false}
        initialDateFrom={dateRange.from}
        initialDateTo={dateRange.to}
        onUpdate={setDateRange}
      />
      <CheckboxList
        title="Estatus"
        options={RegistrosOptions}
        selectedValues={selectedValues}
        onCheckedChange={setSelectedValues}
      />
    </CollapsibleComponentGroup>
  )

  return (
    <PageLayout title="Registros">
      <Card>
        <CardContent>
          <SplitPane
            title="Lista de Registros"
            subTitle={`${records?.data?.length || 0} registros`}
            LeftSideComponent={<TaskFilter />}
            RightSideComponent={
              displayStatus === "success" ? (
                <DataTable table={table} />
              ) : (
                <DataLoader status={displayStatus} />
              )
            }
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Registros
