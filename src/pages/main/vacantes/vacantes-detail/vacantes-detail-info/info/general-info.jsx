import PropTypes from "prop-types"
import React from "react"
import { CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { H3 } from "@/components/ui/typography"
import { formatDate, toTitleCase } from "@/utils"

const GeneralInfo = ({ vacant }) => {
  const {
    id,
    original_title,
    category,
    visa_class,
    rate,
    currency,
    rate_description,
    location_city_town,
    location_state_province,
    country,
    positions,
    end_date,
    employer_name,
    employer_email,
    employer_phone,
    url,
  } = vacant

  return (
    <div>
      <H3 className="text-xl">Información General</H3>
      <Separator className="w-80" />
      <CardContent className="space-y-2 px-0 text-md text-gray-700 sm:px-4">
        <div>
          <strong>ID:</strong> {id}
        </div>
        <div>
          <strong>Título original:</strong> {original_title}
        </div>
        <div>
          <strong>Categoría:</strong> {category}
        </div>
        <div>
          <strong>Visa:</strong> {visa_class}
        </div>
        <div>
          <strong>Pago:</strong>{" "}
          {rate != null
            ? `${rate} ${currency?.toUpperCase()}/${rate_description}`
            : "No especificado"}
        </div>
        {location_city_town && (
          <div>
            <strong>Ciudad:</strong> {location_city_town}
          </div>
        )}
        {location_state_province && (
          <div>
            <strong>Estado/Provincia:</strong> {location_state_province}
          </div>
        )}
        {country && (
          <div>
            <strong>País:</strong> {toTitleCase(country)}
          </div>
        )}
        <div>
          <strong>Posiciones:</strong> {positions}
        </div>
        {end_date && (
          <div>
            <strong>Fecha límite:</strong> {formatDate(end_date)}
          </div>
        )}
        <div>
          <strong>Empleador:</strong> {employer_name}
        </div>
        {employer_email && (
          <div>
            <strong>Email:</strong>{" "}
            <a
              href={`mailto:${employer_email}`}
              className="text-blue-600 hover:underline"
            >
              {employer_email}
            </a>
          </div>
        )}
        {employer_phone && (
          <div>
            <strong>Teléfono:</strong> {employer_phone}
          </div>
        )}
        {url && (
          <div>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:underline"
            >
              <h4 className="font-semibold">Link de la Vacante</h4>
            </a>
          </div>
        )}
      </CardContent>
    </div>
  )
}

GeneralInfo.propTypes = {
  vacant: PropTypes.object.isRequired,
}

export default GeneralInfo
