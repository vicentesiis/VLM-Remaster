import React from "react"
import { Download } from "lucide-react"
import { useCorteTable } from "../hooks/useCorteTable"
import PageLayout from "@/components/customs/page-layout/page-layout"
import SectionHeader from "@/components/customs/section-header"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { DataTable } from "@/components/data-table"
import { Card, CardContent } from "@/components/ui"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/utils"

// 👉 Header separado para mostrar totales y filtro
const HeaderSection = ({
  values,
  onChange,
  listOfGroups,
  listOfUsers,
  filterConfig,
  handleSearch,
  showFilters,
  isFetching,
  searchTriggered,
  totalAmount,
  totalOrders,
  handleDownloadCutOff,
  isDownloading,
  orders,
}) => {
  const totalSales = `Total de ventas: ${formatCurrency(totalAmount, 'USD')}`
  const totalOrdersString = `${totalOrders} Órdenes`

  return (
    <SectionHeader
      extra={searchTriggered ? totalSales : ""}
      subtitle={searchTriggered ? totalOrdersString : ""}
      emptyMessage={!searchTriggered ? "Aplica filtros para generar el reporte" : ""}
      highlightPositive={searchTriggered && totalAmount > 0}
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

            {searchTriggered && (
              <Button
                onClick={handleDownloadCutOff}
                disabled={orders.length === 0 || isDownloading}
                variant="outline"
                isLoading={isDownloading}
              >
                <Download className="mr-2 h-4 w-4" />
                Generar corte
              </Button>
            )}
          </div>
        )
      }
    />
  )
}

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
    searchTriggered,
    handleDownloadCutOff,
    orders,
    isDownloading,
    totalAmount,
    totalOrders,
  } = useCorteTable()

  return (
    <PageLayout title="Corte por agente">
      <Card>
        <CardContent>
          <HeaderSection
            values={values}
            onChange={onChange}
            listOfGroups={listOfGroups}
            listOfUsers={listOfUsers}
            filterConfig={filterConfig}
            handleSearch={handleSearch}
            showFilters={showFilters}
            isFetching={isFetching}
            searchTriggered={searchTriggered}
            totalAmount={totalAmount}
            totalOrders={totalOrders}
            handleDownloadCutOff={handleDownloadCutOff}
            isDownloading={isDownloading}
            orders={orders}
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

export default ReporteReporteCorteAgente