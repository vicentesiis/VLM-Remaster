import { AlertTriangle, Loader2, Search, Inbox } from "lucide-react"
import PropTypes from "prop-types"
import React from "react"

import { Card } from "@/components/ui"
import { cn } from "@/lib/utils"

const typeDefaults = {
  loading: {
    title: "Cargando...",
    description: "Por favor espera mientras se cargan los datos.",
    icon: <Loader2 className="h-16 w-16 animate-spin text-primary" />,
    bgColor: "bg-primary/5",
    iconBg: "bg-primary/10",
  },
  error: {
    title: "Error al cargar los datos",
    description:
      "Ocurrió un error al obtener la información. Intenta nuevamente.",
    icon: <AlertTriangle className="h-16 w-16 text-destructive" />,
    bgColor: "bg-destructive/5",
    iconBg: "bg-destructive/10",
  },
  idle: {
    title: "Esperando búsqueda...",
    description:
      "Aplica los filtros necesarios y presiona \"Buscar\" para continuar.",
    icon: <Search className="h-16 w-16 text-muted-foreground" />,
    bgColor: "bg-muted/30",
    iconBg: "bg-muted/50",
  },
  empty: {
    title: "Sin resultados",
    description: "No se encontraron resultados.",
    icon: <Inbox className="h-16 w-16 text-muted-foreground" />,
    bgColor: "bg-muted/30",
    iconBg: "bg-muted/50",
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
        "flex flex-col items-center justify-center gap-6 py-16 px-8 text-center transition-all duration-200",
        "rounded-xl border border-dotted border-muted-foreground/40 bg-card shadow-md",
        className
      )}
    >
      <div
        className={cn(
          "flex items-center justify-center rounded-full p-2 transition-all duration-200",
          fallback.iconBg
        )}
      >
        {fallback.icon}
      </div>

      <div className="space-y-3 max-w-md">
        <h3 className="text-2xl font-semibold tracking-tight text-foreground">
          {title || fallback.title}
        </h3>

        {(description || fallback.description) && (
          <p className="text-muted-foreground leading-relaxed">
            {description || fallback.description}
          </p>
        )}
      </div>
    </div>
  )
}

StatusState.propTypes = {
  type: PropTypes.oneOf(["loading", "error", "idle", "empty"]),
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
}