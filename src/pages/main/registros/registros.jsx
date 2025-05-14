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
import { useDisplayStatus } from "@/hooks/useDisplayStatus"
import useResetStoresOnRouteChange from "@/hooks/useResetStoresOnRouteChange"
import { getRecords } from "@/services/recordsService"
import {
  useSearchStore,
  useDateRangeStore,
  useCheckboxStore,
} from "@/store/filterInputsStore"

export const Registros = () => {
  useResetStoresOnRouteChange()

  const {
    data: records,
    status,
    refetch,
  } = useQuery({
    queryKey: ["registros"],
    queryFn: getRecords,
    enabled: false,
  })

  const displayStatus = useDisplayStatus(status, records?.data)

  const tableContent =
    displayStatus === "success" ? (
      <BaseTable data={records?.data} tableType="Registros" />
    ) : (
      <DataLoader status={displayStatus} />
    )

  function TaskFilter() {
    const { searchQuery, setSearchQuery } = useSearchStore()
    const { dateRange, setDateRange } = useDateRangeStore()
    const { selectedValues, setSelectedValues } = useCheckboxStore()

    return (
      <CollapsibleComponentGroup title={"Filtro"} onApply={refetch}>
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
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Registros
