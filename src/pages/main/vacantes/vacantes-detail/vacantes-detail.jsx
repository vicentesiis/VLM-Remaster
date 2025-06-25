import React from "react"
import { useParams } from "react-router-dom"
import VacantesDetailHeader from "./vacantes-detail-header"
import VacantesDetailInfo from "./vacantes-detail-info"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import { useGetVacantDetail } from "@/hooks/queries/useVacants"

export const VacantesDetail = () => {
  const { id } = useParams()
  const { data: vacant, isLoading, isError } = useGetVacantDetail(id)

  const onTranslate = () => {
    console.log("onTranslate")
  }

  return (
    <PageLayout
      title="Vacante:"
      subtitle={vacant ? vacant.id : isLoading ? "Cargando..." : ""}
    >
      <WithStatusState isLoading={isLoading} isError={isError}>
        <div className="mb-4 flex flex-col gap-4">
          <VacantesDetailHeader vacant={vacant} onTranslate={onTranslate} />
          <div className="flex flex-col gap-4">
            <VacantesDetailInfo vacant={vacant} />
          </div>
        </div>
      </WithStatusState>
    </PageLayout>
  )
}

export default VacantesDetail
