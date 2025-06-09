import { UserPlusIcon } from "lucide-react"
import React from "react"
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
            <UserPlusIcon className="mr-2" />
            Agregar Registro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Nuevo Registro</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {/* 👉 Add your form or content here */}
          <p className="text-muted-foreground">
            Aquí va el formulario de registro.
          </p>
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
