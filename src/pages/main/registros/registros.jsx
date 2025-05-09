import { useQuery } from "@tanstack/react-query"
import { SearchIcon } from "lucide-react"
import React from "react"
import CheckboxList from "@/components/customs/checkbox-list"
import CollapsibleComponentGroup from "@/components/customs/collapsible/collapsible-component-group"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import InputIcon from "@/components/customs/input-icon"
import PageLayout from "@/components/customs/layout/page-layout"
import SplitPane from "@/components/customs/layout/split-pane/split-pane"
import BaseTable from "@/components/customs/table-data/base-table"
import { Card, CardContent } from "@/components/ui/card"
import { RegistrosOptions } from "@/constants/utils-contants"
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
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["registros"],
    queryFn: getRecords,
  })

  function TaskFilter() {
    const { searchQuery, setSearchQuery } = useSearchStore()
    const { dateRange, setDateRange } = useDateRangeStore()
    const { selectedValues, setSelectedValues } = useCheckboxStore()

    return (
      <CollapsibleComponentGroup title={"Filtro"}>
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
          {isLoading ? (
            <div className="text-muted-foreground p-4">Cargando registros...</div>
          ) : isError ? (
            <div className="text-destructive p-4">
              Error al cargar los datos: {error.message}
            </div>
          ) : (
            <SplitPane
              title={"Lista de Registros"}
              subTitle={`${records?.data?.length || 0} registros`}
              LeftSideComponent={<TaskFilter />}
              RightSideComponent={
                <BaseTable data={records.data} tableType={"Registros"} />
              }
            />
          )}
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Registros