import { UserPenIcon, UserPlusIcon } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import RegistroForm from "../forms/registro-form"
import { Button, DialogHeaderCustom } from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useCreateRecord, useUpdateRecord } from "@/hooks/queries/useRecord"

const RegistroDialog = ({ trigger, mode = "add", recordToEdit }) => {
  const formRef = useRef()
  const [open, setOpen] = useState(false)

  const isEdit = mode === "edit"
  const icon = isEdit ? UserPenIcon : UserPlusIcon
  const title = isEdit ? "Editar Registro" : "Nuevo Registro"
  const buttonText = isEdit ? "Actualizar Registro" : "Agregar Registro"
  const buttonVariant = isEdit ? "edit" : "add"
  const iconBgClass = isEdit ? "bg-orange-600" : "bg-green-600"

  const { mutateAsync: createRecord, isLoading: isCreating } = useCreateRecord({
    onError: () => toast.error("Error al crear el registro"),
  })

  const { mutateAsync: updateRecord, isLoading: isUpdating } = useUpdateRecord({
    onError: () => toast.error("Error al actualizar el registro"),
  })

  const isLoading = isCreating || isUpdating

  const handleSubmit = async (data) => {
    try {
      const response = isEdit
        ? await updateRecord({
            ...data,
            id: recordToEdit.id,
          })
        : await createRecord(data)

      toast(
        `${isEdit ? "Registro actualizado" : "Registro creado"} con éxito`,
        {
          description: `ID: ${response.data.public_id}`,
          action: {
            label: "Copiar ID",
            onClick: async () => {
              await navigator.clipboard.writeText(response.data.public_id)
              toast.success("ID copiado al portapapeles")
            },
          },
        }
      )

      setOpen(false)
    } catch (err) {
      console.error("Error:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant={buttonVariant} size="sm">
            {React.createElement(icon)}
            {title}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-950 sm:max-h-[calc(100vh-60px)] sm:max-w-7xl">
        <DialogHeaderCustom
          icon={icon}
          title={title}
          iconBgClass={iconBgClass}
        />

        <RegistroForm
          ref={formRef}
          onSubmit={handleSubmit}
          defaultValues={recordToEdit}
          isEdit={isEdit}
        />

        <Button
          className="text-md sticky bottom-0 float-right ml-auto mr-8"
          variant={buttonVariant}
          isLoading={isLoading}
          onClick={() => formRef.current?.submit()}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

RegistroDialog.propTypes = {
  mode: PropTypes.string,
  recordToEdit: PropTypes.any,
  trigger: PropTypes.any,
}

export default RegistroDialog
