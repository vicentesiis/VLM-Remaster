import React from "react"
import { useParams } from "react-router-dom"
import RegistrosDetailHeader from "./registros-detail-header"
import RegistrosDetailInfo from "./registros-detail-info"
import RegistrosOrders from "./registros-orders"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { useGetRecordById } from "@/hooks/queries/useRecord"

export const RegistrosDetail = () => {
  const { public_id } = useParams()
  const { data: registro, isLoading, isError } = useGetRecordById(public_id)

  return (
    <PageLayout
      title="Registro"
      subtitle={registro ? registro.name : isLoading ? "Cargando..." : ""}
    >
      <WithStatusState isLoading={isLoading} isError={isError}>
        <div className="mb-4 flex flex-col gap-4">
          <RegistrosDetailHeader registro={registro} />
          <div className="flex flex-col gap-4">
            <RegistrosDetailInfo registro={registro} />
            <RegistrosOrders registro={registro} />
          </div>
        </div>
      </WithStatusState>
    </PageLayout>
  )
}

export default RegistrosDetail
