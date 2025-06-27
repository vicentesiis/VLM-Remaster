import PropTypes from "prop-types"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { H3 } from "@/components/ui/typography"
import { Separator } from "@/components/ui/separator"
import { formatDate, toTitleCase } from "@/utils"

export const VacantesDetailInfo = ({ vacant }) => {
  const {
    description,
    responsibilities,
    requirements,
    url,
    positions,
    end_date,
    employer_name,
    employer_email,
    employer_phone,
    id,
    original_title,
    category,
    visa_class,
    rate,
    rate_description,
    currency,
    location_city_town,
    location_state_province,
    country,
    translated,
  } = vacant

  return (
    <Card>
      <CardContent className="relative grid grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 sm:px-8">
        {/* Información General */}
        <div>
          <H3 className="text-lg">Información General</H3>
          <Separator className="w-48" />
          <CardContent className="space-y-3 px-0 text-sm text-gray-700 sm:px-4">
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
          </CardContent>
        </div>

        {/* Separator vertical */}
        <Separator
          orientation="vertical"
          className="absolute left-1/2 top-0 hidden h-full -translate-x-[70px] sm:block"
        />

        {/* Detalles del Puesto */}
        <div>
          <H3 className="text-lg">Detalles del Puesto</H3>
          <Separator className="w-48" />
          <CardContent className="space-y-4 px-0 sm:px-4">
            {translated ? (
              <>
                {description && (
                  <div>
                    <h4 className="font-semibold">Descripción</h4>
                    <p className="text-sm text-gray-700">{description}</p>
                  </div>
                )}
                {responsibilities?.length > 0 && (
                  <div>
                    <h4 className="font-semibold">Responsabilidades</h4>
                    <ul className="list-inside list-disc text-sm text-gray-700">
                      {responsibilities.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {requirements?.length > 0 && (
                  <div>
                    <h4 className="font-semibold">Requisitos</h4>
                    <ul className="list-inside list-disc text-sm text-gray-700">
                      {requirements.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
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
              </>
            ) : (
              <div className="flex justify-center">
                <div className="space-y-2 text-center">
                  <p className="text-lg text-gray-500">
                    Esta vacante aún no ha sido traducida.
                  </p>
                  {/* <Button onClick={onTranslate}>Traducir vacante</Button> */}
                </div>
              </div>
            )}
          </CardContent>
        </div>
      </CardContent>
    </Card>
  )
}

VacantesDetailInfo.propTypes = {
  vacant: PropTypes.any,
}

export default VacantesDetailInfo
