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
      name: "Creado",
      label: "Creado",
    },
    {
      name: "Información Pendiente",
      label: "Información Pendiente",
    },
    {
      name: "Importado",
      label: "Importado",
    },
    {
      name: "Generar Contrato",
      label: "Generar Contrato",
    },
    {
      name: "Generar Referencia",
      label: "Generar Referencia",
    },
    {
      name: "Corregir Contrato",
      label: "Corregir Contrato",
    },
    {
      name: "Contrato Generado",
      label: "Contrato Generado",
    },
    {
      name: "Pendiente de Aprobación",
      label: "Pendiente de Aprobación",
    },
    {
      name: "Primer Aviso",
      label: "Primer Aviso",
    },
    {
      name: "Eligiendo Fecha de Salida",
      label: "Eligiendo Fecha de Salida",
    },
    {
      name: "Aprobado",
      label: "Aprobado",
    },
    {
      name: "Fecha de Salida Confirmada",
      label: "Fecha de Salida Confirmada",
    },
    {
      name: "Con Fecha de Salida",
      label: "Con Fecha de Salida",
    },
    {
      name: "Temporalmente Inactivo",
      label: "Temporalmente Inactivo",
    },
    {
      name: "Finalizó",
      label: "Finalizó",
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
      <Card>
        <CardContent className="sm:-mt-2 sm:px-2">
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
