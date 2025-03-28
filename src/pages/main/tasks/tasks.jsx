import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TasksTable } from "@/components/customs/table-data/tables/tasks-table"
import PageLayout from "@/components/customs/page-layout"
import { Filter } from "@/components/customs/filter"
import { FilterTableLayout } from "@/components/customs/table-data/filter-table-layout"
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { FancyMultiSelect } from "@/components/customs/fancy-multi-select"
import { InputWithIcon } from "@/components/ui/input"

export const Tasks = () => {
  //   <div className="mb-4 flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-x-16 sm:space-y-0">
  //   <div className="flex flex-col space-y-2 sm:grow sm:flex-row sm:items-center sm:space-x-4">
  //     <div className="flex w-full max-w-sm items-center rounded-md border border-input px-2.5 py-1.5">
  //       <SearchIcon className="mr-2.5 h-4 w-4" />
  //       <Input
  //         type="search"
  //         placeholder="Buscar tareas"
  //         className="border-0 shadow-none lg:w-96"
  //       />
  //     </div>
  //     <FancyMultiSelect className="lg:w-96" />
  //   </div>
  //   <div className="flex justify-end">
  //     <Button>Buscar</Button>
  //   </div>
  // </div>
  function TaskFilter() {
    return (
      <Filter>
        <InputWithIcon icon={SearchIcon} placeholder="Buscar Tareas"  />
        <FancyMultiSelect />
      </Filter>
    )
  }

  return (
    <PageLayout title="Tareas">
      <Card className="mx-auto max-w-screen-xl">
        <CardContent className="py-6 sm:-mt-2 sm:p-8">
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
