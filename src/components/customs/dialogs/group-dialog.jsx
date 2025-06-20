import { Users2 } from "lucide-react"
import PropTypes from "prop-types"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import UsuarioForm from "../forms/usuario-form"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  DialogHeaderCustom,
} from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useCreateUser, useUpdateUser } from "@/hooks/queries"
import GroupForm from "../forms/group-form"
import { Separator } from "@radix-ui/react-dropdown-menu"

const GroupDialog = ({ trigger, open, onOpenChange }) => {
  const isControlled = open !== undefined && onOpenChange !== undefined
  const [internalOpen, setInternalOpen] = useState(false)
  const dialogOpen = isControlled ? open : internalOpen
  const setDialogOpen = isControlled ? onOpenChange : setInternalOpen
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [createdAdmin, setCreatedAdmin] = useState(null) // Store admin response
  const [step, setStep] = useState("create-admin") // or "create-group"
  const usuarioFormRef = useRef()
  const groupFormRef = useRef()

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    try {
      if (step === "create-admin") {
        const adminResponse = await createUserMutation.mutateAsync(data)
        toast.success("Admin creado correctamente")
        setCreatedAdmin(adminResponse.data) // or whatever your API returns
        setStep("create-group")
      } else if (step === "create-group") {
        const groupPayload = {
          ...data,
          admin_id: createdAdmin.id, // attach admin id
        }
        await createGroupMutation.mutateAsync(groupPayload)
        toast.success("Grupo creado correctamente")
        setDialogOpen(false)
      }
    } catch (err) {
      toast.error("Error en el proceso")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      {typeof trigger !== "undefined" ? (
        trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="add" size="sm">
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

        <Card>
          <CardContent>
            <CardTitle className="-mt-3 mb-2 text-lg font-semibold text-primary">
              Datos del Administrador
            </CardTitle>
            <UsuarioForm
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
            <CardTitle className="-mt-3 mb-2 text-lg font-semibold text-primary">
              Datos del Grupo
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
