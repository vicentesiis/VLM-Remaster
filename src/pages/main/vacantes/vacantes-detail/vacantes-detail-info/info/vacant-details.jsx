import PropTypes from "prop-types"
import React from "react"
import { CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { H3 } from "@/components/ui/typography"

const VacantDetails = ({ vacant }) => {
  const { description, responsibilities, requirements, translated } = vacant

  return (
    <div>
      <H3 className="text-xl">Detalles del Puesto</H3>
      <Separator className="w-80" />
      <CardContent className="space-y-4 px-0 sm:px-4">
        {translated ? (
          <>
            {description && (
              <div>
                <h4 className="font-semibold">Descripción</h4>
                <p className="text-md text-gray-700">{description}</p>
              </div>
            )}
            {responsibilities?.length > 0 && (
              <div>
                <h4 className="font-semibold">Responsabilidades</h4>
                <ul className="list-inside list-disc text-md text-gray-700">
                  {responsibilities.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
            {requirements?.length > 0 && (
              <div>
                <h4 className="font-semibold">Requisitos</h4>
                <ul className="list-inside list-disc text-md text-gray-700">
                  {requirements.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="flex justify-center">
            <div className="space-y-2 text-center">
              <p className="text-lg text-gray-500">
                Esta vacante aún no ha sido traducida.
              </p>
              {/* Optional: add translate button here */}
            </div>
          </div>
        )}
      </CardContent>
    </div>
  )
}

VacantDetails.propTypes = {
  vacant: PropTypes.object.isRequired,
}

export default VacantDetails
