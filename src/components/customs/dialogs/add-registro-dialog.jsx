import { UserPlusIcon } from "lucide-react"
import React, { useRef, useState } from "react"
import { toast } from "sonner"
import RegistroForm from "../forms/registro-form"
import { Button, DialogHeaderCustom } from "@/components/ui"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { useCreateRecord } from "@/hooks/queries/useRecord"

const AddRegistroDialog = ({ trigger }) => {
  const formRef = useRef()
  const [open, setOpen] = useState(false)

  const { mutateAsync: createRecord, isLoading } = useCreateRecord({
    onError: () => {
      toast.error("Error al crear el registro")
    },
  })

  const handleSubmit = async (data) => {
    try {
      const response = await createRecord(data)

      toast("Registro creado con éxito", {
        description: `ID: ${response.data.public_id}`,
        action: {
          label: "Copiar ID",
          onClick: async () => {
            await navigator.clipboard.writeText(response.data.public_id)
            toast.success("ID copiado al portapapeles")
          },
        },
      })

      setOpen(false)
      queryClient.invalidateQueries(["recordsByUser"])
      queryClient.invalidateQueries(["recordsByCriteria"])
    } catch (err) {
      console.error("Error creating record:", err)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="add" size="sm">
            <UserPlusIcon />
            Agregar Registro
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="h-full overflow-y-auto bg-gray-50 dark:bg-gray-950 sm:max-h-[calc(100vh-60px)] sm:max-w-7xl">
        <DialogHeaderCustom
          icon={UserPlusIcon}
          title="Nuevo Registro"
          iconBgClass="bg-green-600"
        />
        <RegistroForm ref={formRef} onSubmit={handleSubmit} />

        <Button
          className="text-md sticky bottom-0 float-right ml-auto mr-8"
          variant="add"
          disabled={isLoading}
          onClick={() => formRef.current?.submit()}
        >
          {isLoading ? "Agregando..." : "Agregar Registro"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}

export default AddRegistroDialog
