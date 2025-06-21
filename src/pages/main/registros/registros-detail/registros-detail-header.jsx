import {
  CalendarIcon,
  HashIcon,
  UserXIcon,
  DollarSignIcon,
  BadgeInfoIcon,
  UserIcon,
} from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { toast } from "sonner"
import IconBadge from "@/components/customs/badge/icon-badge"
import StatusBadge from "@/components/customs/badge/status-badge"
import { SelectUpdateRegistroStatus } from "@/components/customs/select-update-registro-status"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { useUpdateRecordStatus } from "@/hooks/queries"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { formatDate } from "@/lib"

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

  const { id: currentUserId, isAgent, isAdmin } = useCurrentUser()
  const canUpdateStatus = (currentUserId === user?.id && isAgent) || isAdmin

  const getBadges = () => {
    const amount = (amount_owed ?? 0) / 100

    return [
      { title: public_id, icon: HashIcon },
      { title: `Agente: ${user?.name ?? "N/A"}`, icon: UserIcon },
      {
        title: updated_at && `Última actualización: ${formatDate(updated_at)}`,
        icon: CalendarIcon,
      },
      { title: record_type && `Tipo: ${record_type}`, icon: BadgeInfoIcon },
      {
        title: `Por pagar: $${amount}`,
        icon: DollarSignIcon,
        variant: amount > 0 ? "destructive" : "outline",
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
    <Card className="top-0 z-30 sm:sticky">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">{name ?? "Sin nombre"}</CardTitle>
              <StatusBadge status={status ?? "N/A"} />
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
          </div>
          {canUpdateStatus && (
            <SelectUpdateRegistroStatus
              currentOption={status}
              onConfirm={handleStatusUpdate}
            />
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
