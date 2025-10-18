import {
  HashIcon,
  DollarSignIcon,
  UserIcon,
  MessageCircle,
  ExternalLink,
  Phone,
  Mail,
  Clock,
  Loader2,
} from "lucide-react"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { toast } from "sonner"
import StatusBadge from "@/components/customs/badge/status-badge"
import CountryFlag from "@/components/customs/country-flag"
import InfoCard from "@/components/customs/info-card"
import RecordDocumentDropdown from "@/components/customs/record-document-dropdown"
import { SelectUpdateRegistroStatus } from "@/components/customs/select-update-registro-status"
import { Button } from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
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
    phone,
    email,
    nationality,
  } = registro

  const { id: currentUserId, isAgent, isAdmin } = useCurrentUser()
  const canUpdateStatus = (currentUserId === user?.id && isAgent) || isAdmin

  const [isWhatsAppLoading, setIsWhatsAppLoading] = useState(false)
  const [isTrackingLoading, setIsTrackingLoading] = useState(false)

  // Status update functionality
  const { mutateAsync: updateRecord, isPending: isUpdatingStatus } = useUpdateRecordStatus({
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

  // WhatsApp functionality with loading state
  const handleWhatsAppClick = async () => {
    setIsWhatsAppLoading(true)

    try {
      const phoneNumber = formatPhoneNumber(phone)

      if (!phoneNumber) {
        toast.error("No hay número de teléfono disponible")
        return
      }

      const message = createWhatsAppMessage(registro)
      const encodedMessage = encodeURIComponent(message)
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`

      window.open(whatsappUrl, "_blank", "noopener,noreferrer")
      toast.success("WhatsApp abierto correctamente")
    } catch (error) {
      console.error("WhatsApp error:", error)
      toast.error("Error al abrir WhatsApp")
    } finally {
      setTimeout(() => setIsWhatsAppLoading(false), 1000)
    }
  }

  // Tracking functionality with loading state
  const handleTrackingClick = async () => {
    setIsTrackingLoading(true)

    try {
      const trackingUrl = createTrackingUrl(registro)
      window.open(trackingUrl, "_blank", "noopener,noreferrer")
      toast.success("Ruta de seguimiento abierta")
    } catch (error) {
      console.error("Error parsing birth date:", error)
      toast.error("Error al procesar la fecha de nacimiento")
    } finally {
      setTimeout(() => setIsTrackingLoading(false), 1000)
    }
  }

  // Get payment status info
  const getPaymentInfo = () => {

    const amountUSD = formatCurrency(amount_owed, "USD")
    const amountLocal = formatCurrency(amount_owed_local, currency)
    const hasDebt = amount_owed > 0 || amount_owed_local > 0

    return {
      value: hasDebt ? `${amountLocal} - ${amountUSD}` : "Pagado",
      variant: hasDebt ? "destructive" : "success",
      iconColor: hasDebt ? "text-red-600" : "text-green-600",
      valueColor: hasDebt ? "text-red-700" : "text-green-700"
    }
  }

  const { icon: RecordTypeIcon, variant: recordTypeVariant } = getRecordTypeConfig(record_type)
  const paymentInfo = getPaymentInfo()

  return (
    <Card className="overflow-hidden">
      <CardHeader >
        {/* Header Section */}
        <div className="flex flex-col space-y-4">
          {/* Title Row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            {/* Left: Title and Info */}
            <div className="flex items-center gap-3 flex-1">
              <CountryFlag nationality={nationality} className="h-8 w-8" />
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {toTitleCase(name)}
                  </CardTitle>
                  <StatusBadge status={status} className="text-sm px-3 py-1" />
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="text-sm">
                    <HashIcon className="h-4 w-4 mr-1" />
                    {public_id}
                  </Badge>
                  <Badge variant={recordTypeVariant} className="text-sm">
                    <RecordTypeIcon className="h-4 w-4 mr-1" />
                    {toTitleCase(record_type)}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right: Admin Controls */}
            {canUpdateStatus && (
              <div className="flex items-center gap-2">
                <RecordDocumentDropdown
                  registro={registro}
                  isAgent={isAgent}
                  canUpdateStatus={canUpdateStatus}
                />
                <SelectUpdateRegistroStatus
                  currentOption={status}
                  onConfirm={handleStatusUpdate}
                  disabled={isUpdatingStatus}
                />
              </div>
            )}
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InfoCard
              icon={UserIcon}
              label="Agente"
              value={user?.name || "No asignado"}
              variant={user?.name ? "default" : "warning"}
            />

            <InfoCard
              icon={DollarSignIcon}
              label="Estado de pago"
              value={paymentInfo.value}
              variant={paymentInfo.variant}
              iconColor={paymentInfo.iconColor}
              valueColor={paymentInfo.valueColor}
            />

            <InfoCard
              icon={Clock}
              label="Última actualización"
              value={formatDate(updated_at, { showTime: true })}
              variant="info"
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="sm:-mt-8">
        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {isAgent && phone && (
            <Button
              size="sm"
              variant="default"
              onClick={handleWhatsAppClick}
              disabled={isWhatsAppLoading}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
            >
              {isWhatsAppLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <MessageCircle className="h-4 w-4" />
              )}
              WhatsApp
            </Button>
          )}

          <Button
            size="sm"
            variant="outline"
            onClick={handleTrackingClick}
            disabled={isTrackingLoading}
            className="flex items-center gap-2"
          >
            {isTrackingLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ExternalLink className="h-4 w-4" />
            )}
            Ruta de Seguimiento
          </Button>

          {isAgent && phone && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(`tel:${formatPhoneNumber(phone)}`, '_self')}
              className="flex items-center gap-2"
            >
              <Phone className="h-4 w-4" />
              Llamar
            </Button>
          )}

          {isAgent && email && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => window.open(`mailto:${email}`, '_self')}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

RegistrosDetailHeader.propTypes = {
  registro: PropTypes.any,
}

export default RegistrosDetailHeader
