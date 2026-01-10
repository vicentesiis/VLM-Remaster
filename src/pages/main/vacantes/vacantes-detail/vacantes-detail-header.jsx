import {
  BriefcaseIcon,
  GlobeIcon,
  DollarSignIcon,
  UsersIcon,
  Languages,
  DownloadIcon,
  UserPlusIcon,
  CheckCircle2,
  XCircle,
  AlertCircle,
  HashIcon
} from "lucide-react"
import PropTypes from "prop-types"
import React, { useState } from "react"
import { toast } from "sonner"
import CountryFlag from "@/components/customs/country-flag"
import RegistroDialog from "@/components/customs/dialogs/registro-dialog"
import InfoCard from "@/components/customs/info-card"
import { Button } from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { downloadVacantDetail } from "@/services/documentService"
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
    rate,
    rate_description,
    currency,
    positions,
    location_city_town,
    location_state_province,
    country,
    end_date,
    translated,
    is_active
  } = vacant

  const { isSuperAdmin, isAdmin } = useCurrentUser()
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    try {
      setIsDownloading(true)
      await downloadVacantDetail(id)
    } catch {
      toast.error("Error al descargar el detalle de la vacante")
    } finally {
      setIsDownloading(false)
    }
  }

  const getAvailabilityInfo = () => {
    const now = new Date()
    const end = end_date ? new Date(end_date) : null

    if (end && end < now) {
      return { label: "Caducada", variant: "destructive", icon: XCircle }
    }
    if (positions === 0) {
      return { label: "Sin posiciones", variant: "warning", icon: AlertCircle }
    }
    return { label: "Disponible", variant: "success", icon: CheckCircle2 }
  }

  const availability = getAvailabilityInfo()
  const AvailabilityIcon = availability.icon

  // Helper for Payment Info
  const getPaymentInfo = () => {
    if (rate == null) return { value: "No especificado", variant: "default" }
    const formattedRate = `${rate} ${currency?.toUpperCase()}/${rate_description}`
    return { value: formattedRate, variant: "success", iconColor: "text-green-600", valueColor: "text-green-700" }
  }
  const paymentInfo = getPaymentInfo()

  // Helper for Location Info
  const getLocationInfo = () => {
    const loc = [location_city_town, location_state_province, country].filter(Boolean).join(", ")
    return loc || "Ubicación no especificada"
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col space-y-2">
          {/* Title Row */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
            {/* Left: Title and Info */}
            <div className="flex items-center gap-4 flex-1">
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {title ?? "Sin título (requiere traducción)"}
                  </CardTitle>
                  <Badge variant={availability.variant} className="flex items-center gap-1">
                    <AvailabilityIcon className="h-3 w-3" />
                    {availability.label}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <CountryFlag nationality={country} className="h-6 w-8" />
                  <div className="text-muted-foreground font-medium text-lg">
                    {toTitleCase(original_title)}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline">
                    <HashIcon className="h-4 w-4 mr-1" />
                    {id}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex flex-wrap items-center gap-2 mt-4 lg:mt-0 lg:ml-4">
              {is_active && !isSuperAdmin && !isAdmin && (
                <RegistroDialog
                  mode="add"
                  vacantId={id}
                  trigger={
                    <Button variant="default" size="sm" className="bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md transition-all">
                      <UserPlusIcon className="h-4 w-4 mr-2" />
                      Crear Registro de esta vacante
                    </Button>
                  }
                />
              )}
              {!translated && (
                <Button onClick={onTranslate} isLoading={isLoadingTranslated} variant="outline" size="sm">
                  <Languages className="h-4 w-4 mr-2" />
                  Traducir
                </Button>
              )}
              {translated && !isSuperAdmin && !isAdmin && (
                <Button onClick={handleDownload} isLoading={isDownloading} variant="outline" size="sm">
                  <DownloadIcon className="h-4 w-4 mr-2" />
                  Descargar
                </Button>
              )}
            </div>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <InfoCard
              icon={DollarSignIcon}
              label="Pago"
              value={paymentInfo.value}
              variant={paymentInfo.variant}
              iconColor={paymentInfo.iconColor}
              valueColor={paymentInfo.valueColor}
            />
            <InfoCard
              icon={BriefcaseIcon}
              label="Categoría"
              value={category}
              variant="info"
            />
            <InfoCard
              icon={GlobeIcon}
              label="Ubicación"
              value={getLocationInfo()}
              variant="default"
            />
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

VacantesDetailHeader.propTypes = {
  isLoadingTranslated: PropTypes.bool,
  onTranslate: PropTypes.func,
  vacant: PropTypes.object,
}

export default VacantesDetailHeader
