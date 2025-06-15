import PropTypes from "prop-types"
import React from "react"
import RegistroDialog from "@/components/customs/dialogs/registro-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { H3, PLead, ListStyle } from "@/components/ui/typography"

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
    contacted,
    comments,
    user,
  } = registro

  const formatDate = (isoDate) =>
    isoDate ? new Date(isoDate).toLocaleDateString("es-MX") : "N/A"

  const sections = [
    {
      title: "Información del Registro",
      content: [
        { label: "Nombre", value: toTitleCase(name) },
        { label: "Fecha de Nacimiento", value: formatDate(date_of_birth) },
        { label: "Teléfono", value: phone },
        { label: "e-mail", value: email?.toLowerCase() },
        { label: "Nacionalidad", value: toTitleCase(nationality) },
        { label: "Estado de Residencia", value: toTitleCase(state) },
        { label: "CURP", value: curp?.toUpperCase() },
        { label: "Pasaporte", value: passport },
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
        { label: "Fecha de Asignación", value: formatDate(assignment_date) },
        { label: "Fecha de Salida", value: formatDate(exit_date) },
        { label: "Fecha de Finalización", value: formatDate(end_date) },
        { label: "Contactado", value: contacted ? "Sí" : "No" },
        { label: "Comentarios", value: comments },
      ],
    },
  ]

  const groupIntoPairs = (content) =>
    content.reduce((acc, _, i) => {
      if (i % 2 === 0) acc.push(content.slice(i, i + 2))
      return acc
    }, [])

  return (
    <Card className="relative">
      <div className="absolute right-0 z-10 sm:right-4 sm:top-4">
        <RegistroDialog mode="edit" recordToEdit={registro} />
      </div>
      <CardContent className="flex flex-col gap-4 px-4 py-6 sm:px-8">
        {sections.map((section, sectionIndex) => {
          const content = [...section.content]
          const commentsIndex = content.findIndex(
            (item) => item.label.toLowerCase() === "comentarios"
          )
          const comments =
            commentsIndex !== -1 ? content.splice(commentsIndex, 1)[0] : null

          return (
            <div key={sectionIndex} className="space-y-2">
              <H3 className="text-lg">{section.title}</H3>
              <Separator />
              <CardContent className="space-y-4 px-0 sm:px-4">
                {groupIntoPairs(content).map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex flex-col sm:flex-row sm:items-center"
                  >
                    {row.map((detail, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-between py-2 sm:w-1/2 sm:items-center sm:py-0 sm:pr-16"
                      >
                        <PLead className="text-sm">{detail.label}:</PLead>
                        <ListStyle className="text-sm font-bold">
                          {detail.value || "N/A"}
                        </ListStyle>
                      </div>
                    ))}
                  </div>
                ))}

                {/* Comentarios */}
                {comments && (
                  <div className="pt-2">
                    <div className="flex flex-col gap-4 sm:flex-row sm:gap-16">
                      <PLead className="text-sm">{comments.label}:</PLead>
                      <ListStyle className="text-sm font-bold">
                        {comments.value || "---"}
                      </ListStyle>
                    </div>
                  </div>
                )}
              </CardContent>
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

RegistrosDetailInfo.propTypes = {
  registro: PropTypes.any.isRequired,
}

export default RegistrosDetailInfo
