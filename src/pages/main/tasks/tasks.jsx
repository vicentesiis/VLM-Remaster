import React from "react"
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardSubTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { TasksTable } from "@/components/table-data/tasks-table"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { FancyMultiSelect } from "@/components/customs/fancy-multi-select"
import PageLayout from "@/components/customs/page-layout"

export const Tasks = () => {
  return (
    <PageLayout title="Tareas">
      <Card className="mx-auto max-w-screen-xl px-4">
        <CardContent className="p-8">
          <CardSubTitle>Tareas encontradas: 23</CardSubTitle>
          <div className="flex justify-between flex-row space-x-24 py-4">
            <Input placeholder="Filtrar tareas" className="max-w-sm" />
            <FancyMultiSelect  />
          </div>
          <TasksTable />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Tasks
