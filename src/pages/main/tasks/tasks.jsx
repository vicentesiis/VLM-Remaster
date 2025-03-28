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
import { TasksTable } from "@/components/customs/table-data/tasks-table"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { FancyMultiSelect } from "@/components/customs/fancy-multi-select"
import PageLayout from "@/components/customs/page-layout"
import { SearchIcon } from "lucide-react"

export const Tasks = () => {
  return (
    <PageLayout title="Tareas">
      <Card className="mx-auto max-w-screen-xl">
        <CardContent className="py-6 sm:-mt-2 sm:p-8">
          <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-x-16 sm:space-y-0">
            <div className="flex flex-col space-y-2 sm:grow sm:flex-row sm:items-center sm:space-x-4">
              <div className="flex w-full max-w-sm items-center rounded-md border border-input px-2.5 py-1.5">
                <SearchIcon className="mr-2.5 h-4 w-4" />
                <Input
                  type="search"
                  placeholder="Buscar tareas"
                  className="border-0 shadow-none lg:w-96"
                />
              </div>
              <FancyMultiSelect className="lg:w-96" />
            </div>
            <div className="flex justify-end">
              <Button>Buscar</Button>
            </div>
          </div>
          {/* ToDo: Appear when the user press Buscar */}
          {/* <CardSubTitle className="mb-4">Tareas encontradas: 23</CardSubTitle> */}
          <TasksTable />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default Tasks
