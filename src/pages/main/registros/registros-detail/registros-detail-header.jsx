import {
  CalendarIcon,
  PhoneIcon,
  HashIcon,
  AtSignIcon,
  LayersIcon,
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
import { formatDate } from "@/lib"

const formatProgramName = (program) =>
  program?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

export const RegistrosDetailHeader = ({ registro }) => {
  const {
    id,
    name,
    phone,
    email,
    status,
    program,
    record_type,
    contacted,
    amount_owed,
    user,
    public_id,
    updated_at,
  } = registro

  const getBadges = () => {
    const base = [
      { title: public_id, icon: HashIcon },
      { title: user?.name && `Agente: ${user.name}`, icon: UserIcon },
      { title: phone, icon: PhoneIcon },
      { title: email, icon: AtSignIcon },
      {
        title: program && `Programa: ${formatProgramName(program)}`,
        icon: LayersIcon,
      },
      {
        title: updated_at && `Última actualización: ${formatDate(updated_at)}`,
        icon: CalendarIcon,
      },
      { title: record_type && `Tipo: ${record_type}`, icon: BadgeInfoIcon },
    ]

    const extras = [
      contacted === false && {
        title: "No ha sido contactado",
        icon: UserXIcon,
      },
      amount_owed > 0 && {
        title: `Por pagar: $${amount_owed.toLocaleString()}`,
        icon: DollarSignIcon,
      },
    ]

    return [...base, ...extras].filter(Boolean)
  }

  const getBadgeVariant = (title) => {
    if (title?.startsWith("Por pagar")) return "destructive"
    if (title === "No ha sido contactado") return "warning"
    return "outline"
  }

  const { mutateAsync: updateRecord, isLoading } = useUpdateRecordStatus({
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
    <Card className="sm:sticky top-0 z-30">
      <CardHeader>
        <div className="flex flex-col lg:flex-row lg:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CardTitle className="text-2xl">{name ?? "Sin nombre"}</CardTitle>
              <StatusBadge status={status ?? "N/A"} />
            </div>

            <div className="flex flex-wrap gap-2 sm:w-[700px]">
              {getBadges().map((badge, idx) => (
                <IconBadge
                  key={idx}
                  title={badge.title}
                  icon={badge.icon}
                  variant={getBadgeVariant(badge.title)}
                />
              ))}
            </div>
          </div>
          <SelectUpdateRegistroStatus
            currentOption={status}
            onConfirm={handleStatusUpdate}
            isLoading={isLoading}
          />
        </div>
      </CardHeader>
    </Card>
  )
}

RegistrosDetailHeader.propTypes = {
  registro: PropTypes.any.isRequired,
}

export default RegistrosDetailHeader
