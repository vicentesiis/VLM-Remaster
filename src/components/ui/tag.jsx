import React from "react"
import { cn } from "@/lib/utils"

export const getStatusColor = (status) => {
  switch (status) {
    case "Contrato Generado":
      return "green"
    case "Pendiente":
      return "red"
    default:
      return "gray"
  }
}

export const getStatusPaymentColor = (status) => {
  switch (status) {
    case "Pagada":
      return "green"
    case "Pendiente":
      return "orange"
    case "Cancelada":
      return "red"
    default:
      return "gray"
  }
}

const getColorClasses = (color, variant) => {
  const colors = {
    green: {
      filled: "bg-green-500 text-white",
      outline: "border border-green-500 text-green-500 bg-transparent",
    },
    red: {
      filled: "bg-red-500 text-white",
      outline: "border border-red-500 text-red-500 bg-transparent",
    },
    orange: {
      filled: "bg-orange-500 text-white",
      outline: "border border-orange-500 text-orange-500 bg-transparent",
    },
    gray: {
      filled: "bg-gray-500 text-white",
      outline: "border border-gray-500 text-gray-500 bg-transparent",
    },
  }

  return colors[color]?.[variant] || colors.gray[variant]
}

export const Tag = ({ label, type = "status", variant = "filled" }) => {
  const statusColor =
    type === "payment" ? getStatusPaymentColor(label) : getStatusColor(label)

  const colorClass = getColorClasses(statusColor, variant)

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-lg px-3 py-1.5 text-sm font-medium",
        colorClass
      )}
    >
      {label}
    </div>
  )
}

export default Tag
