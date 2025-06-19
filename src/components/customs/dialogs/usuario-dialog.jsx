import { UserPenIcon, UserPlusIcon } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import UsuarioForm from "../forms/usuario-form"
import { Button, Card, CardContent, DialogHeaderCustom } from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useCreateUser, useUpdateRecord, useUpdateUser } from "@/hooks/queries"

const UsuarioDialog = ({ trigger, mode = "add" }) => {
  const formRef = useRef()
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEdit = mode === "edit"
  const icon = isEdit ? UserPenIcon : UserPlusIcon
  const title = isEdit ? "Editar Usuario" : "Nuevo Usuario"
  const buttonText = isEdit ? "Actualizar Usuario" : "Agregar Usuario"
  const buttonVariant = isEdit ? "edit" : "add"
  const iconBgClass = isEdit ? "bg-orange-600" : "bg-green-600"

  const { mutateAsync: createUser } = useCreateUser({
    onError: () => toast.error("Error al crear el usuario"),
  })

  const { mutateAsync: updateUser } = useUpdateUser({
    onError: () => toast.error("Error al actualizar el usuario"),
  })

  const handleSubmit = async (data) => {
    try {
      setIsSubmitting(true)

      if (isEdit) {
        await updateUser({
          // ...data,
          // id: recordToEdit.id,
        })
      } else {
        await createUser({
          ...data,
          role: "agent",
        })
      }

      toast.success(
        `${isEdit ? "Usuario actualizado" : "Usuario creado"} con éxito`
      )
      setOpen(false)
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setIsSubmitting(false)
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
      <DialogContent className="max-h-full overflow-y-auto bg-gray-200 dark:bg-gray-950 sm:h-auto sm:max-w-3xl">
        <DialogHeaderCustom
          icon={icon}
          title={title}
          iconBgClass={iconBgClass}
        />

        <Card>
          <CardContent>
            <UsuarioForm
              ref={formRef}
              onSubmit={handleSubmit}
              isEdit={isEdit}
            />
          </CardContent>
        </Card>

        <Button
          className="text-md sticky bottom-0 float-right ml-auto sm:mr-4"
          variant={buttonVariant}
          isLoading={isSubmitting}
          onClick={() => formRef.current?.submit()}
        >
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

UsuarioDialog.propTypes = {
  mode: PropTypes.string,
  recordToEdit: PropTypes.any,
  trigger: PropTypes.any,
}

export default UsuarioDialog
