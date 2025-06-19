import { UserPenIcon, UserPlusIcon } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import UsuarioForm from "../forms/usuario-form"
import { Button, Card, CardContent, DialogHeaderCustom } from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useCreateUser, useUpdateUser } from "@/hooks/queries"

const UsuarioDialog = ({
  trigger,
  mode = "add",
  userToEdit,
  open,
  onOpenChange,
}) => {
  const isControlled = open !== undefined && onOpenChange !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const dialogOpen = isControlled ? open : internalOpen
  const setDialogOpen = isControlled ? onOpenChange : setInternalOpen
  const formRef = useRef()
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
          ...data,
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
      setDialogOpen(false)
    } catch (err) {
      console.error("Error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const normalizedUser = {
    name: userToEdit?.name ?? "",
    username: userToEdit?.username ?? "",
    password: "", // leave empty
    phone: userToEdit?.phone ?? "",
    agent_type: userToEdit?.agent_type ?? "",
    active: userToEdit?.active ?? false,
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {typeof trigger !== "undefined" ? (
        trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant={buttonVariant} size="sm">
            {React.createElement(icon)}
            {title}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-full overflow-y-auto bg-gray-100 dark:bg-gray-950 sm:h-auto sm:max-w-3xl">
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
              defaultValues={normalizedUser}
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
  onOpenChange: PropTypes.any,
  open: PropTypes.any,
  recordToEdit: PropTypes.any,
  trigger: PropTypes.any,
  userToEdit: PropTypes.any,
}

export default UsuarioDialog
