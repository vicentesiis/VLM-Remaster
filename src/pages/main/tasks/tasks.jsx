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

export const Tasks = () => {
  return (
    <Card className="mx-auto max-w-screen-xl px-4">
      <CardHeader>
        <CardTitle className="mb-2">Tareas</CardTitle>
        <CardSubTitle> Sub Tareas </CardSubTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center py-4">
          <Input placeholder="Filtrar tareas" className="max-w-sm" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Estatus <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuCheckboxItem key="a">Test</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem key="b">
                Test 2
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem key="c">
                Test 3
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <TasksTable />
      </CardContent>
    </Card>
  )
}

export default Tasks
