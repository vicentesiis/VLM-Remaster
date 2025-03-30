import React from "react"
import { Badge } from "@/components/ui/badge"
import { LabelStyle } from "@/components/ui/typography"

// A function to categorize statuses and return the appropriate styles
const getStatusStyles = (status) => {
  // Define status categories with respective colors
  const statusColors = {
    // Good statuses
    Good: {
      bgColor: "bg-emerald-600/10", // Greenish background
      textColor: "text-emerald-500", // Green text
      borderColor: "border-emerald-600/60", // Green border
      dotColor: "bg-emerald-500", // Green dot
    },
    // Pending statuses
    Pending: {
      bgColor: "bg-amber-600/10", // Amber background (Yellow-ish)
      textColor: "text-amber-500", // Amber text
      borderColor: "border-amber-600/60", // Amber border
      dotColor: "bg-amber-500", // Amber dot
    },
    // Warning statuses
    Warning: {
      bgColor: "bg-red-600/10", // Red background
      textColor: "text-red-500", // Red text
      borderColor: "border-red-600/60", // Red border
      dotColor: "bg-red-500", // Red dot
    },
  }

  // Map the status to its category (Good, Pending, or Warning)
  const statusCategory = {
    // Good statuses
    Creado: "Good",
    Importado: "Good",
    "Contrato Generado": "Good",
    Aprobado: "Good",
    "Con Fecha de Salida": "Good",
    "Fecha de Salida Confirmada": "Good",
    Finalizó: "Good",

    // Pending statuses
    "Generar Referencia": "Pending",
    "Generar Contrato": "Pending",
    "Pendiente de Aprobación": "Pending",
    "Eligiendo Fecha de Salida": "Pending",

    // Warning statuses
    "Información Pendiente": "Warning",
    "Corregir Contrato": "Warning",
    "Primer Aviso": "Warning",
    "Temporalmente Inactivo": "Warning",
  }

  // Determine the category and return the appropriate styles
  const category = statusCategory[status] || "Pending" // Default to "Pending" if not found
  return statusColors[category]
}

const StatusBadge = ({ status }) => {
  const { bgColor, textColor, borderColor, dotColor } = getStatusStyles(status)

  return (
    <Badge
      className={`inline-flex py-2 items-center rounded-2xl ${bgColor} ${textColor} ${borderColor} shadow-none hover:${bgColor} dark:${bgColor}`}
    >
      <div className={`mr-2 h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <LabelStyle className={"font-extrabold"} >{status}</LabelStyle>
    </Badge>
  )
}

export default StatusBadge
