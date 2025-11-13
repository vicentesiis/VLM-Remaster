import { UserPenIcon, UserPlusIcon } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import UsuarioForm from "../forms/usuario-form"
import {
  Button,
  Card,
  CardContent,
  CustomDialog,
  CustomDialogTrigger,
  CustomDialogContent,
  CustomDialogHeader,
  CustomDialogBody,
  CustomDialogFooter,
} from "@/components/ui"
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
    password: "",
    phone: userToEdit?.phone ?? "",
    agent_type: userToEdit?.agent_type ?? "",
    active: userToEdit?.active ?? false,
  }

  return (
    <CustomDialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {typeof trigger !== "undefined" ? (
        trigger && <CustomDialogTrigger asChild>{trigger}</CustomDialogTrigger>
      ) : (
        <CustomDialogTrigger asChild>
          <Button variant={buttonVariant}>
            {React.createElement(icon)}
            {title}
          </Button>
        </CustomDialogTrigger>
      )}
      <CustomDialogContent className="bg-gray-100 dark:bg-gray-950 sm:max-w-3xl">
        <CustomDialogHeader
          icon={icon}
          title={title}
          iconBgClass={iconBgClass}
        />

        <CustomDialogBody>
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
        </CustomDialogBody>

        <CustomDialogFooter
          actionLabel={buttonText}
          actionVariant={buttonVariant}
          isLoading={isSubmitting}
          onAction={() => formRef.current?.submit()}
        />
      </CustomDialogContent>
    </CustomDialog>
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
