import PropTypes from "prop-types"
import React from "react"
import GeneralInfo from "./info/general-info"
import VacantDetails from "./info/vacant-details"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export const VacantesDetailInfo = ({ vacant }) => {
  return (
    <Card>
      <CardContent className="relative grid grid-cols-1 px-4 py-6 sm:grid-cols-2 sm:px-8">
        <GeneralInfo vacant={vacant} />
        <Separator
          orientation="vertical"
          className="absolute left-1/2 top-0 hidden h-full -translate-x-[70px] sm:block"
        />
        <VacantDetails vacant={vacant} />
      </CardContent>
    </Card>
  )
}

VacantesDetailInfo.propTypes = {
  vacant: PropTypes.any,
}

export default VacantesDetailInfo
