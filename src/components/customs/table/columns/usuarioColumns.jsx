import { createColumnHelper } from "@tanstack/react-table"
import { Check, X } from "lucide-react"
import React from "react"
import UsuarioCell from "../cells/usuario-cell"
import { Badge } from "@/components/ui/badge"

const columnHelper = createColumnHelper()

export const getUsuarioColumns = () => {
  const columns = [
    columnHelper.display({
      id: "usuario",
      header: "Usuario",
      cell: ({ row }) => {
        const { username, name } = row.original
        return <UsuarioCell name={name} username={username} />
      },
    }),
    columnHelper.accessor("phone", {
      header: "Télefono",
      meta: { align: "center" },
      
    }),
    columnHelper.accessor("agent_type", {
      header: "Tipo de Agente",
      meta: { align: "center" },
      cell: ({ getValue }) => (
        <Badge variant="outline">{getValue().toUpperCase()}</Badge>
      ),
    }),
    columnHelper.accessor("active", {
      header: "Activo",
      meta: { align: "center" },
      cell: ({ getValue }) => (
        <div
          className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border ${
            getValue()
              ? "border-green-500 bg-green-100 text-green-700"
              : "border-red-500 bg-red-100 text-red-700"
          }`}
        >
          {getValue() ? (
            <Check className="h-4 w-4" strokeWidth={2.5} />
          ) : (
            <X className="h-4 w-4" strokeWidth={2.5} />
          )}
        </div>
      ),
    }),
  ]

  return columns
}
