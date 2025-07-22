import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { toast } from "sonner"
import { Users2 } from "lucide-react"

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { UseUpdateGroupPhone } from "@/hooks/queries"

const UpdateGroupPhoneDialog = ({ groupId }) => {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState("")
  const [currentGroupId, setCurrentGroupId] = useState(groupId)

  useEffect(() => {
    setCurrentGroupId(groupId)
    setPhone("")
  }, [groupId])

  const { mutateAsync, isLoading } = UseUpdateGroupPhone({
    onSuccess: () => {
      toast.success("Teléfono actualizado correctamente")
      setOpen(false)
    },
    onError: () => toast.error("Error al actualizar teléfono"),
  })

  const handleSubmit = async () => {
    if (!phone.trim()) {
      toast.error("Ingresa un teléfono válido")
      return
    }
    if (!currentGroupId) {
      toast.error("No se encontró el id del grupo")
      return
    }
    try {
      await mutateAsync({ group_id: currentGroupId, new_phone: phone })
    } catch (error) {}
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="add" className="flex items-center gap-2">
          <Users2 />
          Editar Grupo
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Actualizar teléfono del grupo</AlertDialogTitle>
        </AlertDialogHeader>

        <Input
          placeholder="Nuevo número de teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          disabled={isLoading}
        />

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || !phone.trim()}
            isLoading={isLoading}
          >
            {isLoading ? "Actualizando..." : "Actualizar Teléfono"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

UpdateGroupPhoneDialog.propTypes = {
  groupId: PropTypes.string.isRequired,
}

export default UpdateGroupPhoneDialog
