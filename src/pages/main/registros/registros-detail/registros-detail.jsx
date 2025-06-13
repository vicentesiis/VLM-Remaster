import React from "react"
import { useParams } from "react-router-dom"
import RegistrosDetailHeader from "./registros-detail-header"
import RegistrosDetailInfo from "./registros-detail-info"
import PageLayout from "@/components/customs/layout/page-layout"
import { useGetRecordById } from "@/hooks/queries/useRecord"

export const RegistrosDetail = () => {
  const { public_id } = useParams()
  const { data: registro, isLoading, isError } = useGetRecordById(public_id)

  if (isLoading) return <div>Cargando...</div>
  if (isError || !registro) return <div>Error al cargar el registro</div>

  return (
    <PageLayout title={`Registro:`} subtitle={registro.name}>
      <div className="mb-4 flex flex-col gap-4">
        <RegistrosDetailHeader registro={registro} />
        <div className="flex flex-col gap-4 sm:gap-8">
          <RegistrosDetailInfo registro={registro} />
          {/* <RegistrosDetailInfo registro={registro} /> */}
        </div>
      </div>
    </PageLayout>
  )
}

export default RegistrosDetail
