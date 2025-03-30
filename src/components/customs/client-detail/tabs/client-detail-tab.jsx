import PropTypes from "prop-types"
import React from "react"
import { CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { H3, PLead, Lead } from "@/components/ui/typography"

export const ClientDetailTab = ({ sections }) => {
  const groupIntoPairs = (content) => {
    return content.reduce((acc, _, i) => {
      if (i % 2 === 0) acc.push(content.slice(i, i + 2))
      return acc
    }, [])
  }

  return (
    <div>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="space-y-4">
          <H3>{section.title}</H3>
          <Separator />

          <CardContent className="space-y-6 px-0 sm:px-5">
            {groupIntoPairs(section.content).map((row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex flex-col sm:flex-row sm:items-center"
              >
                {row.map((detail, index) => (
                  <div
                    key={index}
                    className="flex flex-row justify-between py-2 sm:w-1/2 sm:items-center sm:py-0 sm:pr-16"
                  >
                    <PLead className="">{detail.label}:</PLead>
                    <Lead className="text-right font-semibold sm:text-lg">
                      {detail.value || "—"}
                    </Lead>
                  </div>
                ))}
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
        })
      ).isRequired,
    })
  ).isRequired,
}

export default ClientDetailTab
