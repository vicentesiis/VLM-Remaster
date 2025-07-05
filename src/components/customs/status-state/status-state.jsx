import { AlertTriangle, Loader2, Search } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib/utils"

export function StatusState({ type = "loading", className, ...props }) {
  const isError = type === "error"
  const isIdle = type === "idle"

  const defaultTitle = isError
    ? "Error al cargar los datos"
    : isIdle
      ? "Esperando búsqueda..."
      : "Cargando..."

  const defaultDescription = isError
    ? "Ocurrió un error al obtener la información. Intenta nuevamente."
    : isIdle
      ? "Aplica los filtros necesarios y presiona “Buscar” para continuar."
      : "Por favor espera mientras se cargan los datos."

  const title = props.title || defaultTitle
  const description = props.description || defaultDescription

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-12 text-center",
        className
      )}
    >
     {isError ? (
        <AlertTriangle className="h-12 w-12 text-destructive" />
      ) : isIdle ? (
        <Search className="h-12 w-12 text-muted-foreground" />
      ) : (
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      )}
      <h3 className="text-2xl font-semibold">{title}</h3>
      {description && (
        <p className="text-md max-w-sm text-muted-foreground">{description}</p>
      )}
    </div>
  )
}

StatusState.propTypes = {
  type: PropTypes.oneOf(["loading", "error", "idle"]),
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
}
