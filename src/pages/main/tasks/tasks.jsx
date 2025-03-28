import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TasksTable } from "@/components/customs/table-data/tables/tasks-table"
import PageLayout from "@/components/customs/page-layout"
import { Filter } from "@/components/customs/filter"
import { FilterTableLayout } from "@/components/customs/table-data/filter-table-layout"
import { SearchIcon } from "lucide-react"
import { FancyMultiSelect } from "@/components/customs/fancy-multi-select"
import { DateRangePicker } from "@/components/customs/date-range-picker/date-range-picker"
import InputIcon from "@/components/customs/input-icon"

export const Tasks = () => {
  function TaskFilter() {
    return (
      <Filter>
        <InputIcon placeholder={"Buscar"} icon={SearchIcon} />
        <DateRangePicker
          onUpdate={(values) => console.log(values)}
          locale="en-GB"
          showCompare={false}
        />
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
