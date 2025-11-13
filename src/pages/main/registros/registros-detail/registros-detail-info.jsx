import PropTypes from "prop-types"
import React from "react"
import ReassingRecordDialog from "@/components/customs/dialogs/reassing-record-dialog"
import RegistroDialog from "@/components/customs/dialogs/registro-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

import { useCurrentUser } from "@/hooks/useCurrentUser"
import { toTitleCase } from "@/utils/utils"

export const RegistrosDetailInfo = ({ registro }) => {
  const {
    name,
    date_of_birth,
    phone,
    email,
    nationality,
    state,
    curp,
    passport,
    channel,
    status,
    program,
    assignment_date,
    exit_date,
    end_date,
    record_type,
    comments,
    user,
    job,
  } = registro

  const { id: currentUserId, isAgent, isAdmin, isSuperAdmin } = useCurrentUser()
  const canUpdateRecord = (currentUserId === user?.id && isAgent) || isAdmin
  const canReassingRecord = isAdmin || isSuperAdmin

  const formatDate = (isoDate) =>
    isoDate ? new Date(isoDate).toLocaleDateString("es-MX") : "-"

  const sections = [
    {
      title: "Información del Registro",
      content: [
        { label: "Nombre", value: toTitleCase(name) },
        { label: "Fecha de Nacimiento", value: formatDate(date_of_birth) },
        { label: "Nacionalidad", value: toTitleCase(nationality) },
        { label: "Teléfono", value: phone },
        { label: "e-mail", value: email?.toLowerCase() },
        { label: "Estado o Departamento de Residencia", value: toTitleCase(state) },
        { label: "Documento de Identidad", value: curp?.toUpperCase() ?? passport?.toUpperCase() ?? "-" },
      ],
    },
    {
      title: "Información de Proceso",
      content: [
        { label: "Agente Asignado", value: toTitleCase(user?.name) },
        { label: "Canal", value: toTitleCase(channel) },
        { label: "Programa", value: toTitleCase(program) },
        { label: "Tipo de Registro", value: toTitleCase(record_type) },
        { label: "Estatus", value: toTitleCase(status) },
        { label: "ID de la Vacante", value: job },
        { label: "Fecha de Asignación", value: formatDate(assignment_date) },
        { label: "Fecha de Salida", value: formatDate(exit_date) },
        { label: "Fecha de Finalización", value: formatDate(end_date) },
        { label: "Comentarios", value: comments },
      ],
    },
  ]

  return (
    <Card className="relative">
      {(canUpdateRecord || canReassingRecord) && (
        <div className="absolute right-0 z-10 space-x-4 sm:right-4 sm:top-4">
          {canReassingRecord && <ReassingRecordDialog record={registro} />}
          {canUpdateRecord && (
            <RegistroDialog mode="edit" recordToEdit={registro} />
          )}
        </div>
      )}
      <CardContent className="flex flex-col gap-6 px-4 py-6 sm:px-8">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h3 className="text-lg font-semibold tracking-tight">
              {section.title}
            </h3>
            <Separator />
            <div className="grid grid-cols-1 gap-x-8 gap-y-4 pt-2 md:grid-cols-2 xl:grid-cols-3">
              {section.content.map((detail, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {detail.label}
                  </p>
                  <span className="text-sm font-semibold leading-relaxed">
                    {detail.value || "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

RegistrosDetailInfo.propTypes = {
  registro: PropTypes.any,
}

export default RegistrosDetailInfo
