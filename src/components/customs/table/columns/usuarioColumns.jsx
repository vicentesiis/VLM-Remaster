import { createColumnHelper } from "@tanstack/react-table"
import { Check, Pencil, X } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import TooltipWrapper from "../../tooltip-wrapper"
import NullableCell from "../cells/nullable-cell"
import UsuarioCell from "../cells/usuario-cell"
import { Button, Checkbox } from "@/components/ui"
import { Badge } from "@/components/ui/badge"
import { useUpdateUserRecordWeight } from "@/hooks/queries"

const columnHelper = createColumnHelper()

export const getUsuarioColumns = (onEditClick, isAgent = false) => {
  const columns = [
    columnHelper.display({
      id: "usuario",
      header: "Usuario",
      cell: ({ row }) => {
        const { username, name } = row.original
        return <UsuarioCell name={name} username={username} />
      },
    }),
    columnHelper.accessor("agent_type", {
      header: "Tipo de Agente",
      cell: ({ getValue }) => {
        const value = getValue()
        return value ? (
          <Badge variant="outline">{value.toUpperCase()}</Badge>
        ) : (
          <NullableCell value={null} />
        )
      },
      meta: { align: "center" },
    }),
    columnHelper.accessor("phone", {
      header: "Teléfono",
      cell: (info) => <NullableCell value={info.getValue()} />,
      meta: { align: "center" },
    }),
  ]

  if (!isAgent) {
    columns.push(
      columnHelper.accessor("active", {
        header: "Activo",
        cell: ({ getValue }) => {
          const active = getValue()
          if (typeof active !== "boolean") return <NullableCell value={null} />
          return (
            <div
              className={`mx-auto flex h-6 w-6 items-center justify-center rounded-full border ${
                active
                  ? "border-green-500 bg-green-100 text-green-700"
                  : "border-red-500 bg-red-100 text-red-700"
              }`}
            >
              {active ? (
                <Check className="h-4 w-4" strokeWidth={2.5} />
              ) : (
                <X className="h-4 w-4" strokeWidth={2.5} />
              )}
            </div>
          )
        },
        meta: { align: "center", maxWidth: "40px" },
      }),
      columnHelper.display({
        id: "actions",
        header: "Acciones",
        cell: ({ row }) => {
          const { record_weight, id: userId } = row.original
          const [isChecked, setIsChecked] = useState(Boolean(record_weight))
          const [isLoading, setIsLoading] = useState(false)

          const mutation = useUpdateUserRecordWeight()

          const handleToggle = async (checked) => {
            setIsLoading(true)
            try {
              await mutation.mutateAsync({
                user_searchable_id: userId,
                record_weight: checked ? 1 : 0,
              })

              setIsChecked(checked)
              toast.success("Actualizado correctamente")
            } catch (error) {
              console.log("error", error)
              toast.error("Error al actualizar")
            } finally {
              setIsLoading(false)
            }
          }

          return (
            <div className="flex items-center justify-center gap-2">
              <TooltipWrapper content="Editar agente">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => onEditClick(row.original)}
                >
                  <Pencil className="size-4" />
                </Button>
              </TooltipWrapper>

              <TooltipWrapper content="Puede recibir leads">
                <Checkbox
                  className="size-5"
                  checked={isChecked}
                  disabled={isLoading}
                  onCheckedChange={handleToggle}
                />
              </TooltipWrapper>
            </div>
          )
        },
        meta: { align: "center" },
      })
    )
  }

  return columns
}
