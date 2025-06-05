import { useQuery } from "@tanstack/react-query"
import { SearchIcon } from "lucide-react"
import React from "react"
import CheckboxList from "@/components/customs/checkbox-list"
import CollapsibleComponentGroup from "@/components/customs/collapsible/collapsible-component-group"
import DataLoader from "@/components/customs/data-loader"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import InputIcon from "@/components/customs/input-icon"
import PageLayout from "@/components/customs/layout/page-layout"
import SplitPane from "@/components/customs/layout/split-pane/split-pane"
import BaseTable from "@/components/customs/table-data/base-table"
import { Card, CardContent } from "@/components/ui/card"
import { RegistrosOptions } from "@/constants/utils-contants"
import { useGetRecords } from "@/hooks/queries/useRecord"
import { useDisplayStatus } from "@/hooks/useDisplayStatus"
import { useRecordsParams } from "@/hooks/useRecordsParams"
import useResetStoresOnRouteChange from "@/hooks/useResetStoresOnRouteChange"
import { getRecords } from "@/services/recordsService"
import {
  useSearchStore,
  useDateRangeStore,
  useCheckboxStore,
} from "@/store/filterInputsStore"

import { useReactTable, getCoreRowModel } from "@tanstack/react-table"
import { DataTable } from "@/components/data-table/data-table"
import { registrosColumns } from "@/components/customs/table/cells/registrosColumns"

export const Registros = () => {
  useResetStoresOnRouteChange()

  const [isCollapsed, setIsCollapsed] = React.useState(false)

  const filters = useRecordsParams()
  const { data: records, status, isFetching, refetch } = useGetRecords(filters)

  const displayStatus = useDisplayStatus(status, records?.data, isFetching)

  const table = useReactTable({
    data: records?.data,
    columns: registrosColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  const tableContent =
    displayStatus === "success" ? (
      <DataTable table={table}></DataTable>
    ) : (
      <DataLoader status={displayStatus} />
    )

  function TaskFilter() {
    const { searchQuery, setSearchQuery } = useSearchStore()
    const { dateRange, setDateRange } = useDateRangeStore()
    const { selectedValues, setSelectedValues } = useCheckboxStore()

    const handleApply = async () => {
      await refetch()
      setIsCollapsed(true)
    }

    return (
      <CollapsibleComponentGroup
        title="Filtro"
        onApply={handleApply}
        loading={isFetching}
      >
        <InputIcon
          title="Buscar"
          alwaysOpen={true}
          placeholder={"Buscar"}
          icon={SearchIcon}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <DateRangePicker
          title="Rango de Fechas"
          locale="es-MX"
          showCompare={false}
          initialDateFrom={dateRange.from}
          initialDateTo={dateRange.to}
          onUpdate={(range) => setDateRange(range)}
        />
        <CheckboxList
          title="Estatus"
          options={RegistrosOptions}
          selectedValues={selectedValues}
          onCheckedChange={setSelectedValues}
        />
      </CollapsibleComponentGroup>
    )
  }

  return (
    <PageLayout title="Registros">
      <Card>
        <CardContent>
          <SplitPane
            title="Lista de Registros"
            subTitle={`${records?.data?.length || 0} registros`}
            LeftSideComponent={<TaskFilter />}
            RightSideComponent={tableContent}
            isCollapsed={isCollapsed}
            setIsCollapsed={setIsCollapsed}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Registros
