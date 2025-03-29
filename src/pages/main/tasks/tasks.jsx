import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TasksTable } from "@/components/customs/table-data/tables/tasks-table"
import PageLayout from "@/components/customs/page-layout"
import { CollapsibleFilter } from "@/components/customs/collapsible-filter"
import { FilterTableLayout } from "@/components/customs/table-data/filter-table-layout"
import { SearchIcon } from "lucide-react"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import InputIcon from "@/components/customs/input-icon"
import { H3Border, PLead } from "@/components/ui/typography"
import CheckboxList from "@/components/customs/checkbox-list"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export const Tasks = () => {
  const options = [
    {
      name: "creado",
      label: "Creado",
    },
    {
      name: "importado",
      label: "Importado",
    },
    {
      name: "información Pendiente",
      label: "Información Pendiente",
    },
    {
      name: "generar Referencia",
      label: "Generar Referencia",
    },
    {
      name: "generar Contrato",
      label: "Generar Contrato",
    },
    {
      name: "contrato Generado",
      label: "Contrato Generado",
    },
  ]

  function TaskFilter() {
    return (
      <div className="flex flex-col">
        <H3Border>Filtros</H3Border>
        <CollapsibleFilter title="Búsqueda" open={true} showChevrown={false}>
          <InputIcon placeholder={"Buscar"} icon={SearchIcon} />
        </CollapsibleFilter>
        <CollapsibleFilter
          className="flex flex-col gap-4"
          title="Rango de Fechas"
        >
          <DateRangePicker locale="es-MX" showCompare={false} />
        </CollapsibleFilter>
        <Separator className="sm:h-0" />
        <CollapsibleFilter title="Estatus de la Tarea">
          <CheckboxList options={options} />
        </CollapsibleFilter>
        <div className="sm:mt-8 flex justify-end">
          <Button>Aplicar</Button>
        </div>
      </div>
    )
  }

  return (
    <PageLayout title="Tareas">
      <Card className="mx-auto max-w-screen-xl sm:pt-6">
        <CardContent className="sm:-mt-2 sm:px-8">
          <FilterTableLayout
            FilterComponent={TaskFilter}
            TableComponent={TasksTable}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Tasks
