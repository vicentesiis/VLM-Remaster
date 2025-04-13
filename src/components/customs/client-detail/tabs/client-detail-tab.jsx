import PropTypes from "prop-types"
import React from "react"
import { CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { H3, PLead, ListStyle } from "@/components/ui/typography"

export const ClientDetailTab = ({ sections }) => {
  const groupIntoPairs = (content) => {
    return content.reduce((acc, _, i) => {
      if (i % 2 === 0) acc.push(content.slice(i, i + 2))
      return acc
    }, [])
  }

  return (
    <div>
      {sections.map((section, sectionIndex) => {
        const content = [...section.content]
        const commentsIndex = content.findIndex(
          (item) => item.label.toLowerCase() === "comentarios"
        )
        const comments =
          commentsIndex !== -1 ? content.splice(commentsIndex, 1)[0] : null

        return (
          <div key={sectionIndex} className="space-y-2">
            <H3 className={"text-lg"}>{section.title}</H3>
            <Separator />

            <CardContent className="space-y-3 px-0 sm:px-4">
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
                      <PLead className={"text-sm"}>{detail.label}:</PLead>
                      <ListStyle className="text-sm font-bold">
                        {detail.value || "—"}
                      </ListStyle>
                    </div>
                  ))}
                </div>
              ))}

              {/* Comentarios */}
              {comments && (
                <div className="pt-4">
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-16">
                    <PLead className={"text-sm"}>{comments.label}:</PLead>
                    <ListStyle className="text-sm font-bold">
                      {comments.value || "—"}
                    </ListStyle>
                  </div>
                </div>
              )}
            </CardContent>
          </div>
        )
      })}
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
        })
      ).isRequired,
    })
  ).isRequired,
}

export default ClientDetailTab
