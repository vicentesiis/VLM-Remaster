import {
  HashIcon,
  BriefcaseIcon,
  GlobeIcon,
  DollarSignIcon,
  UsersIcon,
  BadgeInfoIcon,
} from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import IconBadge from "@/components/customs/badge/icon-badge"
import { Badge, Button } from "@/components/ui"
import { Card, CardHeader, CardTitle, CardSubTitle } from "@/components/ui/card"
import { toTitleCase } from "@/utils"

export const VacantesDetailHeader = ({
  vacant,
  onTranslate,
  isLoadingTranslated,
}) => {
  const {
    id,
    title,
    original_title,
    category,
    visa_class,
    rate,
    rate_description,
    currency,
    positions,
    location_city_town,
    location_state_province,
    country,
    end_date,
    translated,
  } = vacant

  const getBadges = () => {
    return [
      { title: id, icon: HashIcon },
      { title: category, icon: BriefcaseIcon },
      { title: visa_class && `Visa: ${visa_class}`, icon: BadgeInfoIcon },
      {
        title:
          rate != null
            ? `Pago: ${rate} ${currency?.toUpperCase()}/${rate_description}`
            : null,
        icon: DollarSignIcon,
      },
      {
        title: positions != null ? `Posiciones: ${positions}` : null,
        icon: UsersIcon,
      },
      {
        title: [location_city_town, location_state_province, country]
          .filter(Boolean)
          .join(", "),
        icon: GlobeIcon,
      },
    ].filter((badge) => badge.title)
  }

  const getAvailabilityBadge = () => {
    const now = new Date()
    const end = end_date ? new Date(end_date) : null

    if (end && end < now) {
      return <Badge variant="destructive">Caducada</Badge>
    }

    if (positions === 0) {
      return <Badge variant="warning">Sin posiciones</Badge>
    }

    return <Badge variant="success">Disponible</Badge>
  }

  return (
    <Card className="top-0 z-30 sm:sticky">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">
                {title ?? "Sin título (requiere traducción)"}
              </CardTitle>
              {getAvailabilityBadge()}
            </div>
            <CardSubTitle>{toTitleCase(original_title)}</CardSubTitle>

            <div className="flex flex-wrap gap-2">
              {getBadges().map((badge, idx) => (
                <IconBadge
                  key={idx}
                  title={badge.title}
                  icon={badge.icon}
                  variant="outline"
                />
              ))}
            </div>
          </div>

          {/* Button top-right */}
          {!translated && (
            <div className="mt-2 lg:mt-0">
              <Button onClick={onTranslate} isLoading={isLoadingTranslated}>
                Traducir vacante
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}

VacantesDetailHeader.propTypes = {
  isLoadingTranslated: PropTypes.any,
  onTranslate: PropTypes.any,
  vacant: PropTypes.any,
}

export default VacantesDetailHeader
