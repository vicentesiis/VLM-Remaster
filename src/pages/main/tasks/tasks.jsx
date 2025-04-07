import { SearchIcon } from "lucide-react"
import React from "react"
import CheckboxList from "@/components/customs/checkbox-list"
import CollapsibleComponentGroup from "@/components/customs/collapsible/collapsible-component-group"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import InputIcon from "@/components/customs/input-icon"
import PageLayout from "@/components/customs/page-layout"
import SplitPane from "@/components/customs/split-pane"
import BaseTable from "@/components/customs/table-data/base-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { tasksOptions } from "@/constants/utils-contants"
import tasksTableData from "@/data/tasks-table-data"

export const Tasks = () => {
  function TaskFilter() {
    return (
      <CollapsibleComponentGroup
        title={"Filtro"}
        footer={<Button>Aplicar</Button>}
      >
        <InputIcon
          title="Buscar"
          alwaysOpen={true}
          placeholder={"Buscar"}
          icon={SearchIcon}
        />
        <DateRangePicker
          title="Rango de Fechas"
          locale="es-MX"
          showCompare={false}
        />
        <CheckboxList title="Estatus" options={tasksOptions} />
      </CollapsibleComponentGroup>
    )
  }

  function TaskTable() {
    return <BaseTable data={tasksTableData} tableType={"tasks"} />
  }

  return (
    <PageLayout title="Tareas">
      <Card>
        <CardContent>
          <SplitPane
            title={"Lista de Tareas"}
            subTitle={"12 de 23 Tareas"}
            LeftSideComponent={TaskFilter}
            RightSideComponent={TaskTable}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Tasks
