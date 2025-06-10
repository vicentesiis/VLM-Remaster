import { UserPlusIcon } from "lucide-react"
import React from "react"
import { ClientForm } from "../client-detail"
import { Button, Separator } from "@/components/ui"
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
      <DialogContent className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-950 sm:max-h-[calc(100vh-60px)] sm:max-w-7xl">
        <DialogHeader className={"-my-2"}>
          <DialogTitle>Nuevo Registro</DialogTitle>
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
