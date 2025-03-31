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
      <div >
        <CollapsibleComponentGroup title={"Filtro"}>
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
          <CheckboxList title="Estatus" options={options} />
        </CollapsibleComponentGroup>
        <div className="flex justify-end sm:mt-8">
          <Button>Aplicar</Button>
        </div>
      </div>
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
