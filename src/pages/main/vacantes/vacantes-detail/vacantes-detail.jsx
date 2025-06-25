import React, { useState } from "react"
import { useParams } from "react-router-dom"
import VacantesDetailHeader from "./vacantes-detail-header"
import VacantesDetailInfo from "./vacantes-detail-info"
import PageLayout from "@/components/customs/page-layout/page-layout"
import { WithStatusState } from "@/components/customs/status-state/with-status-state"
import {
  useGetVacantDetail,
  useGetVacantDetailTranslated,
} from "@/hooks/queries/useVacants"

export const VacantesDetail = () => {
  const { id } = useParams()
  const { data: vacant, isLoading, isError } = useGetVacantDetail(id)

  const [showTranslated, setShowTranslated] = useState(false)
  const {
    data: vacantTranslated,
    isLoading: isLoadingTranslated,
    isError: isErrorTranslated,
    refetch: fetchTranslated,
  } = useGetVacantDetailTranslated(id, { enabled: false })

  const onTranslate = async () => {
    const result = await fetchTranslated()
    if (result.data) {
      setShowTranslated(true)
    }
  }

  const currentVacant = showTranslated ? vacantTranslated : vacant
  const currentLoading = showTranslated ? isLoadingTranslated : isLoading
  const currentError = showTranslated ? isErrorTranslated : isError

  return (
    <PageLayout
      title="Vacante:"
      subtitle={
        currentVacant ? currentVacant.id : currentLoading ? "Cargando..." : ""
      }
    >
      <WithStatusState isLoading={currentLoading} isError={currentError}>
        <div className="mb-4 flex flex-col gap-4">
          <VacantesDetailHeader
            vacant={currentVacant}
            onTranslate={onTranslate}
            isLoadingTranslated={isLoadingTranslated}
          />
          <div className="flex flex-col gap-4">
            <VacantesDetailInfo vacant={currentVacant} />
          </div>
        </div>
      </WithStatusState>
    </PageLayout>
  )
}

export default VacantesDetail
