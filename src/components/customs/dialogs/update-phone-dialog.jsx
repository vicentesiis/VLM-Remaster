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
import { UseUpdateGroupPhone } from "@/hooks/queries"

const UpdateGroupPhoneDialog = ({ group }) => {
  const [open, setOpen] = useState(false)
  const [phone, setPhone] = useState("")

  useEffect(() => {
    if (open) {
      setPhone("")  
    }
  }, [open, group?.phone])

  const { mutateAsync, isLoading } = UseUpdateGroupPhone({})

  const handlePhoneChange = (e) => {
    const value = e.target.value
    const numbersOnly = value.replace(/\D/g, "")

    if (numbersOnly.length <= 10) {
      setPhone(numbersOnly)
    }
  }
  const handleSubmit = async () => {
    try {
      await mutateAsync({ group_id: group.id, new_phone: phone })
      toast.success("Teléfono actualizado correctamente")
      setOpen(false) 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Error al actualizar teléfono")
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
        <div>
          <p className="mb-1 text-sm font-medium text-muted-foreground">
            Telefono actual:{" "}
            <span className="font-semibold text-primary">{group?.phone}</span>
          </p>
          <Input
            value={phone}
            placeholder="Nuevo número de teléfono"
            disabled={isLoading}
            maxLength={10}
            inputMode="numeric"
            onChange={handlePhoneChange}
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
          <Button onClick={handleSubmit} isLoading={isLoading}>
            Actualizar Teléfono
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

UpdateGroupPhoneDialog.propTypes = {
  group: PropTypes.any,
}

export default UpdateGroupPhoneDialog
