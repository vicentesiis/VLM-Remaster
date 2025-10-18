import {
  CalendarIcon,
  HashIcon,
  DollarSignIcon,
  UserIcon,
  MessageCircle,
  ExternalLink,
} from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { toast } from "sonner"
import CountryFlag from "@/components/customs/country-flag"
import IconBadge from "@/components/customs/badge/icon-badge"
import StatusBadge from "@/components/customs/badge/status-badge"
import RecordDocumentDropdown from "@/components/customs/record-document-dropdown"
import { SelectUpdateRegistroStatus } from "@/components/customs/select-update-registro-status"
import { Button } from "@/components/ui"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { getRecordTypeConfig } from "@/constants"
import { useUpdateRecordStatus } from "@/hooks/queries"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { 
  formatCurrency, 
  formatDate, 
  toTitleCase,
  formatPhoneNumber,
  createWhatsAppMessage,
  createTrackingUrl
} from "@/utils"

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
    const amountUSD = formatCurrency(amount_owed, "USD", { fromCents: false })
    const amountLocal = formatCurrency(amount_owed_local, currency, { fromCents: false })
    const paymentTitle = `Por pagar: ${amountUSD} - ${amountLocal}`
    
    const { icon: RecordTypeIcon, variant: recordTypeVariant } = getRecordTypeConfig(record_type)

    return [
      { title: public_id, icon: HashIcon },
      { title: `Agente: ${user?.name}`, icon: UserIcon },
      { title: `Última actualización: ${formatDate(updated_at, { showTime: true })}`, icon: CalendarIcon },
      { title: toTitleCase(record_type), icon: RecordTypeIcon, variant: recordTypeVariant },
      {
        title: paymentTitle,
        icon: DollarSignIcon,
        variant: (amount_owed > 0 || amount_owed_local > 0) ? "destructive" : "outline",
      },
    ]
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
              <CountryFlag nationality={registro?.nationality} />
              <CardTitle className="text-2xl">
                {toTitleCase(name)}
              </CardTitle>
              <StatusBadge status={status} />
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
