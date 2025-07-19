import { Users2 } from "lucide-react"
import PropTypes from "prop-types"
import React, { useState, useEffect } from "react"
import { toast } from "sonner"

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

import { useGetGroupById, UseUpdateGroupPhone } from "@/hooks/queries"

const UpdateGroupPhoneDialog = ({ groupId }) => {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState("")
  const [currentGroupId, setCurrentGroupId] = useState(groupId)
  const [currentPhone, setCurrentPhone] = useState("")

  const { data: groupData } = useGetGroupById(
    { group_searchable_id: groupId },
    { enabled: !!groupId }
  )
  useEffect(() => {
    setCurrentGroupId(groupId)
    setPhone("")
  }, [groupId, open])

  useEffect(() => {
    if (groupData?.data?.phone) {
      setCurrentPhone(groupData.data.phone) // <- ACTUALIZA TELÉFONO ACTUAL
    }
  }, [groupData])

  const handlePhoneChange = (e) => {
    const value = e.target.value
    const numbersOnly = value.replace(/\D/g, "")

    if (numbersOnly.length <= 10) {
      setPhone(numbersOnly)
    }
  }

  const { mutateAsync, isPending: isLoading } = UseUpdateGroupPhone({
    onSuccess: () => {
      toast.success("Teléfono actualizado correctamente")
      setCurrentPhone(phone)
      setOpen(false)
    },
    onError: () => toast.error("Error al actualizar teléfono"),
  })

  const handleSubmit = async () => {
    if (!currentGroupId) {
      toast.error("No se encontró el id del grupo")
      return
    }

    try {
      await mutateAsync({ group_id: currentGroupId, new_phone: phone })
    } catch (error) {
      console.error("Error updating phone:", error)
    }
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

        <div className="space-y-4">
          <span className="text-sm font-medium text-muted-foreground">
            Numero actual:{" "}
            <span className="font-semibold text-primary">{currentPhone}</span>
          </span>
          <Input
            type="tel"
            placeholder="Nuevo número de teléfono (10 dígitos)"
            value={phone}
            onChange={handlePhoneChange}
            disabled={isLoading}
            maxLength={10}
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <Button
            onClick={handleSubmit}
            disabled={isLoading || phone.length !== 10}
            isLoading={isLoading}
          >
            Actualizar Teléfono
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
