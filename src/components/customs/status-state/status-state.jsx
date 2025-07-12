import { AlertTriangle, Loader2, Search, Inbox } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"
import { cn } from "@/lib/utils"

const typeDefaults = {
  loading: {
    title: "Cargando...",
    description: "Por favor espera mientras se cargan los datos.",
    icon: <Loader2 className="h-12 w-12 animate-spin text-primary" />,
  },
  error: {
    title: "Error al cargar los datos",
    description:
      "Ocurrió un error al obtener la información. Intenta nuevamente.",
    icon: <AlertTriangle className="h-12 w-12 text-destructive" />,
  },
  idle: {
    title: "Esperando búsqueda...",
    description:
      "Aplica los filtros necesarios y presiona “Buscar” para continuar.",
    icon: <Search className="h-12 w-12 text-muted-foreground" />,
  },
  empty: {
    title: "Sin resultados",
    description: "No se encontraron resultados.",
    icon: <Inbox className="h-12 w-12 text-muted-foreground" />,
  },
}

export function StatusState({
  type = "loading",
  className,
  title,
  description,
}) {
  const fallback = typeDefaults[type] ?? typeDefaults.loading

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-2 py-12 text-center",
        className
      )}
    >
      {fallback.icon}
      <h3 className="text-2xl font-semibold">{title || fallback.title}</h3>
      {description || fallback.description ? (
        <p className="text-md max-w-sm text-muted-foreground">
          {description || fallback.description}
        </p>
      ) : null}
    </div>
  )
}

StatusState.propTypes = {
  type: PropTypes.oneOf(["loading", "error", "idle", "empty"]),
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
}
