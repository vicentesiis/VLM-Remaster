import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import PageLayout from "@/components/customs/page-layout"
import { CollapsibleFilter } from "@/components/customs/collapsible-filter"
import { FilterTableLayout } from "@/components/customs/filter-table-layout"
import { SearchIcon } from "lucide-react"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import InputIcon from "@/components/customs/input-icon"
import { H3Border, PLead, H3 } from "@/components/ui/typography"
import CheckboxList from "@/components/customs/checkbox-list"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import BaseTable from "@/components/customs/table-data/base-table"
import tasksTableData from "@/data/tasks-table-data"

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
        <div className="flex justify-end sm:mt-8">
          <Button>Aplicar</Button>
        </div>
      </div>
    )
  }

  function TaskTable() {
    return <BaseTable data={tasksTableData} />
  }

  return (
    <PageLayout title="Tareas">
      <Card className="mx-auto max-w-screen-xl sm:pt-6">
        <CardContent className="sm:-mt-2 sm:px-8">
          <FilterTableLayout
            FilterComponent={TaskFilter}
            TableComponent={TaskTable}
            tableTitle={"Lista de Tareas"}
            helperTitle={"23 de 23 Tareas"}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Tasks
