import { Pencil } from "lucide-react"
import React, { useState } from "react"
import { toast } from "sonner"
import TooltipWrapper from "../../tooltip-wrapper"
import { 
  columnHelper,
  createPhoneColumn,
  createUsuarioColumn,
  createAgentTypeColumn,
  createBooleanStatusColumn
} from "./shared/commonColumns"
import { Button, Checkbox } from "@/components/ui"
import { useUpdateUserRecordWeight } from "@/hooks/queries"

export const getUsuarioColumns = (onEditClick, isAgent = false) => {
  const columns = [
    createUsuarioColumn(columnHelper),
    createAgentTypeColumn(columnHelper),
    createPhoneColumn(columnHelper),
  ]

  if (!isAgent) {
    columns.push(
      createBooleanStatusColumn(columnHelper, "active", "Activo"),
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
