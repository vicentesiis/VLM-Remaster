import { Users2 } from "lucide-react"
import PropTypes from "prop-types"
import React, { useEffect, useRef, useState } from "react"
import { toast } from "sonner"
import AdminForm from "../forms/admin-form"
import GroupForm from "../forms/group-form"
import {
  Button,
  Card,
  CardContent,
  CardTitle,
  DialogHeaderCustom,
} from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useCreateGroup, useCreateUser } from "@/hooks/queries"

const GroupDialog = ({ trigger, open, onOpenChange }) => {
  const isControlled = open !== undefined && onOpenChange !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const dialogOpen = isControlled ? open : internalOpen
  const setDialogOpen = isControlled ? onOpenChange : setInternalOpen
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdAdmin, setCreatedAdmin] = useState(null)
  const [step, setStep] = useState("create-admin")
  const usuarioFormRef = useRef()
  const groupFormRef = useRef()

  const { mutateAsync: createUser } = useCreateUser({
    onError: () => toast.error("Error al crear el usuario"),
  })

  const { mutateAsync: createGroup } = useCreateGroup({
    onError: () => toast.error("Error al crear el grupo"),
  })

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      if (step === "create-admin") {
        const response = await createUser({ ...data })
        const newAdmin = response?.data
        setCreatedAdmin(newAdmin)
        toast.success("Admin creado correctamente")
        setStep("create-group")
      } else if (step === "create-group") {
        if (!createdAdmin) {
          toast.error("No se ha creado un administrador para este grupo.")
          return
        }

        await createGroup({
          ...data,
          admin_id: createdAdmin.id,
          admin_username: createdAdmin.username,
        })
        toast.success("Grupo creado correctamente")
        setDialogOpen(false)
      }
    } catch (err) {
      toast.error("Error en el proceso")
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (!dialogOpen) {
      setStep("create-admin")
      setCreatedAdmin(null)
    }
  }, [dialogOpen])

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {typeof trigger !== "undefined" ? (
        trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="add">
            {React.createElement(Users2)}
            Nuevo Groupo
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-full overflow-y-auto bg-gray-100 dark:bg-gray-950 sm:h-auto sm:max-w-3xl">
        <DialogHeaderCustom
          icon={Users2}
          title="Nuevo Grupo"
          iconBgClass="bg-green-600"
        />

        <Card
          className={
            step === "create-group"
              ? "pointer-events-none select-none opacity-50"
              : ""
          }
        >
          <CardContent>
            <CardTitle className="-mt-3 mb-2 text-lg font-semibold text-primary">
              Datos del Administrador
            </CardTitle>
            <AdminForm
              ref={usuarioFormRef}
              onSubmit={handleSubmit}
              itComesFromGroupForm={true}
            />
          </CardContent>
        </Card>

        <Card
          className={
            step === "create-admin"
              ? "pointer-events-none select-none opacity-50"
              : ""
          }
        >
          <CardContent>
            <CardTitle className="-mt-3 mb-2 flex items-center gap-2 text-lg font-semibold text-primary">
              Datos del Grupo
              <p className="text-sm text-muted-foreground">
                {createdAdmin ? ` (Admin a asignar: ${createdAdmin.name})` : ""}
              </p>
            </CardTitle>
            <GroupForm ref={groupFormRef} onSubmit={handleSubmit} />
          </CardContent>
        </Card>

        <Button
          className="text-md sticky bottom-0 float-right ml-auto sm:mr-4"
          variant="add"
          isLoading={isSubmitting}
          onClick={() =>
            step === "create-admin"
              ? usuarioFormRef.current?.submit()
              : groupFormRef.current?.submit()
          }
        >
          {step === "create-admin" ? "Crear Admin" : "Crear Grupo"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

GroupDialog.propTypes = {
  mode: PropTypes.string,
  onOpenChange: PropTypes.any,
  open: PropTypes.any,
  recordToEdit: PropTypes.any,
  trigger: PropTypes.any,
  userToEdit: PropTypes.any,
}

export default GroupDialog
