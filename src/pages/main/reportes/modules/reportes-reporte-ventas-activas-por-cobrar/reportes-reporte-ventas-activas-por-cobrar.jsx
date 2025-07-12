import React from "react"
import { useSalesReceivable } from "./hooks/useSalesReceivable"
import SalesReceivableCard from "./sales-receivable-card"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatCurrency } from "@/utils"

const ReportesReporteVentasActivasPorCobrar = () => {
  const { isAgent } = useCurrentUser()
  const { data, total_to_be_collected } = useSalesReceivable()

  return (
    <PageLayout
      title="Ventas activas por cobrar"
      subtitle={!isAgent ? formatCurrency(total_to_be_collected) : ""}
    >
      <div className="grid gap-4">
        {data.map((entry) => (
          <SalesReceivableCard key={entry.username} {...entry} />
        ))}
      </div>
    </PageLayout>
  )
}

export default ReportesReporteVentasActivasPorCobrar
