import {
  CalendarIcon,
  HashIcon,
  DollarSignIcon,
  BadgeInfoIcon,
  UserIcon,
  MessageCircle,
} from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { toast } from "sonner"
import IconBadge from "@/components/customs/badge/icon-badge"
import StatusBadge from "@/components/customs/badge/status-badge"
import RecordDocumentDropdown from "@/components/customs/record-document-dropdown"
import { SelectUpdateRegistroStatus } from "@/components/customs/select-update-registro-status"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useUpdateRecordStatus } from "@/hooks/queries"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatCurrency, formatDate, toTitleCase } from "@/utils"
import { Button } from "@/components/ui"

export const RegistrosDetailHeader = ({ registro }) => {
  const {
    id,
    name,
    status,
    record_type,
    amount_owed,
    user,
    public_id,
    updated_at,
  } = registro

  const { id: currentUserId, isAgent, isAdmin, isSuperAdmin } = useCurrentUser()
  const canUpdateStatus = (currentUserId === user?.id && isAgent) || isAdmin
  const canReassingRecord = isSuperAdmin || isAdmin

  const getBadges = () => {
    const amount = formatCurrency(amount_owed)

    return [
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
        title: `Por pagar: ${amount}`,
        icon: DollarSignIcon,
        variant: amount_owed > 0 ? "destructive" : "outline",
      },
    ].filter((badge) => badge.title)
  }

  const getBadgeVariant = (badge) => {
    if (badge.variant) return badge.variant
    if (badge.title === "No ha sido contactado") return "warning"
    return "outline"
  }

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

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">
                {toTitleCase(name ?? "Sin nombre")}
              </CardTitle>
              <StatusBadge status={status ?? "-"} />
            </div>

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
            <div className="mt-2 flex items-center gap-2">
              <Button
                variant="add"
                onClick={() => {
                  const phoneNumber = registro?.phone?.replace(/\D/g, "")

                  if (!phoneNumber) {
                    toast.error("No hay número de teléfono disponible")
                    return
                  }
                  const formattedPhone =
                    phoneNumber.length === 10 ? `52${phoneNumber}` : phoneNumber
                  const whatsappUrl = `https://wa.me/${formattedPhone}`

                  window.open(whatsappUrl, "_blank", "noopener,noreferrer")
                }}
              >
                <MessageCircle />
                Enviar WhatsApp
              </Button>
            </div>
          </div>
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
