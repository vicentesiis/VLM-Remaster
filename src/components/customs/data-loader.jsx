import { Loader2, Info, AlertTriangle, Search } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { H4, Blockquote } from "@/components/ui/typography"
import { cn } from "@/lib/utils"

export function DataLoader({ status, className }) {
  const iconMap = {
    loading: Loader2,
    error: AlertTriangle,
    empty: Info,
    inactive: Search,
  }

  const titleMap = {
    loading: "Cargando...",
    error: "Error al cargar los datos",
    empty: "Sin datos",
    inactive: "Aún no se ha hecho una búsqueda",
  }

  const messageMap = {
    loading: "Por favor espera mientras se cargan los datos.",
    error: "Ocurrió un error inesperado. Intenta de nuevo.",
    empty: "No se encontraron resultados.",
    inactive: "Presiona el botón de búsqueda para obtener resultados.",
  }

  const Icon = iconMap[status]

  return (
    <Card
      className={cn(
        "flex h-[250px] flex-col justify-center bg-secondary",
        className
      )}
    >
      <CardContent className="flex flex-col items-center space-y-2 text-center">
        <Icon
          className={cn("h-10 w-10 text-primary", status === "loading" && "animate-spin")}
        />
        <H4>{titleMap[status]}</H4>
        <Blockquote>{messageMap[status]}</Blockquote>
      </CardContent>
    </Card>
  )
}

DataLoader.propTypes = {
  status: PropTypes.oneOf(["loading", "error", "empty", "inactive"]).isRequired,
  className: PropTypes.string,
}

export default DataLoader
