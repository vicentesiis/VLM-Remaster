import React from "react"
import { toast } from "sonner"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import { Card, CardContent } from "@/components/ui"
import { DataTable } from "@/components/data-table"
import { useFinalizedReportTable } from "../hooks/useFinalizedTable"
import { groupConfig } from "@/components/customs/filter/filter-config"

const ReporteReporteRecordFinalizado = () => {
  const {
    table,
    isFetching,
    isError,
    isFetched,
    showFilters,
    values,
    onChange,
    listOfGroups,
    isSuperAdmin,
    handleSearch,
  } = useFinalizedReportTable()

  return (
    <PageLayout title="Reporte de Registros Finalizados">
      <Card>
        <CardContent>
          <SectionHeader
            title="Registros Finalizados"
            className="pb-6"
            actions={
              showFilters && (
                <FilterToolbar
                  filterConfig={listOfGroups.length ? [groupConfig] : []}
                  values={values}
                  onChange={onChange}
                  context={{ groups: listOfGroups }}
                  onSearch={handleSearch}
                  isLoading={isFetching}
                />
              )
            }
          />

          <DataTable
            table={table}
            isLoading={isFetching}
            isError={isError}
            hasFetched={isFetched}
            showPagination={false}
          />
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReporteReporteRecordFinalizado