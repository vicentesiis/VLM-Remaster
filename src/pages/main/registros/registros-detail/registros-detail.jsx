import React from "react"
import { useParams } from "react-router-dom"
import RegistrosDetailHeader from "./registros-detail-header"
import PageLayout from "@/components/customs/layout/page-layout"
import { useGetRecordById } from "@/hooks/queries/useRecord"

export const RegistrosDetail = () => {
  const { public_id } = useParams()
  const { data: registro, isLoading, isError } = useGetRecordById(public_id)

  if (isLoading) return <div>Cargando...</div>
  if (isError || !registro) return <div>Error al cargar el registro</div>

  return (
    <PageLayout title={`Registro:`} subtitle={registro.name}>
      <RegistrosDetailHeader registro={registro} />
      {/* Aquí se van a agregar más componentes o lógica para mostrar detalles del registro */}
    </PageLayout>
  )
}

export default RegistrosDetail
