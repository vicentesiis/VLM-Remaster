import PropTypes from "prop-types"
import React from "react"
import { CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { H3, PLead, Lead } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export const ClientDetailTab = ({ sections }) => {
  // Divide los datos en pares, pero si un campo tiene fullWidth, lo mete solo
  const groupWithFullWidth = (content) => {
    const grouped = []
    let i = 0

    while (i < content.length) {
      const current = content[i]
      if (current.fullWidth) {
        grouped.push([current])
        i += 1
      } else {
        const next = content[i + 1]
        if (next && !next.fullWidth) {
          grouped.push([current, next])
          i += 2
        } else {
          grouped.push([current])
          i += 1
        }
      }
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
            {groupWithFullWidth(section.content).map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-col sm:flex-row sm:items-start"
              >
                {row.map((detail, index) => {
                  const isFull = detail.fullWidth
                  return (
                    <div
                      key={index}
                      className={cn(
                        "flex flex-col sm:w-1/2 sm:flex-row sm:items-start sm:py-0 sm:pr-16",
                        detail.fullWidth && "sm:w-full"
                      )}
                    >
                      <PLead className="whitespace-nowrap sm:mr-2">
                        {detail.label}:
                      </PLead>
                      <Lead
                        className={cn(
                          "text-left font-semibold sm:text-lg",
                          detail.fullWidth
                            ? "inline-block w-full break-words align-middle leading-snug"
                            : ""
                        )}
                      >
                        {detail.value || "—"}
                      </Lead>
                    </div>
                  )
                })}
              </div>
            ))}
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
