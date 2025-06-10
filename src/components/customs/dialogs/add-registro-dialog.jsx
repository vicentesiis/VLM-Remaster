import { UserPlusIcon } from "lucide-react"
import React from "react"
import { ClientForm } from "../client-detail"
import { Button } from "@/components/ui"
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
      <DialogContent className="h-full overflow-y-auto sm:max-h-[calc(100vh-20px)] sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle className="text-primary">Nuevo Registro</DialogTitle>
        </DialogHeader>
        <div>
          <ClientForm />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button variant="add">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddRegistroDialog
