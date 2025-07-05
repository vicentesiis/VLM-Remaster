import React from "react"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import { Card, CardContent } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { DataTable } from "@/components/data-table"
import { useCorteTable } from "../hooks/useCorteTable"

export const ReporteReporteCorteAgente = () => {
  const {
    table,
    isFetching,
    isError,
    isFetched,
    values,
    onChange,
    listOfUsers,
    listOfGroups,
    filterConfig,
    handleSearch,
    showFilters,
    handleDownloadCutOff,
    isDownloading,
  } = useCorteTable()

  return (
    <PageLayout title="Reporte de Corte por Agente">
      <Card>
        <CardContent>
          <SectionHeader
            title="Información del Agente"
            className="pb-6"
            actions={
              showFilters && (
                <div className="flex items-center gap-2">
                  <FilterToolbar
                    filterConfig={filterConfig}
                    values={values}
                    onChange={onChange}
                    context={{
                      ...(listOfGroups.length ? { groups: listOfGroups } : {}),
                      users: listOfUsers,
                    }}
                    onSearch={handleSearch}
                    isLoading={isFetching}
                  />
                  <Button
                    onClick={handleDownloadCutOff}
                    disabled={!values.user_id || isDownloading}
                    variant="outline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {isDownloading ? "Descargando..." : "Descargar Corte"}
                  </Button>
                </div>
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

export default ReporteReporteCorteAgente