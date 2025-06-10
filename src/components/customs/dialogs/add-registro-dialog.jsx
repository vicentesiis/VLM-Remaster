import { UserPlusIcon } from "lucide-react"
import React, { useRef } from "react"
import ClientForm from "../client-detail/client-form"
import { Button, DialogHeaderCustom } from "@/components/ui"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

const AddRegistroDialog = ({ trigger }) => {
  const formRef = useRef()

  const handleSubmit = (data) => {
    console.log("Datos recibidos:", data)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="add">
            <UserPlusIcon />
            Agregar Registro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-950 sm:max-h-[calc(100vh-60px)] sm:max-w-7xl">
        <DialogHeaderCustom icon={UserPlusIcon} title="Nuevo Registro" />
        <ClientForm ref={formRef} onSubmit={handleSubmit} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="add" onClick={() => formRef.current?.submit()}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddRegistroDialog
