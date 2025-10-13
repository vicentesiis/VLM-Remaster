import * as flags from "country-flag-icons/react/3x2"
import {
  CalendarIcon,
  HashIcon,
  DollarSignIcon,
  BadgeInfoIcon,
  UserIcon,
  MessageCircle,
  ExternalLink,
} from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { toast } from "sonner"
import IconBadge from "@/components/customs/badge/icon-badge"
import StatusBadge from "@/components/customs/badge/status-badge"
import RecordDocumentDropdown from "@/components/customs/record-document-dropdown"
import { SelectUpdateRegistroStatus } from "@/components/customs/select-update-registro-status"
import { Button } from "@/components/ui"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useUpdateRecordStatus } from "@/hooks/queries"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatCurrency, formatDate, toTitleCase } from "@/utils"

// Constants
const WHATSAPP_MESSAGE_TEMPLATE =
  "Hola buen día {NOMBRE_REGISTRO} le saluda {NOMBRE_AGENTE} de AsesoriaLaboralMigratoria.com le escribo porque se registro con nosotros a través de {CANAL} y le interesa laborar en el extranjero. Le comparto su folio de registro: {ID_REGISTRO} le proporcionare mas información sobre nuestros servicios y algunas vacantes que tenemos disponibles para usted."

// Country mapping for flags
const COUNTRY_FLAG_MAP = {
  "argentina": "AR",
  "belice": "BZ",
  "bolivia": "BO",
  "brasil": "BR",
  "chile": "CL",
  "colombia": "CO",
  "costa rica": "CR",
  "república dominicana": "DO",
  "ecuador": "EC",
  "el salvador": "SV",
  "guatemala": "GT",
  "honduras": "HN",
  "méxico": "MX",
  "nicaragua": "NI",
  "panamá": "PA",
  "paraguay": "PY",
  "perú": "PE",
  "uruguay": "UY",
  "venezuela": "VE"
}

// Utility functions
const formatPhoneNumber = (phone) => {
  const phoneNumber = phone?.replace(/\D/g, "")
  return phoneNumber?.length === 10 ? `52${phoneNumber}` : phoneNumber
}

const createWhatsAppMessage = (registro) => {
  const nombreRegistro = toTitleCase(registro?.name || "")
  const nombreAgente = toTitleCase(registro?.user?.name || "Agente")
  const canal = toTitleCase(registro?.channel || "nuestro sitio web")
  const idRegistro = registro?.public_id || registro?.id || ""

  return WHATSAPP_MESSAGE_TEMPLATE.replace("{NOMBRE_REGISTRO}", nombreRegistro)
    .replace("{NOMBRE_AGENTE}", nombreAgente)
    .replace("{CANAL}", canal)
    .replace("{ID_REGISTRO}", idRegistro)
}

const createTrackingUrl = (registro) => {
  const birthDate = new Date(registro.date_of_birth)
  const day = birthDate.getDate()
  const month = birthDate.getMonth() + 1
  const year = birthDate.getFullYear()

  return `https://statusvisas.com/seguimiento?public_id=${registro.public_id}&day=${day}&month=${month}&year=${year}`
}

// Get country flag component
const getCountryFlag = (nationality) => {
  if (!nationality) return null

  const countryCode = COUNTRY_FLAG_MAP[nationality.toLowerCase()]
  if (!countryCode) return null

  const FlagComponent = flags[countryCode]
  return FlagComponent ? <FlagComponent className="h-8 w-10" /> : null
}

export const RegistrosDetailHeader = ({ registro }) => {
  const {
    id,
    name,
    status,
    record_type,
    amount_owed,
    amount_owed_local,
    currency,
    user,
    public_id,
    updated_at,
  } = registro

  const { id: currentUserId, isAgent, isAdmin } = useCurrentUser()
  const canUpdateStatus = (currentUserId === user?.id && isAgent) || isAdmin

  // Badge configuration
  const getBadges = () => {
    const amountUSD = formatCurrency(parseFloat(amount_owed || 0).toFixed(2))
    const amountLocal = amount_owed_local && currency ?
      `${formatCurrency(parseFloat(amount_owed_local).toFixed(2))} ${currency}` : null

    const badges = [
      { title: public_id, icon: HashIcon },
      { title: `Agente: ${user?.name ?? "-"}`, icon: UserIcon },
      {
        title:
          updated_at &&
          `Última actualización: ${formatDate(updated_at, { showTime: true })}`,
        icon: CalendarIcon,
      },
      { title: record_type && `Tipo: ${record_type}`, icon: BadgeInfoIcon },
      {
        title: `Por pagar (USD): ${amountUSD}`,
        icon: DollarSignIcon,
        variant: amount_owed > 0 ? "destructive" : "outline",
      },
    ]

    // Add local currency badge if available
    if (amountLocal) {
      badges.push({
        title: `Por pagar (Local): ${amountLocal}`,
        icon: DollarSignIcon,
        variant: amount_owed_local > 0 ? "destructive" : "outline",
      })
    }

    return badges.filter((badge) => badge.title)
  }

  const getBadgeVariant = (badge) => {
    if (badge.variant) return badge.variant
    if (badge.title === "No ha sido contactado") return "warning"
    return "outline"
  }

  // Status update functionality
  const { mutateAsync: updateRecord } = useUpdateRecordStatus({
    onError: () => toast.error("Error al actualizar el registro"),
  })

  const handleStatusUpdate = async (newStatus) => {
    try {
      await updateRecord({
        searchable_id: id,
        new_status: newStatus,
      })
      toast.success("Estatus actualizado correctamente")
    } catch (error) {
      console.error("Update status failed", error)
    }
  }

  // WhatsApp functionality
  const handleWhatsAppClick = () => {
    const phoneNumber = formatPhoneNumber(registro?.phone)

    if (!phoneNumber) {
      toast.error("No hay número de teléfono disponible")
      return
    }

    const message = createWhatsAppMessage(registro)
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  // Tracking functionality
  const handleTrackingClick = () => {
    if (!registro?.public_id) {
      toast.error("No hay ID público disponible")
      return
    }

    if (!registro?.date_of_birth) {
      toast.error("No hay fecha de nacimiento disponible")
      return
    }

    try {
      const trackingUrl = createTrackingUrl(registro)
      window.open(trackingUrl, "_blank", "noopener,noreferrer")
    } catch (error) {
      console.error("Error parsing birth date:", error)
      toast.error("Error al procesar la fecha de nacimiento")
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          {/* Main Content Section */}
          <div className="flex flex-col gap-2 space-y-2">
            {/* Title and Status */}
            <div className="flex items-center gap-2">
              {getCountryFlag(registro?.nationality)}
              <CardTitle className="text-2xl">
                {toTitleCase(name ?? "Sin nombre")}
              </CardTitle>
              <StatusBadge status={status ?? "-"} />
            </div>

            {/* Information Badges */}
            <div className="flex flex-wrap gap-2">
              {getBadges().map((badge, idx) => (
                <IconBadge
                  key={idx}
                  title={badge.title}
                  icon={badge.icon}
                  variant={getBadgeVariant(badge)}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex items-center gap-2">
              {isAgent && (
                <Button
                  size="sm"
                  variant="add"
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar WhatsApp
                </Button>
              )}

              <Button
                size="sm"
                variant="outline"
                onClick={handleTrackingClick}
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Ruta de seguimiento
              </Button>
            </div>
          </div>

          {/* Status Update Section */}
          {canUpdateStatus && (
            <div className="flex flex-col gap-2 lg:flex-row lg:justify-between">
              <RecordDocumentDropdown
                registro={registro}
                isAgent={isAgent}
                canUpdateStatus={canUpdateStatus}
              />
              <SelectUpdateRegistroStatus
                currentOption={status}
                onConfirm={handleStatusUpdate}
              />
            </div>
          )}
        </div>
      </CardHeader>
    </Card>
  )
}

RegistrosDetailHeader.propTypes = {
  registro: PropTypes.any,
}

export default RegistrosDetailHeader
