import {
  CalendarIcon,
  PhoneIcon,
  HashIcon,
  AtSignIcon,
  LayersIcon,
  UserXIcon,
  DollarSignIcon,
} from "lucide-react"
import React from "react"
import IconBadge from "@/components/customs/badge/icon-badge"
import StatusBadge from "@/components/customs/badge/status-badge"
import { SelectWithConfirm } from "@/components/customs/select-with-confirm"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export const RegistrosDetailHeader = ({ registro }) => {
  // Basic badges always with fallback, but badges with conditionals added below
  const baseBadges = [
    {
      title: registro?.public_id ?? null,
      icon: HashIcon,
    },
    {
      title: registro?.phone ?? null,
      icon: PhoneIcon,
    },
    {
      title: registro?.email ?? null,
      icon: AtSignIcon,
    },
    {
      title: registro?.updated_at
        ? `Última actualización: ${registro.updated_at.split("T")[0]}`
        : null,
      icon: CalendarIcon,
    },
    {
      title: registro?.program
        ? `Programa: ${registro.program
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}`
        : null,
      icon: LayersIcon,
    },
  ]

  // Additional badges with conditional checks
  const additionalBadges = [
    // Contacted badge ("Not Contacted" if contacted is false)
    registro?.contacted === false
      ? { title: "No ha sido contactado", icon: UserXIcon } // user with X icon = not contacted
      : null,

    // Amount owed badge, only if amount_owed > 0
    registro?.amount_owed > 0
      ? {
          title: `Por pagar: $${registro.amount_owed.toLocaleString()}`,
          icon: DollarSignIcon, // money icon
        }
      : null,
  ].filter(Boolean)

  const badges = [...baseBadges, ...additionalBadges].filter(
    (badge) => badge.title
  )

  const getBadgeVariant = (badge) => {
    // Customize logic here:
    if (
      badge.title ===
      registro?.program
        ?.replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase())
    ) {
      return "info" // Program badge → blue
    }
    if (badge.title === "No ha sido contactado") {
      return "warning" // Not contacted → red
    }
    if (badge.title?.startsWith("Por pagar")) {
      return "destructive" // Amount owed → yellow
    }
    // Default variants for base badges (ID, phone, email, date)
    return "outline"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between">
          {/* Title + Status */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <CardTitle>{registro?.name ?? "Sin nombre"}</CardTitle>
              <StatusBadge status={registro?.status ?? "N/A"} />
            </div>

            <div className="flex flex-wrap gap-2 sm:w-[900px]">
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
          <SelectWithConfirm currentOption={registro.status} />
        </div>
      </CardHeader>
    </Card>
  )
}

export default RegistrosDetailHeader
