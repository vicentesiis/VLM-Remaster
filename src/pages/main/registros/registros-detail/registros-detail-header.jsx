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
import IconBadge from "@/components/customs/badge/icon-badge"
import StatusBadge from "@/components/customs/badge/status-badge"
import { SelectWithConfirm } from "@/components/customs/select-with-confirm"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const RegistrosDetailHeader = ({ registro }) => {
  const {
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

  const baseBadges = [
    { title: public_id ?? null, icon: HashIcon },
    {
      title: user?.name ? `Agente: ${user.name}` : null,
      icon: UserIcon,
    },
    { title: phone ?? null, icon: PhoneIcon },
    { title: email ?? null, icon: AtSignIcon },
    {
      title: program
        ? `Programa: ${program.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}`
        : null,
      icon: LayersIcon,
    },
    {
      title: updated_at
        ? `Última actualización: ${updated_at.split("T")[0]}`
        : null,
      icon: CalendarIcon,
    },
    {
      title: record_type ? `Tipo: ${record_type}` : null,
      icon: BadgeInfoIcon,
    },
  ]

  const additionalBadges = [
    contacted === false
      ? { title: "No ha sido contactado", icon: UserXIcon }
      : null,
    amount_owed > 0
      ? {
          title: `Por pagar: $${amount_owed.toLocaleString()}`,
          icon: DollarSignIcon,
        }
      : null,
  ].filter(Boolean)

  const badges = [...baseBadges, ...additionalBadges].filter((b) => b.title)

  const getBadgeVariant = (badge) => {
    if (
      badge.title ===
      program?.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    )
      return "info"
    if (badge.title?.startsWith("Por pagar")) return "destructive"
    if (badge.title === "No ha sido contactado") return "warning"
    return "outline"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CardTitle>{name ?? "Sin nombre"}</CardTitle>
              <StatusBadge status={status ?? "N/A"} />
            </div>

            <div className="flex flex-wrap gap-2 sm:w-[700px]">
              {badges.map((badge, idx) => (
                <IconBadge
                  key={idx}
                  title={badge.title}
                  icon={badge.icon}
                  variant={getBadgeVariant(badge)}
                />
              ))}
            </div>
          </div>
          <SelectWithConfirm currentOption={status} />
        </div>
      </CardHeader>
    </Card>
  )
}

RegistrosDetailHeader.propTypes = {
  registro: PropTypes.any.isRequired,
}

export default RegistrosDetailHeader
