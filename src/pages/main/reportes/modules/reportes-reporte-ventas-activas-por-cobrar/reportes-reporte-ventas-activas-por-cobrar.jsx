import React from "react"
import { useSalesReceivable } from "./hooks/useSalesReceivable"
import SalesReceivableCard from "./sales-receivable-card"
import { groupConfig } from "@/components/customs/filter/filter-config"
import FilterToolbar from "@/components/customs/filter/filter-tool-bar"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatCurrency } from "@/utils"

const ReportesReporteVentasActivasPorCobrar = () => {
  const { isAgent, isSuperAdmin } = useCurrentUser()
  const {
    data,
    total_to_be_collected,
    values,
    onChange,
    listOfGroups,
    handleSearch,
    isFetched,
    isFetching,
    isError,
  } = useSalesReceivable()

  return (
    <PageLayout
      title="Ventas activas por cobrar"
      subtitle={
        !isAgent && isFetched ? formatCurrency(total_to_be_collected, 'USD') : ""
      }
    >
      {isSuperAdmin && (
        <div className="relative md:mb-10">
          <div className="absolute right-4 top-0 z-10 md:-top-2 md:right-0">
            <FilterToolbar
              filterConfig={listOfGroups.length ? [groupConfig] : []}
              values={values}
              onChange={onChange}
              context={{ groups: listOfGroups }}
              onSearch={handleSearch}
              isLoading={isFetching}
            />
          </div>
        </div>
      )}

      <WithStatusState
        isLoading={isFetching}
        isError={isError}
        isIdle={!isFetched}
        isEmpty={total_to_be_collected === 0}
      >
        <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
          {data
            .sort((a, b) => b.records.length - a.records.length)
            .map((entry) => (
              <SalesReceivableCard key={entry.username} {...entry} />
            ))}
        </div>
      </WithStatusState>
    </PageLayout>
  )
}

export default ReportesReporteVentasActivasPorCobrar
