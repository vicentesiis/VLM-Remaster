import React from "react"
import { useFinalizedReportTable } from "../hooks/useFinalizedTable"
import { groupConfig } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { DataTable } from "@/components/data-table"
import { Card, CardContent } from "@/components/ui"

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
    handleSearch,
  } = useFinalizedReportTable()

  return (
    <PageLayout title="Reporte de registros finalizados">
      <Card>
        <CardContent>
          <SectionHeader
            title="Registros Finalizados"
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
          <WithStatusState
            isLoading={isFetching}
            isError={isError}
            isIdle={!isFetched} 
          >
            <DataTable
              table={table}
              isLoading={isFetching}
              isError={isError}
              hasFetched={isFetched}
              showPagination={false}
            />
          </WithStatusState>
        </CardContent>
      </Card>
    </PageLayout>
  )
}

export default ReporteReporteRecordFinalizado
