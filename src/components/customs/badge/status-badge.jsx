import React from "react"
import { Badge } from "@/components/ui/badge"
import { LabelStyle } from "@/components/ui/typography"

const getStatusStyles = (status) => {
  const statusColors = {
    Good: {
      bgColor: "bg-emerald-600/10",
      textColor: "text-emerald-500",
      borderColor: "border-emerald-600/60",
      dotColor: "bg-emerald-500",
    },

    Pending: {
      bgColor: "bg-amber-600/10",
      textColor: "text-amber-500",
      borderColor: "border-amber-600/60",
      dotColor: "bg-amber-500",
    },

    Warning: {
      bgColor: "bg-red-600/10",
      textColor: "text-red-500",
      borderColor: "border-red-600/60",
      dotColor: "bg-red-500",
    },
  }

  const statusCategory = {
    Creado: "Good",
    Importado: "Good",
    "Contrato Generado": "Good",
    Aprobado: "Good",
    "Con Fecha de Salida": "Good",
    "Fecha de Salida Confirmada": "Good",
    Finalizó: "Good",

    "Generar Referencia": "Pending",
    "Generar Contrato": "Pending",
    "Pendiente de Aprobación": "Pending",
    "Eligiendo Fecha de Salida": "Pending",

    "Información Pendiente": "Warning",
    "Corregir Contrato": "Warning",
    "Primer Aviso": "Warning",
    "Temporalmente Inactivo": "Warning",
  }

  const category = statusCategory[status] || "Pending"
  return statusColors[category]
}

const StatusBadge = ({ status }) => {
  const { bgColor, textColor, borderColor, dotColor } = getStatusStyles(status)

  return (
    <Badge
      className={`inline-flex items-center rounded-2xl py-2 ${bgColor} ${textColor} ${borderColor} shadow-none hover:${bgColor} dark:${bgColor}`}
    >
      <div className={`mr-2 h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <LabelStyle className={"font-extrabold"}>{status}</LabelStyle>
    </Badge>
  )
}

export default StatusBadge
