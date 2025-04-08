import { SearchIcon } from "lucide-react"
import React, { useState } from "react"
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

export const Clients = () => {
  const ClientsFilter = () => {
    const [selectedCount, setSelectedCount] = useState(0)

    const handleSelectionChange = (count) => {
      setSelectedCount(count)
    }

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
        <CheckboxList
          title="Estatus"
          tagCount={selectedCount}
          options={tasksOptions}
          onSelectionChange={handleSelectionChange}
        />
      </CollapsibleComponentGroup>
    )
  }

  const ClientsTable = () => {
    return <BaseTable data={tasksTableData} tableType={"tasks"} />
  }

  return (
    <PageLayout title="Clientes">
      <Card>
        <CardContent>
          <SplitPane
            title={"Mis Clientes"}
            subTitle={"23 de 40 clientes"}
            LeftSideComponent={ClientsFilter}
            RightSideComponent={ClientsTable}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Clients
