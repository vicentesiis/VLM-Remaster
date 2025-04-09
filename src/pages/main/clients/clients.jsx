import { SearchIcon } from "lucide-react"
import React from "react"
import { CheckboxList, InputIcon } from "@/components/customs"
import { CollapsibleComponentGroup } from "@/components/customs/collapsible/collapsible-component-group"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import PageLayout from "@/components/customs/page-layout"
import { SplitPane } from "@/components/customs/split-pane"
import { BaseTable } from "@/components/customs/table-data"
import { Button } from "@/components/ui"
import { Card, CardContent } from "@/components/ui/card"
import { tasksOptions } from "@/constants/utils-contants"
import { tasksTableData } from "@/data"
import {
  useSearchStore,
  useDateRangeStore,
  useCheckboxStore,
} from "@/store/filterInputsStore"

export const Clients = () => {
  const ClientsFilter = () => {
    const { searchQuery, setSearchQuery } = useSearchStore()
    const { dateRange, setDateRange } = useDateRangeStore()
    const { selectedValues, setSelectedValues } = useCheckboxStore()

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
    <PageLayout title="Clientes">
      <Card>
        <CardContent>
          <SplitPane
            title={"Mis Clientes"}
            subTitle={"23 de 40 clientes"}
            LeftSideComponent={<ClientsFilter />}
            RightSideComponent={
              <BaseTable data={tasksTableData} tableType={"tasks"} />
            }
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Clients
