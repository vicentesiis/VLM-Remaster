import PropTypes from "prop-types"
import React from "react"
import { CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { H3, PLead, Lead } from "@/components/ui/typography"

export const ClientDetailTab = ({ sections }) => {
  const groupIntoPairsWithCommentsLast = (content) => {
    const normalFields = content.filter(
      (item) => !(item.fullWidth || item.label === "Comentarios")
    )
    const commentField = content.find(
      (item) => item.fullWidth || item.label === "Comentarios"
    )

    const grouped = normalFields.reduce((acc, _, i) => {
      if (i % 2 === 0) acc.push(normalFields.slice(i, i + 2))
      return acc
    }, [])

    if (commentField) {
      grouped.push([commentField]) // al final
    }

    return grouped
  }

  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <H3>{section.title}</H3>
          <Separator />

          <CardContent className="space-y-6 px-0 sm:px-5">
            {groupIntoPairsWithCommentsLast(section.content).map(
              (row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex flex-col sm:flex-row ${
                    row.length === 1 &&
                    (row[0].fullWidth || row[0].label === "Comentarios")
                      ? "w-full"
                      : ""
                  }`}
                >
           {row.map((detail, index) => {
  const isComment = detail.label === "Comentarios" || detail.fullWidth
  // Limpia los espacios extra y saltos de línea del campo de comentarios
  const cleanedValue = isComment 
    ? detail.value.replace(/\s+/g, " ").trim() // Reemplaza múltiplos espacios y limpia los saltos de línea
    : detail.value

  return (
    <div
      key={index}
      className={`flex sm:flex-row justify-between py-2 ${
        isComment
          ? "sm:w-auto sm:items-center sm:pr-0"  // Ajustamos para que el comentario no ocupe todo el ancho
          : "sm:w-1/2 sm:items-center sm:py-0 sm:pr-16"
      }`}
    >
      <PLead className="mb-1 whitespace-nowrap sm:mb-0 sm:mr-2">
        {detail.label}:
      </PLead>
      <Lead
        className={`${
          isComment
            ? "text-left font-semibold sm:text-base sm:ml-2"  // Alineamos a la izquierda y agregamos un pequeño margen
            : "text-right font-semibold sm:text-lg"
        }`}
      >
        {cleanedValue || "—"}
      </Lead>
    </div>
  )
})}
                </div>
              )
            )}
          </CardContent>
        </div>
      ))}
    </div>
  )
}

ClientDetailTab.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      content: PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          value: PropTypes.string,
          fullWidth: PropTypes.bool,
        })
      ).isRequired,
    })
  ).isRequired,
}

export default ClientDetailTab
