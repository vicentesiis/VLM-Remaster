import React from "react"
import { CardHeader, CardTitle, CardSubTitle } from "@/components/ui/card"

export const CardHeaderSection = ({
  title,
  titleHelper,
  subTitle,
  actions,
}) => {
  return (
    <CardHeader>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex flex-row items-center gap-2">
            {title}
            {titleHelper && <CardSubTitle>{titleHelper}</CardSubTitle>}
          </CardTitle>
          <CardTitle className="font-semibold leading-none tracking-tight">{subTitle}</CardTitle>
        </div>
        {actions && <div className="flex flex-wrap gap-4">{actions}</div>}
      </div>
    </CardHeader>
  )
}

export default CardHeaderSection
