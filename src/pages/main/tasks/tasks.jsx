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
import { tasksOptions } from "@/constants/utils-contants"
import tasksTableData from "@/data/tasks-table-data"
import useResetStoresOnRouteChange from "@/hooks/useResetStoresOnRouteChange"
import {
  useSearchStore,
  useDateRangeStore,
  useCheckboxStore,
} from "@/store/filterInputsStore"

export const Tasks = () => {
  useResetStoresOnRouteChange()
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
          options={tasksOptions}
          selectedValues={selectedValues}
          onCheckedChange={setSelectedValues}
        />
      </CollapsibleComponentGroup>
    )
  }

  return (
    <PageLayout title="Tareas">
      <Card>
        <CardContent>
          <SplitPane
            title={"Lista de Tareas"}
            subTitle={"12 de 23 Tareas"}
            LeftSideComponent={<TaskFilter />}
            RightSideComponent={
              <BaseTable data={tasksTableData} tableType={"tasks"} />
            }
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Tasks
